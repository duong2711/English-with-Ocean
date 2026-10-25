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
    comics: [
        {
            id: 'dung-duong-school-story',
            title: 'Truyện học đường Dung và Dương',
            description: 'Hành trình học đường của Dương và Dung qua các Unit tiếng Anh lớp 6–12.',
            thumbnail_url: '',
            grades: [6, 7, 8, 9, 10, 11, 12],
            source: 'grade6-data.js … grade12-data.js / thcs_story_frames'
        }
    ]
});
