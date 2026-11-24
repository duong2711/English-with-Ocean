/* Oci dolphin mascot. Image is a tiny self-contained transparent WebP (5 KB),
   so displaying it never opens an extra network connection. */
(function () {
    'use strict';
    if (window.__LDDMascotOci) return;
    window.__LDDMascotOci = true;
    const image = 'data:image/webp;base64,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';
    const tips = [
        'Ưu tiên bài giáo viên giao nếu có, rồi mới chọn bài ôn thêm.',
        'Vào “Từ vựng của tôi” để ôn những từ bạn đã lưu.',
        'Sau khi đọc một đoạn ngắn, thử tự kể lại bằng tiếng Anh.',
        'Trong phần kết quả, xem kiến thức nào cần luyện trước.',
        'Nếu đang học dở, hãy trở lại đúng bài đó để hoàn thành.'
    ];

    function mount() {
        const actions = document.querySelector('#tab-trang-chu .ldd-ux-hero-actions');
        // Wait for the compact header; Oci is optional help, not a second hero card.
        if (!actions) return false;
        if (document.getElementById('ldd-oci-welcome')) return true;
        const welcome = document.createElement('details');
        welcome.id = 'ldd-oci-welcome';
        welcome.className = 'ldd-oci-welcome';
        const summary = document.createElement('summary');
        summary.className = 'ldd-oci-summary';
        summary.textContent = '🐬 Oci gợi ý';
        const panel = document.createElement('div');
        panel.className = 'ldd-oci-inner';
        const art = document.createElement('img');
        art.className = 'ldd-oci-portrait';
        art.src = image;
        art.width = 128;
        art.height = 138;
        art.decoding = 'async';
        art.alt = 'Oci, cá heo xanh quàng khăn cam, linh vật của LDD English';
        const copy = document.createElement('div');
        copy.className = 'ldd-oci-content';
        const name = document.createElement('strong');
        name.className = 'ldd-oci-name';
        name.textContent = 'Gợi ý học tập từ Oci';
        const tip = document.createElement('p');
        tip.className = 'ldd-oci-tip';
        tip.textContent = tips[0];
        tip.setAttribute('aria-live', 'polite');
        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'ldd-oci-next';
        next.textContent = '✨ Gợi ý khác';
        let index = 0;
        next.addEventListener('click', function () {
            index = (index + 1) % tips.length;
            tip.textContent = tips[index];
        });
        copy.append(name, tip, next);
        panel.append(art, copy);
        welcome.append(summary, panel);
        actions.appendChild(welcome);
        return true;
    }

    function init() {
        if (mount()) return;
        const observer = new MutationObserver(function () {
            if (mount()) observer.disconnect();
        });
        observer.observe(document.body, {childList: true, subtree: true});
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
    else init();
})();