/* LDD English — Vocab Race bootstrap v5 */
(function () {
    'use strict';
    if (!document.getElementById('ldd-vocab-race-v5-style')) {
        const link = document.createElement('link');
        link.id = 'ldd-vocab-race-v5-style';
        link.rel = 'stylesheet';
        link.href = 'ldd-vocab-race-v5.css?v=20260917-5';
        document.head.appendChild(link);
    }
    if (document.getElementById('ldd-vocab-race-v5-script')) return;
    const script = document.createElement('script');
    script.id = 'ldd-vocab-race-v5-script';
    script.src = 'ldd-vocab-race-v5.js?v=20260917-5';
    script.defer = true;
    document.body.appendChild(script);
})();
