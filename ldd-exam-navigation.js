/* Shared exam workspace: timer/navigation never float over the paper.
   Answer state belongs to the exam renderer; this module never grades or saves it. */
(function () {
    'use strict';
    const instances = new Map();
    const pending = new Map();
    const compact = window.matchMedia('(max-width: 800px)');
    let scheduled = false;

    function jump(element) {
        if (!element || !element.isConnected) return;
        // Long papers should land immediately, without a multi-second scroll.
        const behavior = 'instant';
        const paper = element.closest('.ldd-exam-paper');
        if (paper) {
            const rect = element.getBoundingClientRect();
            const viewport = paper.getBoundingClientRect();
            paper.scrollTo({ top: paper.scrollTop + rect.top - viewport.top - Math.max(12, (paper.clientHeight - rect.height) / 2), behavior });
        } else element.scrollIntoView({ block: 'center', behavior });
        if (!element.hasAttribute('tabindex')) element.tabIndex = -1;
        element.focus({ preventScroll: true });
    }

    function makeSheet(grid, count) {
        let entries = [];
        let buttons = [];
        function refresh() {
            let done = 0;
            buttons.forEach((button, i) => {
                const answered = Boolean(entries[i].answered());
                button.disabled = Boolean(entries[i].disabled && entries[i].disabled());
                if (answered) done++;
                button.classList.toggle('is-answered', answered);
                button.setAttribute('aria-label', 'Câu ' + entries[i].label + (answered ? ', đã làm' : ', chưa làm'));
            });
            if (count) count.textContent = done + '/' + entries.length;
        }
        return {
            set(items) {
                entries = items;
                buttons = items.map(entry => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'ldd-exam-question';
                    button.textContent = entry.label;
                    button.addEventListener('click', () => entry.go ? entry.go() : requestAnimationFrame(() => jump(entry.element)));
                    return button;
                });
                grid.replaceChildren(...buttons);
                refresh();
            },
            refresh
        };
    }

    function visible(view) {
        for (let node = view; node && node.nodeType === 1; node = node.parentElement) {
            if (node.style.display === 'none' || getComputedStyle(node).display === 'none' || node.hidden) return false;
        }
        return true;
    }

    function updateVisibility() {
        scheduled = false;
        let active = null;
        instances.forEach(instance => {
            if (!instance.view) return;
            const open = visible(instance.view);
            instance.view.classList.toggle('ldd-exam-open', open);
            if (open) active = instance;
        });
        document.body.classList.toggle('ldd-exam-active', Boolean(active));
        if (active) measure(active);
    }

    function scheduleVisibility() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(updateVisibility);
    }

    function measure(instance) {
        const header = document.getElementById('site-header');
        const viewport = window.visualViewport;
        const full = instance.view.classList.contains('irt-focus-active');
        const top = full ? 0 : Math.max(0, header ? header.getBoundingClientRect().bottom : 0);
        const height = Math.max(120, (viewport ? viewport.height : window.innerHeight) - top);
        if (instance.view.style.getPropertyValue('--ldd-exam-top') !== top + 'px') instance.view.style.setProperty('--ldd-exam-top', top + 'px');
        if (instance.view.style.getPropertyValue('--ldd-exam-height') !== height + 'px') instance.view.style.setProperty('--ldd-exam-height', height + 'px');
    }

    function mount(prefix) {
        const view = document.getElementById(prefix + '-take-view');
        if (!view || instances.has(prefix)) return;
        const paper = document.createElement('div');
        paper.className = 'ldd-exam-paper';
        // Move existing nodes, preserving every input value, handler and media element.
        while (view.firstChild) paper.appendChild(view.firstChild);
        const toolbar = document.createElement('div');
        toolbar.className = 'ldd-exam-toolbar';
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'ldd-exam-sheet-toggle';
        toggle.innerHTML = 'Câu hỏi <span class="ldd-exam-count"></span> <span aria-hidden="true">▾</span>';
        const count = toggle.querySelector('.ldd-exam-count');
        const sidebar = document.createElement('nav');
        sidebar.className = 'ldd-exam-sheet';
        sidebar.id = prefix + '-question-navigation';
        sidebar.setAttribute('aria-label', 'Điều hướng câu hỏi');
        toggle.setAttribute('aria-controls', sidebar.id);
        const title = document.createElement('strong');
        title.textContent = 'Câu hỏi';
        let grid = paper.querySelector('#' + prefix + '-answer-sheet-grid');
        if (!grid) grid = document.createElement('div');
        grid.classList.add('ldd-exam-grid');
        const legend = document.createElement('div');
        legend.className = 'ldd-exam-legend';
        legend.innerHTML = '<span><i class="is-answered"></i>Đã làm</span><span><i></i>Chưa làm</span>';
        sidebar.append(title, legend, grid);
        toolbar.appendChild(toggle);
        const focus = paper.querySelector('#' + prefix + '-focus-toggle-btn');
        if (focus) toolbar.appendChild(focus);
        const timer = paper.querySelector('#' + prefix + '-take-timer');
        if (timer) {
            timer.classList.add('ldd-exam-clock');
            timer.setAttribute('role', 'timer');
            timer.setAttribute('aria-label', 'Thời gian còn lại');
            toolbar.appendChild(timer);
        }
        // Reading used to keep Submit inside the mobile sheet. Keep it reachable
        // at the end of the paper, independently of whether navigation is open.
        const oldAside = paper.querySelector('#' + prefix + '-answer-sheet');
        const submit = paper.querySelector('#' + prefix + '-submit-btn');
        if (oldAside && submit && oldAside.contains(submit)) {
            const main = paper.querySelector('.irt-take-main') || paper;
            main.appendChild(submit);
        }
        view.classList.add('ldd-exam-mounted');
        view.append(toolbar, sidebar, paper);
        const instance = { view, grid, count, sheet: null };
        instances.set(prefix, instance);
        function expand(open) {
            view.classList.toggle('ldd-exam-sheet-expanded', open);
            toggle.setAttribute('aria-expanded', String(open));
            sidebar.inert = compact.matches && !open;
        }
        toggle.addEventListener('click', () => { if (compact.matches) expand(!view.classList.contains('ldd-exam-sheet-expanded')); });
        sidebar.addEventListener('click', event => {
            if (compact.matches && event.target.closest('button')) expand(false);
        });
        sidebar.addEventListener('keydown', event => {
            if (event.key === 'Escape' && compact.matches) { expand(false); toggle.focus(); }
        });
        compact.addEventListener('change', () => expand(!compact.matches));
        expand(!compact.matches);
        if (prefix === 'ctest') instance.sheet = makeSheet(grid, count);
        else {
            grid.addEventListener('click', event => {
                const button = event.target.closest('button[data-qnum]');
                if (!button) return;
                // The renderer first reveals the owning Part/Passage. Then align
                // its question in the paper after the compact sheet has closed.
                requestAnimationFrame(() => requestAnimationFrame(() => jump(document.getElementById(prefix + '-q-' + button.dataset.qnum))));
            });
            // IELTS renderers already own numbering, part switching and answer state.
            // Reuse their live grid instead of maintaining a second set of answers.
            const refresh = () => {
                const buttons = Array.from(grid.children);
                let done = 0;
                buttons.forEach(button => {
                    const answered = button.classList.contains('is-answered');
                    if (answered) done++;
                    const label = 'Câu ' + button.textContent + (answered ? ', đã làm' : ', chưa làm');
                    if (button.getAttribute('aria-label') !== label) button.setAttribute('aria-label', label);
                });
                const value = done + '/' + buttons.length;
                if (count.textContent !== value) count.textContent = value;
            };
            new MutationObserver(refresh).observe(grid, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
            refresh();
        }
        if (pending.has(prefix)) { instance.sheet.set(pending.get(prefix)); pending.delete(prefix); }
        // Observe visibility only along the ancestry; timer ticks and typing do not
        // rescan the document or rebuild the question buttons.
        const observer = new MutationObserver(scheduleVisibility);
        for (let node = view; node; node = node.parentElement) {
            observer.observe(node, { attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
        }
    }

    window.LDDExamUI = {
        setQuestions(prefix, entries) {
            const instance = instances.get(prefix);
            if (instance && instance.sheet) instance.sheet.set(entries);
            else pending.set(prefix, entries);
        },
        refresh(prefix) { const instance = instances.get(prefix); if (instance && instance.sheet) instance.sheet.refresh(); },
        // Also available for standalone papers and sequential vocabulary checks.
        inline(container, entries) {
            let details = container.querySelector(':scope > .ldd-exam-inline-sheet');
            if (!details) {
                details = document.createElement('details');
                details.className = 'ldd-exam-inline-sheet';
                details.innerHTML = '<summary>Câu hỏi <span></span></summary><div class="ldd-exam-legend"><span><i class="is-answered"></i>Đã làm</span><span><i></i>Chưa làm</span></div><nav class="ldd-exam-grid" aria-label="Điều hướng câu hỏi"></nav>';
                container.prepend(details);
                details._sheet = makeSheet(details.querySelector('nav'), details.querySelector('summary span'));
                details.addEventListener('click', event => {
                    if (event.target.closest('nav button')) details.open = false;
                }, true);
            }
            details._sheet.set(entries);
            return details._sheet;
        }
    };

    function boot() {
        ['ctest', 'ilt', 'irt'].forEach(mount);
        if (document.getElementById('site-header') && window.ResizeObserver) {
            new ResizeObserver(scheduleVisibility).observe(document.getElementById('site-header'));
        }
        window.addEventListener('resize', scheduleVisibility);
        if (window.visualViewport) window.visualViewport.addEventListener('resize', scheduleVisibility);
        scheduleVisibility();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
