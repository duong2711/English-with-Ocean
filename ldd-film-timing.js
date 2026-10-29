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

  return { check, cueAtTime };
});
