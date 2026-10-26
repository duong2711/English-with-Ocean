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
            id: 'dung-duong-school-story',
            title: 'Truyện học đường Dung và Dương',
            description: 'Hành trình học đường của Dương và Dung qua các Unit tiếng Anh lớp 6–12.',
            // Existing teacher-uploaded illustration from class 6, Unit 1.
            thumbnail_url: 'https://f005.backblazeb2.com/file/lddenglish/comics/dung-duong/g06/u03/8548dcdffaef-g06-u03-f01.webp', // Uses an uploaded illustration, not a stale placeholder.
            grades: [6, 7, 8, 9, 10, 11, 12],
            source: 'grade6-data.js … grade12-data.js / thcs_story_frames'
        }
    ]
});
