/* Learning objectives for private tests. Scores always come from the existing grader. */
window.LDDTestSkills = (() => {
    'use strict';
    const topics = {
        'Ngữ pháp': ['Thì hiện tại đơn', 'Thì quá khứ đơn', 'Từ loại', 'Cấu trúc câu đơn', 'Giới từ', 'Câu điều kiện', 'So sánh'],
        'Từ vựng': ['Nghĩa của từ trong ngữ cảnh', 'Cụm động từ', 'Kết hợp từ'],
        'Đọc hiểu': ['Tìm thông tin chi tiết', 'Đọc điền khuyết', 'Ý chính', 'Suy luận'],
        'Viết câu': ['Hoàn thiện câu', 'Viết lại câu', 'Sắp xếp từ', 'Dịch câu'],
        'Phát âm': ['Phân biệt nguyên âm', 'Phân biệt phụ âm', 'Trọng âm'],
        'Nghe hiểu': ['Nghe chi tiết', 'Nghe ý chính'],
        'Giao tiếp': ['Chọn lời đáp phù hợp'],
        'Khác': []
    };
    function groupQuestion(type) { return ['reading', 'listening', 'mixed'].includes(type); }
    function guess(q, section = '', parent = '') {
        if (q.skill && topics[q.skill.category] && q.skill.topic) return q.skill;
        const text = String(q.prompt || '').replace(/<[^>]*>/g, '').toLowerCase();
        if (/trọng âm|word stress|different stress/.test(text + ' ' + section.toLowerCase())) return {category:'Phát âm',topic:'Trọng âm'};
        if (/pronounced differently|phát âm|pronunciation/i.test(text + ' ' + section)) return {category:'Phát âm',topic:'Phân biệt âm'};
        if (/từ loại|parts of speech/i.test(section)) return {category:'Ngữ pháp',topic:'Từ loại'};
        if (parent === 'listening' || /listening|nghe hiểu/i.test(section)) return {category:'Nghe hiểu',topic:'Hiểu nội dung bài nghe'};
        if (parent === 'reading' || /đọc hiểu|đọc điền khuyết|reading/i.test(section)) return {category:'Đọc hiểu',topic:/điền khuyết|cloze/i.test(section) ? 'Đọc điền khuyết' : 'Hiểu nội dung bài đọc'};
        if (q.type === 'reorder') return {category:'Viết câu',topic:'Sắp xếp từ'};
        if (/hoàn thiện câu|sentence completion/i.test(section)) return {category:'Viết câu',topic:'Hoàn thiện câu'};
        if (/viết lại câu|rewrite the sentence/i.test(text)) return {category:'Viết câu',topic:'Viết lại câu'};
        return null;
    }
    function controls(q) {
        const box = document.createElement('fieldset');
        box.className = 'ctest-skill-fields';
        const legend = document.createElement('legend');
        legend.textContent = 'Kiến thức được kiểm tra';
        box.appendChild(legend);
        const select = document.createElement('select');
        select.setAttribute('aria-label','Phạm trù kiến thức');
        select.add(new Option('Chọn phạm trù', ''));
        Object.keys(topics).forEach(name => select.add(new Option(name, name)));
        const input = document.createElement('input');
        input.setAttribute('aria-label','Điểm kiến thức cụ thể');
        input.placeholder = 'Chọn hoặc nhập điểm kiến thức';
        const list = document.createElement('datalist');
        list.id = 'ctest-skills-' + (++controls.count);
        input.setAttribute('list',list.id);
        select.value = q.skill?.category || '';
        input.value = q.skill?.topic || '';
        function choices() { list.replaceChildren(...(topics[select.value] || []).map(name => new Option(name, name))); }
        choices();
        select.onchange = () => { input.value = ''; choices(); box.dispatchEvent(new Event('ctest-changed',{bubbles:true})); };
        input.oninput = () => box.dispatchEvent(new Event('ctest-changed',{bubbles:true}));
        box.append(select,input,list);
        return box;
    }
    controls.count = 0;
    function read(card) {
        const box = card.querySelector(':scope > .ctest-skill-fields');
        if (!box) return null;
        const category = box.querySelector('select').value, topic = box.querySelector('input').value.trim();
        return category || topic ? {category,topic} : null;
    }
    function check(container) {
        for (const box of container.querySelectorAll('.ctest-skill-fields')) {
            const field = !box.querySelector('select').value ? box.querySelector('select') : !box.querySelector('input').value.trim() ? box.querySelector('input') : null;
            if (field) { alert('Hãy chọn phạm trù và điểm kiến thức cho câu này trước khi giao bài.'); field.focus(); return false; }
        }
        return true;
    }
    function report(rows, heading) {
        // Thu gọn toàn bộ kết quả theo kiến thức khi mới mở kết quả.
        const box = document.createElement('details');
        box.className = 'ctest-skill-report';
        const title = document.createElement('summary');
        title.className = 'ctest-skill-toggle';
        title.textContent = heading;
        title.setAttribute('aria-label', 'Mở hoặc thu gọn ' + heading);
        box.appendChild(title);
        const groups = new Map();
        let unmapped = 0;
        rows.forEach(row => {
            if (!row.total) return;
            if (!row.skill) { unmapped += row.total; return; }
            const name = row.skill.category + ' · ' + row.skill.topic;
            if (!groups.has(name)) groups.set(name, {name, total:0, wrong:0, refs:[]});
            const g = groups.get(name);
            g.total += row.total;
            g.wrong += row.total - row.correct;
            if (row.total > row.correct) g.refs.push(row.label);
        });
        const sorted = [...groups.values()].sort((a,b) => b.wrong-a.wrong || b.wrong/b.total-a.wrong/a.total || a.name.localeCompare(b.name,'vi'));
        const note = document.createElement('p');
        const first = sorted[0];
        note.textContent = !first ? 'Chưa có mục đã chấm và có nhãn kiến thức.' : first.wrong
            ? 'Nên xem lại ' + first.name + ' (' + first.wrong + '/' + first.total + ' mục đã chấm bị sai).'
            : 'Em đã làm đúng tất cả các mục đã chấm có nhãn kiến thức.';
        box.appendChild(note);
        sorted.forEach(g => {
            const line = document.createElement('details');
            const summary = document.createElement('summary');
            summary.textContent = g.name + ' — ' + (g.total-g.wrong) + '/' + g.total + ' đúng · ' + g.wrong + ' sai';
            line.appendChild(summary);
            const refs = document.createElement('p');
            refs.textContent = g.refs.length ? 'Xem lại: ' + g.refs.join('; ') : 'Đã làm đúng toàn bộ mục này.';
            line.appendChild(refs);
            box.appendChild(line);
        });
        if (unmapped) { const p=document.createElement('p'); p.textContent = unmapped + ' mục đã chấm chưa xác định điểm kiến thức. Giáo viên có thể bổ sung nhãn trong phần sửa đề.'; box.appendChild(p); }
        return box;
    }
    return { groupQuestion, guess, controls, read, check, report };
})();
