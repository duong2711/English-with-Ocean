/* Entertainment catalog — edit media metadata here, not inside page markup.
   Large video/thumbnail files belong on Backblaze B2; this file holds URL pointers only.
   Movie entries are intentionally empty until the owner supplies video assets.
*/
window.LDDEntMediaCatalog = Object.freeze({
    movies: [
        // Future entry: {
        //   id: 'film-001', title: 'Tên phim', description: '',
        //   thumbnail_url: 'https://.../thumbnail.webp',
        //   video_url: 'https://.../short-video.mp4',
        //   duration: '01:30', order: 1
        // }
    ],
    // Fallback snapshot of uploaded art (2026-10-26). Runtime previews refresh from
    // thcs_story_frames per selected grade and always prefer the newer B2 uploads.
    // Chapters without art are shown with a styled placeholder, not a broken URL.
    chapter_thumbnails: {
        '6/u1': 'https://f005.backblazeb2.com/file/lddenglish/comics/g06-u01-f01.webp',
        '6/u2': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u02/5d2f620cada8-g06-u02-f03.webp',
        '6/u3': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u03/8548dcdffaef-g06-u03-f01.webp',
        '6/u4': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u04/dcbd0125f56b-g06-u04-f01.webp',
        '6/u5': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u05/9c3fadb73c04-g06-u05-f01.webp',
        '6/u6': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u06/b219930efb29-g06-u06-f01.webp',
        '6/u7': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u07/a3549dc0d9e7-g06-u07-f01.webp',
        '6/u8': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u08/7e7bb64accb8-g06-u08-f01.webp',
        '6/u9': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u09/d4cd4813e74b-g06-u09-f01.webp',
        '6/u10': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u10/466ef577a5da-g06-u10-f01.webp',
        '6/u11': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u11/e426489ea905-g06-u11-f01.webp',
        '6/u12': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u12/8789a396c3fe-g06-u12-f01.webp',
        '7/u1': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u01/92437c69634e-g07-u01-f03.webp',
        '7/u2': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u02/c8c6708f4a59-g07-u02-f01.webp',
        '7/u3': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u03/c45637478b60-g07-u03-f01.webp',
        '7/u4': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u04/0b5793b8dc2a-g07-u04-f01.webp',
        '7/u5': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u05/20c452b55d4f-g07-u05-f01.webp',
        '7/u6': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u06/e4337ac2cca9-g07-u06-f01.webp',
        '7/u7': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u07/7f070ff15e07-g07-u07-f01.webp',
        '7/u8': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u08/302ddd01b83f-g07-u08-f01.webp',
        '7/u9': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u09/0069dcb0d692-g07-u09-f01.webp',
        '7/u10': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u10/91cbdb33c3fa-g07-u10-f01.webp',
        '7/u11': 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g07/u11/f04241c1aa69-g07-u11-f01.webp',
        '9/u1': 'https://i.ibb.co/hr7nvDX/P1.png',
        '9/u2': 'https://i.ibb.co/PvfDm1Fd/P1.png'
    },
    comics: [
        {
            id: 'diary-of-a-wimpy-kid-book-1',
            title: 'Diary of a Wimpy Kid',
            description: 'Tập 1 · Nhật ký theo tháng và thứ',
            thumbnail_url: 'https://f005.backblazeb2.com/file/lddenglish/comics/wimpy-kid-book-1/p009-0.webp',
            type: 'wimpy'
        },
        {
            id: 'dung-duong-school-story',
            title: 'Truyện học đường',
            description: 'Những câu chuyện về cuộc sống học đường qua các Unit tiếng Anh lớp 6–12.',
            // Existing teacher-uploaded illustration from class 6, Unit 1.
            thumbnail_url: 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u03/8548dcdffaef-g06-u03-f01.webp', // Uses an uploaded illustration, not a stale placeholder.
            grades: [6, 7, 8, 9, 10, 11, 12],
            source: 'grade6-data.js … grade12-data.js / thcs_story_frames'
        }
    ]
});

window.LDDWimpyBook = [{"id":"september","label":"Tháng 9","english":"September","entries":[{"id":"september-01","day":"Tuesday","dayVi":"Thứ Ba","pages":["p009-0.webp","p010-0.webp","p011-0.webp","p012-0.webp","p013-0.webp","p014-0.webp","p015-0.webp","p016-0.webp"]},{"id":"september-02","day":"Wednesday","dayVi":"Thứ Tư","pages":["p016-1.webp","p017-0.webp","p018-0.webp"]},{"id":"september-03","day":"Thursday","dayVi":"Thứ Năm","pages":["p018-1.webp","p019-0.webp","p020-0.webp","p021-0.webp"]},{"id":"september-04","day":"Friday","dayVi":"Thứ Sáu","pages":["p021-1.webp","p022-0.webp","p023-0.webp","p024-0.webp"]},{"id":"september-05","day":"Saturday","dayVi":"Thứ Bảy","pages":["p024-1.webp","p025-0.webp","p026-0.webp","p027-0.webp","p028-0.webp"]},{"id":"september-06","day":"Monday","dayVi":"Thứ Hai","pages":["p029-0.webp","p030-0.webp","p031-0.webp"]},{"id":"september-07","day":"Tuesday","dayVi":"Thứ Ba","pages":["p032-0.webp","p033-0.webp","p034-0.webp","p035-0.webp","p036-0.webp"]},{"id":"september-08","day":"Wednesday","dayVi":"Thứ Tư","pages":["p036-1.webp","p037-0.webp","p038-0.webp","p039-0.webp","p040-0.webp"]},{"id":"september-09","day":"Thursday","dayVi":"Thứ Năm","pages":["p040-1.webp","p041-0.webp","p042-0.webp","p043-0.webp"]},{"id":"september-10","day":"Friday","dayVi":"Thứ Sáu","pages":["p044-0.webp","p045-0.webp","p046-0.webp","p047-0.webp","p048-0.webp"]},{"id":"september-11","day":"Monday","dayVi":"Thứ Hai","pages":["p049-0.webp","p050-0.webp"]},{"id":"september-12","day":"Wednesday","dayVi":"Thứ Tư","pages":["p051-0.webp"]},{"id":"september-13","day":"Thursday","dayVi":"Thứ Năm","pages":["p052-0.webp","p053-0.webp"]},{"id":"september-14","day":"Friday","dayVi":"Thứ Sáu","pages":["p053-1.webp","p054-0.webp"]},{"id":"september-15","day":"Monday","dayVi":"Thứ Hai","pages":["p055-0.webp","p056-0.webp"]}]},{"id":"october","label":"Tháng 10","english":"October","entries":[{"id":"october-01","day":"Monday","dayVi":"Thứ Hai","pages":["p057-0.webp","p058-0.webp","p059-0.webp","p060-0.webp","p061-0.webp"]},{"id":"october-02","day":"Saturday","dayVi":"Thứ Bảy","pages":["p061-1.webp","p062-0.webp","p063-0.webp","p064-0.webp","p065-0.webp","p066-0.webp","p067-0.webp"]},{"id":"october-03","day":"Sunday","dayVi":"Chủ Nhật","pages":["p068-0.webp","p069-0.webp"]},{"id":"october-04","day":"Tuesday","dayVi":"Thứ Ba","pages":["p069-1.webp","p070-0.webp","p071-0.webp","p072-0.webp","p073-0.webp","p074-0.webp","p075-0.webp","p076-0.webp","p077-0.webp","p078-0.webp","p079-0.webp","p080-0.webp","p081-0.webp","p082-0.webp","p083-0.webp"]}]},{"id":"november","label":"Tháng 11","english":"November","entries":[{"id":"november-01","day":"Thursday","dayVi":"Thứ Năm","pages":["p084-0.webp"]},{"id":"november-02","day":"Wednesday","dayVi":"Thứ Tư","pages":["p084-1.webp","p085-0.webp","p086-0.webp","p087-0.webp"]},{"id":"november-03","day":"Thursday","dayVi":"Thứ Năm","pages":["p088-0.webp","p089-0.webp","p090-0.webp","p091-0.webp"]},{"id":"november-04","day":"Tuesday","dayVi":"Thứ Ba","pages":["p092-0.webp","p093-0.webp","p094-0.webp","p095-0.webp","p096-0.webp","p097-0.webp"]},{"id":"november-05","day":"Saturday","dayVi":"Thứ Bảy","pages":["p097-1.webp","p098-0.webp","p099-0.webp","p100-0.webp","p101-0.webp"]},{"id":"november-06","day":"Wednesday","dayVi":"Thứ Tư","pages":["p101-1.webp","p102-0.webp"]},{"id":"november-07","day":"Thursday","dayVi":"Thứ Năm","pages":["p103-0.webp","p104-0.webp"]},{"id":"november-08","day":"Friday","dayVi":"Thứ Sáu","pages":["p104-1.webp","p105-0.webp","p106-0.webp"]},{"id":"november-09","day":"Monday","dayVi":"Thứ Hai","pages":["p107-0.webp","p108-0.webp"]},{"id":"november-10","day":"Wednesday","dayVi":"Thứ Tư","pages":["p108-1.webp","p109-0.webp"]},{"id":"november-11","day":"Friday","dayVi":"Thứ Sáu","pages":["p109-1.webp","p110-0.webp"]}]},{"id":"december","label":"Tháng 12","english":"December","entries":[{"id":"december-01","day":"Thursday","dayVi":"Thứ Năm","pages":["p111-0.webp","p112-0.webp","p113-0.webp","p114-0.webp"]},{"id":"december-02","day":"Tuesday","dayVi":"Thứ Ba","pages":["p114-1.webp","p115-0.webp","p116-0.webp","p117-0.webp","p118-0.webp","p119-0.webp","p120-0.webp","p121-0.webp"]},{"id":"december-03","day":"Wednesday","dayVi":"Thứ Tư","pages":["p122-0.webp"]},{"id":"december-04","day":"Sunday","dayVi":"Chủ Nhật","pages":["p122-1.webp","p123-0.webp","p124-0.webp","p125-0.webp","p126-0.webp","p127-0.webp"]},{"id":"december-05","day":"Thursday","dayVi":"Thứ Năm","pages":["p127-1.webp","p128-0.webp","p129-0.webp","p130-0.webp","p131-0.webp","p132-0.webp","p133-0.webp","p134-0.webp","p135-0.webp","p136-0.webp","p137-0.webp","p138-0.webp","p139-0.webp","p140-0.webp","p141-0.webp","p142-0.webp","p143-0.webp"]}]},{"id":"january","label":"Tháng 1","english":"January","entries":[{"id":"january-01","day":"Wednesday","dayVi":"Thứ Tư","pages":["p144-0.webp","p145-0.webp"]},{"id":"january-02","day":"Thursday","dayVi":"Thứ Năm","pages":["p145-1.webp","p146-0.webp","p147-0.webp"]},{"id":"january-03","day":"Friday","dayVi":"Thứ Sáu","pages":["p148-0.webp","p149-0.webp"]},{"id":"january-04","day":"Monday","dayVi":"Thứ Hai","pages":["p149-1.webp","p150-0.webp"]},{"id":"january-05","day":"Tuesday","dayVi":"Thứ Ba","pages":["p151-0.webp","p152-0.webp"]},{"id":"january-06","day":"Monday","dayVi":"Thứ Hai","pages":["p153-0.webp","p154-0.webp"]},{"id":"january-07","day":"Tuesday","dayVi":"Thứ Ba","pages":["p154-1.webp","p155-0.webp","p156-0.webp","p157-0.webp","p158-0.webp"]},{"id":"january-08","day":"Thursday","dayVi":"Thứ Năm","pages":["p158-1.webp","p159-0.webp","p160-0.webp","p161-0.webp"]},{"id":"january-09","day":"Tuesday","dayVi":"Thứ Ba","pages":["p162-0.webp","p163-0.webp"]}]},{"id":"february","label":"Tháng 2","english":"February","entries":[{"id":"february-01","day":"Wednesday","dayVi":"Thứ Tư","pages":["p164-0.webp","p165-0.webp","p166-0.webp","p167-0.webp","p168-0.webp"]},{"id":"february-02","day":"Thursday","dayVi":"Thứ Năm","pages":["p168-1.webp","p169-0.webp","p170-0.webp","p171-0.webp","p172-0.webp"]},{"id":"february-03","day":"Wednesday","dayVi":"Thứ Tư","pages":["p172-1.webp","p173-0.webp","p174-0.webp"]},{"id":"february-04","day":"Thursday","dayVi":"Thứ Năm","pages":["p175-0.webp","p176-0.webp","p177-0.webp","p178-0.webp"]},{"id":"february-05","day":"Friday","dayVi":"Thứ Sáu","pages":["p179-0.webp","p180-0.webp","p181-0.webp","p182-0.webp","p183-0.webp"]},{"id":"february-06","day":"Thursday","dayVi":"Thứ Năm","pages":["p184-0.webp","p185-0.webp","p186-0.webp"]}]},{"id":"march","label":"Tháng 3","english":"March","entries":[{"id":"march-01","day":"Wednesday","dayVi":"Thứ Tư","pages":["p187-0.webp","p188-0.webp","p189-0.webp","p190-0.webp","p191-0.webp"]},{"id":"march-02","day":"Thursday","dayVi":"Thứ Năm","pages":["p191-1.webp","p192-0.webp","p193-0.webp"]},{"id":"march-03","day":"Tuesday","dayVi":"Thứ Ba","pages":["p194-0.webp","p195-0.webp","p196-0.webp"]},{"id":"march-04","day":"Tuesday","dayVi":"Thứ Ba","pages":["p196-1.webp","p197-0.webp"]}]},{"id":"april","label":"Tháng 4","english":"April","entries":[{"id":"april-01","day":"Friday","dayVi":"Thứ Sáu","pages":["p198-0.webp","p199-0.webp","p200-0.webp","p201-0.webp","p202-0.webp","p203-0.webp"]},{"id":"april-02","day":"Monday","dayVi":"Thứ Hai","pages":["p204-0.webp","p205-0.webp","p206-0.webp","p207-0.webp","p208-0.webp"]},{"id":"april-03","day":"Wednesday","dayVi":"Thứ Tư","pages":["p208-1.webp"]}]},{"id":"may","label":"Tháng 5","english":"May","entries":[{"id":"may-01","day":"Thursday","dayVi":"Thứ Năm","pages":["p209-0.webp"]},{"id":"may-02","day":"Friday","dayVi":"Thứ Sáu","pages":["p210-0.webp","p211-0.webp"]},{"id":"may-03","day":"Wednesday","dayVi":"Thứ Tư","pages":["p212-0.webp","p213-0.webp"]},{"id":"may-04","day":"Monday","dayVi":"Thứ Hai","pages":["p214-0.webp","p215-0.webp","p216-0.webp","p217-0.webp","p218-0.webp","p219-0.webp","p220-0.webp"]},{"id":"may-05","day":"Tuesday","dayVi":"Thứ Ba","pages":["p221-0.webp","p222-0.webp","p223-0.webp"]}]},{"id":"june","label":"Tháng 6","english":"June","entries":[{"id":"june-01","day":"Friday","dayVi":"Thứ Sáu","pages":["p224-0.webp","p225-0.webp"]}]}];
