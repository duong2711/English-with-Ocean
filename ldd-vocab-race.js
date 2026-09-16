/* LDD English — Vocab Race bootstrap v7 */
(function () {
    'use strict';

    if (!document.getElementById('ldd-vocab-race-v5-style')) {
        const base = document.createElement('link');
        base.id = 'ldd-vocab-race-v5-style';
        base.rel = 'stylesheet';
        base.href = 'ldd-vocab-race-v5.css?v=20260917-7';
        document.head.appendChild(base);
    }

    if (!document.getElementById('ldd-vocab-race-v6-style')) {
        const visual = document.createElement('link');
        visual.id = 'ldd-vocab-race-v6-style';
        visual.rel = 'stylesheet';
        visual.href = 'ldd-vocab-race-v6.css?v=20260917-7';
        document.head.appendChild(visual);
    }

    if (!document.getElementById('ldd-vocab-race-v7-style')) {
        const smooth = document.createElement('link');
        smooth.id = 'ldd-vocab-race-v7-style';
        smooth.rel = 'stylesheet';
        smooth.href = 'ldd-vocab-race-v7.css?v=20260917-7';
        document.head.appendChild(smooth);
    }

    if (document.getElementById('ldd-vocab-race-v5-script')) return;
    const script = document.createElement('script');
    script.id = 'ldd-vocab-race-v5-script';
    script.src = 'ldd-vocab-race-v5.js?v=20260917-7';
    script.defer = true;
    document.body.appendChild(script);
})();