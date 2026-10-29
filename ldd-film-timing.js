/* Film cue quality gate. Shared by the browser and zero-dependency Node tests. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.LDDFilmTiming = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const MAX_SECONDS = 4 * 60 * 60;
  const GAP_WARNING_SECONDS = 15;
  const OVERLAP_TOLERANCE = 0.15;

  function check(segments, options = {}) {
    const errors = [];
    const warnings = [];
    const allowEmpty = Boolean(options.allowEmpty);
    const duration = Number(options.duration);
    const hasDuration = options.duration != null &&
      Number.isFinite(duration) && duration > 0;

    if (!Array.isArray(segments)) {
      return { ok: false, errors: ['Script phải là danh sách câu thoại.'], warnings };
    }
    if (!segments.length) {
      if (!allowEmpty) errors.push('Chưa có câu thoại để kiểm tra.');
      return { ok: !errors.length, errors, warnings };
    }
    if (segments.length > 1000) {
      errors.push('Script vượt quá 1000 câu.');
    }

    let previousStart = -1;
    let previousEnd = -1;
    for (let i = 0; i < segments.length; i++) {
      const item = segments[i] || {};
      const start = Number(item.start);
      const end = Number(item.end);
      const name = 'Câu ' + (i + 1);
      if (item.start == null || item.end == null || !Number.isFinite(start) ||
          !Number.isFinite(end) || start < 0 || end <= start || end > MAX_SECONDS) {
        errors.push(name + ': mốc thời gian không hợp lệ.');
        continue;
      }
      if (typeof item.text !== 'string' || !item.text.trim()) {
        errors.push(name + ': thiếu nội dung.');
      }
      if (hasDuration && end > duration + 1) {
        errors.push(name + ': kết thúc sau thời lượng video (' +
          Math.round(end) + 's > ' + Math.round(duration) + 's).');
      }
      if (previousStart >= 0 && start < previousStart - 0.05) {
        errors.push(name + ': thứ tự câu bị đảo.');
      }
      if (previousEnd >= 0 && start < previousEnd - OVERLAP_TOLERANCE) {
        errors.push(name + ': thời gian chồng lên câu trước.');
      }
      if (previousEnd >= 0 && start - previousEnd > GAP_WARNING_SECONDS) {
        warnings.push('Giữa câu ' + i + ' và ' + (i + 1) + ' có khoảng trống ' +
          Math.round(start - previousEnd) + ' giây: hãy đối chiếu video.');
      }
      if (end - start > 35) {
        warnings.push(name + ': kéo dài hơn 35 giây, hãy kiểm tra mốc chia câu.');
      }
      previousStart = start;
      previousEnd = end;
    }
    return { ok: !errors.length, errors, warnings };
  }

  function cueAtTime(segments, time, completed = () => false) {
    if (!Array.isArray(segments) || !Number.isFinite(Number(time))) return -1;
    const seconds = Number(time);
    return segments.findIndex((item, index) => {
      const end = Number(item?.end);
      return !completed(index) && Number.isFinite(end) &&
        seconds >= end - 0.12 && seconds <= end + 0.8;
    });
  }


  // Parses timestamps copied manually from caption viewers such as
  // YouTubeToTranscript.com. No requests to third-party services are made.
  function parseClock(value) {
    const clean = String(value ?? '').trim().replace(/[\\[\\]]/g, '');
    const match = clean.match(/^(?:(\d{1,2}):)?(\d{1,3}):([0-5]\d)(?:[.,](\d{1,3}))?$/);
    if (!match) return NaN;
    const hours = Number(match[1] || 0);
    const minutes = Number(match[2]);
    if (match[1] && minutes >= 60) return NaN;
    return hours * 3600 + minutes * 60 + Number(match[3]) +
      Number((match[4] || '').padEnd(3, '0')) / 1000;
  }

  function parseTimestampedTranscript(source, videoDuration) {
    const errors = [], warnings = [];
    const duration = parseClock(videoDuration);
    if (!Number.isFinite(duration) || duration <= 0) {
      return { segments: [], errors: [
        'Cần thời lượng chính xác của video (ví dụ 02:24) để xác định thời điểm kết thúc câu cuối.'
      ], warnings };
    }
    const lines = String(source || '').replace(/\r/g, '').split('\n').map(x => x.trim());
    const cues = [];
    const stampPattern = /^(?:\d+\s+)?[\[(]?((?:\d{1,2}:)?\d{1,3}:[0-5]\d(?:[.,]\d{1,3})?)[\])]?(?:\s*[-–—:]\s*|\s+)?(.*)$/;
    for (const line of lines) {
      if (!line) continue;
      const match = line.match(stampPattern);
      if (match) {
        const start = parseClock(match[1]);
        if (!Number.isFinite(start)) {
          errors.push('Không đọc được timestamp: ' + match[1]);
          continue;
        }
        if (start >= duration) {
          errors.push('Mốc ' + match[1] + ' vượt quá thời lượng video.');
          continue;
        }
        if (cues.length && start <= cues[cues.length - 1].start) {
          errors.push('Mốc ' + match[1] + ' bị trùng hoặc đảo thứ tự.');
          continue;
        }
        cues.push({start, text: match[2]?.trim() || ''});
        continue;
      }
      if (cues.length) cues[cues.length - 1].text += (cues[cues.length - 1].text ? ' ' : '') + line;
    }
    if (cues.length < 2) {
      errors.push('Không đọc đủ 2 đoạn có timestamp. Bật Copy Timestamp ON trước khi sao chép.');
    }
    const segments = cues.map((cue, i) => ({
      start: cue.start,
      end: i < cues.length - 1 ? cues[i + 1].start : duration,
      text: cue.text.trim()
    }));
    if (!errors.length) {
      const result = check(segments, {duration});
      errors.push(...result.errors);
      warnings.push(...result.warnings);
    }
    warnings.push('Timestamp sao chép thường chỉ đánh dấu đầu đoạn. Mốc kết thúc dựa trên lúc bắt đầu đoạn kế tiếp; cần nghe kiểm tra từng câu trước khi đăng.');
    return {segments, errors, warnings};
  }

  return { check, cueAtTime, parseTimestampedTranscript, parseClock };
});
