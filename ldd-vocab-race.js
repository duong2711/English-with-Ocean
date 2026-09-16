/* LDD English — Vocab Race bootstrap v9 */
(function () {
    'use strict';

    const styles = [
        ['ldd-vocab-race-v5-style', 'ldd-vocab-race-v5.css?v=20260917-9'],
        ['ldd-vocab-race-v6-style', 'ldd-vocab-race-v6.css?v=20260917-9'],
        ['ldd-vocab-race-v7-style', 'ldd-vocab-race-v7.css?v=20260917-9'],
        ['ldd-vocab-race-v8-style', 'ldd-vocab-race-v8.css?v=20260917-9'],
        ['ldd-vocab-race-v9-style', 'ldd-vocab-race-v9.css?v=20260917-9']
    ];

    styles.forEach(function (item) {
        if (document.getElementById(item[0])) return;
        const link = document.createElement('link');
        link.id = item[0];
        link.rel = 'stylesheet';
        link.href = item[1];
        document.head.appendChild(link);
    });

    if (!document.getElementById('ldd-vocab-race-v5-script')) {
        const core = document.createElement('script');
        core.id = 'ldd-vocab-race-v5-script';
        core.src = 'ldd-vocab-race-v5.js?v=20260917-9';
        core.defer = true;
        document.body.appendChild(core);
    }

    if (!document.getElementById('ldd-vocab-race-v9-script')) {
        const intermission = document.createElement('script');
        intermission.id = 'ldd-vocab-race-v9-script';
        intermission.src = 'ldd-vocab-race-v9.js?v=20260917-9';
        intermission.defer = true;
        document.body.appendChild(intermission);
    }
})();