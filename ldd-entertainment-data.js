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
    // Existing first-frame thumbnails from thcs_story_frames.
    // These are URL pointers only; they do not overwrite teacher content in Supabase.
    chapter_thumbnails: {
        '6/u1': 'https://f005.backblazeb2.com/file/lddenglish/comics/g06-u01-f01.webp',
        '6/u2': 'https://f005.backblazeb2.com/file/lddenglish/comics/g06-u02-f01.webp', // Source host shows an image-not-found graphic; show a neutral fallback until replaced on B2.
        '7/u1': 'https://f005.backblazeb2.com/file/lddenglish/comics/g07-u01-f01.webp',
        '7/u2': 'https://i.ibb.co/Y4FZQpYx/1.png',
        '7/u3': 'https://i.ibb.co/MkCvxkNJ/1.png',
        '7/u4': 'https://i.ibb.co/8DKfXtHJ/1.png',
        '9/u1': 'https://i.ibb.co/hr7nvDX/P1.png',
        '9/u2': 'https://i.ibb.co/PvfDm1Fd/P1.png'
    },
    comics: [
        {
            id: 'dung-duong-school-story',
            title: 'Truyện học đường Dung và Dương',
            description: 'Hành trình học đường của Dương và Dung qua các Unit tiếng Anh lớp 6–12.',
            // Existing teacher-uploaded illustration from class 6, Unit 1.
            thumbnail_url: 'https://f005.backblazeb2.com/file/lddenglish/comics/g06-u01-f01.webp', // Avoid showing a broken imgbb cover before a verified B2 thumbnail is available.
            grades: [6, 7, 8, 9, 10, 11, 12],
            source: 'grade6-data.js … grade12-data.js / thcs_story_frames'
        }
    ]
});
