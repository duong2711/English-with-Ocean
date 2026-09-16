/* LDD English — Vocab Race bootstrap v8 */
(function () {
    'use strict';

    const styles = [
        ['ldd-vocab-race-v5-style', 'ldd-vocab-race-v5.css?v=20260917-8'],
        ['ldd-vocab-race-v6-style', 'ldd-vocab-race-v6.css?v=20260917-8'],
        ['ldd-vocab-race-v7-style', 'ldd-vocab-race-v7.css?v=20260917-8'],
        ['ldd-vocab-race-v8-style', 'ldd-vocab-race-v8.css?v=20260917-8']
    ];

    styles.forEach(function (item) {
        if (document.getElementById(item[0])) return;
        const link = document.createElement('link');
        link.id = item[0];
        link.rel = 'stylesheet';
        link.href = item[1];
        document.head.appendChild(link);
    });

    if (document.getElementById('ldd-vocab-race-v5-script')) return;
    const script = document.createElement('script');
    script.id = 'ldd-vocab-race-v5-script';
    script.src = 'ldd-vocab-race-v5.js?v=20260917-8';
    script.defer = true;
    document.body.appendChild(script);
})();