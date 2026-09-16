/* LDD English — Vocab Race bootstrap v6 */
(function () {
    'use strict';
    if (!document.getElementById('ldd-vocab-race-v6-style')) {
        const link = document.createElement('link');
        link.id = 'ldd-vocab-race-v6-style';
        link.rel = 'stylesheet';
        link.href = 'ldd-vocab-race-v6.css?v=20260917-6';
        document.head.appendChild(link);
    }
    if (!document.getElementById('ldd-vocab-race-v5-style')) {
        const base = document.createElement('link');
        base.id = 'ldd-vocab-race-v5-style';
        base.rel = 'stylesheet';
        base.href = 'ldd-vocab-race-v5.css?v=20260917-6';
        document.head.appendChild(base);
    }
    if (document.getElementById('ldd-vocab-race-v5-script')) return;
    const script = document.createElement('script');
    script.id = 'ldd-vocab-race-v5-script';
    script.src = 'ldd-vocab-race-v5.js?v=20260917-6';
    script.defer = true;
    document.body.appendChild(script);
})();