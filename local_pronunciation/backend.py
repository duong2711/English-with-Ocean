from __future__ import annotations
import time
from typing import Any
import httpx
from fastapi import HTTPException
from supabase import Client, create_client
from config import SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

_token_cache: dict[str, tuple[float, str]] = {}
_target_cache: dict[tuple[str, str], tuple[float, str, str]] = {}
_admin: Client | None = None
TOKEN_TTL = 600
TARGET_TTL = 1800


def admin_client() -> Client:
    global _admin
    if not SUPABASE_SERVICE_ROLE_KEY:
        raise RuntimeError('Thiếu SUPABASE_SERVICE_ROLE_KEY trong .env')
    if _admin is None:
        _admin = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    return _admin


async def validate_user(token: str) -> str:
    now = time.time()
    hit = _token_cache.get(token)
    if hit and now - hit[0] < TOKEN_TTL:
        return hit[1]
    if not SUPABASE_ANON_KEY:
        raise HTTPException(503, 'Máy chấm chưa cấu hình SUPABASE_ANON_KEY.')
    try:
        async with httpx.AsyncClient(timeout=8) as client:
            r = await client.get(
                f'{SUPABASE_URL}/auth/v1/user',
                headers={'apikey': SUPABASE_ANON_KEY, 'Authorization': f'Bearer {token}'},
            )
    except Exception as exc:
        raise HTTPException(503, f'Không xác minh được tài khoản: {exc}') from exc
    if r.status_code != 200:
        raise HTTPException(401, 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.')
    uid = str((r.json() or {}).get('id') or '')
    if not uid:
        raise HTTPException(401, 'Không đọc được user_id.')
    _token_cache[token] = (now, uid)
    return uid


def _one(table: str, columns: str, item_key: str) -> dict[str, Any]:
    r = admin_client().table(table).select(columns).eq('id', str(item_key)).limit(1).execute()
    rows = r.data or []
    if not rows:
        raise ValueError('Không tìm thấy nội dung bài tương ứng.')
    return rows[0]


def resolve_target(item_type: str, item_key: str) -> tuple[str, str]:
    """Câu chuẩn luôn lấy từ DB tin cậy; không nhận câu chuẩn do browser gửi."""
    key = (item_type, str(item_key))
    now = time.time()
    hit = _target_cache.get(key)
    if hit and now - hit[0] < TARGET_TTL:
        return hit[1], hit[2]

    if item_type == 'ls1_qa':
        row = _one('speaking_lv1_qa_items', 'type,question_text,content,options,answer_index', item_key)
        qtype = str(row.get('type') or '')
        if qtype == 'dien':
            target = str(row.get('content') or '').strip()
        elif qtype == 'trac_nghiem':
            opts = row.get('options') or []
            idx = int(row.get('answer_index') or 0)
            target = str(opts[idx] if isinstance(opts, list) and 0 <= idx < len(opts) else '').strip()
        else:
            raise ValueError('Dạng Hỏi-đáp này chưa hỗ trợ chấm tự động.')
        label = str(row.get('question_text') or target).strip()
    elif item_type == 'ls1_opener':
        row = _one('speaking_lv1_opener_items', 'situation,options,answer_index', item_key)
        opts = row.get('options') or []
        idx = int(row.get('answer_index') or 0)
        target = str(opts[idx] if isinstance(opts, list) and 0 <= idx < len(opts) else '').strip()
        label = str(row.get('situation') or target).strip()
    elif item_type == 'ls2_shadow':
        row = _one('speaking_lv2_shadow_items', 'text', item_key)
        target = str(row.get('text') or '').strip()
        label = target
    else:
        raise ValueError('Dạng bài này chưa hỗ trợ chấm tự động an toàn.')

    if not target:
        raise ValueError('Câu chuẩn của bài đang trống.')
    _target_cache[key] = (now, target, label)
    return target, label


def _storage_path(url: str | None) -> str | None:
    if not url:
        return None
    marker = '/public/audio_comments/'
    i = url.find(marker)
    return url[i + len(marker):] if i >= 0 else None


def persist_result(job: dict[str, Any], result: dict[str, Any]) -> None:
    c = admin_client()
    old = (c.table('speaking_comments').select('id,audio_url')
           .eq('item_type', job['item_type']).eq('item_key', job['item_key'])
           .eq('user_id', job['user_id']).execute()).data or []
    payload = {
        'item_type': job['item_type'], 'item_key': job['item_key'],
        'item_label': str(job.get('item_label') or job['target_text'])[:300],
        'audio_url': None, 'user_id': job['user_id'], 'text': result['feedback'],
        'is_correct': bool(result['pass']), 'graded': True,
        'graded_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'graded_by': None, 'auto_score': result['score'],
        'auto_accuracy': result['accuracy'], 'auto_fluency': result['fluency'],
        'auto_completeness': result['completeness'], 'auto_confidence': result['confidence'],
        'auto_transcript': result['transcript'][:4000], 'auto_details': result['details'],
        'graded_source': 'local_ai',
    }
    c.table('speaking_comments').insert(payload).execute()
    # Chỉ dọn bản cũ sau khi row mới đã lưu thành công.
    if old:
        paths = [p for p in (_storage_path(x.get('audio_url')) for x in old) if p]
        try:
            if paths:
                c.storage.from_('audio_comments').remove(paths)
        except Exception as exc:
            print('[LDD scorer] Không xóa được audio cũ:', exc)
        ids = [x['id'] for x in old if x.get('id') is not None]
        try:
            if ids:
                c.table('speaking_comments').delete().in_('id', ids).execute()
        except Exception as exc:
            print('[LDD scorer] Không xóa được row cũ:', exc)
