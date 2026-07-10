document.addEventListener('DOMContentLoaded', () => {

    // --- CẤU HÌNH SUPABASE (GIỮ NGUYÊN) ---
    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co'; 
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ'; 
    const AUDIO_BUCKET_NAME = 'audio_comments'; 
    const ADMIN_PASSWORD = 'admin'; 
    // Email của (các) giảng viên — được quyền xem mọi bài dịch và để lại nhận xét.
    // ⚠️ Sửa danh sách này thành email thật của giảng viên (đúng email dùng để đăng nhập).
    // Nhớ cập nhật CÙNG danh sách này trong policy RLS ở Supabase (xem hướng dẫn SQL).
    const TEACHER_EMAILS = ['giangvien@gmail.com'];
    const { createClient } = supabase;
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // ------------------------------------------

    const symbols = document.querySelectorAll('.ipa-symbol');
    const completionIcons = document.querySelectorAll('.completion-container'); 
    
    const vimeoPlayerContainer = document.getElementById('vimeo-player-container');
    const iframeTarget = document.getElementById('iframe-target');
    const videoPlayBtn = document.getElementById('video-play-btn');
    const videoPauseBtn = document.getElementById('video-pause-btn');
    const videoPlaceholder = document.getElementById('video-placeholder');
    const guideTextElement = document.getElementById('guide-text'); 

    let mediaRecorder;
    let audioChunks = [];
    let currentSymbol = ''; 
    let recordedAudioBlob = null; 
    let currentVideoSrc = null; 

    const commentSymbolDisplay = document.getElementById('comment-symbol-display');
    const commentsList = document.getElementById('comments-list');
    const recordButton = document.getElementById('record-button');
    const stopButton = document.getElementById('stop-button');
    const sendCommentButton = document.getElementById('send-comment-button');
    const recordingPreview = document.getElementById('recording-preview');
    const recordStatus = document.getElementById('record-status');
    const commentToggleHeader = document.getElementById('comment-toggle-header');
    const commentContentWrapper = document.getElementById('comment-content-wrapper');
    const authContainer = document.getElementById('auth-container');
    const insideWrapper = document.getElementById('inside');
    const authStatus = document.getElementById('auth-status');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const ipaChart = document.querySelector('.ipa-chart'); 
    const guideDisplay = document.getElementById('guide-display'); 
    
    let currentUserId = null; 
    let currentEmail = ''; 
    let isTeacher = false; // true nếu email đăng nhập nằm trong TEACHER_EMAILS
    let holdTimer = null; // Thêm biến này

    // --- [MỚI] GHI NHỚ VỊ TRÍ ĐANG XEM + TỰ DỪNG AUDIO KHI CHUYỂN TAB ---
    const MAIN_TAB_STORAGE_KEY = 'ldd_active_main_tab';
    const IPA_SUBTAB_STORAGE_KEY = 'ldd_active_ipa_subtab';

    // Dừng toàn bộ audio (ghi âm) đang phát trên trang
    function pauseAllAudio() {
        document.querySelectorAll('audio').forEach(audioEl => {
            if (!audioEl.paused) audioEl.pause();
        });
    }

    // [MỚI] Dừng toàn bộ video YouTube đang nhúng trong trang (tab Ngữ pháp...)
    // Các iframe YouTube đã được bật enablejsapi=1 nên có thể điều khiển qua postMessage.
    function pauseAllYoutubeVideos() {
        document.querySelectorAll('iframe[src*="youtube.com/embed"]').forEach(iframe => {
            try {
                iframe.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                    '*'
                );
            } catch (e) { /* bỏ qua nếu trình duyệt chặn cross-origin */ }
        });
    }

    // [MỚI] Dừng video hướng dẫn phát âm (Vimeo) nếu đang phát
    function pauseGuideVideo() {
        try {
            if (currentVideoSrc && videoPauseBtn && !videoPauseBtn.disabled) {
                videoPauseBtn.click();
            }
        } catch (e) { /* bỏ qua nếu có lỗi */ }
    }

    // [MỚI] Dừng TẤT CẢ media (audio ghi âm + video YouTube + video Vimeo hướng dẫn)
    function pauseAllMedia() {
        pauseAllAudio();
        pauseAllYoutubeVideos();
        pauseGuideVideo();
    }

    // Khi tab trình duyệt bị chuyển đi/ẩn đi (sang tab khác, thu nhỏ, khóa máy...)
    // thì mọi audio/video đang phát sẽ tự động dừng lại.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) pauseAllMedia();
    });

    // Khôi phục tab chính (Phiên âm / Từ vựng / ...) đã xem lần trước
    function restoreActiveMainTab() {
        try {
            const savedTarget = localStorage.getItem(MAIN_TAB_STORAGE_KEY);
            if (!savedTarget) return;

            const savedBtn = document.querySelector(`.main-tab-btn[data-main-target="${savedTarget}"]`);
            const savedContent = document.getElementById(savedTarget);
            if (!savedBtn || !savedContent) return;

            document.querySelectorAll('.main-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.main-tab-content').forEach(c => c.classList.remove('active'));

            savedBtn.classList.add('active');
            savedContent.classList.add('active');
        } catch (e) { /* localStorage có thể bị chặn (chế độ ẩn danh...) - bỏ qua */ }
    }
    // --- KẾT THÚC PHẦN GHI NHỚ VỊ TRÍ ---

    // --- LOGIC XÁC THỰC (ĐĂNG NHẬP BẮT BUỘC) ---
    async function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        authStatus.textContent = 'Đang đăng nhập...';
        
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        
        if (error) {
            if (error.message.includes('Invalid login credentials')) {
                 authStatus.textContent = 'Đăng nhập thất bại: Tài khoản hoặc mật khẩu không đúng.';
            } else if (error.message.includes('Email not confirmed')) {
                 authStatus.textContent = 'Lỗi: Email chưa được xác thực. Vui lòng kiểm tra email của bạn.';
            } else {
                 authStatus.textContent = `Lỗi đăng nhập: ${error.message}`;
            }
            return;
        }

        if (data.user) {
            authStatus.textContent = `Đăng nhập thành công! Đang tải dữ liệu...`;
        }
    }

    async function handleLogout() {
        await sb.auth.signOut();
    }

    function updateCommentFormVisibility(user) {
        const commentForm = document.getElementById('new-comment-form');
        if (commentForm) {
            commentForm.style.display = user ? 'flex' : 'none';
        }
        recordStatus.textContent = user ? '' : 'Vui lòng đăng nhập để gửi ghi âm.';
    }

    /**
     * @description Cập nhật giao diện người dùng dựa trên trạng thái đăng nhập.
     * @param {object | null} user - Đối tượng người dùng Supabase
     */
    /**
/**
     * @description Cập nhật giao diện người dùng dựa trên trạng thái đăng nhập.
     * @param {object | null} user - Đối tượng người dùng Supabase
     */
    function updateUIForUser(user) {
        // [THÊM MỚI] Lấy các phần tử Menu và Tab
        const mainMenu = document.querySelector('.main-menu');
        const mainTabContents = document.querySelectorAll('.main-tab-content');

        if (user) {
            currentUserId = user.id;
            currentEmail = user.email;
            isTeacher = TEACHER_EMAILS.includes((user.email || '').toLowerCase());
            authContainer.style.display = 'none';
            if (insideWrapper) insideWrapper.style.display = 'block';
            logoutBtn.style.display = 'block';
            authStatus.textContent = `Đã đăng nhập: ${user.email} (ID: ${user.id.substring(0, 8)}...)`;
            
            // [CẬP NHẬT] Hiển thị Menu và xóa trạng thái ẩn của các Tab
            if (mainMenu) mainMenu.style.display = 'flex';
            mainTabContents.forEach(tab => tab.style.display = ''); // Để CSS tự quản lý bằng class .active
            
            // Xóa inline style cũ để CSS Grid mới tự hoạt động chuẩn xác
            if (ipaChart) ipaChart.style.display = ''; 
            if (guideDisplay) guideDisplay.style.display = ''; 

            // [MỚI] Khôi phục tab đang xem lần trước (nếu có), để khi tải lại trang
            // người dùng vẫn ở đúng nơi họ đang xem thay vì quay về tab đầu tiên.
            restoreActiveMainTab();

            // Tải trạng thái hoàn thành ngay lập tức
            loadCompletionStatus(user);

            // Làm sạch danh sách ghi âm khi mới vừa đăng nhập
            commentsList.innerHTML = '<p>Hãy chọn một ký tự IPA để bắt đầu học và gửi ghi âm.</p>';
            commentSymbolDisplay.textContent = '...';
            currentSymbol = ''; // Reset ký tự đang chọn

        } else {
            currentUserId = null;
            currentEmail = '';
            isTeacher = false;
            authContainer.style.display = 'block';
            if (insideWrapper) insideWrapper.style.display = 'none';
            logoutBtn.style.display = 'none';
            authStatus.innerText = 'Tài khoản demo: hv2@gmail.com, Mật khẩu: hv2\n\nTài khoản demo: hv3@gmail.com, Mật khẩu: hv3';

            // [CẬP NHẬT] Ẩn Menu và TOÀN BỘ các Tab khi chưa đăng nhập
            if (mainMenu) mainMenu.style.display = 'none';
            mainTabContents.forEach(tab => tab.style.display = 'none');

            ipaChart.style.display = 'none'; 
            guideDisplay.style.display = 'none'; 
            hideVideoAndShowPlaceholder();
            pauseAllAudio(); // [MỚI] Dừng audio đang phát khi đăng xuất
            pauseAllYoutubeVideos(); // [MỚI] Dừng video YouTube (nếu có) khi đăng xuất
            
            // Xóa trạng thái hoàn thành trên giao diện khi đăng xuất
            symbols.forEach(symbolElement => {
                symbolElement.classList.remove('completed');
                const iconElement = symbolElement.querySelector('.completion-status-icon');
                if (iconElement) iconElement.textContent = '☐';
            });

            // Dọn sạch dữ liệu ghi âm cũ trên màn hình khi đăng xuất
            commentsList.innerHTML = '';
            commentSymbolDisplay.textContent = '...';
            currentSymbol = ''; 
        }
        
        updateCommentFormVisibility(user); 
    }

    /**
     * @description Lắng nghe sự thay đổi trạng thái xác thực để cập nhật giao diện.
     * (Đây là cách Supabase khuyến nghị để kiểm tra session khi tải trang/refresh)
     */
    sb.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
             updateUIForUser(session?.user);
        }
    });

    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);

    // --- KẾT THÚC LOGIC XÁC THỰC ---


    // [HÀM VIDEO CŨ] 
    function buildVimeoUrl(src, autoplay = '1') {
        if (!src) return null;
        
        const baseUrl = src.split('?')[0];
        const urlParams = new URLSearchParams(src.split('?')[1]);
        const hParam = urlParams.get('h');

        const videoUrl = new URL(baseUrl);
        if (hParam) {
             videoUrl.searchParams.set('h', hParam);
        }

        videoUrl.searchParams.set('loop', '1');
        videoUrl.searchParams.set('autoplay', autoplay); 
        videoUrl.searchParams.set('controls', '0');
        videoUrl.searchParams.set('title', '0');    
        videoUrl.searchParams.set('byline', '0'); 
        videoUrl.searchParams.set('api', '1');          
        videoUrl.searchParams.set('player_id', 'vimeo-ifr'); 
        
        return videoUrl.href;
    }

    function loadOrUpdateIframe(src, autoplay = '1') {
        if (!src) return;
        
        const finalUrl = buildVimeoUrl(src, autoplay);
        
        let iframe = iframeTarget.querySelector('iframe');
        
        if (!iframe) {
            iframeTarget.innerHTML = ''; 
            iframe = document.createElement('iframe');
            iframe.title = "Video hướng dẫn";
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; fullscreen; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            iframeTarget.appendChild(iframe);
        }
        
        iframe.src = finalUrl;
    }

    function hideVideoAndShowPlaceholder() {
        let iframe = iframeTarget.querySelector('iframe');
        if (iframe && currentVideoSrc) {
            iframe.src = buildVimeoUrl(currentVideoSrc, '0'); 
        } else {
             iframeTarget.innerHTML = '';
        }
        
        iframeTarget.appendChild(videoPlaceholder);
        vimeoPlayerContainer.classList.add('video-hidden');
    }

    videoPlayBtn.addEventListener('click', () => {
        if (currentVideoSrc) {
            vimeoPlayerContainer.classList.remove('video-hidden'); 
            loadOrUpdateIframe(currentVideoSrc, '1'); 
            videoPlayBtn.disabled = true;
            videoPauseBtn.disabled = false;
            videoPlaceholder.style.display = 'none'; 
        }
    });
    
    videoPauseBtn.addEventListener('click', () => {
        if (currentVideoSrc) {
            vimeoPlayerContainer.classList.remove('video-hidden'); 
            loadOrUpdateIframe(currentVideoSrc, '0'); 
            videoPlayBtn.disabled = false;
            videoPauseBtn.disabled = true;
            videoPlaceholder.style.display = 'block'; 
        }
    });

    videoPlayBtn.disabled = true;
    videoPauseBtn.disabled = true;
    vimeoPlayerContainer.classList.add('video-hidden');

    function getSafeSymbolName(symbol) {
        let safeName = symbol.replace(/:/g, 'L');
        
        safeName = safeName.replace(/ʃ/g, 'sh');
        safeName = safeName.replace(/ʒ/g, 'zh');
        safeName = safeName.replace(/θ/g, 'th');
        safeName = safeName.replace(/ð/g, 'dh');
        safeName = safeName.replace(/ŋ/g, 'ng');
        safeName = safeName.replace(/tʃ/g, 'ch');
        safeName = safeName.replace(/dʒ/g, 'j');
        safeName = safeName.replace(/ʌ/g, 'A');
        safeName = safeName.replace(/ə/g, 'schwa');
        safeName = safeName.replace(/ɪ/g, 'I'); 
        safeName = safeName.replace(/ʊ/g, 'U'); 
        safeName = safeName.replace(/ɜ/g, 'er');
        safeName = safeName.replace(/ɔ/g, 'aw');
        safeName = safeName.replace(/æ/g, 'aE');
        safeName = safeName.replace(/ɑ/g, 'aLong');
        safeName = safeName.replace(/ɒ/g, 'oShort');
        safeName = safeName.replace(/\//g, '');
        safeName = safeName.replace(/ /g, '_');
        return safeName;
    }


    symbols.forEach(symbol => {
        symbol.addEventListener('click', () => {
            
            if (ipaChart.style.display === 'none') {
                 alert("Vui lòng đăng nhập để xem hướng dẫn phát âm.");
                 return;
            }

            // [MỚI] Dừng audio đang phát khi chuyển sang ký tự khác
            pauseAllAudio();

            const videoSrc = symbol.dataset.videoSrc;
            currentVideoSrc = videoSrc; 
            
            const guideText = symbol.dataset.guide;

            if (videoSrc) {
                vimeoPlayerContainer.classList.remove('video-hidden');
                loadOrUpdateIframe(currentVideoSrc, '1'); 
                videoPlaceholder.style.display = 'none'; 
                
                videoPlayBtn.disabled = true; 
                videoPauseBtn.disabled = false;
                
                guideTextElement.textContent = guideText || "Chưa có hướng dẫn cho ký tự này.";
                
            } else {
                hideVideoAndShowPlaceholder(); 
                guideTextElement.textContent = guideText || "Chưa có hướng dẫn cho ký tự này.";
                
                videoPlayBtn.disabled = true; 
                videoPauseBtn.disabled = true;
            }

            symbols.forEach(s => s.classList.remove('active'));
            symbol.classList.add('active');
            
            const originalSymbol = symbol.dataset.symbol; 
            currentSymbol = originalSymbol; 
            commentSymbolDisplay.textContent = originalSymbol;
            
            commentToggleHeader.classList.remove('collapsed');
            commentContentWrapper.classList.remove('collapsed');

            loadComments(currentSymbol); 
            resetCommentForm();
            
            // [BỔ SUNG] Chức năng cuộn lên đầu khu vực hướng dẫn cho điện thoại
            if (window.innerWidth < 768) {
                const guideDisplay = document.getElementById('guide-display');
                if (guideDisplay) {
                    guideDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    commentToggleHeader.addEventListener('click', () => {
        commentToggleHeader.classList.toggle('collapsed');
        commentContentWrapper.classList.toggle('collapsed');
    });
// --- LOGIC CHUYỂN MAIN TABS (MENU CHÍNH) ---
    const mainTabBtns = document.querySelectorAll('.main-tab-btn');
    const mainTabContents = document.querySelectorAll('.main-tab-content');

    mainTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // [MỚI] Dừng mọi audio/video (ghi âm, YouTube, Vimeo) trước khi chuyển sang tab khác
            pauseAllMedia();

            // Xóa class active của tất cả các nút và nội dung
            mainTabBtns.forEach(b => b.classList.remove('active'));
            mainTabContents.forEach(c => c.classList.remove('active'));

            // Thêm class active cho nút vừa click
            btn.classList.add('active');
            
            // Tìm và hiển thị nội dung tab tương ứng
            const targetId = btn.getAttribute('data-main-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // [MỚI] Ghi nhớ tab đang chọn để khôi phục khi tải lại trang
            try {
                localStorage.setItem(MAIN_TAB_STORAGE_KEY, targetId);
            } catch (e) { /* bỏ qua nếu localStorage bị chặn */ }
        });
    });
    // --- KẾT THÚC LOGIC CHUYỂN MAIN TABS ---
    // --- LOGIC HOÀN THÀNH KÝ TỰ ---
    
async function loadCompletionStatus(user) {
        if (!user) {
            symbols.forEach(symbolElement => {
                symbolElement.classList.remove('completed', 'submitted');
                const iconElement = symbolElement.querySelector('.completion-status-icon');
                if (iconElement) iconElement.textContent = '☐';
            });
            return;
        }
        
        const userId = user.id;

        try {
            // 1. Lấy dữ liệu các âm ĐÃ TICK
            const { data: completions, error: err1 } = await sb
                .from('ipa_completions')
                .select('symbol, completed')
                .eq('user_id', userId);
            if (err1) throw err1;

            // 2. Lấy dữ liệu các âm ĐÃ NỘP GHI ÂM
            const { data: submittedAudio, error: err2 } = await sb
                .from('comments')
                .select('symbol')
                .eq('user_id', userId);
            if (err2) throw err2;

            // Chuyển danh sách ghi âm thành mảng ký tự
            const submittedSymbols = submittedAudio.map(item => item.symbol);

            symbols.forEach(symbolElement => {
                const ipaKey = symbolElement.dataset.symbol;
                const matchCompletion = completions.find(item => item.symbol === ipaKey && item.completed);
                const hasSubmitted = submittedSymbols.includes(ipaKey);
                const iconElement = symbolElement.querySelector('.completion-status-icon');

                // Reset toàn bộ class và icon
                symbolElement.classList.remove('completed', 'submitted');
                if (iconElement) iconElement.textContent = '☐';
                
                // Áp dụng trạng thái
                if (matchCompletion) {
                    // Nếu đã tick -> Màu xanh dương (class completed)
                    symbolElement.classList.add('completed');
                    if (iconElement) iconElement.textContent = '✔';
                } else if (hasSubmitted) {
                    // Nếu chưa tick NHƯNG đã nộp ghi âm -> Màu vàng (class submitted)
                    symbolElement.classList.add('submitted');
                }
            });

        } catch (e) {
            console.error('Lỗi khi tải trạng thái (Tick/Vàng):', e);
        }
    }

    async function saveCompletionStatus(symbol, isCompleted) {
        const userId = currentUserId; 
        
        if (!userId) {
            alert("Vui lòng đăng nhập để đánh dấu hoàn thành!");
            return;
        }
        
        const statusData = {
            user_id: userId,
            symbol: symbol,
            completed: isCompleted,
            updated_at: new Date().toISOString()
        };

        try {
            const { error } = await sb
                .from('ipa_completions')
                .upsert(statusData, { onConflict: 'user_id, symbol' }); 

            if (error) {
                console.error('Lỗi khi lưu trạng thái hoàn thành vào Supabase (Kiểm tra chính sách RLS UPDATE/INSERT trên ipa_completions):', error);
            }
        } catch (e) {
            console.error('Lỗi ngoại lệ khi lưu trạng thái hoàn thành:', e);
        }
    }

function toggleCompletion(symbolElement) {
        const ipaKey = symbolElement.dataset.symbol;
        const icon = symbolElement.querySelector('.completion-status-icon');
        
        if (!currentUserId) {
            alert("Vui lòng đăng nhập để đánh dấu hoàn thành!");
            return;
        }
        
        const isCompleted = symbolElement.classList.contains('completed');
        const newCompletedState = !isCompleted;
        
        if (newCompletedState) {
            symbolElement.classList.add('completed');
            symbolElement.classList.remove('submitted'); // Đã tick thì bỏ màu vàng đi
            if (icon) icon.textContent = '✔';
        } else {
            symbolElement.classList.remove('completed');
            if (icon) icon.textContent = '☐';
        }
        
        saveCompletionStatus(ipaKey, newCompletedState);
    }
    completionIcons.forEach(iconContainer => {
        
        const parentSymbol = iconContainer.closest('.ipa-symbol');
        if (!parentSymbol) return;

        // Bắt đầu giữ chuột
        iconContainer.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            
            // Clear bất kỳ timer cũ nào nếu có lỗi
            if (holdTimer) clearTimeout(holdTimer);

            // Thiết lập timer 3 giây (3000ms)
            holdTimer = setTimeout(() => {
                holdTimer = null; // Reset timer sau khi kích hoạt
                
                // Kích hoạt logic hoàn thành chỉ khi giữ đủ 3 giây
                toggleCompletion(parentSymbol);
                
                // Tạm thời vô hiệu hóa con trỏ để tránh kích hoạt lại ngay lập tức
                iconContainer.style.pointerEvents = 'none';
                setTimeout(() => {
                    iconContainer.style.pointerEvents = 'auto';
                }, 500); // 0.5 giây chờ để tránh double-click/nhả chuột nhanh
                
            }, 3000); // 3 giây
        });

        // Nhả chuột (ngắt quá trình giữ)
        iconContainer.addEventListener('mouseup', (e) => {
            e.stopPropagation();
            if (holdTimer) {
                clearTimeout(holdTimer);
                holdTimer = null;
            }
        });

        // Rê chuột ra khỏi khu vực (ngắt quá trình giữ)
        iconContainer.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            if (holdTimer) {
                clearTimeout(holdTimer);
                holdTimer = null;
            }
        });
    });

    // --- CÁC HÀM XỬ LÝ GHI ÂM/SUPABASE ---

    // 1. BẮT ĐẦU GHI ÂM
    recordButton.addEventListener('click', async () => {
        if (!currentUserId) {
             alert("Vui lòng đăng nhập để gửi ghi âm.");
             return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = event => audioChunks.push(event.data);

            mediaRecorder.onstop = () => {
                recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' }); 
                const audioUrl = URL.createObjectURL(recordedAudioBlob);
                recordingPreview.src = audioUrl; 
                recordingPreview.style.display = 'block';

                recordButton.disabled = false;
                stopButton.disabled = true;
                sendCommentButton.disabled = false;
                recordStatus.textContent = "Sẵn sàng để gửi! Bạn có thể nghe thử ở trên.";
            };

            audioChunks = []; 
            recordedAudioBlob = null;
            mediaRecorder.start();

            recordButton.disabled = true;
            stopButton.disabled = false;
            sendCommentButton.disabled = true;
            recordingPreview.style.display = 'none';
            recordStatus.textContent = "🔴 Đang ghi âm... Bấm 'Dừng' khi xong.";

        } catch (err) {
            console.error("Lỗi khi lấy micro:", err);
            recordStatus.textContent = "Không thể truy cập micro. Vui lòng cho phép quyền truy cập.";
        }
    });

    // 2. DỪNG GHI ÂM
    stopButton.addEventListener('click', () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
    });

    // 3. GỬI ghi âm VÀ UPLOAD
    sendCommentButton.addEventListener('click', async () => {
        if (!currentUserId) {
            alert("Vui lòng đăng nhập để gửi ghi âm.");
            return;
        }
        
        if (!recordedAudioBlob) {
            alert("Bạn chưa ghi âm.");
            return;
        }

        const MAX_FILE_SIZE_BYTES = 500 * 1024; 
        
        if (recordedAudioBlob.size > MAX_FILE_SIZE_BYTES) {
            alert(`File ghi âm quá lớn (${(recordedAudioBlob.size / 1024).toFixed(1)} KB). Kích thước tối đa là 500 KB.`);
            recordStatus.textContent = "❌ File quá lớn. Vui lòng ghi âm ngắn hơn.";
            sendCommentButton.disabled = false;
            return;
        }

        sendCommentButton.disabled = true;
        recordStatus.textContent = "Đang tải lên Supabase, vui lòng chờ...";
        let audioURL = null;
        let audioPath = null;
        
        const safeSymbolName = getSafeSymbolName(currentSymbol); 

        try {
            const uniqueFileName = `${currentUserId.substring(0, 8)}_${Date.now()}.webm`; 
            audioPath = `${safeSymbolName}/${uniqueFileName}`; 
            
            // 1. Tải file lên Storage
            const { error: uploadError } = await sb.storage
                .from(AUDIO_BUCKET_NAME)
                .upload(audioPath, recordedAudioBlob, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // Lấy URL công khai
            const supabaseRef = SUPABASE_URL.split('://')[1].split('.')[0]; 
            audioURL = `https://${supabaseRef}.supabase.co/storage/v1/object/public/${AUDIO_BUCKET_NAME}/${audioPath}`;

            if (!audioURL || audioURL.includes('null')) {
                throw new Error("Lỗi: Không thể xây dựng URL hợp lệ.");
            }

            // 2. Chèn URL vào DB
            const { error: dbError } = await sb
                .from('comments')
                .insert([
                    { 
                        symbol: currentSymbol, 
                        audio_url: audioURL,
                        user_id: currentUserId, 
                        created_at: new Date().toISOString()
                    }
                ]);

            if (dbError) throw dbError;

            recordStatus.textContent = "Gửi thành công!";
            resetCommentForm();
            loadComments(currentSymbol); 

            // [THÊM MỚI] Đổi màu vàng nhạt nếu chưa được tick hoàn thành
            const activeSymbolEl = document.querySelector(`.ipa-symbol[data-symbol="${currentSymbol}"]`);
            if (activeSymbolEl && !activeSymbolEl.classList.contains('completed')) {
                activeSymbolEl.classList.add('submitted');
            }

        } catch (err) {
            console.error("Lỗi khi gửi ghi âm (Kiểm tra RLS INSERT và cột user_id trên comments):", err.message);
            recordStatus.textContent = `Gửi thất bại: ${err.message}`;
            sendCommentButton.disabled = false; 
            
            if (audioPath) {
                 sb.storage.from(AUDIO_BUCKET_NAME).remove([audioPath]);
            }
        }
    });

    // 4. HÀM TẢI ghi âm TỪ SUPABASE (Đã bỏ chặn kiểm tra đăng nhập)
    async function loadComments(symbol) {
        
        if (!symbol) return; 

        commentsList.innerHTML = 'Đang tải ghi âm...'; 
        
        // Hiển thị cảnh báo gửi, nhưng vẫn cho phép tải
        if (!currentUserId) {
            commentsList.innerHTML = '<p>Ghi âm đang tải (Vui lòng đăng nhập để gửi).</p>';
        }

        try {
            const { data, error } = await sb
                .from('comments')
                .select('*')
                .eq('symbol', symbol)
                .order('created_at', { ascending: false }); 
            
            if (error) throw error;
            
            commentsList.innerHTML = ''; 
            
            if (data.length === 0) {
                commentsList.innerHTML = '<p>Chưa có ghi âm nào. Practice makes perfect</p>';
                return;
            }

            data.forEach(comment => {
                displayComment(comment);
            });

        } catch (err) {
            console.error("Lỗi khi tải ghi âm:", err.message);
            commentsList.innerHTML = '<p>Không thể tải ghi âm. Kiểm tra RLS SELECT trên comments.</p>';
        }
    }

    // 5. HÀM HIỂN THỊ 1 ghi âm (Đã kiểm tra URL)
    function displayComment(data) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';

        const senderInfo = document.createElement('div');
        senderInfo.className = 'comment-sender';
        
        let senderDisplay = 'Ẩn danh';
        if (data.user_id) {
             senderDisplay = `Người dùng: ID ${data.user_id.substring(0, 8)}...`; 
        }
        senderInfo.textContent = senderDisplay;
        commentDiv.appendChild(senderInfo);


        if (data.text && data.text.trim() !== "") {
            const textEl = document.createElement('p');
            textEl.textContent = data.text;
            commentDiv.appendChild(textEl);
        }

        // [QUAN TRỌNG] Logic hiển thị audio
        if (data.audio_url) {
            const audioEl = document.createElement('audio');
            audioEl.controls = true;
            audioEl.src = data.audio_url; 
            
            // Kiểm tra URL có bị hỏng không (tùy chọn)
            if (data.audio_url.length > 5) {
                commentDiv.appendChild(audioEl);
            } else {
                 // Ghi nhận lỗi hiển thị audio
                 const errorEl = document.createElement('div');
                 errorEl.textContent = "(Lỗi: URL ghi âm bị hỏng)";
                 errorEl.style.color = 'red';
                 commentDiv.appendChild(errorEl);
            }
        }

        if (data.created_at) { 
            const timeEl = document.createElement('div');
            timeEl.className = 'comment-timestamp';
            timeEl.textContent = new Date(data.created_at).toLocaleString("vi-VN");
            commentDiv.appendChild(timeEl);
        }

        if (data.audio_url || (data.text && data.text.trim() !== "")) {
             commentsList.appendChild(commentDiv);
        }
    }

    // 6. HÀM RESET FORM
    function resetCommentForm() {
        recordingPreview.style.display = 'none';
        recordingPreview.src = '';
        recordStatus.textContent = '';
        
        audioChunks = [];
        recordedAudioBlob = null;
        
        recordButton.disabled = false;
        stopButton.disabled = true;
        sendCommentButton.disabled = true; 
    }
    
    // --- KHỞI TẠO VÀ TẢI TRẠNG THÁI NGAY LẬP TỨC ---
    // Giữ lại hàm initialLoad nhưng đảm bảo nó được gọi.
    async function initialLoad() {
        const { data: { session } } = await sb.auth.getSession();
        updateUIForUser(session?.user);
    }

    // --- LOGIC TAB/SWIPE NGANG (MOBILE) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const ipaTabsContainer = document.querySelector('.ipa-tabs-container');
    const ipaTabContents = document.querySelectorAll('.ipa-tab-content');

    function activateTab(targetId) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        ipaTabContents.forEach(content => content.classList.remove('active'));

        const activeButton = document.querySelector(`.tab-button[data-target="${targetId}"]`);
        const activeContent = document.getElementById(targetId);

        if (activeButton) activeButton.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
        
        // Cuộn ngang container để hiển thị tab tương ứng (Dùng scrollLeft cho hiệu ứng)
        const contentIndex = Array.from(ipaTabContents).findIndex(el => el.id === targetId);
        if (contentIndex !== -1) {
            ipaTabsContainer.scrollLeft = contentIndex * ipaTabsContainer.clientWidth;
        }

        // [MỚI] Ghi nhớ mục đang xem để khôi phục khi tải lại trang
        try {
            localStorage.setItem(IPA_SUBTAB_STORAGE_KEY, targetId);
        } catch (e) { /* bỏ qua nếu localStorage bị chặn */ }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // [MỚI] Dừng mọi audio/video (ghi âm, video hướng dẫn) trước khi chuyển mục
            pauseAllMedia();
            const targetId = e.target.dataset.target;
            activateTab(targetId);
        });
    });
    
    // [CẬP NHẬT] Khôi phục đúng mục đã xem lần trước khi tải lại trang
    // (mặc định là "Nguyên âm đơn" nếu chưa từng chọn)
    let savedIpaSubtab = 'monophthongs';
    try {
        savedIpaSubtab = localStorage.getItem(IPA_SUBTAB_STORAGE_KEY) || 'monophthongs';
    } catch (e) { /* bỏ qua nếu localStorage bị chặn */ }
    activateTab(savedIpaSubtab);
    
    // Chú ý: Hàm loadCompletionStatus đã được cập nhật logic ở trên không cần thay đổi thêm gì.

    // --- KẾT THÚC LOGIC TAB/SWIPE NGANG ---
    // Gọi hàm initialLoad để kiểm tra session ngay khi DOMContentLoaded
// --- LỊCH HỌC: biến và logic nằm thẳng trong DOMContentLoaded đầu tiên ---
    let isAdmin = false;
    let isDragging = false;
    let dragMode = null;

    // Mở khóa admin
    window.xuLyMoKhoa = function() {
        if (isAdmin) { alert("Bảng đã được mở khóa rồi!"); return; }
        const pass = prompt("Nhập mật khẩu Admin để chỉnh sửa:");
        if (pass === "admin") {
            isAdmin = true;
            const grid = document.getElementById('schedule-grid');
            const badge = document.getElementById('status-badge');
            if (grid) grid.classList.remove('locked');
            if (badge) { badge.textContent = "ĐANG CHẾ ĐỘ CHỈNH SỬA"; badge.className = "status-badge unlocked-msg"; }
            alert("Đã mở khóa! Kéo để chọn nhiều ô.");
        } else if (pass !== null) {
            alert("Sai mật khẩu!");
        }
    };

    // Lưu lịch
    window.xuLyLuuLich = async function() {
        if (!isAdmin) { alert("Vui lòng mở khóa trước!"); return; }
        const availableSlots = Array.from(document.querySelectorAll('.slot.available')).map(el => ({
            day: el.dataset.day, time: el.dataset.time
        }));
        const { error } = await sb.from('schedule_data').upsert({ id: 1, slots: availableSlots });
        if (error) alert("Lỗi lưu: " + error.message);
        else alert("Đã lưu lịch thành công!");
    };

    // Tạo bảng lịch
    (function buildSchedule() {
        const grid = document.getElementById('schedule-grid');
        if (!grid) return;

        // Xóa các ô cũ nếu inline script HTML đã tạo trước
        Array.from(grid.querySelectorAll('.slot, .time-cell')).forEach(el => el.remove());

        for (let h = 5; h <= 23; h++) {
            for (let m = 0; m < 60; m += 30) {
                const time = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
                const tc = document.createElement('div');
                tc.className = 'time-cell';
                tc.textContent = time;
                grid.appendChild(tc);
                for (let d = 0; d < 7; d++) {
                    const slot = document.createElement('div');
                    slot.className = 'slot';
                    slot.dataset.day = d;
                    slot.dataset.time = time;
                    grid.appendChild(slot);
                }
            }
        }

        function paint(el) {
            if (!isAdmin || !el || !el.classList.contains('slot')) return;
            if (dragMode === 'add') el.classList.add('available');
            else if (dragMode === 'remove') el.classList.remove('available');
        }

        // Mouse drag
        grid.addEventListener('dragstart', e => e.preventDefault());
        grid.addEventListener('mousedown', e => {
            if (!isAdmin || !e.target.classList.contains('slot')) return;
            e.preventDefault();
            isDragging = true;
            dragMode = e.target.classList.contains('available') ? 'remove' : 'add';
            paint(e.target);
        });
        window.addEventListener('mousemove', e => {
            if (!isDragging) return;
            paint(document.elementFromPoint(e.clientX, e.clientY));
        });
        window.addEventListener('mouseup', () => { isDragging = false; dragMode = null; });

        // Touch drag
        grid.addEventListener('touchstart', e => {
            if (!isAdmin) return;
            const t = e.touches[0];
            const el = document.elementFromPoint(t.clientX, t.clientY);
            if (!el || !el.classList.contains('slot')) return;
            e.preventDefault();
            isDragging = true;
            dragMode = el.classList.contains('available') ? 'remove' : 'add';
            paint(el);
        }, { passive: false });
        grid.addEventListener('touchmove', e => {
            if (!isDragging) return;
            e.preventDefault();
            const t = e.touches[0];
            paint(document.elementFromPoint(t.clientX, t.clientY));
        }, { passive: false });
        grid.addEventListener('touchend', () => { isDragging = false; dragMode = null; });

        // Tải dữ liệu
        sb.from('schedule_data').select('slots').eq('id', 1).single().then(({ data }) => {
            if (data && data.slots) {
                data.slots.forEach(s => {
                    const el = grid.querySelector(`.slot[data-day="${s.day}"][data-time="${s.time}"]`);
                    if (el) el.classList.add('available');
                });
            }
        });
    })();
// --- XỬ LÝ MỞ TRANG WEB TỪ VỰNG TRONG TAB KIỂM TRA (MỞ TAB MỚI) ---
    const vocabTestFolder = document.getElementById('vocab-test-folder');

    if (vocabTestFolder) {
        vocabTestFolder.addEventListener('click', () => {
            // Mở trang web trong một tab mới hoàn toàn mượt mà
            window.open("https://www.testlanguages.com/", "_blank");
        });
    }

    // ===== LOGIC TIN NGẮN (NEWS) =====
    (function initNewsTab() {
        // Dữ liệu tin tức mẫu
        // Helper: format date từ "YYYY-MM-DD" → "29 tháng 6, 2026"
        function formatDate(isoDate) {
            const [y, m, d] = isoDate.split('-').map(Number);
            const months = ['tháng 1','tháng 2','tháng 3','tháng 4','tháng 5','tháng 6',
                            'tháng 7','tháng 8','tháng 9','tháng 10','tháng 11','tháng 12'];
            return `${d} ${months[m - 1]}, ${y}`;
        }

        // Dữ liệu tin tức giờ được tải động từ bảng "news_articles" trên Supabase
        // (xem file SQL "news_articles_setup.sql" để tạo bảng + chèn 6 bài mẫu ban đầu).
        // Chỉ tài khoản trong TEACHER_EMAILS (giangvien@gmail.com) mới có quyền
        // thêm / sửa / xóa — quyền này được chặn ở CẢ giao diện lẫn RLS trên Supabase.
        let NEWS_DATA = [];

        // Tải toàn bộ danh sách tin tức từ Supabase
        async function loadNewsArticlesFromDB() {
            try {
                const { data, error } = await sb
                    .from('news_articles')
                    .select('*')
                    .order('date', { ascending: false })
                    .order('id', { ascending: false });
                if (error) throw error;
                NEWS_DATA = (data || []).map(row => ({
                    id: row.id,
                    date: row.date,
                    title: row.title,
                    thumb: row.thumb,
                    content: row.content,
                    quiz: Array.isArray(row.quiz) ? row.quiz : []
                }));
            } catch (err) {
                console.error('Lỗi khi tải danh sách tin tức:', err.message);
                NEWS_DATA = [];
            }
        }

        // Tạo 1 bài tin mới (rỗng, sẵn sàng để giảng viên chỉnh sửa) — chỉ giảng viên được gọi
        async function createNewsArticleDB() {
            const todayIso = new Date().toISOString().slice(0, 10);
            const payload = {
                date: todayIso,
                title: 'Bài viết mới (bấm vào tiêu đề để đổi tên)',
                thumb: 'https://placehold.co/400x225.jpg?text=Dan+link+anh+.jpg',
                content: '<p>Nhập nội dung bài viết tại đây...</p>',
                quiz: [
                    { q: 'Câu hỏi 1?', options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'], answer: 0 },
                    { q: 'Câu hỏi 2?', options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'], answer: 0 },
                    { q: 'Câu hỏi 3?', options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'], answer: 0 }
                ],
                created_by: currentEmail
            };
            const { data, error } = await sb
                .from('news_articles')
                .insert(payload)
                .select()
                .single();
            if (error) throw error;
            return {
                id: data.id,
                date: data.date,
                title: data.title,
                thumb: data.thumb,
                content: data.content,
                quiz: Array.isArray(data.quiz) ? data.quiz : []
            };
        }

        // Cập nhật 1 hoặc nhiều trường của 1 bài tin — dùng cho autosave từng phần
        async function updateNewsArticleDB(articleId, fields) {
            const payload = { ...fields, updated_at: new Date().toISOString(), updated_by: currentEmail };
            const { error } = await sb
                .from('news_articles')
                .update(payload)
                .eq('id', articleId);
            if (error) throw error;
        }

        // Xóa 1 bài tin
        async function deleteNewsArticleDB(articleId) {
            const { error } = await sb
                .from('news_articles')
                .delete()
                .eq('id', articleId);
            if (error) throw error;
        }

        const newsFolderCard  = document.getElementById('news-folder-card');
        const vocabFolderGrid = document.getElementById('vocab-folder-grid');
        const newsPanel       = document.getElementById('news-panel');
        const newsBackBtn     = document.getElementById('news-back-btn');
        const newsCardsGrid   = document.getElementById('news-cards-grid');
        const newsArticlePanel     = document.getElementById('news-article-panel');
        const newsArticleBackBtn   = document.getElementById('news-article-back-btn');
        const newsArticleTitle     = document.getElementById('news-article-title');
        const newsArticleImg       = document.getElementById('news-article-img');
        const newsArticleText      = document.getElementById('news-article-text');
        const newsQuizSection      = document.getElementById('news-quiz-section');
        const newsQuizQuestions    = document.getElementById('news-quiz-questions');
        const newsQuizSubmit       = document.getElementById('news-quiz-submit');
        const newsQuizResult       = document.getElementById('news-quiz-result');

        // --- Refs cho khu vực quản trị tin tức (chỉ giảng viên) ---
        const newsAdminBar         = document.getElementById('news-admin-bar');
        const newsAddBtn           = document.getElementById('news-add-btn');
        const newsArticleDeleteBtn = document.getElementById('news-article-delete-btn');
        const newsArticleDateEdit  = document.getElementById('news-article-date-edit');
        const newsEditMetaStatus   = document.getElementById('news-edit-meta-status');
        const newsEditImageBar     = document.getElementById('news-edit-image-bar');
        const newsEditImageInput   = document.getElementById('news-edit-image-input');
        const newsEditImageBtn     = document.getElementById('news-edit-image-btn');
        const newsEditToolbar      = document.getElementById('news-edit-toolbar');
        const newsEditBoldBtn      = document.getElementById('news-edit-bold-btn');
        const newsEditContentStatus = document.getElementById('news-edit-content-status');
        const newsQuizEditSection  = document.getElementById('news-quiz-edit-section');
        const newsQuizEditQuestions = document.getElementById('news-quiz-edit-questions');
        const newsQuizEditStatus   = document.getElementById('news-quiz-edit-status');

        // --- Cấu hình AI: dùng 2 provider (Gemini -> Mistral) để tự dịch từng câu
        // + đặt câu hỏi + tra từ. Vì trang này chạy hoàn toàn phía trình duyệt
        // (không có server riêng) nên các key sẽ hiển thị công khai trong mã
        // nguồn — giống cách đang dùng PIXABAY_API_KEY ở trên.
        // Chỉ dùng key MIỄN PHÍ (free tier), không dán key có gắn thẻ thanh toán.
        //
        // Vì sao dùng 2 provider thay vì 1: mỗi provider có quota miễn phí riêng
        // (theo phút/theo ngày). Khi Gemini báo lỗi (vd hết quota, lỗi 429, mất
        // mạng...), hệ thống tự động thử Mistral thay vì báo lỗi ngay cho học
        // viên. Chỉ khi CẢ 2 provider đều lỗi thì mới thật sự báo lỗi.
        //
        // - Gemini:  lấy key MIỄN PHÍ tại https://aistudio.google.com/apikey
        // - Mistral: lấy key MIỄN PHÍ (gói "Experiment") tại https://console.mistral.ai
        const GEMINI_API_KEY  = 'AQ.Ab8RN6KkxLevhsTgNNIHs016D87KBSifdDDjs_mX_LyQgUiyJQ';
        const GEMINI_MODEL    = 'gemini-2.5-flash';

        const MISTRAL_API_KEY = 'ddkIaJqJgZVLPxprrF3ESBpYegqfEbqt';
        const MISTRAL_MODEL   = 'mistral-small-latest';

        function geminiConfigured() {
            return !!GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE';
        }
        function mistralConfigured() {
            return !!MISTRAL_API_KEY && MISTRAL_API_KEY !== 'YOUR_MISTRAL_API_KEY_HERE';
        }
        // Còn ít nhất 1 trong 2 provider được cấu hình thì tính năng AI vẫn dùng được
        function aiConfigured() {
            return geminiConfigured() || mistralConfigured();
        }

        async function callGeminiJSON(prompt) {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: 'application/json', temperature: 0.4 }
                })
            });
            if (!res.ok) {
                const errText = await res.text().catch(() => '');
                throw new Error('Gemini API lỗi (' + res.status + '): ' + errText.slice(0, 200));
            }
            const data = await res.json();
            const parts = (data && data.candidates && data.candidates[0] &&
                data.candidates[0].content && data.candidates[0].content.parts) || [];
            const text = parts.map(p => p.text || '').join('');
            const cleaned = text.replace(/```json|```/g, '').trim();
            return JSON.parse(cleaned);
        }

        // Mistral dùng API dạng OpenAI-compatible (chat/completions), có hỗ trợ
        // response_format json_object để buộc trả về JSON hợp lệ.
        async function callMistralJSON(prompt) {
            const url = 'https://api.mistral.ai/v1/chat/completions';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + MISTRAL_API_KEY
                },
                body: JSON.stringify({
                    model: MISTRAL_MODEL,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.4,
                    response_format: { type: 'json_object' }
                })
            });
            if (!res.ok) {
                const errText = await res.text().catch(() => '');
                throw new Error('Mistral API lỗi (' + res.status + '): ' + errText.slice(0, 200));
            }
            const data = await res.json();
            const text = (data && data.choices && data.choices[0] &&
                data.choices[0].message && data.choices[0].message.content) || '';
            const cleaned = text.replace(/```json|```/g, '').trim();
            return JSON.parse(cleaned);
        }

        // Gọi AI theo thứ tự ưu tiên: Gemini -> Mistral. Nếu provider hiện tại
        // lỗi (hết quota/429, mất mạng, key sai...) thì tự động thử provider kế
        // tiếp — học viên hầu như không nhận ra có sự cố, trừ khi CẢ 2 đều lỗi.
        async function callAIJSON(prompt) {
            const providers = [];
            if (geminiConfigured())  providers.push({ name: 'Gemini',  fn: callGeminiJSON });
            if (mistralConfigured()) providers.push({ name: 'Mistral', fn: callMistralJSON });

            if (providers.length === 0) {
                throw new Error('Chưa có provider AI nào được cấu hình.');
            }

            let lastErr = null;
            for (const provider of providers) {
                try {
                    return await provider.fn(prompt);
                } catch (err) {
                    console.warn('[AI] ' + provider.name + ' lỗi, thử provider dự phòng kế tiếp:', err.message);
                    lastErr = err;
                }
            }
            throw lastErr || new Error('Tất cả provider AI đều lỗi.');
        }

        // Chuyển nội dung HTML của bài báo thành văn bản thuần, giữ khoảng trắng giữa các đoạn/dòng
        function articleHtmlToPlainText(html) {
            const withSpaces = String(html || '')
                .replace(/<\/(p|div|li|h[1-6])>/gi, ' ')
                .replace(/<br\s*\/?>/gi, ' ');
            const tmp = document.createElement('div');
            tmp.innerHTML = withSpaces;
            return (tmp.textContent || '').replace(/\s+/g, ' ').trim();
        }

        // Tách văn bản tiếng Anh thành từng câu (có xử lý một số từ viết tắt thông dụng
        // như Mr. / Dr. / U.S. ... để tránh tách nhầm giữa câu)
        const NEWS_ABBREV_RE = /\b(Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|vs|etc|approx|Inc|Corp|Ltd|Co|No|Sen|Rep|Gov|Gen|Lt|Col|Capt|U\.S|U\.K|e\.g|i\.e|a\.m|p\.m)\.$/i;
        function splitIntoSentences(text) {
            text = String(text || '').replace(/\s+/g, ' ').trim();
            if (!text) return [];
            const rough = text.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g) || [text];
            const sentences = [];
            let buffer = '';
            rough.forEach(part => {
                buffer += (buffer ? ' ' : '') + part.trim();
                const trimmed = buffer.trim();
                const lastWord = (trimmed.match(/(\S+)$/) || [])[1] || '';
                const endsAbbrev = NEWS_ABBREV_RE.test(lastWord);
                const endsPunct = /[.!?]["'”’)\]]*$/.test(trimmed);
                if (endsPunct && !endsAbbrev) {
                    sentences.push(trimmed);
                    buffer = '';
                }
            });
            if (buffer.trim()) sentences.push(buffer.trim());
            return sentences.filter(Boolean);
        }

        // Gọi AI: chấm + nhận xét bản dịch của học viên, kèm đáp án tham khảo +
        // (nếu chưa phải câu cuối) 1 sự thật thú vị dẫn sang câu kế tiếp
        async function fetchSentenceHelp(sentence, mine, isLast) {
            const questionPart = isLast ? '' :
                ', "question": "một sự thật ngắn bằng tiếng Việt, thú vị liên quan đến câu vừa dịch (bắt đầu bằng cụm "Bạn có biết")"';
            const safeSentence = sentence.replace(/"/g, '\\"');
            const safeMine = String(mine || '').replace(/"/g, '\\"');
            const prompt = 'Bạn là giáo viên tiếng Anh cho học viên Việt Nam mới bắt đầu học, đang chấm bài dịch Anh-Việt ' +
                'của học viên theo hướng khích lệ, xây dựng, không chê bai nặng nề. ' +
                'Câu tiếng Anh gốc: "' + safeSentence + '". ' +
                'Bản dịch tiếng Việt của học viên: "' + safeMine + '". ' +
                'Chỉ trả lời bằng JSON hợp lệ, không thêm chữ nào khác, đúng định dạng: ' +
                '{"correct": true hoặc false (bản dịch của học viên có đúng nghĩa cơ bản của câu gốc không, ' +
                'chấp nhận cách diễn đạt khác miễn đúng ý), ' +
                '"comment": "1-2 câu nhận xét ngắn gọn, thân thiện bằng tiếng Việt về bản dịch của học viên — ' +
                'khen chỗ đã đúng, chỉ ra chỗ sai/thiếu/chưa tự nhiên nếu có kèm gợi ý sửa", ' +
                '"translation": "bản dịch tiếng Việt tự nhiên, chính xác của câu gốc (đáp án tham khảo)"' + questionPart + '}';
            return callAIJSON(prompt);
        }

        function escapeHtmlNews(str) {
            if (str === null || str === undefined) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        // --- Refs cho khung luyện dịch từng câu ---
        const newsTeacherBadge         = document.getElementById('news-teacher-badge');
        const newsTranslateTeacherHint = document.getElementById('news-translate-teacher-hint');
        const newsSentenceProgress     = document.getElementById('news-sentence-progress');
        const newsSentenceHistory      = document.getElementById('news-sentence-history');
        const newsSentenceCard         = document.getElementById('news-sentence-card');
        const newsSentenceEn           = document.getElementById('news-sentence-en');
        const newsTranslateTextarea    = document.getElementById('news-translate-textarea');
        const newsTranslateStatus      = document.getElementById('news-translate-status');
        const newsTranslateSubmitBtn   = document.getElementById('news-translate-submit-btn');
        const newsSentenceAnswer       = document.getElementById('news-sentence-answer');
        const newsSentenceAnswerText   = document.getElementById('news-sentence-answer-text');
        const newsSentenceComment      = document.getElementById('news-sentence-comment');
        const newsSentenceCommentLabel = document.getElementById('news-sentence-comment-label');
        const newsSentenceCommentText  = document.getElementById('news-sentence-comment-text');
        const newsSentenceQuestion     = document.getElementById('news-sentence-question');
        const newsSentenceQuestionText = document.getElementById('news-sentence-question-text');
        const newsSentenceNextBtn      = document.getElementById('news-sentence-next-btn');
        const newsSentenceDone         = document.getElementById('news-sentence-done');
        const newsTranslateEmptyMsg    = document.getElementById('news-translate-empty-msg');

        let sentenceList = [];        // các câu tiếng Anh của bài đang mở
        let sentenceIndex = 0;        // câu đang luyện (0-based)
        let sentenceHistoryData = []; // lịch sử các câu đã luyện: {en, mine, ai}
        let sentenceBusy = false;     // đang gọi AI cho câu hiện tại (chặn double-click)

        // Cuộn màn hình tới 1 phần tử, có trừ hao chiều cao thanh header/tab đang
        // dính cố định (sticky) phía trên, để phần tử không bị che khuất.
        function scrollToSentenceEl(el, gap) {
            if (!el) return;
            const styles = getComputedStyle(document.documentElement);
            const headerH = parseFloat(styles.getPropertyValue('--header-h')) || 0;
            const tabbarH = parseFloat(styles.getPropertyValue('--tabbar-h')) || 0;
            const headerOffset = headerH + tabbarH;
            const rect = el.getBoundingClientRect();
            const targetY = window.scrollY + rect.top - headerOffset - (gap || 12);
            window.scrollTo({ top: Math.max(targetY, 0), behavior: 'smooth' });
        }

        if (!newsFolderCard) return;

        // ===== KHUNG LUYỆN DỊCH TỪNG CÂU: helper & logic =====

        function renderSentenceHistory() {
            if (sentenceHistoryData.length === 0) { newsSentenceHistory.innerHTML = ''; return; }
            newsSentenceHistory.innerHTML = sentenceHistoryData.map((h, i) => `
                <div class="news-sentence-history-item">
                    <div class="news-sentence-history-en">${i + 1}. ${wrapWordsForTap(h.en)}</div>
                    <div class="news-sentence-history-mine"><strong>Bạn dịch:</strong> ${escapeHtmlNews(h.mine)}</div>
                    ${h.comment ? `<div class="news-sentence-history-comment ${h.correct === false ? 'is-incorrect' : 'is-correct'}"><strong>${h.correct === false ? '🤔' : '✅'} AI nhận xét:</strong> ${escapeHtmlNews(h.comment)}</div>` : ''}
                    <div class="news-sentence-history-ai"><strong>💡 AI gợi ý:</strong> ${escapeHtmlNews(h.ai)}</div>
                </div>
            `).join('');
        }

        // Hiển thị thẻ luyện tập cho câu ở vị trí sentenceIndex (hoặc màn hoàn thành nếu đã hết câu)
        function renderCurrentSentence() {
            if (isTeacher) return;
            if (sentenceIndex >= sentenceList.length) {
                newsSentenceCard.style.display = 'none';
                newsSentenceDone.style.display = 'block';
                newsSentenceProgress.textContent = `Hoàn thành ${sentenceList.length}/${sentenceList.length} câu 🎉`;
                return;
            }
            newsSentenceDone.style.display = 'none';
            newsSentenceCard.style.display = '';
            newsSentenceProgress.textContent = `Câu ${sentenceIndex + 1} / ${sentenceList.length}`;
            newsSentenceEn.innerHTML = wrapWordsForTap(sentenceList[sentenceIndex]);
            newsTranslateTextarea.value = '';
            newsTranslateTextarea.disabled = false;
            newsTranslateTextarea.style.display = '';
            newsTranslateSubmitBtn.style.display = '';
            newsTranslateSubmitBtn.disabled = false;
            newsTranslateSubmitBtn.textContent = 'Nộp bản dịch';
            newsTranslateStatus.textContent = '';
            newsTranslateStatus.className = 'news-translate-status';
            newsSentenceAnswer.style.display = 'none';
            newsSentenceComment.style.display = 'none';
            newsSentenceComment.classList.remove('is-correct', 'is-incorrect');
            newsSentenceQuestion.style.display = 'none';
            sentenceBusy = false;
            newsTranslateTextarea.focus();
        }

        // Đặt lại toàn bộ khung luyện dịch + tách câu cho bài tin mới được mở
        async function initTranslateSection(article) {
            sentenceHistoryData = [];
            sentenceIndex = 0;
            newsSentenceHistory.innerHTML = '';
            newsSentenceDone.style.display = 'none';
            newsTranslateEmptyMsg.style.display = 'none';

            newsTeacherBadge.style.display = isTeacher ? 'inline-block' : 'none';
            newsTranslateTeacherHint.style.display = isTeacher ? 'block' : 'none';
            newsSentenceCard.style.display = isTeacher ? 'none' : '';
            newsSentenceProgress.style.display = isTeacher ? 'none' : '';

            if (isTeacher) return; // giảng viên không luyện dịch, chỉ thấy ghi chú giới thiệu

            // Tải trước danh sách từ vựng cá nhân để tô sáng những từ học viên đã lưu
            await ensureMyVocabLoaded();

            const plainText = articleHtmlToPlainText(article.content);
            sentenceList = splitIntoSentences(plainText);

            if (sentenceList.length === 0) {
                newsSentenceCard.style.display = 'none';
                newsSentenceProgress.style.display = 'none';
                newsTranslateEmptyMsg.style.display = 'block';
                return;
            }
            renderCurrentSentence();
        }

        // Nộp bản dịch cho câu hiện tại → gọi AI lấy đáp án gợi ý + câu hỏi dẫn sang câu kế tiếp
        newsTranslateSubmitBtn.addEventListener('click', async () => {
            if (sentenceBusy) return;
            const mine = newsTranslateTextarea.value.trim();
            if (!mine) {
                newsTranslateStatus.textContent = 'Bạn chưa nhập bản dịch.';
                newsTranslateStatus.className = 'news-translate-status';
                return;
            }
            if (!aiConfigured()) {
                newsTranslateStatus.textContent = 'Tính năng AI chưa được cấu hình (thiếu API key). Vui lòng báo giảng viên.';
                newsTranslateStatus.className = 'news-translate-status';
                return;
            }

            sentenceBusy = true;
            newsTranslateSubmitBtn.disabled = true;
            newsTranslateTextarea.disabled = true;
            newsTranslateStatus.textContent = '🤖 AI đang chấm câu của bạn...';
            newsTranslateStatus.className = 'news-translate-status';

            const isLast = sentenceIndex === sentenceList.length - 1;
            const currentEn = sentenceList[sentenceIndex];

            try {
                const result = await fetchSentenceHelp(currentEn, mine, isLast);

                newsTranslateStatus.textContent = '';
                newsTranslateSubmitBtn.style.display = 'none';

                if (result.comment) {
                    newsSentenceComment.style.display = 'block';
                    const isCorrect = result.correct !== false;
                    newsSentenceComment.classList.toggle('is-correct', isCorrect);
                    newsSentenceComment.classList.toggle('is-incorrect', !isCorrect);
                    newsSentenceCommentLabel.textContent = isCorrect ? '✅ Nhận xét của AI' : '🤔 Nhận xét của AI';
                    newsSentenceCommentText.textContent = result.comment;
                }

                newsSentenceAnswer.style.display = 'block';
                newsSentenceAnswerText.textContent = result.translation || '(không có dữ liệu)';

                sentenceHistoryData.push({
                    en: currentEn,
                    mine,
                    ai: result.translation || '',
                    comment: result.comment || '',
                    correct: result.correct
                });
                renderSentenceHistory();

                if (!isLast) {
                    newsSentenceQuestion.style.display = 'block';
                    newsSentenceQuestionText.textContent = result.question ? ('🤔 ' + result.question) : '';
                    newsSentenceNextBtn.textContent = '👉 Xem câu tiếp theo';
                } else {
                    newsSentenceQuestion.style.display = 'none';
                    newsSentenceDone.style.display = 'block';
                }

                // Đưa học viên đến đúng khúc vừa hiện ra: nhận xét → đáp án → fact → nút tiếp theo
                const resultAnchor = result.comment ? newsSentenceComment : newsSentenceAnswer;
                scrollToSentenceEl(resultAnchor);
            } catch (err) {
                console.error('Lỗi khi gọi AI dịch câu (đã thử tất cả provider):', err.message);
                newsTranslateStatus.textContent = '⚠️ Không lấy được đáp án từ AI (đã thử tất cả các nguồn AI, đều đang bận). Bạn có thể thử lại sau ít phút.';
                newsTranslateStatus.className = 'news-translate-status';
                newsTranslateSubmitBtn.disabled = false;
                newsTranslateTextarea.disabled = false;
            }
            sentenceBusy = false;
        });

        // Bấm "Xem câu tiếp theo" → câu N+1 hiện ra (chính là đáp án cho câu hỏi AI vừa đặt)
        // và trở thành câu hiện tại để tiếp tục luyện dịch — đưa học viên lên lại đúng
        // khúc này để thấy câu mới, khung gõ và nút nộp bài, không bị kẹt dưới lịch sử cũ
        newsSentenceNextBtn.addEventListener('click', () => {
            sentenceIndex += 1;
            renderCurrentSentence();
            scrollToSentenceEl(newsSentenceProgress);
        });
        // ===== KẾT THÚC KHUNG LUYỆN DỊCH TỪNG CÂU =====

        // Render thumbnail cards (tải danh sách từ Supabase trước khi vẽ)
        async function renderNewsCards() {
            newsCardsGrid.innerHTML = '<p class="news-loading-msg">Đang tải danh sách tin...</p>';
            newsAdminBar.style.display = isTeacher ? 'flex' : 'none';

            await loadNewsArticlesFromDB();

            newsCardsGrid.innerHTML = '';
            if (NEWS_DATA.length === 0) {
                newsCardsGrid.innerHTML = '<p class="news-empty-msg">Chưa có bài tin nào.</p>';
                return;
            }

            NEWS_DATA.forEach(article => {
                const card = document.createElement('div');
                card.className = 'news-card';
                card.innerHTML = `
                    <img class="news-card-thumb" src="${article.thumb}" alt="${escapeHtmlNews(article.title)}" loading="lazy" onerror="this.style.background='var(--surface-2)';this.style.minHeight='120px'">
                    ${isTeacher ? `<button type="button" class="news-card-delete-btn" data-article-id="${article.id}" title="Xóa bài tin này">🗑️</button>` : ''}
                    <div class="news-card-title">${escapeHtmlNews(article.title)}</div>
                    <div class="news-card-date">📅 ${formatDate(article.date)}</div>
                `;
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.news-card-delete-btn')) return; // nút xóa xử lý riêng
                    openArticle(article);
                });
                newsCardsGrid.appendChild(card);
            });
        }

        // Xóa bài tin ngay trên thẻ (danh sách) — chỉ giảng viên thấy nút này
        newsCardsGrid.addEventListener('click', async (e) => {
            const btn = e.target.closest('.news-card-delete-btn');
            if (!btn || !isTeacher) return;
            const articleId = btn.dataset.articleId;
            const article = NEWS_DATA.find(a => String(a.id) === String(articleId));
            if (!confirm(`Xóa bài tin "${article ? article.title : ''}"? Hành động này không thể hoàn tác.`)) return;
            btn.disabled = true;
            try {
                await deleteNewsArticleDB(articleId);
                await renderNewsCards();
            } catch (err) {
                alert('Xóa bài tin thất bại: ' + err.message);
                btn.disabled = false;
            }
        });

        // Thêm bài tin mới — tạo 1 bài rỗng trên Supabase rồi mở luôn để giảng viên nhập liệu
        newsAddBtn.addEventListener('click', async () => {
            if (!isTeacher) return;
            newsAddBtn.disabled = true;
            newsAddBtn.textContent = 'Đang tạo...';
            try {
                const newArticle = await createNewsArticleDB();
                NEWS_DATA.unshift(newArticle);
                openArticle(newArticle);
            } catch (err) {
                alert('Tạo bài tin mới thất bại: ' + err.message);
            } finally {
                newsAddBtn.disabled = false;
                newsAddBtn.textContent = '➕ Thêm bài tin mới';
            }
        });

        // Mở folder tin ngắn
        newsFolderCard.addEventListener('click', async () => {
            vocabFolderGrid.style.display = 'none';
            newsPanel.style.display = 'block';
            newsArticlePanel.style.display = 'none';
            await renderNewsCards();
        });

        // Quay lại folder list
        newsBackBtn.addEventListener('click', () => {
            newsPanel.style.display = 'none';
            vocabFolderGrid.style.display = '';
        });

        // Quay lại danh sách tin
        newsArticleBackBtn.addEventListener('click', () => {
            newsArticlePanel.style.display = 'none';
            newsPanel.style.display = 'block';
        });

        // Cập nhật 1 bài trong mảng NEWS_DATA đang giữ trên trình duyệt (sau khi lưu thành công)
        function patchLocalArticle(articleId, fields) {
            const art = NEWS_DATA.find(a => String(a.id) === String(articleId));
            if (art) Object.assign(art, fields);
        }

        // ===== HIỂN THỊ TRẮC NGHIỆM CHO HỌC VIÊN (làm bài, chấm điểm) =====
        function renderStudentQuiz(article) {
            newsQuizQuestions.innerHTML = '';
            newsQuizResult.style.display = 'none';
            newsQuizResult.className = 'news-quiz-result';
            newsQuizSubmit.style.display = 'block';
            newsQuizSubmit.disabled = false;

            article.quiz.forEach((q, qi) => {
                const block = document.createElement('div');
                block.className = 'news-question-block';
                block.innerHTML = `<div class="news-question-text">${qi + 1}. ${escapeHtmlNews(q.q)}</div>
                    <div class="news-options">
                        ${q.options.map((opt, oi) => `
                            <label class="news-option-label">
                                <input type="radio" name="news-q${qi}" value="${oi}"> ${escapeHtmlNews(opt)}
                            </label>
                        `).join('')}
                    </div>`;
                newsQuizQuestions.appendChild(block);
            });

            // Nộp bài
            newsQuizSubmit.onclick = () => {
                let correct = 0;
                article.quiz.forEach((q, qi) => {
                    const selected = newsQuizQuestions.querySelector(`input[name="news-q${qi}"]:checked`);
                    const labels = newsQuizQuestions.querySelectorAll(`[name="news-q${qi}"]`);
                    labels.forEach(input => {
                        const lbl = input.closest('.news-option-label');
                        lbl.classList.remove('correct', 'incorrect');
                        if (parseInt(input.value) === q.answer) lbl.classList.add('correct');
                    });
                    if (selected && parseInt(selected.value) === q.answer) {
                        correct++;
                    } else if (selected) {
                        selected.closest('.news-option-label').classList.add('incorrect');
                    }
                });
                // Vô hiệu hóa các input
                newsQuizQuestions.querySelectorAll('input[type="radio"]').forEach(inp => inp.disabled = true);
                newsQuizSubmit.style.display = 'none';
                const total = article.quiz.length;
                newsQuizResult.style.display = 'block';
                if (correct === total) {
                    newsQuizResult.className = 'news-quiz-result pass';
                    newsQuizResult.textContent = `🎉 Xuất sắc! Bạn trả lời đúng ${correct}/${total} câu!`;
                } else {
                    newsQuizResult.className = 'news-quiz-result fail';
                    newsQuizResult.textContent = `Bạn trả lời đúng ${correct}/${total} câu. Hãy xem lại những câu sai nhé!`;
                }
            };
        }

        // ===== KHUNG CHỈNH SỬA TRẮC NGHIỆM CHO GIẢNG VIÊN (thấy đáp án + sửa được) =====
        function renderQuizEditor(article) {
            newsQuizEditQuestions.innerHTML = '';
            newsQuizEditStatus.textContent = '';
            article.quiz.forEach((q, qi) => {
                const block = document.createElement('div');
                block.className = 'news-quiz-edit-block';
                block.innerHTML = `
                    <label class="news-quiz-edit-label">Câu hỏi ${qi + 1}</label>
                    <input type="text" class="news-edit-input news-quiz-edit-question" data-qi="${qi}" value="${escapeHtmlNews(q.q)}" placeholder="Nhập câu hỏi...">
                    <div class="news-quiz-edit-options">
                        ${(q.options || []).map((opt, oi) => `
                            <div class="news-quiz-edit-option-row">
                                <input type="radio" name="news-edit-answer-${qi}" data-qi="${qi}" data-oi="${oi}" class="news-quiz-edit-answer-radio" ${q.answer === oi ? 'checked' : ''} title="Đánh dấu đây là đáp án đúng">
                                <input type="text" class="news-edit-input news-quiz-edit-option" data-qi="${qi}" data-oi="${oi}" value="${escapeHtmlNews(opt)}" placeholder="Đáp án ${oi + 1}...">
                            </div>
                        `).join('')}
                    </div>
                `;
                newsQuizEditQuestions.appendChild(block);
            });
        }

        // Gom toàn bộ dữ liệu 3 câu hỏi đang hiển thị trong khung chỉnh sửa thành mảng quiz
        function collectQuizFromEditor() {
            const quiz = [];
            newsQuizEditQuestions.querySelectorAll('.news-quiz-edit-block').forEach(block => {
                const qText = block.querySelector('.news-quiz-edit-question').value;
                const options = Array.from(block.querySelectorAll('.news-quiz-edit-option')).map(inp => inp.value);
                const checkedRadio = block.querySelector('.news-quiz-edit-answer-radio:checked');
                const answer = checkedRadio ? parseInt(checkedRadio.dataset.oi, 10) : 0;
                quiz.push({ q: qText, options, answer });
            });
            return quiz;
        }

        // Autosave (debounce) cho khung chỉnh sửa trắc nghiệm — lưu cả câu hỏi/đáp án/câu trả lời đúng cùng lúc
        let quizEditSaveTimer = null;
        function scheduleQuizEditSave() {
            if (!isTeacher || currentArticleId === null) return;
            newsQuizEditStatus.textContent = 'Đang gõ...';
            clearTimeout(quizEditSaveTimer);
            quizEditSaveTimer = setTimeout(async () => {
                const quiz = collectQuizFromEditor();
                try {
                    await updateNewsArticleDB(currentArticleId, { quiz });
                    patchLocalArticle(currentArticleId, { quiz });
                    newsQuizEditStatus.textContent = '💾 Đã lưu câu hỏi trắc nghiệm.';
                } catch (err) {
                    newsQuizEditStatus.textContent = '❌ Lưu thất bại: ' + err.message;
                }
            }, 800);
        }
        newsQuizEditQuestions.addEventListener('input', scheduleQuizEditSave);   // gõ chữ vào câu hỏi/đáp án
        newsQuizEditQuestions.addEventListener('change', scheduleQuizEditSave);  // chọn lại đáp án đúng (radio)

        // ===== AUTOSAVE: TIÊU ĐỀ (giảng viên gõ trực tiếp vào tiêu đề) =====
        let titleSaveTimer = null;
        newsArticleTitle.addEventListener('input', () => {
            if (!isTeacher || currentArticleId === null) return;
            newsEditMetaStatus.textContent = 'Đang gõ...';
            clearTimeout(titleSaveTimer);
            titleSaveTimer = setTimeout(async () => {
                const newTitle = newsArticleTitle.textContent.trim();
                try {
                    await updateNewsArticleDB(currentArticleId, { title: newTitle });
                    patchLocalArticle(currentArticleId, { title: newTitle });
                    newsEditMetaStatus.textContent = '💾 Đã lưu tiêu đề.';
                } catch (err) {
                    newsEditMetaStatus.textContent = '❌ Lưu thất bại: ' + err.message;
                }
            }, 800);
        });

        // ===== AUTOSAVE: NGÀY ĐĂNG =====
        newsArticleDateEdit.addEventListener('change', async () => {
            if (!isTeacher || currentArticleId === null) return;
            const newDate = newsArticleDateEdit.value;
            if (!newDate) return;
            try {
                await updateNewsArticleDB(currentArticleId, { date: newDate });
                patchLocalArticle(currentArticleId, { date: newDate });
                newsEditMetaStatus.textContent = '💾 Đã lưu ngày đăng.';
            } catch (err) {
                newsEditMetaStatus.textContent = '❌ Lưu thất bại: ' + err.message;
            }
        });

        // ===== CẬP NHẬT ẢNH: dán link .jpg rồi bấm nút =====
        newsEditImageBtn.addEventListener('click', async () => {
            if (!isTeacher || currentArticleId === null) return;
            const url = newsEditImageInput.value.trim();
            if (!url) { alert('Vui lòng dán link ảnh (.jpg) trước khi cập nhật.'); return; }
            newsEditImageBtn.disabled = true;
            const oldLabel = newsEditImageBtn.textContent;
            newsEditImageBtn.textContent = 'Đang lưu...';
            try {
                await updateNewsArticleDB(currentArticleId, { thumb: url });
                patchLocalArticle(currentArticleId, { thumb: url });
                newsArticleImg.src = url;
                newsEditImageBtn.textContent = '✅ Đã cập nhật';
                setTimeout(() => { newsEditImageBtn.textContent = oldLabel; newsEditImageBtn.disabled = false; }, 1300);
            } catch (err) {
                alert('Cập nhật ảnh thất bại: ' + err.message);
                newsEditImageBtn.textContent = oldLabel;
                newsEditImageBtn.disabled = false;
            }
        });

        // ===== AUTOSAVE: NỘI DUNG BÀI (contenteditable) + nút In đậm =====
        let contentSaveTimer = null;
        newsArticleText.addEventListener('input', () => {
            if (!isTeacher || currentArticleId === null) return;
            newsEditContentStatus.textContent = 'Đang gõ...';
            clearTimeout(contentSaveTimer);
            contentSaveTimer = setTimeout(async () => {
                const newContent = newsArticleText.innerHTML;
                try {
                    await updateNewsArticleDB(currentArticleId, { content: newContent });
                    patchLocalArticle(currentArticleId, { content: newContent });
                    newsEditContentStatus.textContent = '💾 Đã lưu nội dung.';
                } catch (err) {
                    newsEditContentStatus.textContent = '❌ Lưu thất bại: ' + err.message;
                }
            }, 800);
        });

        newsEditBoldBtn.addEventListener('click', (e) => {
            e.preventDefault();
            newsArticleText.focus();
            document.execCommand('bold');
            newsArticleText.dispatchEvent(new Event('input')); // kích hoạt autosave ngay sau khi in đậm
        });

        // ===== XÓA BÀI TIN đang mở (trong trang chi tiết) =====
        newsArticleDeleteBtn.addEventListener('click', async () => {
            if (!isTeacher || currentArticleId === null) return;
            const art = NEWS_DATA.find(a => String(a.id) === String(currentArticleId));
            if (!confirm(`Xóa bài tin "${art ? art.title : ''}"? Hành động này không thể hoàn tác.`)) return;
            newsArticleDeleteBtn.disabled = true;
            try {
                await deleteNewsArticleDB(currentArticleId);
                newsArticlePanel.style.display = 'none';
                newsPanel.style.display = 'block';
                await renderNewsCards();
            } catch (err) {
                alert('Xóa bài tin thất bại: ' + err.message);
            } finally {
                newsArticleDeleteBtn.disabled = false;
            }
        });

        // Mở bài báo chi tiết
        function openArticle(article) {
            newsPanel.style.display = 'none';
            newsArticlePanel.style.display = 'block';
            currentArticleId = article.id;

            // ----- Tiêu đề -----
            newsArticleTitle.textContent = article.title;
            newsArticleTitle.contentEditable = isTeacher ? 'true' : 'false';
            newsArticleTitle.classList.toggle('news-editable', isTeacher);

            // ----- Ngày đăng: hiển thị thường cho học viên, input ngày cho giảng viên -----
            let dateEl = document.getElementById('news-article-date');
            if (!dateEl) {
                dateEl = document.createElement('div');
                dateEl.id = 'news-article-date';
                dateEl.className = 'news-article-date';
                newsArticleDateEdit.after(dateEl);
            }
            dateEl.textContent = '📅 ' + formatDate(article.date);
            dateEl.style.display = isTeacher ? 'none' : '';
            newsArticleDateEdit.style.display = isTeacher ? 'inline-block' : 'none';
            newsArticleDateEdit.value = article.date;

            // ----- Nút xóa bài (chỉ giảng viên) -----
            newsArticleDeleteBtn.style.display = isTeacher ? 'inline-block' : 'none';
            newsEditMetaStatus.textContent = '';

            // ----- Ảnh + khung dán link ảnh mới -----
            newsArticleImg.src = article.thumb;
            newsArticleImg.alt = article.title;
            newsEditImageBar.style.display = isTeacher ? 'flex' : 'none';
            newsEditImageInput.value = article.thumb;

            // ----- Nội dung bài + thanh công cụ (In đậm) -----
            newsArticleText.innerHTML = article.content;
            newsArticleText.contentEditable = isTeacher ? 'true' : 'false';
            newsArticleText.classList.toggle('news-editable', isTeacher);
            newsEditToolbar.style.display = isTeacher ? 'flex' : 'none';
            newsEditContentStatus.textContent = '';

            // Khởi tạo khung luyện dịch từng câu cho bài tin này
            initTranslateSection(article);

            // ----- Trắc nghiệm: học viên làm bài / giảng viên chỉnh sửa + thấy đáp án -----
            if (isTeacher) {
                newsQuizSection.style.display = 'none';
                newsQuizEditSection.style.display = 'block';
                renderQuizEditor(article);
            } else {
                newsQuizSection.style.display = 'block';
                newsQuizEditSection.style.display = 'none';
                renderStudentQuiz(article);
            }
        }

        // ===================================================================
        // ===== TRA TỪ NHANH (AI) + TỪ VỰNG CÁ NHÂN CỦA HỌC VIÊN ===========
        // Trong lúc luyện dịch từng câu, học viên chạm vào 1 từ để:
        //   1) Gọi AI tra: loại từ + nghĩa + cách dùng + ví dụ đơn giản Anh-Việt
        //   2) Hiện thông báo (toast) + TỰ ĐỘNG lưu từ đó vào danh sách từ vựng
        //      riêng của học viên (bảng "user_vocabulary" trên Supabase) —
        //      danh sách này nằm trong 1 folder con của tab "Từ vựng" và
        //      không bị mất khi tải lại trang. Bài đọc cũng tự nhớ những từ
        //      đã được lưu (tô sáng lại) sau khi tải lại trang.
        //   3) Không lưu trùng 1 từ, TRỪ khi nghĩa hoặc loại từ của lần chạm
        //      đó khác với các lần trước.
        // (Xem file "user_vocabulary_setup.sql" đi kèm để tạo bảng trên Supabase.)
        // ===================================================================

        let myVocabList = [];             // từ vựng cá nhân đã tải từ Supabase (của học viên đang đăng nhập)
        let myVocabNormSet = new Set();   // tập hợp từ (đã chuẩn hóa) để tô sáng nhanh trong bài đọc
        let myVocabLoadedForUser = null;  // userId đã tải xong — tránh gọi Supabase lặp lại không cần thiết
        let wordLookupSeq = 0;            // chống việc chạm từ khác trong lúc AI đang trả lời từ trước

        // Chuẩn hóa 1 từ để so sánh/lưu (chữ thường, bỏ khoảng trắng thừa)
        function normalizeWord(w) {
            return String(w || '').toLowerCase().trim();
        }

        function rebuildVocabNormSet() {
            myVocabNormSet = new Set(myVocabList.map(v => normalizeWord(v.word_norm || v.word)));
        }

        // Tải toàn bộ từ vựng cá nhân của học viên đang đăng nhập
        async function loadMyVocabulary() {
            if (!currentUserId) { myVocabList = []; return; }
            try {
                const { data, error } = await sb
                    .from('user_vocabulary')
                    .select('*')
                    .eq('user_id', currentUserId)
                    .order('created_at', { ascending: false });
                if (error) throw error;
                myVocabList = data || [];
            } catch (err) {
                console.error('Lỗi khi tải từ vựng cá nhân:', err.message);
                myVocabList = [];
            }
        }

        // Chỉ tải lại khi đổi tài khoản, để không gọi Supabase mỗi lần chạm từ
        async function ensureMyVocabLoaded() {
            if (!currentUserId) { myVocabList = []; myVocabNormSet = new Set(); myVocabLoadedForUser = null; return; }
            if (myVocabLoadedForUser === currentUserId) return;
            await loadMyVocabulary();
            rebuildVocabNormSet();
            myVocabLoadedForUser = currentUserId;
        }

        // Kiểm tra 1 từ (cùng nghĩa + cùng loại từ) đã có trong danh sách chưa
        function vocabDuplicateExists(wordNorm, meaning, wordType) {
            const m = (meaning || '').trim().toLowerCase();
            const t = (wordType || '').trim().toLowerCase();
            return myVocabList.some(v =>
                normalizeWord(v.word_norm || v.word) === wordNorm &&
                (v.meaning || '').trim().toLowerCase() === m &&
                (v.word_type || '').trim().toLowerCase() === t
            );
        }

        // Lưu 1 từ mới vào Supabase — bỏ qua (không lưu trùng) nếu đã có đúng từ + nghĩa + loại từ này
        async function saveWordToVocab(entry) {
            if (!currentUserId) return { added: false, reason: 'no-login' };
            if (vocabDuplicateExists(entry.wordNorm, entry.meaning, entry.wordType)) {
                return { added: false, reason: 'duplicate' };
            }
            const payload = {
                user_id: currentUserId,
                word: entry.word,
                word_norm: entry.wordNorm,
                word_type: entry.wordType || null,
                meaning: entry.meaning || null,
                usage_note: entry.usage || null,
                example_en: entry.exampleEn || null,
                example_vi: entry.exampleVi || null,
                source_title: entry.sourceTitle || null
            };
            const { data, error } = await sb
                .from('user_vocabulary')
                .insert(payload)
                .select()
                .single();
            if (error) {
                if (error.code === '23505') return { added: false, reason: 'duplicate' }; // trùng do ràng buộc unique trên DB
                throw error;
            }
            myVocabList.unshift(data);
            return { added: true, entry: data };
        }

        // Xóa 1 từ khỏi danh sách từ vựng cá nhân
        async function deleteVocabEntry(id) {
            const { error } = await sb
                .from('user_vocabulary')
                .delete()
                .eq('id', id)
                .eq('user_id', currentUserId);
            if (error) throw error;
            myVocabList = myVocabList.filter(v => v.id !== id);
        }

        // Bọc mỗi từ tiếng Anh trong câu bằng <span class="tappable-word"> để học viên chạm vào tra nghĩa.
        // Giữ nguyên dấu câu/khoảng trắng xung quanh; chỉ chuỗi có chứa chữ cái mới được bọc lại.
        function wrapWordsForTap(sentence) {
            const tokens = String(sentence || '').split(/(\s+)/);
            return tokens.map(token => {
                if (!token || /^\s+$/.test(token)) return escapeHtmlNews(token);
                const m = token.match(/^([^a-zA-Z']*)([a-zA-Z][a-zA-Z'-]*)([^a-zA-Z']*)$/);
                if (!m) return escapeHtmlNews(token);
                const [, lead, core, trail] = m;
                const norm = normalizeWord(core);
                const knownCls = myVocabNormSet.has(norm) ? ' known-word' : '';
                const safeCore = escapeHtmlNews(core);
                return escapeHtmlNews(lead) +
                    `<span class="tappable-word${knownCls}" data-word="${safeCore}">${safeCore}</span>` +
                    escapeHtmlNews(trail);
            }).join('');
        }

        // Giống wrapWordsForTap ở trên, nhưng dùng cho nội dung có thể chứa sẵn vài thẻ
        // HTML đơn giản (vd: "<br><br>" để xuống dòng trong đoạn văn/câu chuyện).
        // Chỉ phần VĂN BẢN mới được bọc lại để tra từ; các thẻ HTML được giữ nguyên,
        // không bị escape thành chữ.
        function wrapWordsForTapHtml(html) {
            const parts = String(html || '').split(/(<[^>]+>)/g);
            return parts.map(part => (/^<[^>]+>$/.test(part) ? part : wrapWordsForTap(part))).join('');
        }

        // Cập nhật lại lớp "known-word" trên các từ đang hiển thị, không cần render lại toàn bộ câu.
        // Dùng chung cho mọi khu vực có từ tappable (Tin ngắn, THCS/THPT: Dịch câu, Câu chuyện...).
        function markKnownWordsInDom() {
            document.querySelectorAll('.tappable-word').forEach(el => {
                const norm = normalizeWord(el.dataset.word);
                el.classList.toggle('known-word', myVocabNormSet.has(norm));
            });
        }

        // Gọi AI tra nghĩa 1 từ, dựa theo ngữ cảnh câu đang dịch
        async function fetchWordInfo(word, contextSentence) {
            const safeWord = word.replace(/"/g, '\\"');
            const safeContext = (contextSentence || '').replace(/"/g, '\\"');
            const prompt = 'Bạn là từ điển Anh-Việt dành cho học viên Việt Nam mới bắt đầu học tiếng Anh. ' +
                'Học viên vừa chạm vào từ "' + safeWord + '" trong câu tiếng Anh sau: "' + safeContext + '". ' +
                'Chỉ trả lời bằng JSON hợp lệ, không thêm chữ nào khác, đúng định dạng: ' +
                '{"found": true, ' +
                '"wordType": "loại từ bằng tiếng Việt, ví dụ: danh từ / động từ / tính từ / trạng từ / giới từ / liên từ...", ' +
                '"meaning": "nghĩa tiếng Việt ngắn gọn, đúng với ngữ cảnh của câu trên", ' +
                '"usage": "một câu ngắn giải thích cách dùng từ này (khi nào dùng, hay đi kèm giới từ/cấu trúc gì)", ' +
                '"exampleEn": "một câu ví dụ tiếng Anh đơn giản, khác với câu ở trên, có dùng từ này", ' +
                '"exampleVi": "bản dịch tiếng Việt của câu ví dụ trên"}. ' +
                'Nếu đây không phải là một từ tiếng Anh có nghĩa (ví dụ tên riêng, số, ký tự lạ) thì chỉ trả về {"found": false}.';
            return callAIJSON(prompt);
        }

        // --- Toast thông báo nhỏ, tự biến mất sau vài giây ---
        function showVocabToast(message, type) {
            const container = document.getElementById('app-toast-container');
            if (!container) return;
            const el = document.createElement('div');
            el.className = 'app-toast' + (type ? ' app-toast-' + type : '');
            el.textContent = message;
            container.appendChild(el);
            requestAnimationFrame(() => el.classList.add('show'));
            setTimeout(() => {
                el.classList.remove('show');
                setTimeout(() => el.remove(), 300);
            }, 3200);
        }

        // --- Khung (popup) hiện nghĩa của từ khi chạm vào ---
        const wordLookupPopup    = document.getElementById('word-lookup-popup');
        const wordLookupWordEl   = document.getElementById('word-lookup-word');
        const wordLookupBody     = document.getElementById('word-lookup-body');
        const wordLookupCloseBtn = document.getElementById('word-lookup-close');

        function closeWordLookupPopup() {
            if (wordLookupPopup) wordLookupPopup.style.display = 'none';
        }
        if (wordLookupCloseBtn) wordLookupCloseBtn.addEventListener('click', closeWordLookupPopup);
        if (wordLookupPopup) {
            wordLookupPopup.addEventListener('click', (e) => {
                if (e.target === wordLookupPopup) closeWordLookupPopup();
            });
        }

        // Xử lý khi học viên chạm/bấm vào 1 từ trong lúc luyện dịch
        async function handleWordTap(wordEl) {
            if (!wordLookupPopup || !wordLookupBody || !wordLookupWordEl) return;
            const rawWord = wordEl.dataset.word;
            if (!rawWord) return;
            const norm = normalizeWord(rawWord);

            // Tìm câu ngữ cảnh + tên nguồn: ưu tiên cách cũ dành riêng cho "Tin ngắn",
            // nếu không phải khu vực Tin ngắn thì dùng thuộc tính data-vocab-context /
            // data-vocab-source dùng chung cho các khu vực khác (THCS/THPT: Dịch câu,
            // Câu chuyện...). Nhờ vậy hành vi cũ của Tin ngắn không đổi.
            let contextSentence = rawWord;
            let sourceTitle = '';
            const sentenceHost = wordEl.closest('.news-sentence-en, .news-sentence-history-en');
            if (sentenceHost) {
                contextSentence = sentenceHost.textContent;
                const article = NEWS_DATA.find(a => String(a.id) === String(currentArticleId));
                sourceTitle = article ? article.title : '';
            } else {
                const genericHost = wordEl.closest('[data-vocab-context]');
                if (genericHost) {
                    contextSentence = genericHost.dataset.vocabContext || genericHost.textContent || rawWord;
                    sourceTitle = genericHost.dataset.vocabSource || '';
                }
            }

            wordLookupWordEl.textContent = rawWord;
            wordLookupPopup.style.display = 'flex';

            // QUAN TRỌNG: nếu từ này (không phân biệt hoa/thường) đã có sẵn trong
            // "Từ vựng của tôi" — dù đã lưu từ bài đọc nào, cũ hay mới, dù học viên
            // có thoát ra vào lại bao nhiêu lần — thì TUYỆT ĐỐI không gọi AI tra lại
            // và không lưu thêm lần nào nữa. Chỉ hiển thị lại (các) nghĩa đã lưu.
            // (AI trả lời tự do bằng văn bản nên mỗi lần tra có thể ra chữ hơi khác
            //  nhau dù cùng 1 nghĩa — nếu cứ tra lại rồi so khớp chuỗi thì sẽ bị lưu
            //  trùng. Cách chắc chắn nhất là KHÔNG tra lại khi từ đã biết rồi.)
            const existingEntries = myVocabList.filter(v => normalizeWord(v.word_norm || v.word) === norm);
            if (existingEntries.length > 0) {
                renderKnownWordPopup(rawWord, existingEntries, norm, contextSentence, sourceTitle);
                return;
            }

            await runFreshWordLookup(rawWord, norm, contextSentence, sourceTitle);
        }

        // Hiện lại (các) nghĩa đã lưu sẵn của 1 từ đã biết — không gọi AI, không lưu thêm.
        // Có 1 nút phụ để chủ động tra lại, phòng trường hợp từ này thật sự mang nghĩa
        // khác trong câu đang đọc (vd: "book" là danh từ ở bài này nhưng là động từ ở bài khác).
        function renderKnownWordPopup(rawWord, entries, norm, contextSentence, sourceTitle) {
            wordLookupBody.innerHTML = `
                <div class="word-lookup-known-note">📚 Bạn đã lưu từ này trước đó — không ghi nhận lại.</div>
                ${entries.map(e => `
                    <div class="word-lookup-known-entry">
                        ${e.word_type ? `<div class="word-lookup-tag">${escapeHtmlNews(e.word_type)}</div>` : ''}
                        <div class="word-lookup-meaning">${escapeHtmlNews(e.meaning || '(chưa rõ nghĩa)')}</div>
                        ${e.usage_note ? `<div class="word-lookup-usage"><strong>Cách dùng:</strong> ${escapeHtmlNews(e.usage_note)}</div>` : ''}
                        ${e.example_en ? `<div class="word-lookup-example">
                            <div class="word-lookup-example-en">📌 ${escapeHtmlNews(e.example_en)}</div>
                            <div class="word-lookup-example-vi">→ ${escapeHtmlNews(e.example_vi || '')}</div>
                        </div>` : ''}
                    </div>
                `).join('')}
                <button type="button" class="word-lookup-relookup-btn" id="word-lookup-relookup-btn">🔎 Từ này có nghĩa khác trong câu này? Tra lại</button>
            `;
            const relookupBtn = document.getElementById('word-lookup-relookup-btn');
            if (relookupBtn) {
                relookupBtn.addEventListener('click', () => {
                    runFreshWordLookup(rawWord, norm, contextSentence, sourceTitle);
                }, { once: true });
            }
        }

        // Gọi AI tra nghĩa thật (chỉ dùng cho từ CHƯA có trong danh sách, hoặc khi
        // học viên chủ động bấm "Tra lại" để kiểm tra nghĩa khác)
        async function runFreshWordLookup(rawWord, norm, contextSentence, sourceTitle) {
            const mySeq = ++wordLookupSeq;
            wordLookupBody.innerHTML = `<div class="word-lookup-loading">🔎 Đang tra nghĩa từ "${escapeHtmlNews(rawWord)}"...</div>`;

            if (!aiConfigured()) {
                wordLookupBody.innerHTML = '<div class="word-lookup-error">⚠️ Tính năng tra từ chưa được cấu hình (thiếu API key). Vui lòng báo giảng viên.</div>';
                return;
            }

            try {
                const info = await fetchWordInfo(rawWord, contextSentence);
                if (mySeq !== wordLookupSeq) return; // học viên đã chạm từ khác trong lúc chờ

                if (!info || info.found === false) {
                    wordLookupBody.innerHTML = '<div class="word-lookup-error">Không tìm thấy nghĩa phù hợp cho từ này.</div>';
                    return;
                }

                wordLookupBody.innerHTML = `
                    ${info.wordType ? `<div class="word-lookup-tag">${escapeHtmlNews(info.wordType)}</div>` : ''}
                    <div class="word-lookup-meaning">${escapeHtmlNews(info.meaning || '(chưa rõ nghĩa)')}</div>
                    ${info.usage ? `<div class="word-lookup-usage"><strong>Cách dùng:</strong> ${escapeHtmlNews(info.usage)}</div>` : ''}
                    ${info.exampleEn ? `<div class="word-lookup-example">
                        <div class="word-lookup-example-en">📌 ${escapeHtmlNews(info.exampleEn)}</div>
                        <div class="word-lookup-example-vi">→ ${escapeHtmlNews(info.exampleVi || '')}</div>
                    </div>` : ''}
                    <div class="word-lookup-save-status" id="word-lookup-save-status">💾 Đang lưu vào từ vựng của bạn...</div>
                `;

                // Lưu vào danh sách từ vựng cá nhân — vẫn giữ kiểm tra trùng (word_norm +
                // meaning + word_type) làm lưới an toàn cuối cùng, phòng khi AI trả về
                // đúng y hệt nghĩa cũ trong lần tra lại chủ động này.
                let result = { added: false, reason: 'no-login' };
                try {
                    result = await saveWordToVocab({
                        word: rawWord,
                        wordNorm: norm,
                        wordType: info.wordType || '',
                        meaning: info.meaning || '',
                        usage: info.usage || '',
                        exampleEn: info.exampleEn || '',
                        exampleVi: info.exampleVi || '',
                        sourceTitle
                    });
                } catch (saveErr) {
                    console.error('Lỗi khi lưu từ vựng:', saveErr.message);
                }
                rebuildVocabNormSet();
                markKnownWordsInDom();
                renderMyVocabIfOpen();

                const statusEl = document.getElementById('word-lookup-save-status');
                if (result.added) {
                    if (statusEl) statusEl.textContent = '✅ Đã thêm vào "Từ vựng của tôi".';
                    showVocabToast(`✅ Đã thêm "${rawWord}" vào từ vựng của bạn`, 'success');
                } else if (result.reason === 'duplicate') {
                    if (statusEl) statusEl.textContent = 'ℹ️ Nghĩa này của từ đã có trong danh sách của bạn.';
                    showVocabToast(`ℹ️ "${rawWord}" đã có trong từ vựng của bạn`, 'info');
                } else if (statusEl) {
                    statusEl.remove();
                }
            } catch (err) {
                if (mySeq !== wordLookupSeq) return;
                console.error('Lỗi khi tra từ:', err.message);
                wordLookupBody.innerHTML = '<div class="word-lookup-error">⚠️ Không tra được từ này. Vui lòng thử lại.</div>';
            }
        }

        // Bắt sự kiện chạm/bấm vào từ trong toàn bộ khung luyện dịch (câu hiện tại + lịch sử)
        const newsTranslateSectionEl = document.getElementById('news-translate-section');
        if (newsTranslateSectionEl) {
            newsTranslateSectionEl.addEventListener('click', (e) => {
                const wordEl = e.target.closest('.tappable-word');
                if (!wordEl) return;
                handleWordTap(wordEl);
            });
        }

        // ===== FOLDER "TỪ VỰNG CỦA TÔI" (nằm chung với các folder khác của tab Từ vựng) =====
        const myVocabFolderCard = document.getElementById('myvocab-folder-card');
        const myVocabPanel      = document.getElementById('myvocab-panel');
        const myVocabBackBtn    = document.getElementById('myvocab-back-btn');
        const myVocabListEl     = document.getElementById('myvocab-list');

        function renderMyVocabPanel() {
            if (!myVocabListEl) return;
            if (myVocabList.length === 0) {
                myVocabListEl.innerHTML = '<p class="news-empty-msg">Bạn chưa lưu từ vựng nào. Hãy chạm vào một từ trong lúc luyện dịch bài đọc (mục "Tin ngắn") để tự động lưu vào đây nhé!</p>';
                return;
            }
            myVocabListEl.innerHTML = myVocabList.map(v => `
                <div class="myvocab-item">
                    <div class="myvocab-item-top">
                        <span class="myvocab-word">${escapeHtmlNews(v.word)}</span>
                        ${v.word_type ? `<span class="myvocab-tag">${escapeHtmlNews(v.word_type)}</span>` : ''}
                        <button type="button" class="myvocab-delete-btn" data-vocab-id="${v.id}" title="Xóa từ này">🗑️</button>
                    </div>
                    <div class="myvocab-meaning">${escapeHtmlNews(v.meaning || '')}</div>
                    ${v.usage_note ? `<div class="myvocab-usage"><strong>Cách dùng:</strong> ${escapeHtmlNews(v.usage_note)}</div>` : ''}
                    ${v.example_en ? `<div class="myvocab-example">
                        <div>📌 ${escapeHtmlNews(v.example_en)}</div>
                        <div>→ ${escapeHtmlNews(v.example_vi || '')}</div>
                    </div>` : ''}
                    ${v.source_title ? `<div class="myvocab-source">📰 Gặp trong bài: ${escapeHtmlNews(v.source_title)}</div>` : ''}
                </div>
            `).join('');
        }

        function renderMyVocabIfOpen() {
            if (myVocabPanel && myVocabPanel.style.display !== 'none') renderMyVocabPanel();
        }

        if (myVocabFolderCard && myVocabPanel && myVocabBackBtn && myVocabListEl) {
            myVocabFolderCard.addEventListener('click', async () => {
                vocabFolderGrid.style.display = 'none';
                myVocabPanel.style.display = 'block';
                myVocabListEl.innerHTML = '<p class="news-loading-msg">Đang tải danh sách từ vựng...</p>';
                await ensureMyVocabLoaded();
                renderMyVocabPanel();
            });

            myVocabBackBtn.addEventListener('click', () => {
                myVocabPanel.style.display = 'none';
                vocabFolderGrid.style.display = '';
            });

            myVocabListEl.addEventListener('click', async (e) => {
                const btn = e.target.closest('.myvocab-delete-btn');
                if (!btn) return;
                const idAttr = btn.dataset.vocabId;
                const id = /^\d+$/.test(idAttr) ? Number(idAttr) : idAttr;
                if (!confirm('Xóa từ này khỏi danh sách từ vựng của bạn?')) return;
                btn.disabled = true;
                try {
                    await deleteVocabEntry(id);
                    rebuildVocabNormSet();
                    markKnownWordsInDom();
                    renderMyVocabPanel();
                } catch (err) {
                    alert('Xóa từ vựng thất bại: ' + err.message);
                    btn.disabled = false;
                }
            });
        }

        // Cho phép các khu vực khác trong app (VD: THCS/THPT — Dịch câu, Câu chuyện)
        // dùng lại đúng 1 bộ logic tra từ + lưu từ vựng này, tránh viết trùng lặp.
        window.vocabTap = {
            wrap: wrapWordsForTap,           // bọc 1 câu thuần văn bản để tra từ
            wrapHtml: wrapWordsForTapHtml,   // bọc nội dung có thể chứa thẻ <br>...
            handleTap: handleWordTap,        // xử lý khi chạm vào 1 từ đã bọc
            markKnown: markKnownWordsInDom,  // tô lại các từ đã biết sau khi lưu/xóa từ vựng
            ensureLoaded: ensureMyVocabLoaded,// tải từ vựng cá nhân (chỉ tải lại khi đổi tài khoản)
            normalize: normalizeWord,
            toast: showVocabToast
        };
        // ===== KẾT THÚC TRA TỪ NHANH + TỪ VỰNG CÁ NHÂN =====
    })();
    // ===== KẾT THÚC LOGIC TIN NGẮN =====

    (function initGrammarTab() {
        const grammarAdminBar        = document.getElementById('grammar-admin-bar');
        const grammarAddFolderBtn    = document.getElementById('grammar-add-folder-btn');
        const grammarFolderGrid      = document.getElementById('grammar-folder-grid');
        const grammarPanels          = document.getElementById('grammar-panels');
        const grammarDetailPanel     = document.getElementById('grammar-detail-panel');
        const grammarBackBtn         = document.getElementById('grammar-panel-back-btn');
        const grammarPanelTitle      = document.getElementById('grammar-panel-title');
        const grammarDeleteBtn       = document.getElementById('grammar-delete-folder-btn');
        const grammarEditStatus      = document.getElementById('grammar-edit-status');

        const grammarVideoIframe     = document.getElementById('grammar-video-iframe');
        const grammarEditYoutubeBar  = document.getElementById('grammar-edit-youtube-bar');
        const grammarEditYoutubeInp  = document.getElementById('grammar-edit-youtube-input');
        const grammarEditYoutubeBtn  = document.getElementById('grammar-edit-youtube-btn');

        const grammarDriveIframe     = document.getElementById('grammar-drive-iframe');
        const grammarDetailBtn       = document.getElementById('grammar-detail-btn');
        const grammarEditDriveBar    = document.getElementById('grammar-edit-drive-bar');
        const grammarEditDriveInp    = document.getElementById('grammar-edit-drive-input');
        const grammarEditDriveBtn    = document.getElementById('grammar-edit-drive-btn');

        const grammarQuizOpenBtn     = document.getElementById('grammar-quiz-open-btn');
        const grammarEditQuizBar     = document.getElementById('grammar-edit-quiz-bar');
        const grammarEditQuizInp     = document.getElementById('grammar-edit-quiz-input');
        const grammarEditQuizBtn     = document.getElementById('grammar-edit-quiz-btn');

        const searchInput       = document.getElementById('grammar-search-input');
        const searchClear       = document.getElementById('grammar-search-clear');
        const quizModal          = document.getElementById('grammar-quiz-modal');
        const quizIframe         = document.getElementById('grammar-quiz-iframe');
        const quizClose          = document.getElementById('grammar-quiz-close');

        if (!grammarFolderGrid || !grammarDetailPanel) return;

        // Dữ liệu folder ngữ pháp giờ được tải động từ bảng "grammar_folders" trên Supabase
        // (xem file SQL "grammar_folders_setup.sql" để tạo bảng + chèn 4 folder mẫu ban đầu).
        // Chỉ tài khoản trong TEACHER_EMAILS (giangvien@gmail.com) mới có quyền
        // thêm / sửa / xóa — quyền này được chặn ở CẢ giao diện lẫn RLS trên Supabase.
        let GRAMMAR_DATA = [];
        let currentFolderId = null;

        function escapeHtmlGrammar(str) {
            return String(str == null ? '' : str).replace(/[&<>"']/g, ch => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[ch]));
        }

        // Nhận 1 link YouTube bất kỳ (watch/youtu.be/shorts/embed) → trả về link embed chuẩn
        function youtubeEmbedUrl(rawUrl) {
            const url = (rawUrl || '').trim();
            if (!url) return '';
            const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|watch\?v=|watch\?.*[?&]v=))([a-zA-Z0-9_-]{6,})/);
            if (match) return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1`;
            return url; // không nhận diện được thì dùng nguyên link đã dán (best-effort)
        }

        // Nhận 1 link chia sẻ Google Drive bất kỳ → trích ra ID file
        function driveFileId(rawUrl) {
            const url = (rawUrl || '').trim();
            if (!url) return null;
            let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (match) return match[1];
            match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (match) return match[1];
            if (/^[a-zA-Z0-9_-]{10,}$/.test(url)) return url; // có thể người dùng dán sẵn ID
            return null;
        }
        function drivePreviewUrl(rawUrl) {
            const id = driveFileId(rawUrl);
            return id ? `https://drive.google.com/file/d/${id}/preview` : 'about:blank';
        }
        function driveViewUrl(rawUrl) {
            const id = driveFileId(rawUrl);
            return id ? `https://drive.google.com/file/d/${id}/view` : (rawUrl || '').trim();
        }

        // ===== SUPABASE: CRUD cho bảng "grammar_folders" =====
        async function loadGrammarFoldersFromDB() {
            try {
                const { data, error } = await sb
                    .from('grammar_folders')
                    .select('*')
                    .order('id', { ascending: true });
                if (error) throw error;
                GRAMMAR_DATA = data || [];
            } catch (err) {
                console.error('Lỗi khi tải danh sách folder ngữ pháp:', err.message);
                GRAMMAR_DATA = [];
            }
        }

        // Tạo 1 folder mới (rỗng, sẵn sàng để giảng viên chỉnh sửa) — chỉ giảng viên được gọi
        async function createGrammarFolderDB() {
            const payload = {
                title: 'Folder mới (bấm vào tiêu đề để đổi tên)',
                youtube_url: '',
                drive_url: '',
                quiz_url: '',
                created_by: currentEmail
            };
            const { data, error } = await sb
                .from('grammar_folders')
                .insert(payload)
                .select()
                .single();
            if (error) throw error;
            return data;
        }

        // Cập nhật 1 hoặc nhiều trường của 1 folder — dùng cho autosave từng phần
        async function updateGrammarFolderDB(folderId, fields) {
            const payload = { ...fields, updated_at: new Date().toISOString(), updated_by: currentEmail };
            const { error } = await sb
                .from('grammar_folders')
                .update(payload)
                .eq('id', folderId);
            if (error) throw error;
        }

        // Xóa 1 folder
        async function deleteGrammarFolderDB(folderId) {
            const { error } = await sb
                .from('grammar_folders')
                .delete()
                .eq('id', folderId);
            if (error) throw error;
        }

        // Cập nhật 1 folder trong mảng GRAMMAR_DATA đang giữ trên trình duyệt (sau khi lưu thành công)
        function patchLocalFolder(folderId, fields) {
            const f = GRAMMAR_DATA.find(x => String(x.id) === String(folderId));
            if (f) Object.assign(f, fields);
        }

        // Helper: hiển thị folder list, ẩn panel chi tiết
        function showFolderList() {
            grammarFolderGrid.style.display = '';
            grammarPanels.style.display = 'none';
            grammarDetailPanel.classList.remove('active');
            currentFolderId = null;
        }

        // Render danh sách thẻ folder (tải danh sách từ Supabase trước khi vẽ)
        async function renderGrammarFolders() {
            if (grammarAdminBar) grammarAdminBar.style.display = isTeacher ? 'flex' : 'none';
            grammarFolderGrid.innerHTML = '<p class="grammar-loading-msg">Đang tải danh sách folder...</p>';

            await loadGrammarFoldersFromDB();

            grammarFolderGrid.innerHTML = '';
            if (GRAMMAR_DATA.length === 0) {
                grammarFolderGrid.innerHTML = '<p class="grammar-empty-msg">Chưa có folder nào.</p>';
            } else {
                GRAMMAR_DATA.forEach(folder => {
                    const card = document.createElement('div');
                    card.className = 'folder-card grammar-folder-card';
                    card.dataset.folderId = folder.id;
                    card.innerHTML = `
                        📁 ${escapeHtmlGrammar(folder.title)}
                        ${isTeacher ? `<button type="button" class="grammar-card-delete-btn" data-folder-id="${folder.id}" title="Xóa folder này">🗑️</button>` : ''}
                    `;
                    card.addEventListener('click', (e) => {
                        if (e.target.closest('.grammar-card-delete-btn')) return; // nút xóa xử lý riêng
                        openFolder(folder);
                    });
                    grammarFolderGrid.appendChild(card);
                });
            }

            // Nếu ô tìm kiếm đang có nội dung, áp dụng lại bộ lọc cho danh sách vừa tải
            if (searchInput && searchInput.value.trim()) doSearch(searchInput.value);
        }

        // Xóa folder ngay trên thẻ (danh sách) — chỉ giảng viên thấy nút này
        grammarFolderGrid.addEventListener('click', async (e) => {
            const btn = e.target.closest('.grammar-card-delete-btn');
            if (!btn || !isTeacher) return;
            const folderId = btn.dataset.folderId;
            const folder = GRAMMAR_DATA.find(f => String(f.id) === String(folderId));
            if (!confirm(`Xóa folder "${folder ? folder.title : ''}"? Hành động này không thể hoàn tác.`)) return;
            btn.disabled = true;
            try {
                await deleteGrammarFolderDB(folderId);
                await renderGrammarFolders();
            } catch (err) {
                alert('Xóa folder thất bại: ' + err.message);
                btn.disabled = false;
            }
        });

        // Thêm folder mới — tạo 1 folder rỗng trên Supabase rồi mở luôn để giảng viên nhập liệu
        if (grammarAddFolderBtn) {
            grammarAddFolderBtn.addEventListener('click', async () => {
                if (!isTeacher) return;
                grammarAddFolderBtn.disabled = true;
                grammarAddFolderBtn.textContent = 'Đang tạo...';
                try {
                    const newFolder = await createGrammarFolderDB();
                    GRAMMAR_DATA.push(newFolder);
                    openFolder(newFolder);
                } catch (err) {
                    alert('Tạo folder mới thất bại: ' + err.message);
                } finally {
                    grammarAddFolderBtn.disabled = false;
                    grammarAddFolderBtn.textContent = '➕ Thêm folder mới';
                }
            });
        }

        // Mở 1 folder → hiển thị panel chi tiết, đổ dữ liệu vào video/ảnh/bài kiểm tra
        function openFolder(folder) {
            currentFolderId = folder.id;
            grammarFolderGrid.style.display = 'none';
            grammarPanels.style.display = 'block';
            grammarDetailPanel.classList.add('active');
            grammarEditStatus.textContent = '';

            // Tiêu đề (chỉ giảng viên mới sửa được trực tiếp)
            grammarPanelTitle.textContent = folder.title || '';
            grammarPanelTitle.contentEditable = isTeacher ? 'true' : 'false';
            grammarPanelTitle.classList.toggle('grammar-editable', isTeacher);

            // Video YouTube
            grammarVideoIframe.src = youtubeEmbedUrl(folder.youtube_url) || 'about:blank';
            if (grammarEditYoutubeBar) grammarEditYoutubeBar.style.display = isTeacher ? 'flex' : 'none';
            if (grammarEditYoutubeInp) grammarEditYoutubeInp.value = folder.youtube_url || '';

            // Hình ảnh minh họa (Google Drive)
            grammarDriveIframe.src = drivePreviewUrl(folder.drive_url);
            grammarDetailBtn.dataset.quizUrl = driveViewUrl(folder.drive_url);
            if (grammarEditDriveBar) grammarEditDriveBar.style.display = isTeacher ? 'flex' : 'none';
            if (grammarEditDriveInp) grammarEditDriveInp.value = folder.drive_url || '';

            // Bài kiểm tra
            grammarQuizOpenBtn.dataset.quizUrl = folder.quiz_url || '';
            if (grammarEditQuizBar) grammarEditQuizBar.style.display = isTeacher ? 'flex' : 'none';
            if (grammarEditQuizInp) grammarEditQuizInp.value = folder.quiz_url || '';

            // Nút xóa folder (trong panel chi tiết) — chỉ giảng viên
            grammarDeleteBtn.style.display = isTeacher ? 'inline-block' : 'none';
        }

        // Nút quay lại danh sách folder
        grammarBackBtn.addEventListener('click', showFolderList);

        // ===== AUTOSAVE: TIÊU ĐỀ (giảng viên gõ trực tiếp vào tiêu đề) =====
        let grammarTitleSaveTimer = null;
        grammarPanelTitle.addEventListener('input', () => {
            if (!isTeacher || currentFolderId === null) return;
            grammarEditStatus.textContent = 'Đang gõ...';
            clearTimeout(grammarTitleSaveTimer);
            grammarTitleSaveTimer = setTimeout(async () => {
                const newTitle = grammarPanelTitle.textContent.trim();
                try {
                    await updateGrammarFolderDB(currentFolderId, { title: newTitle });
                    patchLocalFolder(currentFolderId, { title: newTitle });
                    grammarEditStatus.textContent = '💾 Đã lưu tiêu đề.';
                } catch (err) {
                    grammarEditStatus.textContent = '❌ Lưu thất bại: ' + err.message;
                }
            }, 800);
        });

        // ===== CẬP NHẬT LINK YOUTUBE: dán link rồi bấm nút =====
        if (grammarEditYoutubeBtn) {
            grammarEditYoutubeBtn.addEventListener('click', async () => {
                if (!isTeacher || currentFolderId === null) return;
                const url = grammarEditYoutubeInp.value.trim();
                if (!url) { alert('Vui lòng dán link YouTube trước khi cập nhật.'); return; }
                grammarEditYoutubeBtn.disabled = true;
                const oldLabel = grammarEditYoutubeBtn.textContent;
                grammarEditYoutubeBtn.textContent = 'Đang lưu...';
                try {
                    await updateGrammarFolderDB(currentFolderId, { youtube_url: url });
                    patchLocalFolder(currentFolderId, { youtube_url: url });
                    grammarVideoIframe.src = youtubeEmbedUrl(url);
                    grammarEditYoutubeBtn.textContent = '✅ Đã cập nhật';
                    setTimeout(() => { grammarEditYoutubeBtn.textContent = oldLabel; grammarEditYoutubeBtn.disabled = false; }, 1300);
                } catch (err) {
                    alert('Cập nhật video thất bại: ' + err.message);
                    grammarEditYoutubeBtn.textContent = oldLabel;
                    grammarEditYoutubeBtn.disabled = false;
                }
            });
        }

        // ===== CẬP NHẬT LINK GOOGLE DRIVE: dán link rồi bấm nút =====
        if (grammarEditDriveBtn) {
            grammarEditDriveBtn.addEventListener('click', async () => {
                if (!isTeacher || currentFolderId === null) return;
                const url = grammarEditDriveInp.value.trim();
                if (!url) { alert('Vui lòng dán link Google Drive trước khi cập nhật.'); return; }
                grammarEditDriveBtn.disabled = true;
                const oldLabel = grammarEditDriveBtn.textContent;
                grammarEditDriveBtn.textContent = 'Đang lưu...';
                try {
                    await updateGrammarFolderDB(currentFolderId, { drive_url: url });
                    patchLocalFolder(currentFolderId, { drive_url: url });
                    grammarDriveIframe.src = drivePreviewUrl(url);
                    grammarDetailBtn.dataset.quizUrl = driveViewUrl(url);
                    grammarEditDriveBtn.textContent = '✅ Đã cập nhật';
                    setTimeout(() => { grammarEditDriveBtn.textContent = oldLabel; grammarEditDriveBtn.disabled = false; }, 1300);
                } catch (err) {
                    alert('Cập nhật ảnh thất bại: ' + err.message);
                    grammarEditDriveBtn.textContent = oldLabel;
                    grammarEditDriveBtn.disabled = false;
                }
            });
        }

        // ===== CẬP NHẬT LINK BÀI KIỂM TRA: dán link rồi bấm nút =====
        if (grammarEditQuizBtn) {
            grammarEditQuizBtn.addEventListener('click', async () => {
                if (!isTeacher || currentFolderId === null) return;
                const url = grammarEditQuizInp.value.trim();
                if (!url) { alert('Vui lòng dán link bài kiểm tra trước khi cập nhật.'); return; }
                grammarEditQuizBtn.disabled = true;
                const oldLabel = grammarEditQuizBtn.textContent;
                grammarEditQuizBtn.textContent = 'Đang lưu...';
                try {
                    await updateGrammarFolderDB(currentFolderId, { quiz_url: url });
                    patchLocalFolder(currentFolderId, { quiz_url: url });
                    grammarQuizOpenBtn.dataset.quizUrl = url;
                    grammarEditQuizBtn.textContent = '✅ Đã cập nhật';
                    setTimeout(() => { grammarEditQuizBtn.textContent = oldLabel; grammarEditQuizBtn.disabled = false; }, 1300);
                } catch (err) {
                    alert('Cập nhật bài kiểm tra thất bại: ' + err.message);
                    grammarEditQuizBtn.textContent = oldLabel;
                    grammarEditQuizBtn.disabled = false;
                }
            });
        }

        // ===== XÓA FOLDER ĐANG MỞ (trong panel chi tiết) =====
        grammarDeleteBtn.addEventListener('click', async () => {
            if (!isTeacher || currentFolderId === null) return;
            const folder = GRAMMAR_DATA.find(f => String(f.id) === String(currentFolderId));
            if (!confirm(`Xóa folder "${folder ? folder.title : ''}"? Hành động này không thể hoàn tác.`)) return;
            grammarDeleteBtn.disabled = true;
            try {
                await deleteGrammarFolderDB(currentFolderId);
                showFolderList();
                await renderGrammarFolders();
            } catch (err) {
                alert('Xóa folder thất bại: ' + err.message);
            } finally {
                grammarDeleteBtn.disabled = false;
            }
        });

        // Nút xem chi tiết hình minh họa → mở tab mới (tránh lỗi iframe Google Drive)
        grammarDetailBtn.addEventListener('click', () => {
            const url = grammarDetailBtn.dataset.quizUrl;
            if (url) window.open(url, '_blank');
        });

        // Nút kiểm tra → mở modal
        grammarQuizOpenBtn.addEventListener('click', () => {
            const url = grammarQuizOpenBtn.dataset.quizUrl;
            if (url && quizModal && quizIframe) {
                quizIframe.src = url;
                quizModal.style.display = 'flex';
                quizModal.querySelector('span').textContent = '✏️ Bài kiểm tra ngữ pháp';
            }
        });

        // Đóng modal kiểm tra
        if (quizClose) {
            quizClose.addEventListener('click', () => {
                quizModal.style.display = 'none';
                quizIframe.src = 'about:blank';
            });
        }
        if (quizModal) {
            quizModal.addEventListener('click', (e) => {
                if (e.target === quizModal) {
                    quizModal.style.display = 'none';
                    quizIframe.src = 'about:blank';
                }
            });
        }

        // Thanh tìm kiếm (tìm trên danh sách thẻ folder hiện có — được truy vấn lại mỗi lần
        // vì danh sách folder giờ là động, không còn cố định như trước)
        const noResults = document.createElement('div');
        noResults.id = 'grammar-no-results';
        noResults.textContent = 'Không tìm thấy kết quả phù hợp.';
        grammarFolderGrid.after(noResults);

        function doSearch(query) {
            const q = query.trim().toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let visibleCount = 0;
            const cards = grammarFolderGrid.querySelectorAll('.grammar-folder-card');

            cards.forEach(card => {
                const text = card.textContent.toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const match = !q || text.includes(q);
                card.classList.toggle('search-hidden', !match);
                card.classList.toggle('search-match', !!q && match);
                if (match) visibleCount++;
            });

            noResults.classList.toggle('visible', cards.length > 0 && visibleCount === 0);
            searchClear.classList.toggle('visible', !!q);
        }

        searchInput.addEventListener('input', () => {
            doSearch(searchInput.value);
        });

        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            doSearch('');
            searchInput.focus();
        });

        // Tải danh sách folder lần đầu, và tải lại mỗi khi bấm vào tab "Ngữ pháp"
        // (đảm bảo danh sách + quyền giảng viên luôn được cập nhật mới nhất)
        renderGrammarFolders();
        const grammarNavBtn = document.querySelector('.main-tab-btn[data-main-target="tab-ngu-phap"]');
        if (grammarNavBtn) grammarNavBtn.addEventListener('click', renderGrammarFolders);

    })();
    // ===== KẾT THÚC LOGIC TAB NGỮ PHÁP =====


    // =====================================================================
    // ===== TRÒ CHƠI LÔ TÔ (2 NGƯỜI CHƠI) — dùng Supabase Realtime =====
    // =====================================================================
    (function initLotoGame() {
        const lotoFolderCard = document.getElementById('loto-folder-card');
        if (!lotoFolderCard) return;

        const entertainmentGrid = document.getElementById('entertainment-folder-grid');
        const lotoPanel         = document.getElementById('loto-panel');
        const lotoBackBtn       = document.getElementById('loto-back-btn');
        const rosterLine        = document.getElementById('loto-roster-line');

        const setupScreen = document.getElementById('loto-setup-screen');
        const tableScreen = document.getElementById('loto-table-screen');
        const endScreen    = document.getElementById('loto-end-screen');

        const pickBtnP1    = document.getElementById('loto-pick-btn-player1');
        const pickBtnP2    = document.getElementById('loto-pick-btn-player2');
        const unpickBtnP1  = document.getElementById('loto-unpick-btn-player1');
        const unpickBtnP2  = document.getElementById('loto-unpick-btn-player2');
        const pickStatusP1 = document.getElementById('loto-pick-status-player1');
        const pickStatusP2 = document.getElementById('loto-pick-status-player2');
        const pickCardP1   = document.getElementById('loto-pick-card-player1');
        const pickCardP2   = document.getElementById('loto-pick-card-player2');
        const adminToggleInput = document.getElementById('loto-admin-toggle-input');
        const adminStatus      = document.getElementById('loto-admin-status');

        const startBox          = document.getElementById('loto-start-box');
        const timerCustomSetup  = document.getElementById('loto-timer-custom-setup');
        const startGameBtn      = document.getElementById('loto-start-game-btn');

        const adminZone     = document.getElementById('loto-admin-zone');
        const strikeDisplay = document.getElementById('loto-strike-display');
        const randomRow      = document.getElementById('loto-random-row');
        const randomBtn      = document.getElementById('loto-random-btn');
        const answerRow      = document.getElementById('loto-answer-row');
        const pendingNumberEl= document.getElementById('loto-pending-number');
        const answerInput   = document.getElementById('loto-answer-input');
        const callSubmitBtn = document.getElementById('loto-call-submit-btn');
        const answerFeedback= document.getElementById('loto-answer-feedback');
        const timerCustom   = document.getElementById('loto-timer-custom');
        const timerSaveBtn  = document.getElementById('loto-timer-save-btn');

        const currentResultEl = document.getElementById('loto-current-result');
        const timerDisplayEl  = document.getElementById('loto-timer-display');

        const blockP1 = document.getElementById('loto-block-player1');
        const blockP2 = document.getElementById('loto-block-player2');
        const badgeP1 = document.getElementById('loto-badge-player1');
        const badgeP2 = document.getElementById('loto-badge-player2');
        const sheetP1 = document.getElementById('loto-sheet-player1');
        const sheetP2 = document.getElementById('loto-sheet-player2');

        const logEl        = document.getElementById('loto-log');
        const endMessageEl = document.getElementById('loto-end-message');
        const restartBtn   = document.getElementById('loto-restart-btn');
        const resetBtn     = document.getElementById('loto-reset-btn');

        let lotoState = null;
        let lotoChannel = null;
        let countdownInterval = null;
        let timeoutFired = false;

        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = (str === null || str === undefined) ? '' : String(str);
            return div.innerHTML;
        }

        function translateLotoError(error) {
            const msg = (error && error.message) || '';
            const map = {
                role_taken: 'Vị trí này đã có người chọn rồi.',
                game_already_started: 'Ván chơi đã bắt đầu, không thể đổi vai trò lúc này.',
                missing_roles: 'Cần đủ Trọng tài, Người chơi 1 và Người chơi 2 trước khi bắt đầu.',
                only_admin_can_start: 'Chỉ trọng tài mới có thể bắt đầu trò chơi.',
                already_playing: 'Ván chơi đang diễn ra.',
                not_admin: 'Chỉ trọng tài mới có thể thực hiện thao tác này.',
                not_playing: 'Trò chơi chưa bắt đầu hoặc đã kết thúc.',
                call_in_progress: 'Đang có một lượt gọi số khác chưa kết thúc, hãy đợi.',
                empty_word: 'Vui lòng nhập chữ tiếng Anh.',
                already_called: 'Số này đã được gọi rồi, hãy nhập số khác.',
                no_number_drawn: 'Hãy bấm "🎲 Random số" trước để bốc số, rồi mới gõ chữ.',
                number_already_drawn: 'Đã có số đang chờ gõ chữ, hãy hoàn thành lượt này trước.',
                no_numbers_left: 'Đã gọi hết 25 số, không còn số nào để bốc.',
                already_answered: 'Bạn đã chọn ô rồi, hãy chờ kết quả lượt này.',
                not_owner: 'Bạn không có quyền chọn ô của người chơi này.',
                no_active_call: 'Hiện chưa có số nào được công bố.',
                only_admin_can_reset: 'Chỉ trọng tài hiện tại mới có thể reset.',
                cannot_release_while_playing: 'Không thể đổi vai trò khi ván chơi đang diễn ra.',
                not_your_role: 'Đây không phải vai trò của bạn.'
            };
            for (const key in map) {
                if (msg.includes(key)) return map[key];
            }
            return 'Có lỗi xảy ra (' + msg + '). Bạn đã chạy file loto_schema.sql trong Supabase SQL Editor chưa?';
        }

        // ---------------- MỞ / ĐÓNG PANEL ----------------
        function showPanel() {
            entertainmentGrid.style.display = 'none';
            lotoPanel.style.display = 'block';
            loadAndSubscribe();
        }
        function hidePanel() {
            lotoPanel.style.display = 'none';
            entertainmentGrid.style.display = '';
            if (lotoChannel) { sb.removeChannel(lotoChannel); lotoChannel = null; }
            stopCountdown();
        }
        lotoFolderCard.addEventListener('click', showPanel);
        lotoBackBtn.addEventListener('click', hidePanel);
        logoutBtn.addEventListener('click', hidePanel);

        async function loadAndSubscribe() {
            rosterLine.textContent = 'Đang tải dữ liệu ván chơi...';
            const { data, error } = await sb.from('loto_game').select('*').eq('id', 1).single();
            if (error) {
                rosterLine.textContent = '⚠️ Không tải được dữ liệu (' + error.message + '). Bạn đã chạy file loto_schema.sql trong Supabase SQL Editor chưa?';
                return;
            }
            lotoState = data;
            render();

            if (lotoChannel) sb.removeChannel(lotoChannel);
            lotoChannel = sb
                .channel('loto-game-channel')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'loto_game', filter: 'id=eq.1' }, payload => {
                    if (payload.new) {
                        lotoState = payload.new;
                        render();
                    }
                })
                .subscribe();
        }

        // ---------------- CHỌN / HỦY VAI TRÒ ----------------
        [pickBtnP1, pickBtnP2].forEach(btn => {
            btn.addEventListener('click', async () => {
                const role = btn.getAttribute('data-role');
                btn.disabled = true;
                const { data, error } = await sb.rpc('loto_claim_role', { p_role: role, p_user_id: currentUserId, p_email: currentEmail });
                if (error) { alert(translateLotoError(error)); btn.disabled = false; return; }
                lotoState = data; render();
            });
        });
        [unpickBtnP1, unpickBtnP2].forEach(btn => {
            btn.addEventListener('click', async () => {
                const role = btn.getAttribute('data-role');
                const { data, error } = await sb.rpc('loto_release_role', { p_role: role, p_user_id: currentUserId });
                if (error) { alert(translateLotoError(error)); return; }
                lotoState = data; render();
            });
        });
        adminToggleInput.addEventListener('change', async () => {
            const checked = adminToggleInput.checked;
            if (checked) {
                const { data, error } = await sb.rpc('loto_claim_role', { p_role: 'admin', p_user_id: currentUserId, p_email: currentEmail });
                if (error) { alert(translateLotoError(error)); adminToggleInput.checked = false; return; }
                lotoState = data; render();
            } else {
                const { data, error } = await sb.rpc('loto_release_role', { p_role: 'admin', p_user_id: currentUserId });
                if (error) { alert(translateLotoError(error)); adminToggleInput.checked = true; return; }
                lotoState = data; render();
            }
        });

        // ---------------- BẮT ĐẦU / CHƠI LẠI / RESET ----------------
        startGameBtn.addEventListener('click', async () => {
            const secs = Math.max(3, parseInt(timerCustomSetup.value, 10) || 15);
            startGameBtn.disabled = true;
            const { data, error } = await sb.rpc('loto_start_game', { p_user_id: currentUserId, p_timer_seconds: secs });
            startGameBtn.disabled = false;
            if (error) { alert(translateLotoError(error)); return; }
            lotoState = data; render();
        });
        restartBtn.addEventListener('click', async () => {
            const secs = (lotoState && lotoState.timer_seconds) || 15;
            const { data, error } = await sb.rpc('loto_start_game', { p_user_id: currentUserId, p_timer_seconds: secs });
            if (error) { alert(translateLotoError(error)); return; }
            lotoState = data; render();
        });
        resetBtn.addEventListener('click', async () => {
            if (!confirm('Reset toàn bộ trò chơi và bỏ chọn tất cả vai trò (Trọng tài, Người chơi 1, Người chơi 2)?')) return;
            const { data, error } = await sb.rpc('loto_reset_full', { p_user_id: currentUserId });
            if (error) { alert(translateLotoError(error)); return; }
            lotoState = data; render();
        });
        timerSaveBtn.addEventListener('click', async () => {
            const secs = Math.max(3, parseInt(timerCustom.value, 10) || 15);
            const { data, error } = await sb.rpc('loto_set_timer_seconds', { p_seconds: secs, p_user_id: currentUserId });
            if (error) { alert(translateLotoError(error)); return; }
            lotoState = data; render();
            answerFeedback.textContent = '✅ Đã lưu thời gian ' + secs + 's cho lượt gọi tiếp theo.';
            answerFeedback.className = 'loto-answer-feedback success';
        });

        // ---------------- TRỌNG TÀI BỐC SỐ NGẪU NHIÊN ----------------
        async function drawRandomNumber() {
            randomBtn.disabled = true;
            const { data, error } = await sb.rpc('loto_random_number', { p_user_id: currentUserId });
            randomBtn.disabled = false;
            if (error) { alert(translateLotoError(error)); return; }
            lotoState = data;
            answerFeedback.textContent = '';
            answerFeedback.className = 'loto-answer-feedback';
            render();
            answerInput.focus();
        }
        randomBtn.addEventListener('click', drawRandomNumber);

        // ---------------- TRỌNG TÀI GỌI SỐ ----------------
        async function submitCall() {
            const word = answerInput.value.trim();
            if (!word) return;
            const prevWarn = lotoState.warning_count;
            callSubmitBtn.disabled = true;
            const { data, error } = await sb.rpc('loto_submit_call', { p_word: word, p_user_id: currentUserId });
            callSubmitBtn.disabled = false;
            if (error) {
                answerFeedback.textContent = translateLotoError(error);
                answerFeedback.className = 'loto-answer-feedback error';
                return;
            }
            lotoState = data;
            answerInput.value = '';
            if (data.warning_count > prevWarn) {
                const lastWarn = (data.warning_log || []).slice(-1)[0] || 'Số không hợp lệ';
                answerFeedback.textContent = '⚠️ ' + lastWarn + ' — Nhắc nhở ' + data.warning_count + '/3';
                answerFeedback.className = 'loto-answer-feedback error';
            } else {
                answerFeedback.textContent = '✅ Đã công bố: "' + word + '"';
                answerFeedback.className = 'loto-answer-feedback success';
            }
            render();
        }
        callSubmitBtn.addEventListener('click', submitCall);
        answerInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitCall(); });

        // ---------------- NGƯỜI CHƠI CHỌN Ô ----------------
        function hasAnsweredThisRound(playerKey) {
            if (!lotoState.current_call) return false;
            const ans = playerKey === 'player1' ? lotoState.current_call.p1_answer : lotoState.current_call.p2_answer;
            return ans !== null && ans !== undefined;
        }

        async function submitAnswer(playerKey, number, cellEl) {
            cellEl.classList.add('disabled');
            const { data, error } = await sb.rpc('loto_submit_answer', { p_player: playerKey, p_number: number, p_user_id: currentUserId });
            if (error) {
                const fresh = await sb.from('loto_game').select('*').eq('id', 1).single();
                if (fresh.data) lotoState = fresh.data;
                render();
                return;
            }
            lotoState = data;
            render();
        }

        function buildSheetGrid(container, sheetArray, playerKey, isMine) {
            container.innerHTML = '';
            (sheetArray || []).forEach(num => {
                const cell = document.createElement('div');
                cell.className = 'loto-cell';
                cell.textContent = num;

                const status = (lotoState.cell_status || {})[num];
                if (status === 'green1' && playerKey === 'player1') cell.classList.add('marked');
                if (status === 'green2' && playerKey === 'player2') cell.classList.add('marked');
                if (status === 'gray') cell.classList.add('gray');

                const interactive = isMine && lotoState.status === 'playing' && !!lotoState.current_call &&
                    !status && !hasAnsweredThisRound(playerKey);

                if (!interactive) {
                    cell.classList.add('disabled');
                } else {
                    cell.addEventListener('click', () => submitAnswer(playerKey, num, cell));
                }
                container.appendChild(cell);
            });
        }

        // ---------------- ĐỒNG HỒ ĐẾM NGƯỢC ----------------
        function stopCountdown() {
            if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
        }
        function startOrSyncCountdown(cc) {
            stopCountdown();
            timeoutFired = false;
            function tick() {
                const remaining = cc.duration_seconds - (Date.now() / 1000 - cc.started_at);
                if (remaining <= 0) {
                    timerDisplayEl.textContent = '0';
                    timerDisplayEl.classList.add('danger');
                    if (!timeoutFired) {
                        timeoutFired = true;
                        sb.rpc('loto_resolve_timeout').then(({ data, error }) => {
                            if (!error && data) { lotoState = data; render(); }
                        });
                    }
                    stopCountdown();
                    return;
                }
                const r = Math.ceil(remaining);
                timerDisplayEl.textContent = r;
                timerDisplayEl.classList.toggle('warning', r <= 7 && r > 3);
                timerDisplayEl.classList.toggle('danger', r <= 3);
            }
            tick();
            countdownInterval = setInterval(tick, 200);
        }

        function renderCurrentCall() {
            const cc = lotoState.current_call;
            if (!cc) {
                const calledCount = (lotoState.called_numbers || []).length;
                currentResultEl.textContent = calledCount
                    ? 'Đang chờ trọng tài gọi số tiếp theo... (' + calledCount + '/25 đã gọi)'
                    : 'Đang chờ trọng tài gọi số đầu tiên...';
                timerDisplayEl.textContent = '--';
                timerDisplayEl.classList.remove('warning', 'danger');
                stopCountdown();
                return;
            }
            currentResultEl.innerHTML = 'Đáp án: <strong>' + escapeHtml(cc.word) + '</strong>';
            startOrSyncCountdown(cc);
        }

        // ---------------- VẼ GIAO DIỆN ----------------
        function updatePickCard(cardEl, statusEl, pickBtn, unpickBtn, ownerId, ownerEmail, isMine) {
            if (ownerId) {
                cardEl.classList.add('taken');
                cardEl.classList.toggle('mine', isMine);
                statusEl.textContent = isMine ? 'Đây là bạn ✅' : ('Đã chọn: ' + ownerEmail);
                pickBtn.style.display = 'none';
                unpickBtn.style.display = (isMine && lotoState.status !== 'playing') ? 'inline-block' : 'none';
            } else {
                cardEl.classList.remove('taken', 'mine');
                statusEl.textContent = 'Chưa có ai chọn';
                pickBtn.style.display = (lotoState.status !== 'playing') ? 'inline-block' : 'none';
                pickBtn.disabled = false;
                unpickBtn.style.display = 'none';
            }
        }

        function badgeFor(playerKey, isMine) {
            let html = '';
            if (isMine) html += '<span class="loto-player-badge badge-me">Bạn</span> ';
            if (lotoState.winner === playerKey) html += '<span class="loto-player-badge badge-win">Thắng</span>';
            else if (lotoState.winner && lotoState.winner !== playerKey && lotoState.winner !== 'admin_disqualified' && lotoState.winner !== 'draw') {
                html += '<span class="loto-player-badge badge-lose">Thua</span>';
            }
            return html;
        }

        function renderBoards(isP1, isP2) {
            badgeP1.innerHTML = badgeFor('player1', isP1);
            badgeP2.innerHTML = badgeFor('player2', isP2);
            blockP1.classList.toggle('my-sheet', isP1);
            blockP2.classList.toggle('my-sheet', isP2);
            blockP1.classList.toggle('winner', lotoState.winner === 'player1');
            blockP1.classList.toggle('loser', lotoState.winner === 'player2');
            blockP2.classList.toggle('winner', lotoState.winner === 'player2');
            blockP2.classList.toggle('loser', lotoState.winner === 'player1');

            buildSheetGrid(sheetP1, lotoState.sheet1, 'player1', isP1);
            buildSheetGrid(sheetP2, lotoState.sheet2, 'player2', isP2);
        }

        function renderLog() {
            let html = '<div style="font-weight:700;margin-bottom:4px;">📜 Lịch sử gọi số</div>';
            const calledEntries = (lotoState.called_numbers || []).map(num => {
                const st = (lotoState.cell_status || {})[num];
                let text, cls = '';
                if (st === 'green1') { text = 'Số ' + num + ' → 🟦 Người chơi 1 đúng & nhanh nhất'; cls = 'log-win'; }
                else if (st === 'green2') { text = 'Số ' + num + ' → 🟥 Người chơi 2 đúng & nhanh nhất'; cls = 'log-win'; }
                else if (st === 'gray') { text = 'Số ' + num + ' → không ai chọn đúng kịp lúc'; }
                else { text = 'Số ' + num + ' → đang chờ kết quả...'; }
                return '<div class="loto-log-entry ' + cls + '">' + escapeHtml(text) + '</div>';
            });
            html += calledEntries.length ? calledEntries.join('') : '<div class="loto-log-entry">Chưa có lượt gọi nào.</div>';

            if ((lotoState.warning_log || []).length) {
                html += '<div style="font-weight:700;margin:8px 0 4px;">⚠️ Cảnh báo trọng tài</div>';
                html += lotoState.warning_log.map(w => '<div class="loto-log-entry log-admin-err">' + escapeHtml(w) + '</div>').join('');
            }
            logEl.innerHTML = html;
            logEl.scrollTop = logEl.scrollHeight;
        }

        function renderEndScreen() {
            let msg;
            if (lotoState.winner === 'player1') msg = '🏆 Người chơi 1 chiến thắng! ' + (lotoState.win_reason || '');
            else if (lotoState.winner === 'player2') msg = '🏆 Người chơi 2 chiến thắng! ' + (lotoState.win_reason || '');
            else if (lotoState.winner === 'draw') msg = '🤝 Hòa! ' + (lotoState.win_reason || '');
            else if (lotoState.winner === 'admin_disqualified') msg = '🚫 Trọng tài đã thua cuộc! ' + (lotoState.win_reason || '');
            else msg = 'Ván chơi đã kết thúc.';
            endMessageEl.textContent = msg;
        }

        function render() {
            if (!lotoState) return;
            const isAdmin = lotoState.admin_id === currentUserId;
            const isP1 = lotoState.player1_id === currentUserId;
            const isP2 = lotoState.player2_id === currentUserId;

            rosterLine.textContent =
                '🎙️ Trọng tài: ' + (lotoState.admin_email || 'chưa có') +
                '   |   🟦 Người chơi 1: ' + (lotoState.player1_email || 'chưa có') +
                '   |   🟥 Người chơi 2: ' + (lotoState.player2_email || 'chưa có');

            updatePickCard(pickCardP1, pickStatusP1, pickBtnP1, unpickBtnP1, lotoState.player1_id, lotoState.player1_email, isP1);
            updatePickCard(pickCardP2, pickStatusP2, pickBtnP2, unpickBtnP2, lotoState.player2_id, lotoState.player2_email, isP2);

            if (lotoState.admin_id && lotoState.admin_id !== currentUserId) {
                adminToggleInput.checked = false;
                adminToggleInput.disabled = true;
                adminStatus.textContent = 'Trọng tài: ' + lotoState.admin_email;
            } else if (lotoState.admin_id === currentUserId) {
                adminToggleInput.checked = true;
                adminToggleInput.disabled = (lotoState.status === 'playing');
                adminStatus.textContent = 'Bạn là trọng tài ✅';
            } else {
                adminToggleInput.checked = false;
                adminToggleInput.disabled = (lotoState.status === 'playing');
                adminStatus.textContent = 'Chưa có ai làm trọng tài';
            }

            const allRolesFilled = !!(lotoState.admin_id && lotoState.player1_id && lotoState.player2_id);
            startBox.style.display = (lotoState.status === 'lobby' && isAdmin && allRolesFilled) ? 'flex' : 'none';

            setupScreen.style.display = (lotoState.status === 'lobby') ? 'flex' : 'none';
            tableScreen.style.display = (lotoState.status === 'playing' || lotoState.status === 'finished') ? 'flex' : 'none';
            endScreen.style.display = (lotoState.status === 'finished') ? 'flex' : 'none';
            resetBtn.style.display = (lotoState.admin_id || lotoState.player1_id || lotoState.player2_id) ? 'block' : 'none';

            if (lotoState.status === 'finished') renderEndScreen();

            if (lotoState.status === 'playing' || lotoState.status === 'finished') {
                adminZone.style.display = (isAdmin && lotoState.status === 'playing') ? 'flex' : 'none';
                if (isAdmin) {
                    strikeDisplay.textContent = 'Nhắc nhở: ' + lotoState.warning_count + '/3';
                    strikeDisplay.classList.toggle('danger', lotoState.warning_count >= 2);
                    timerCustom.value = lotoState.timer_seconds;
                    const callActive = !!lotoState.current_call;
                    const hasPending = lotoState.pending_number !== null && lotoState.pending_number !== undefined;

                    randomRow.style.display = (!callActive && !hasPending) ? 'flex' : 'none';
                    randomBtn.disabled = callActive || hasPending;

                    answerRow.style.display = (!callActive && hasPending) ? 'flex' : 'none';
                    if (hasPending) {
                        pendingNumberEl.textContent = '🎯 Số vừa random: ' + lotoState.pending_number;
                    }

                    answerInput.disabled = callActive;
                    callSubmitBtn.disabled = callActive;
                }
                renderCurrentCall();
                renderBoards(isP1, isP2);
                renderLog();
            } else {
                stopCountdown();
            }

            restartBtn.disabled = !isAdmin;
        }

    })();
    // ===== KẾT THÚC TRÒ CHƠI LÔ TÔ =====

    // ===================================================================
    // ===== BẮT ĐẦU: "CHO BÉ" — 50 CHỦ ĐỀ (flashcard / nối từ / câu chuyện) =====
    // ===================================================================
    (() => {
        const kidFolderCard   = document.getElementById('kid-folder-card');
        if (!kidFolderCard || typeof KID_TOPICS === 'undefined') return;

        const vocabFolderGrid = document.getElementById('vocab-folder-grid');
        const kidPanel        = document.getElementById('kid-panel');
        const kidBackBtn      = document.getElementById('kid-back-btn');
        const kidTopicGrid    = document.getElementById('kid-topic-grid');

        const kidTopicPanel     = document.getElementById('kid-topic-panel');
        const kidTopicBackBtn   = document.getElementById('kid-topic-back-btn');
        const kidTopicTitle     = document.getElementById('kid-topic-title');
        const kidSubtabs        = document.getElementById('kid-subtabs');

        let currentTopic = null;
        let flashIndex = 0;
        let flashOrder = [];

        // ================== [MỚI] ẢNH DỰ PHÒNG TỰ ĐỘNG QUA PIXABAY API ==================
        // Khi ảnh gốc của 1 từ vựng bị lỗi (404, mất link...), hệ thống sẽ tự động gọi
        // Pixabay API để tìm 1 ảnh khác PHÙ HỢP VỚI CHÍNH TỪ ĐÓ (vd "Cat" -> ảnh con mèo),
        // thay vì chỉ hiện 1 icon chung chung cho mọi trường hợp.
        //
        // ⚠️ BẠN CẦN TỰ ĐĂNG KÝ API KEY (miễn phí) TẠI: https://pixabay.com/api/docs/
        // rồi dán vào biến PIXABAY_API_KEY bên dưới. Vì đây là web app chạy hoàn toàn
        // phía trình duyệt (không có server riêng), API key sẽ lộ ra nếu ai đó xem
        // mã nguồn trang (View Source). Với gói Pixabay miễn phí thì rủi ro thấp (chỉ bị
        // giới hạn số lượt gọi/giờ nếu bị lạm dụng, không tốn phí), nhưng bạn nên biết điều này.
        const PIXABAY_API_KEY = '56544847-409d66abd567108a329537591';

        // Ảnh dự phòng "cuối cùng" (icon hình ảnh trung tính) - chỉ dùng khi:
        //   - chưa cấu hình PIXABAY_API_KEY, HOẶC
        //   - gọi API cũng thất bại / không tìm thấy kết quả nào
        const KID_IMG_FALLBACK = 'https://pixabay.com/get/g35bba82e19b67f01c030530e510650a0f492021083641f5b76f475ca52ccb857865f553ffb533dd6a508974fe7b3b661_1920.png?longlived=';

        // Cache kết quả tra cứu để không gọi API nhiều lần cho cùng 1 từ
        const kidPixabayCache = {};

        // Escape ký tự đặc biệt để nhét an toàn vào thuộc tính HTML/JS string bên dưới
        function kidEscAttr(s) {
            return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }

        // Gọi Pixabay API tìm ảnh theo từ khoá tiếng Anh, có cache + fallback an toàn
        async function kidFetchPixabayImage(term) {
            if (kidPixabayCache[term] !== undefined) return kidPixabayCache[term];
            if (!PIXABAY_API_KEY || PIXABAY_API_KEY === 'YOUR_PIXABAY_API_KEY_HERE') {
                return null; // chưa cấu hình key -> để hàm gọi dùng ảnh dự phòng chung
            }
            try {
                const url = `https://pixabay.com/api/?key=${encodeURIComponent(PIXABAY_API_KEY)}&q=${encodeURIComponent(term)}&image_type=photo&safesearch=true&per_page=3`;
                const res = await fetch(url);
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const data = await res.json();
                const found = (data.hits && data.hits.length > 0) ? data.hits[0].webformatURL : null;
                kidPixabayCache[term] = found;
                return found;
            } catch (err) {
                console.warn(`[Pixabay] Không lấy được ảnh cho từ "${term}":`, err);
                kidPixabayCache[term] = null;
                return null;
            }
        }

        // Hàm xử lý khi 1 thẻ <img> từ vựng bị lỗi (gọi từ thuộc tính onerror bên dưới):
        // 1) Hiện ngay icon dự phòng trong lúc chờ
        // 2) Âm thầm gọi Pixabay API tìm ảnh đúng từ đó, thay vào nếu tìm được
        window.kidHandleImgError = function (imgEl, term) {
            imgEl.onerror = null; // tránh lặp vô hạn nếu ảnh dự phòng cũng lỗi
            imgEl.src = KID_IMG_FALLBACK;
            imgEl.classList.add('kid-img-fallback');

            kidFetchPixabayImage(term).then((foundUrl) => {
                if (!foundUrl) return; // giữ nguyên icon dự phòng nếu không tìm được ảnh nào khác
                imgEl.onerror = function () {
                    imgEl.onerror = null;
                    imgEl.src = KID_IMG_FALLBACK;
                    imgEl.classList.add('kid-img-fallback');
                };
                imgEl.src = foundUrl;
                imgEl.classList.remove('kid-img-fallback');
            });
        };

        // Thuộc tính onerror gắn vào mọi thẻ <img> từ vựng
        function kidImgErrorAttr(term) {
            return `onerror="window.kidHandleImgError(this, '${kidEscAttr(term)}')"`;
        }
        // ================================================================================

        // ---------- Danh sách chủ đề ----------
        function renderTopicGrid() {
            kidTopicGrid.innerHTML = '';
            KID_TOPICS.forEach(topic => {
                const card = document.createElement('div');
                card.className = 'kid-topic-card';
                card.innerHTML = `
                    <span class="kid-icon">${topic.icon}</span>
                    <div class="kid-title">${topic.title}</div>
                    <div class="kid-count">${topic.words.length} từ vựng</div>
                `;
                card.addEventListener('click', () => openTopic(topic));
                kidTopicGrid.appendChild(card);
            });
        }

        kidFolderCard.addEventListener('click', () => {
            vocabFolderGrid.style.display = 'none';
            kidPanel.style.display = 'block';
            kidTopicPanel.style.display = 'none';
            renderTopicGrid();
        });

        kidBackBtn.addEventListener('click', () => {
            kidPanel.style.display = 'none';
            vocabFolderGrid.style.display = '';
        });

        kidTopicBackBtn.addEventListener('click', () => {
            kidTopicPanel.style.display = 'none';
            kidPanel.style.display = 'block';
        });

        // ---------- Mở 1 chủ đề ----------
        function openTopic(topic) {
            currentTopic = topic;
            kidPanel.style.display = 'none';
            kidTopicPanel.style.display = 'block';
            kidTopicTitle.textContent = `${topic.icon} ${topic.title}`;

            // reset về tab flashcard
            kidSubtabs.querySelectorAll('.kid-subtab-btn').forEach(b => b.classList.remove('active'));
            kidSubtabs.querySelector('[data-sub="flashcard"]').classList.add('active');
            document.querySelectorAll('.kid-sub-content').forEach(el => el.style.display = 'none');
            document.getElementById('kid-sub-flashcard').style.display = 'block';

            initFlashcards(topic);
            initMatchGame(topic);
            initStory(topic);
            initGame(topic);
        }

        // ---------- Chuyển tab con ----------
        kidSubtabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.kid-subtab-btn');
            if (!btn) return;
            kidSubtabs.querySelectorAll('.kid-subtab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.kid-sub-content').forEach(el => el.style.display = 'none');
            document.getElementById('kid-sub-' + btn.dataset.sub).style.display = 'block';
        });

        // ---------- 1. FLASHCARD ----------
        const kidFlashcard   = document.getElementById('kid-flashcard');
        const kidFlashFront  = document.getElementById('kid-flash-front');
        const kidFlashBack   = document.getElementById('kid-flash-back');
        const kidFlashProg   = document.getElementById('kid-flash-progress');
        const kidFlashPrev   = document.getElementById('kid-flash-prev');
        const kidFlashNext   = document.getElementById('kid-flash-next');
        const kidFlashFlip   = document.getElementById('kid-flash-flip');

        // ----- Phát âm từ vựng bằng loa 🔊 (Web Speech API) -----
        // [MỚI] Bỏ alert chặn màn hình vì hàm này giờ còn được gọi TỰ ĐỘNG mỗi khi đổi thẻ/bấm từ.
        function speakEnglishWord(text) {
            if (!text) return;
            if (!('speechSynthesis' in window)) return; // trình duyệt không hỗ trợ -> bỏ qua trong im lặng
            window.speechSynthesis.cancel(); // dừng câu đang đọc dở (nếu có)
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'en-US';
            utter.rate = 0.85;
            window.speechSynthesis.speak(utter);
        }

        // ----- [MỚI] Âm thanh hiệu ứng ĐÚNG / SAI khi chơi Nối từ -----
        // Tự tạo âm thanh bằng Web Audio API (không cần file mp3 nào cả).
        let kidSfxCtx = null;
        function getKidSfxCtx() {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            if (!kidSfxCtx) kidSfxCtx = new AC();
            if (kidSfxCtx.state === 'suspended') kidSfxCtx.resume();
            return kidSfxCtx;
        }
        function playKidTone(freq, startTime, duration, type, peakGain) {
            const ctx = getKidSfxCtx();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type || 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
            gain.gain.setValueAtTime(0.0001, ctx.currentTime + startTime);
            gain.gain.linearRampToValueAtTime(peakGain || 0.22, ctx.currentTime + startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration);
            osc.connect(gain).connect(ctx.destination);
            osc.start(ctx.currentTime + startTime);
            osc.stop(ctx.currentTime + startTime + duration + 0.05);
        }
        // Chuỗi 3 nốt đi lên vui tai (Đô-Mi-Sol) báo hiệu NỐI ĐÚNG
        function playKidCorrectSound() {
            playKidTone(523.25, 0,    0.16, 'sine', 0.22); // C5
            playKidTone(659.25, 0.12, 0.16, 'sine', 0.22); // E5
            playKidTone(783.99, 0.24, 0.22, 'sine', 0.22); // G5
        }
        // 2 tiếng buzz trầm ngắn báo hiệu NỐI SAI
        function playKidWrongSound() {
            playKidTone(180, 0,    0.18, 'square', 0.16);
            playKidTone(140, 0.15, 0.22, 'square', 0.16);
        }

        // Bấm loa trên mặt trước thẻ flashcard -> phát âm, không lật thẻ
        kidFlashFront.addEventListener('click', (e) => {
            const btn = e.target.closest('.kf-speak-btn');
            if (!btn) return;
            e.stopPropagation();
            speakEnglishWord(btn.dataset.speak);
        });

        function initFlashcards(topic) {
            flashIndex = 0;
            flashOrder = topic.words;
            renderFlashcard();
        }

       function renderFlashcard() {
    const w = flashOrder[flashIndex];
    kidFlashcard.classList.remove('flipped');
    
    kidFlashFront.innerHTML = `
        <div class="kf-img-wrap">
            <img src="${w.img}" class="kf-img kf-anim-img" alt="${w.en}" ${kidImgErrorAttr(w.en)}>
            <span class="kf-sparkle kf-sparkle-1">✨</span>
            <span class="kf-sparkle kf-sparkle-2">✨</span>
        </div>
        <div class="kf-word-row kf-anim-word">
            <span class="kf-word">${w.en}</span>
            <button type="button" class="kf-speak-btn kf-anim-speak" data-speak="${w.en}" aria-label="Phát âm từ ${w.en}" title="Nghe phát âm">🔊</button>
        </div>
        <div class="kf-ipa kf-anim-ipa">${w.ipa}</div>
    `;
    
    kidFlashBack.innerHTML  = `<div class="kf-vi">${w.vi}</div><div class="kf-ex">"${w.ex}"</div>${w.trVi ? `<div class="kf-ex-vi">${w.trVi}</div>` : ''}`;
    kidFlashProg.textContent = `Thẻ ${flashIndex + 1} / ${flashOrder.length}`;

    // [MỚI] Tự động đọc từ tiếng Anh mỗi khi chuyển sang thẻ khác
    speakEnglishWord(w.en);


    // TẢI TRƯỚC (PRELOAD) ẢNH TIẾP THEO
    const nextIndex = (flashIndex + 1) % flashOrder.length;
    const nextWord = flashOrder[nextIndex];
    if (nextWord && nextWord.img) {
        const imgPreload = new Image();
        imgPreload.src = nextWord.img;
    }
}

        kidFlashFlip.addEventListener('click', () => kidFlashcard.classList.toggle('flipped'));
        kidFlashcard.addEventListener('click', () => kidFlashcard.classList.toggle('flipped'));
        kidFlashPrev.addEventListener('click', () => {
            flashIndex = (flashIndex - 1 + flashOrder.length) % flashOrder.length;
            renderFlashcard();
        });
        kidFlashNext.addEventListener('click', () => {
            flashIndex = (flashIndex + 1) % flashOrder.length;
            renderFlashcard();
        });

        // ---------- 2. NỐI TỪ ----------
        const kidMatchEn     = document.getElementById('kid-match-en');
        const kidMatchVi     = document.getElementById('kid-match-vi');
        const kidMatchResult = document.getElementById('kid-match-result');
        const kidMatchReset  = document.getElementById('kid-match-reset');

        let matchPairs = [];
        let matchSelectedEn = null;
        let matchSelectedVi = null;
        let matchCorrectCount = 0;

        function shuffleArr(arr) {
            const a = arr.slice();
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        function initMatchGame(topic) {
            // Lấy tối đa 8 từ ngẫu nhiên mỗi lượt chơi cho vừa màn hình
            const pool = shuffleArr(topic.words).slice(0, Math.min(8, topic.words.length));
            matchPairs = pool.map((w, i) => ({ id: i, en: w.en, vi: w.vi, img: w.img, done: false }));
            matchSelectedEn = null;
            matchSelectedVi = null;
            matchCorrectCount = 0;
            renderMatchGame();
        }

        function renderMatchGame() {
            kidMatchResult.textContent = '';
            const enShuffled = shuffleArr(matchPairs);
            const viShuffled = shuffleArr(matchPairs);

            kidMatchEn.innerHTML = '';
            enShuffled.forEach(p => {
                const el = document.createElement('div');
                el.className = 'kid-match-item';
                el.dataset.id = p.id;
                el.dataset.side = 'en';
                el.innerHTML = p.img
                    ? `<img class="kmi-img" src="${p.img}" alt="${p.en}" ${kidImgErrorAttr(p.en)}><span>${p.en}</span>`
                    : `<span>${p.en}</span>`;
                kidMatchEn.appendChild(el);
            });

            kidMatchVi.innerHTML = '';
            viShuffled.forEach(p => {
                const el = document.createElement('div');
                el.className = 'kid-match-item';
                el.textContent = p.vi;
                el.dataset.id = p.id;
                el.dataset.side = 'vi';
                kidMatchVi.appendChild(el);
            });
        }

        function handleMatchClick(e) {
            const item = e.target.closest('.kid-match-item');
            if (!item || item.classList.contains('correct')) return;
            const side = item.dataset.side;
            const id = item.dataset.id;

            if (side === 'en') {
                if (matchSelectedEn) matchSelectedEn.classList.remove('selected');
                matchSelectedEn = item;
                item.classList.add('selected');
                // [MỚI] Tự đọc từ tiếng Anh mỗi khi bấm vào
                const tappedPair = matchPairs.find(p => String(p.id) === String(id));
                if (tappedPair) speakEnglishWord(tappedPair.en);
            } else {
                if (matchSelectedVi) matchSelectedVi.classList.remove('selected');
                matchSelectedVi = item;
                item.classList.add('selected');
            }

            if (matchSelectedEn && matchSelectedVi) {
                if (matchSelectedEn.dataset.id === matchSelectedVi.dataset.id) {
                    matchSelectedEn.classList.remove('selected');
                    matchSelectedVi.classList.remove('selected');
                    matchSelectedEn.classList.add('correct');
                    matchSelectedVi.classList.add('correct');
                    matchCorrectCount++;
                    playKidCorrectSound(); // [MỚI] âm thanh báo nối đúng
                    kidMatchResult.textContent = `✅ Đúng! (${matchCorrectCount}/${matchPairs.length})`;
                    if (matchCorrectCount === matchPairs.length) {
                        kidMatchResult.textContent = `🎉 Hoàn thành! Bạn đã nối đúng tất cả ${matchPairs.length} cặp từ.`;
                    }
                } else {
                    matchSelectedEn.classList.add('wrong');
                    matchSelectedVi.classList.add('wrong');
                    playKidWrongSound(); // [MỚI] âm thanh báo nối sai
                    kidMatchResult.textContent = '❌ Chưa đúng, thử lại nhé!';
                    setTimeout(() => {
                        matchSelectedEn.classList.remove('selected', 'wrong');
                        matchSelectedVi.classList.remove('selected', 'wrong');
                    }, 600);
                }
                matchSelectedEn = null;
                matchSelectedVi = null;
            }
        }

        kidMatchEn.addEventListener('click', handleMatchClick);
        kidMatchVi.addEventListener('click', handleMatchClick);
        kidMatchReset.addEventListener('click', () => initMatchGame(currentTopic));

        // ---------- 3. CÂU CHUYỆN ----------
        const kidStoryTranslateBtn = document.getElementById('kid-story-translate-btn');
        const kidStoryTextVi = document.getElementById('kid-story-text-vi');

        function initStory(topic) {
            document.getElementById('kid-story-title').textContent = topic.story.title;
            document.getElementById('kid-story-text').innerHTML = topic.story.text;

            // [MỚI] Bản dịch tiếng Việt của câu chuyện (ẩn/hiện bằng nút bấm)
            if (topic.story.textVi) {
                kidStoryTextVi.innerHTML = topic.story.textVi;
                kidStoryTranslateBtn.style.display = '';
            } else {
                kidStoryTextVi.innerHTML = '';
                kidStoryTranslateBtn.style.display = 'none';
            }
            kidStoryTextVi.style.display = 'none';
            kidStoryTranslateBtn.textContent = '🇻🇳 Xem bản dịch tiếng Việt';

            // [MỚI] Hiển thị ảnh minh họa cho các từ vựng xuất hiện trong câu chuyện
            const gallery = document.getElementById('kid-story-gallery');
            gallery.innerHTML = '';
            const usedList = Array.isArray(topic.story.used) ? topic.story.used : [];

            usedList.forEach(term => {
                const word = topic.words.find(w => w.en.toLowerCase() === term.toLowerCase());
                if (!word) return; // không tìm thấy từ tương ứng thì bỏ qua

                const item = document.createElement('div');
                item.className = 'kid-story-gallery-item';
                item.innerHTML = word.img
                    ? `<div class="ksg-img-wrap"><img src="${word.img}" alt="${word.en}" ${kidImgErrorAttr(word.en)}></div><div class="ksg-label">${word.en}</div>`
                    : `<div class="ksg-img-wrap"><span class="ksg-placeholder">🖼️</span></div><div class="ksg-label">${word.en}</div>`;
                gallery.appendChild(item);
            });
        }

        if (kidStoryTranslateBtn) {
            kidStoryTranslateBtn.addEventListener('click', () => {
                const isHidden = kidStoryTextVi.style.display === 'none';
                kidStoryTextVi.style.display = isHidden ? '' : 'none';
                kidStoryTranslateBtn.textContent = isHidden
                    ? '🙈 Ẩn bản dịch tiếng Việt'
                    : '🇻🇳 Xem bản dịch tiếng Việt';
            });
        }

        // ---------- 4. TRÒ CHƠI HỨNG TỪ ----------
        const kidGameStartBtn    = document.getElementById('kid-game-start');
        const kidGamePauseBtn    = document.getElementById('kid-game-pause');
        const kidGameRestartBtn  = document.getElementById('kid-game-restart');
        const kidGameArea        = document.getElementById('kid-game-area');
        const kidGameStatus      = document.getElementById('kid-game-status');
        const kidGameSpeedInput  = document.getElementById('kid-game-speed');
        const kidGameOverlay     = document.getElementById('kid-game-overlay');
        const kidGameRedline     = document.getElementById('kid-game-redline');
        const kidGameResultPanel = document.getElementById('kid-game-result-panel');
        const kidGameKeyword     = document.getElementById('kid-game-keyword');

        let gameFullWords    = [];   // toàn bộ từ vựng chủ đề (nguồn tạo 2 lựa chọn gây nhiễu)
        let gameWordsPool    = [];   // 20 từ khóa (rút ra không lặp) dùng cho 20 lượt chơi
        let currentTurn      = 0;
        let isDeathMode      = false;
        let gameRunId        = 0;    // đổi mỗi lần init/bắt đầu để hủy hẹn giờ của lượt chơi cũ còn sót lại
        let gameLoopInterval = null;
        let turnTimer        = null; // hẹn giờ (có thể tạm dừng) nghỉ giữa 2 lượt, hoặc mở màn Tử Thần 8s
        // idle: chưa chạy (mới mở chủ đề / vừa bấm "Chơi lại", đang chờ bấm "Bắt đầu chơi")
        // running: đang chơi | paused: đang tạm dừng | finished: đã xong 20 lượt
        let gameStatus       = 'idle';
        let turnHistory      = []; // { turn, mode: 'normal'|'death', word, correct } — dùng để lập bảng tổng kết

        function kidShuffle(arr) { return [...arr].sort(() => 0.5 - Math.random()); }

        // ----- Hẹn giờ có thể TẠM DỪNG / TIẾP TỤC (giữ nguyên thời gian còn lại) -----
        function createPausableTimeout(callback, delay) {
            let remaining = delay;
            let startedAt = Date.now();
            let timerId = setTimeout(callback, remaining);
            let paused = false;
            return {
                pause() {
                    if (paused || !timerId) return;
                    clearTimeout(timerId);
                    timerId = null;
                    remaining -= (Date.now() - startedAt);
                    if (remaining < 0) remaining = 0;
                    paused = true;
                },
                resume() {
                    if (!paused) return;
                    paused = false;
                    startedAt = Date.now();
                    timerId = setTimeout(callback, remaining);
                },
                cancel() {
                    if (timerId) clearTimeout(timerId);
                    timerId = null;
                }
            };
        }

        function clearGameTimers() {
            if (gameLoopInterval) { clearInterval(gameLoopInterval); gameLoopInterval = null; }
            if (turnTimer)        { turnTimer.cancel(); turnTimer = null; }
        }

        // Chỉ dọn các ô đang rơi / hiệu ứng Tử Thần — KHÔNG đụng tới vạch đỏ hay lớp overlay
        // (giữ nguyên 2 phần tử này trong DOM để tránh mất tham chiếu khi chơi lại nhiều lần).
        function resetGameVisuals() {
            document.querySelectorAll('.kid-game-block, .hell-eyes-decor').forEach(el => el.remove());
            kidGameArea.classList.remove('death-mode', 'game-paused');
            kidGameOverlay.style.display = 'none';
            kidGameOverlay.innerHTML = '';
            if (kidGameResultPanel) { kidGameResultPanel.style.display = 'none'; kidGameResultPanel.innerHTML = ''; }
            if (kidGameKeyword) {
                kidGameKeyword.textContent = '';
                kidGameKeyword.classList.remove('kid-game-keyword-hidden');
            }
            kidGameSpeedInput.disabled = false;
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        }

        // Đưa trò chơi về trạng thái "sẵn sàng" (0/20, chế độ Thường) — dùng chung cho lúc mở
        // chủ đề, bấm "Chơi lại" (không tự chạy) và bấm "Bắt đầu chơi" (có tự chạy).
        function resetGameState(autoStart) {
            gameRunId++; // hủy mọi hẹn giờ / vòng lặp của phiên chơi trước đó
            clearGameTimers();
            resetGameVisuals();
            gameWordsPool = kidShuffle(gameFullWords).slice(0, 20); // 20 từ khóa, không lặp lại
            currentTurn = 0;
            isDeathMode = false;
            turnHistory = [];
            gameStatus = 'idle';
            kidGameStatus.textContent = `Lượt: 0/20 | Chế độ: Thường`;
            if (kidGamePauseBtn) {
                kidGamePauseBtn.disabled = true;
                kidGamePauseBtn.textContent = '⏸ Dừng lại';
                kidGamePauseBtn.classList.remove('is-paused');
            }
            if (autoStart) {
                gameStatus = 'running';
                if (kidGameStartBtn) kidGameStartBtn.disabled = true;
                if (kidGamePauseBtn) kidGamePauseBtn.disabled = false;
                playTurn(gameRunId);
            } else {
                if (kidGameStartBtn) kidGameStartBtn.disabled = false;
            }
        }

        function initGame(topic) {
            gameFullWords = topic.words;
            resetGameState(false); // mở chủ đề -> chỉ chuẩn bị, chưa tự chạy
        }

        // Nút "Bắt đầu chơi": xáo bài mới và chạy luôn từ lượt 1.
        function startGame() {
            resetGameState(true);
        }

        // Nút "Chơi lại": CHỈ đưa về trạng thái ban đầu (0/20, chế độ Thường), KHÔNG tự
        // chạy — người chơi phải bấm "Bắt đầu chơi" thì ván mới mới thật sự bắt đầu.
        function restartGame() {
            resetGameState(false);
        }

        if (kidGameStartBtn) kidGameStartBtn.addEventListener('click', startGame);
        if (kidGameRestartBtn) kidGameRestartBtn.addEventListener('click', restartGame);

        // ----- Tạm dừng / Tiếp tục (nút bấm thủ công + tự động khi rời trò chơi) -----
        function pauseGame() {
            if (gameStatus !== 'running') return; // chỉ tạm dừng khi đang thực sự chơi
            gameStatus = 'paused';
            document.querySelectorAll('.kid-game-block').forEach(b => { b.style.animationPlayState = 'paused'; });
            if (turnTimer) turnTimer.pause();
            if ('speechSynthesis' in window) {
                try { window.speechSynthesis.pause(); } catch (e) { /* một số trình duyệt không hỗ trợ */ }
            }
            kidGameArea.classList.add('game-paused');
            if (kidGamePauseBtn) {
                kidGamePauseBtn.disabled = false;
                kidGamePauseBtn.textContent = '▶ Tiếp tục';
                kidGamePauseBtn.classList.add('is-paused');
            }
        }

        function resumeGame() {
            if (gameStatus !== 'paused') return;
            gameStatus = 'running';
            document.querySelectorAll('.kid-game-block').forEach(b => { b.style.animationPlayState = 'running'; });
            if (turnTimer) turnTimer.resume();
            if ('speechSynthesis' in window) {
                try { window.speechSynthesis.resume(); } catch (e) { /* một số trình duyệt không hỗ trợ */ }
            }
            kidGameArea.classList.remove('game-paused');
            if (kidGamePauseBtn) {
                kidGamePauseBtn.textContent = '⏸ Dừng lại';
                kidGamePauseBtn.classList.remove('is-paused');
            }
        }

        if (kidGamePauseBtn) {
            kidGamePauseBtn.addEventListener('click', () => {
                if (gameStatus === 'running') pauseGame();
                else if (gameStatus === 'paused') resumeGame();
            });
        }

        function playTurn(runId) {
            if (runId !== gameRunId) return; // phiên chơi cũ đã bị hủy, bỏ qua

            if (currentTurn >= 20) {
                finishGame(runId);
                return;
            }

            currentTurn++;
            const enteringDeathMode = (currentTurn === 11);
            isDeathMode = currentTurn > 10;
            kidGameStatus.textContent = `Lượt: ${currentTurn}/20 | Chế độ: ${isDeathMode ? 'TỬ THẦN 💀' : 'Thường'}`;
            kidGameArea.classList.toggle('death-mode', isDeathMode);
            kidGameSpeedInput.disabled = isDeathMode; // Tử Thần luôn dùng vận tốc mặc định 5-7s

            if (enteringDeathMode) {
                kidGameArea.insertAdjacentHTML('beforeend', '<div class="hell-eyes-decor"><span class="hell-eye"><span class="hell-pupil"></span></span><span class="hell-eye"><span class="hell-pupil"></span></span></div>');
                kidGameOverlay.innerHTML = "🔥 MODE TỬ THẦN BẮT ĐẦU 🔥<br><span style='font-size:18px; color:#fff;'>Nghe kỹ và bấm thật nhanh!</span>";
                kidGameOverlay.style.display = "flex";
                playKidVillainLaugh();

                turnTimer = createPausableTimeout(() => {
                    if (runId !== gameRunId) return;
                    kidGameOverlay.style.display = "none";
                    spawnFallingWords(runId);
                }, 8000); // đúng 8 giây thông báo trước khi bắt đầu
            } else {
                spawnFallingWords(runId);
            }
        }

        function spawnFallingWords(runId) {
            document.querySelectorAll('.kid-game-block').forEach(b => b.remove());

            const correctWord = gameWordsPool[currentTurn - 1];
            // 2 lựa chọn gây nhiễu, khác với từ khóa
            const distractPool = gameFullWords.filter(w => w !== correctWord);
            const wrongWords = kidShuffle(distractPool).slice(0, 2);
            const options = kidShuffle([correctWord, ...wrongWords]);

            // Đọc từ khóa bằng giọng đọc — áp dụng cho cả 2 chế độ (Thường + Tử Thần)
            speakEnglishWord(correctWord.en);

            // Ô hiển thị từ khóa: chỉ hiện với 10 lượt chế độ Thường; 10 lượt Tử Thần thì ẩn đi
            // (bắt buộc phải nghe giọng đọc và tự đoán, không được nhìn chữ có sẵn).
            if (kidGameKeyword) {
                if (isDeathMode) {
                    kidGameKeyword.textContent = '🔒 Bí mật — chỉ nghe và đoán!';
                    kidGameKeyword.classList.add('kid-game-keyword-hidden');
                } else {
                    kidGameKeyword.textContent = `🎯 Từ khóa: ${correctWord.en}`;
                    kidGameKeyword.classList.remove('kid-game-keyword-hidden');
                }
            }

            let baseSpeed = parseFloat(kidGameSpeedInput.value);
            if (isNaN(baseSpeed) || baseSpeed < 3) baseSpeed = 6;

            function recordTurnResult(isCorrect) {
                turnHistory.push({
                    turn: currentTurn,
                    mode: isDeathMode ? 'death' : 'normal',
                    word: correctWord.en,
                    correct: isCorrect
                });
            }

            const blocks = [];
            options.forEach((opt, index) => {
                const block = document.createElement('div');
                block.className = 'kid-game-block';
                // Cả 2 chế độ đều hiện tiếng Anh trên ô rơi (Tử Thần chỉ khác ở nền tối + nhịp gấp hơn).
                block.textContent = opt.en;
                block.style.left = `${15 + index * 30}%`;

                // Vận tốc rơi RIÊNG cho từng ô (3 ô rơi nhanh chậm khác nhau)
                const fallSeconds = isDeathMode
                    ? (4 + Math.random() * 2)                                        // Tử Thần: luôn mặc định 5-7s
                    : Math.min(12, Math.max(3, baseSpeed + (Math.random() * 2 - 1))); // Thường: dao động quanh mức người chơi chọn
                // Dùng animation CSS (thay vì transition + đổi top bằng setTimeout) để
                // ô luôn chắc chắn rơi ngay khi vừa được thêm vào, không phụ thuộc thời điểm reflow.
                block.style.animationDuration = fallSeconds.toFixed(2) + 's';

                kidGameArea.appendChild(block);
                blocks.push({ el: block });

                block.addEventListener('click', () => {
                    if (runId !== gameRunId || gameStatus === 'paused' || block.style.pointerEvents === 'none') return;
                    freezeBlocks();

                    const isCorrect = (opt === correctWord);
                    if (isCorrect) {
                        block.style.backgroundColor = '#2fb56d';
                        block.style.color = '#fff';
                        playKidCorrectSound(); // "good job"
                    } else {
                        block.style.backgroundColor = '#ff5d5d';
                        block.style.color = '#fff';
                        playKidWrongSound(); // "you lose"
                        if (isDeathMode) playKidVillainLaugh(); // thêm tiếng cười phản diện trầm
                    }
                    recordTurnResult(isCorrect);
                    endTurn(runId);
                });
            });

            // Theo dõi xem có ô nào (chưa ai bấm) vượt qua vạch đỏ chưa
            gameLoopInterval = setInterval(() => {
                if (runId !== gameRunId) { clearInterval(gameLoopInterval); return; }
                if (gameStatus === 'paused') return; // đang tạm dừng -> các ô không di chuyển, khỏi cần kiểm tra

                const lineRect = kidGameRedline.getBoundingClientRect();
                const passed = blocks.some(b => b.el.style.pointerEvents !== 'none' && b.el.getBoundingClientRect().bottom >= lineRect.top);

                if (passed) {
                    freezeBlocks();
                    playKidWrongSound(); // hết giờ = tính như chọn sai
                    if (isDeathMode) playKidVillainLaugh();
                    recordTurnResult(false);
                    endTurn(runId);
                }
            }, 50);

            function freezeBlocks() {
                clearInterval(gameLoopInterval);
                blocks.forEach(b => {
                    const frozenTop = getComputedStyle(b.el).top; // vị trí rơi hiện tại (đọc trước khi tắt animation)
                    b.el.style.animation = 'none'; // dừng animation rơi ngay lập tức
                    b.el.style.top = frozenTop;     // giữ nguyên tại chỗ, không nhảy về vị trí đầu
                    b.el.style.pointerEvents = 'none';
                });
            }
        }

        function endTurn(runId) {
            turnTimer = createPausableTimeout(() => {
                if (runId !== gameRunId) return;
                playTurn(runId);
            }, 2000); // lượt tiếp theo cách 2 giây kể từ khi lượt này kết thúc
        }

        // Kết thúc 20 lượt chơi -> hiện bảng tổng kết điểm
        function finishGame(runId) {
            if (runId !== gameRunId) return;
            gameStatus = 'finished';
            clearGameTimers();
            kidGameArea.classList.remove('game-paused', 'death-mode');
            document.querySelectorAll('.hell-eyes-decor').forEach(el => el.remove());
            if (kidGameStartBtn) kidGameStartBtn.disabled = false;
            if (kidGamePauseBtn) {
                kidGamePauseBtn.disabled = true;
                kidGamePauseBtn.textContent = '⏸ Dừng lại';
                kidGamePauseBtn.classList.remove('is-paused');
            }
            kidGameSpeedInput.disabled = false;
            renderResultPanel();
        }

        // Dựng bảng tổng kết: mỗi lượt 1 dòng. Từ khóa tiếng Anh chỉ hiện với các lượt
        // chế độ Thường (1-10); các lượt Tử Thần (11-20) giữ bí mật, chỉ hiện Đúng/Sai.
        function renderResultPanel() {
            if (!kidGameResultPanel) return;
            const correctCount = turnHistory.filter(h => h.correct).length;

            const rows = turnHistory.map(h => {
                const modeLabel = h.mode === 'death' ? 'Tử Thần 💀' : 'Thường';
                const keywordCell = h.mode === 'death' ? '🔒 Ẩn' : kidEscAttr(h.word);
                const resultCell = h.correct ? '✅ Đúng' : '❌ Sai';
                const rowClass = h.correct ? 'kid-result-row-correct' : 'kid-result-row-wrong';
                return `<tr class="${rowClass}"><td>${h.turn}</td><td>${modeLabel}</td><td>${keywordCell}</td><td>${resultCell}</td></tr>`;
            }).join('');

            kidGameResultPanel.innerHTML = `
                <h3 class="kid-result-title">🎉 Hoàn thành 20 lượt chơi!</h3>
                <div class="kid-result-score">Tổng điểm: ${correctCount}/20 câu đúng</div>
                <table class="kid-result-table">
                    <thead><tr><th>Lượt</th><th>Chế độ</th><th>Từ khóa</th><th>Kết quả</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
                <button type="button" id="kid-result-close-btn" class="kid-btn kid-btn-primary kid-result-close-btn">Đóng bảng kết quả</button>
            `;
            kidGameResultPanel.style.display = 'flex';

            const closeBtn = document.getElementById('kid-result-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => { kidGameResultPanel.style.display = 'none'; });
            }
        }

        // Tiếng cười phản diện trầm — phát khi vừa vào Mode Tử Thần và khi bấm sai trong Mode Tử Thần
        function playKidVillainLaugh() {
            const notes = [146.83, 130.81, 116.54, 98.00, 87.31]; // các nốt giáng dần, âm vực trầm
            notes.forEach((freq, i) => playKidTone(freq, i * 0.16, 0.24, 'sawtooth', 0.16));
        }

        // ----- Tự động tạm dừng khi rời khỏi trò chơi (đổi tab chính, đổi tab con
        // trong "Cho bé", quay lại danh sách chủ đề, ẩn/chuyển tab trình duyệt...) -----
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) pauseGame();
        });
        window.addEventListener('blur', pauseGame);

        mainTabBtns.forEach(btn => btn.addEventListener('click', pauseGame));
        if (kidBackBtn) kidBackBtn.addEventListener('click', pauseGame);
        if (kidTopicBackBtn) kidTopicBackBtn.addEventListener('click', pauseGame);
        kidSubtabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.kid-subtab-btn');
            if (btn && btn.dataset.sub !== 'game') pauseGame();
        });

    })();
    // ===== KẾT THÚC: "CHO BÉ" — 50 CHỦ ĐỀ =====

    // ===================================================================
    // ===== BẮT ĐẦU: "THCS/THPT" — LỚP 6 (flashcard / dịch câu / câu chuyện / trò chơi) =====
    // ===================================================================
    (() => {
        const thcsFolderCard = document.getElementById('thcs-folder-card');
        if (!thcsFolderCard) return;

        // Ánh xạ khối lớp -> bộ dữ liệu unit tương ứng (mỗi khối lớp có 1 file <lớp>-data.js riêng,
        // khai báo biến toàn cục GRADE<N>_UNITS). Dùng typeof vì các file dữ liệu khai báo bằng "const"
        // (const/let ở top-level không gắn vào window, nên phải kiểm tra bằng typeof thay vì window[...]).
        function thcsGetGradeUnits(gradeNum) {
            switch (gradeNum) {
                case 6: return (typeof GRADE6_UNITS !== 'undefined') ? GRADE6_UNITS : null;
                case 7: return (typeof GRADE7_UNITS !== 'undefined') ? GRADE7_UNITS : null;
                case 8: return (typeof GRADE8_UNITS !== 'undefined') ? GRADE8_UNITS : null;
                case 9: return (typeof GRADE9_UNITS !== 'undefined') ? GRADE9_UNITS : null;
                case 10: return (typeof GRADE10_UNITS !== 'undefined') ? GRADE10_UNITS : null;
                case 11: return (typeof GRADE11_UNITS !== 'undefined') ? GRADE11_UNITS : null;
                case 12: return (typeof GRADE12_UNITS !== 'undefined') ? GRADE12_UNITS : null;
                default: return null;
            }
        }
        if (!thcsGetGradeUnits(6)) return;

        const vocabFolderGrid   = document.getElementById('vocab-folder-grid');
        const thcsPanel         = document.getElementById('thcs-panel');
        const thcsBackBtn       = document.getElementById('thcs-back-btn');
        const thcsGradeGrid     = document.getElementById('thcs-grade-grid');

        const thcsGrade6Panel   = document.getElementById('thcs-grade6-panel');
        const thcsGrade6BackBtn = document.getElementById('thcs-grade6-back-btn');
        const thcsGradePanelTitle = document.getElementById('thcs-grade-panel-title');
        const thcsUnitGrid      = document.getElementById('thcs-unit-grid');

        const thcsUnitPanel     = document.getElementById('thcs-unit-panel');
        const thcsUnitBackBtn   = document.getElementById('thcs-unit-back-btn');
        const thcsUnitTitle     = document.getElementById('thcs-unit-title');
        const thcsSubtabs       = document.getElementById('thcs-subtabs');

        let currentUnit = null;
        let currentGradeUnits = null;
        let currentGradeNum = null;

        // ===================================================================
        // ----- TIẾN ĐỘ HOÀN THÀNH UNIT (lưu trên Supabase, bảng "thcs_unit_progress") -----
        // Một Unit được coi là HOÀN THÀNH khi học viên đã:
        //   1) Xem qua hết toàn bộ Flashcard của Unit đó, VÀ
        //   2) Làm đúng hết tất cả các câu ở mục "Dịch câu" theo đúng thứ tự (không sai câu nào).
        // Khi hoàn thành 1 Unit: folder Unit đó chuyển nền sang xanh lá, và Unit kế tiếp
        // được mở khóa. Mặc định chỉ Unit 1 của mỗi khối lớp được mở khóa sẵn.
        // (Xem file "thcs_progress_setup.sql" đi kèm để tạo bảng trên Supabase.)
        // ===================================================================
        let thcsProgressMap = {};             // "grade::unitId" -> {flashcard_done, translate_done, completed}
        let thcsProgressLoadedForUser = null; // userId đã tải xong — tránh gọi Supabase lặp lại

        function thcsProgressKey(gradeNum, unitId) {
            return gradeNum + '::' + unitId;
        }

        async function thcsLoadProgress() {
            if (!currentUserId) { thcsProgressMap = {}; return; }
            try {
                const { data, error } = await sb
                    .from('thcs_unit_progress')
                    .select('grade, unit_id, flashcard_done, translate_done, completed')
                    .eq('user_id', currentUserId);
                if (error) throw error;
                thcsProgressMap = {};
                (data || []).forEach(row => {
                    thcsProgressMap[thcsProgressKey(row.grade, row.unit_id)] = row;
                });
            } catch (err) {
                console.error('Lỗi khi tải tiến độ Unit (THCS/THPT):', err.message);
                thcsProgressMap = {};
            }
        }

        // Chỉ tải lại khi đổi tài khoản, để không gọi Supabase mỗi lần mở 1 Unit
        async function thcsEnsureProgressLoaded() {
            if (!currentUserId) { thcsProgressMap = {}; thcsProgressLoadedForUser = null; return; }
            if (thcsProgressLoadedForUser === currentUserId) return;
            await thcsLoadProgress();
            thcsProgressLoadedForUser = currentUserId;
        }

        function thcsGetProgress(gradeNum, unitId) {
            return thcsProgressMap[thcsProgressKey(gradeNum, unitId)] || { flashcard_done: false, translate_done: false, completed: false };
        }

        // Lưu (upsert) tiến độ của 1 Unit — patch chỉ chứa các cờ cần cập nhật.
        // Trả về bản ghi tiến độ đầy đủ sau khi gộp (đã tính lại completed).
        async function thcsSaveProgress(gradeNum, unitId, patch) {
            if (!gradeNum || !unitId) return null;
            const key = thcsProgressKey(gradeNum, unitId);
            const existing = thcsProgressMap[key] || { flashcard_done: false, translate_done: false, completed: false };
            const merged = Object.assign({}, existing, patch);
            merged.completed = !!(merged.flashcard_done && merged.translate_done);
            thcsProgressMap[key] = merged; // cập nhật cache ngay để UI phản hồi tức thì

            if (!currentUserId) return merged; // chưa đăng nhập: chỉ giữ tạm trong phiên này

            try {
                const payload = {
                    user_id: currentUserId,
                    grade: gradeNum,
                    unit_id: unitId,
                    flashcard_done: merged.flashcard_done,
                    translate_done: merged.translate_done,
                    completed: merged.completed,
                    updated_at: new Date().toISOString()
                };
                const { error } = await sb
                    .from('thcs_unit_progress')
                    .upsert(payload, { onConflict: 'user_id, grade, unit_id' });
                if (error) console.error('Lỗi khi lưu tiến độ Unit (THCS/THPT — kiểm tra RLS trên bảng thcs_unit_progress):', error);
            } catch (err) {
                console.error('Lỗi ngoại lệ khi lưu tiến độ Unit (THCS/THPT):', err.message);
            }
            return merged;
        }

        // Unit đầu tiên (index 0) của mỗi khối lớp luôn mở khóa; các Unit sau chỉ mở khóa
        // khi Unit ngay trước đó đã hoàn thành.
        function thcsIsUnitUnlocked(gradeNum, units, idx) {
            if (isTeacher) return true; // giảng viên luôn mở khóa hết tất cả Unit để tiện xem/soạn nội dung
            if (idx <= 0) return true;
            const prevUnit = units[idx - 1];
            if (!prevUnit) return true;
            return !!thcsGetProgress(gradeNum, prevUnit.id).completed;
        }

        function thcsNotifyUnitCompleted() {
            if (window.vocabTap && window.vocabTap.toast) {
                window.vocabTap.toast('🎉 Chúc mừng! Bạn đã hoàn thành Unit này. Unit tiếp theo đã được mở khóa.', 'success');
            }
        }
        function thcsNotifyLoginToSave() {
            if (window.vocabTap && window.vocabTap.toast) {
                window.vocabTap.toast('⚠️ Đăng nhập để lưu tiến độ hoàn thành Unit của bạn.', 'info');
            }
        }

        // ---------- Tiện ích dùng chung ----------
        function thcsEscAttr(s) {
            return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }
        function thcsEscHtml(s) {
            return String(s == null ? '' : s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
        function thcsImgErrorAttr(term) {
            // Tái dùng cơ chế tự tìm ảnh dự phòng (Pixabay) đã có sẵn ở phần "Cho bé"
            return `onerror="window.kidHandleImgError(this, '${thcsEscAttr(term)}')"`;
        }
        function thcsShuffle(arr) { return [...arr].sort(() => 0.5 - Math.random()); }

        function thcsSpeak(text) {
            if (!text) return;
            if (!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'en-US';
            utter.rate = 0.85;
            window.speechSynthesis.speak(utter);
        }

        // ----- Âm thanh hiệu ứng (tự tạo bằng Web Audio API, không cần file mp3) -----
        let thcsSfxCtx = null;
        function getThcsSfxCtx() {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            if (!thcsSfxCtx) thcsSfxCtx = new AC();
            if (thcsSfxCtx.state === 'suspended') thcsSfxCtx.resume();
            return thcsSfxCtx;
        }
        function thcsPlayTone(freq, startTime, duration, type, peakGain) {
            const ctx = getThcsSfxCtx();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type || 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
            gain.gain.setValueAtTime(0.0001, ctx.currentTime + startTime);
            gain.gain.linearRampToValueAtTime(peakGain || 0.22, ctx.currentTime + startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration);
            osc.connect(gain).connect(ctx.destination);
            osc.start(ctx.currentTime + startTime);
            osc.stop(ctx.currentTime + startTime + duration + 0.05);
        }
        function thcsPlayCorrectSound() {
            thcsPlayTone(523.25, 0,    0.16, 'sine', 0.22);
            thcsPlayTone(659.25, 0.12, 0.16, 'sine', 0.22);
            thcsPlayTone(783.99, 0.24, 0.22, 'sine', 0.22);
        }
        function thcsPlayWrongSound() {
            thcsPlayTone(180, 0,    0.18, 'square', 0.16);
            thcsPlayTone(140, 0.15, 0.22, 'square', 0.16);
        }
        function thcsPlayVillainLaugh() {
            const notes = [146.83, 130.81, 116.54, 98.00, 87.31];
            notes.forEach((freq, i) => thcsPlayTone(freq, i * 0.16, 0.24, 'sawtooth', 0.16));
        }

        // ---------- Bước 1: Danh sách khối lớp (6 -> 12) ----------
        function renderGradeGrid() {
            thcsGradeGrid.innerHTML = '';
            for (let g = 6; g <= 12; g++) {
                const gradeUnits = thcsGetGradeUnits(g);
                const isReady = !!gradeUnits;
                const card = document.createElement('div');
                card.className = 'kid-topic-card thcs-grade-card' + (isReady ? '' : ' locked');
                card.innerHTML = `
                    <span class="kid-icon">${isReady ? '📘' : '🔒'}</span>
                    <div class="kid-title">Lớp ${g}</div>
                    <div class="kid-count">${isReady ? (gradeUnits.length + ' unit') : 'Sắp ra mắt'}</div>
                `;
                if (isReady) {
                    card.addEventListener('click', () => {
                        currentGradeUnits = gradeUnits;
                        currentGradeNum = g;
                        if (thcsGradePanelTitle) thcsGradePanelTitle.textContent = `📁 Lớp ${g} (Global Success)`;
                        thcsPanel.style.display = 'none';
                        thcsGrade6Panel.style.display = 'block';
                        renderUnitGrid();
                    });
                } else {
                    card.title = 'Khối lớp này sẽ được cập nhật sau nhé!';
                }
                thcsGradeGrid.appendChild(card);
            }
        }

        thcsFolderCard.addEventListener('click', () => {
            vocabFolderGrid.style.display = 'none';
            thcsPanel.style.display = 'block';
            thcsGrade6Panel.style.display = 'none';
            thcsUnitPanel.style.display = 'none';
            renderGradeGrid();
        });

        thcsBackBtn.addEventListener('click', () => {
            thcsPanel.style.display = 'none';
            vocabFolderGrid.style.display = '';
        });

        thcsGrade6BackBtn.addEventListener('click', () => {
            thcsGrade6Panel.style.display = 'none';
            thcsPanel.style.display = 'block';
        });

        // ---------- Bước 2: Danh sách Unit của khối lớp đang chọn ----------
        async function renderUnitGrid() {
            await thcsEnsureProgressLoaded();
            thcsUnitGrid.innerHTML = '';
            (currentGradeUnits || []).forEach((unit, idx) => {
                const progress = thcsGetProgress(currentGradeNum, unit.id);
                const unlocked = thcsIsUnitUnlocked(currentGradeNum, currentGradeUnits, idx);
                const card = document.createElement('div');
                card.className = 'kid-topic-card thcs-unit-card' +
                    (progress.completed ? ' completed' : '') +
                    (!unlocked ? ' locked' : '');
                card.innerHTML = `
                    <span class="kid-icon">${unlocked ? unit.icon : '🔒'}</span>
                    <div class="kid-title">Unit ${unit.number}: ${unit.titleVi}</div>
                    <div class="kid-count">${progress.completed ? '✅ Đã hoàn thành' : (unlocked ? unit.words.length + ' từ vựng' : 'Hoàn thành Unit trước để mở khóa')}</div>
                `;
                if (unlocked) {
                    card.addEventListener('click', () => openUnit(unit));
                } else {
                    card.title = 'Hoàn thành Unit trước đó để mở khóa Unit này!';
                }
                thcsUnitGrid.appendChild(card);
            });
        }

        thcsUnitBackBtn.addEventListener('click', () => {
            thcsPauseGame();
            thcsUnitPanel.style.display = 'none';
            thcsGrade6Panel.style.display = 'block';
            renderUnitGrid(); // làm mới trạng thái khóa/hoàn thành sau khi có thể vừa hoàn thành 1 Unit
        });

        // ---------- Mở 1 Unit ----------
        async function openUnit(unit) {
            // Lớp bảo vệ: phòng trường hợp bị gọi trực tiếp dù Unit đang bị khóa
            const idx = (currentGradeUnits || []).indexOf(unit);
            if (idx > 0 && !thcsIsUnitUnlocked(currentGradeNum, currentGradeUnits, idx)) {
                if (window.vocabTap && window.vocabTap.toast) {
                    window.vocabTap.toast('🔒 Bạn cần hoàn thành Unit trước đó để mở khóa Unit này!', 'info');
                }
                return;
            }

            currentUnit = unit;
            thcsFlashSeenSet = new Set();
            thcsGrade6Panel.style.display = 'none';
            thcsUnitPanel.style.display = 'block';
            thcsUnitTitle.textContent = `${unit.icon} Unit ${unit.number}: ${unit.title}`;

            thcsSubtabs.querySelectorAll('.kid-subtab-btn').forEach(b => b.classList.remove('active'));
            thcsSubtabs.querySelector('[data-sub="flashcard"]').classList.add('active');
            thcsUnitPanel.querySelectorAll('.kid-sub-content').forEach(el => el.style.display = 'none');
            document.getElementById('thcs-sub-flashcard').style.display = 'block';

            await thcsEnsureProgressLoaded();
            if (window.vocabTap && window.vocabTap.ensureLoaded) {
                try { await window.vocabTap.ensureLoaded(); } catch (e) { console.error('Lỗi khi tải từ vựng cá nhân:', e.message); }
            }

            thcsInitFlashcards(unit);
            thcsInitTranslate(unit);
            thcsInitStory(unit);
            thcsInitGame(unit);
        }

        // Bắt sự kiện chạm vào 1 từ tiếng Anh (tra nghĩa + tự lưu vào "Từ vựng của tôi")
        // trong toàn bộ khung của Unit — dùng chung cho cả mục Dịch câu và Câu chuyện.
        thcsUnitPanel.addEventListener('click', (e) => {
            const wordEl = e.target.closest('.tappable-word');
            if (!wordEl) return;
            if (window.vocabTap && window.vocabTap.handleTap) window.vocabTap.handleTap(wordEl);
        });

        thcsSubtabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.kid-subtab-btn');
            if (!btn) return;
            if (btn.dataset.sub !== 'game') thcsPauseGame();
            thcsSubtabs.querySelectorAll('.kid-subtab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            thcsUnitPanel.querySelectorAll('.kid-sub-content').forEach(el => el.style.display = 'none');
            document.getElementById('thcs-sub-' + btn.dataset.sub).style.display = 'block';
        });

        // ---------- 1. FLASHCARD ----------
        const thcsFlashcard  = document.getElementById('thcs-flashcard');
        const thcsFlashFront = document.getElementById('thcs-flash-front');
        const thcsFlashBack  = document.getElementById('thcs-flash-back');
        const thcsFlashProg  = document.getElementById('thcs-flash-progress');
        const thcsFlashPrev  = document.getElementById('thcs-flash-prev');
        const thcsFlashNext  = document.getElementById('thcs-flash-next');
        const thcsFlashFlip  = document.getElementById('thcs-flash-flip');

        let flashWords = [];
        let flashIndex = 0;
        let thcsFlashSeenSet = new Set(); // các chỉ số thẻ đã xem trong lượt mở Unit hiện tại

        thcsFlashFront.addEventListener('click', (e) => {
            const btn = e.target.closest('.kf-speak-btn');
            if (!btn) return;
            e.stopPropagation();
            thcsSpeak(btn.dataset.speak);
        });

        function thcsInitFlashcards(unit) {
            flashIndex = 0;
            flashWords = unit.words;
            thcsRenderFlashcard();
        }

        function thcsRenderFlashcard() {
            const w = flashWords[flashIndex];
            thcsFlashcard.classList.remove('flipped');
            thcsFlashFront.innerHTML = `
                <div class="kf-img-wrap">
                    <img src="${w.img}" class="kf-img kf-anim-img" alt="${w.en}" ${thcsImgErrorAttr(w.en)}>
                    <span class="kf-sparkle kf-sparkle-1">✨</span>
                    <span class="kf-sparkle kf-sparkle-2">✨</span>
                </div>
                <div class="kf-word-row kf-anim-word">
                    <span class="kf-word">${w.en}</span>
                    <button type="button" class="kf-speak-btn kf-anim-speak" data-speak="${w.en}" aria-label="Phát âm từ ${w.en}" title="Nghe phát âm">🔊</button>
                </div>
                <div class="kf-ipa kf-anim-ipa">${w.ipa}</div>
            `;
            thcsFlashBack.innerHTML = `<div class="kf-vi">${w.vi}</div><div class="kf-ex">"${w.ex}"</div>${w.trVi ? `<div class="kf-ex-vi">${w.trVi}</div>` : ''}`;
            thcsFlashProg.textContent = `Thẻ ${flashIndex + 1} / ${flashWords.length}`;
            thcsSpeak(w.en);

            const nextWord = flashWords[(flashIndex + 1) % flashWords.length];
            if (nextWord && nextWord.img) { const pre = new Image(); pre.src = nextWord.img; }

            thcsFlashSeenSet.add(flashIndex);
            if (flashWords.length > 0 && thcsFlashSeenSet.size >= flashWords.length) {
                thcsHandleFlashcardsCompleted();
            }
        }

        // Được gọi khi học viên đã xem qua hết toàn bộ Flashcard của Unit hiện tại ít nhất 1 lần
        async function thcsHandleFlashcardsCompleted() {
            if (!currentUnit) return;
            const already = thcsGetProgress(currentGradeNum, currentUnit.id).flashcard_done;
            if (already) return; // đã ghi nhận rồi, không cần lưu lại
            const merged = await thcsSaveProgress(currentGradeNum, currentUnit.id, { flashcard_done: true });
            if (merged && merged.completed) {
                thcsNotifyUnitCompleted();
            } else if (!currentUserId) {
                thcsNotifyLoginToSave();
            }
        }

        thcsFlashFlip.addEventListener('click', () => thcsFlashcard.classList.toggle('flipped'));
        thcsFlashcard.addEventListener('click', () => thcsFlashcard.classList.toggle('flipped'));
        thcsFlashPrev.addEventListener('click', () => {
            flashIndex = (flashIndex - 1 + flashWords.length) % flashWords.length;
            thcsRenderFlashcard();
        });
        thcsFlashNext.addEventListener('click', () => {
            flashIndex = (flashIndex + 1) % flashWords.length;
            thcsRenderFlashcard();
        });

        // ---------- 2. DỊCH CÂU (Việt -> Anh) — điền từ khóa còn thiếu vào câu có sẵn ----------
        const thcsTrProg      = document.getElementById('thcs-translate-progress');
        const thcsTrVi        = document.getElementById('thcs-translate-vi');
        const thcsTrSentence  = document.getElementById('thcs-translate-sentence');
        const thcsTrCheckBtn  = document.getElementById('thcs-translate-check-btn');
        const thcsTrRestartBtn= document.getElementById('thcs-translate-restart-btn');
        const thcsTrFeedback  = document.getElementById('thcs-translate-feedback');

        let trWords = [];
        let trIndex = 0;
        let thcsTranslateBusy = false; // chặn bấm "Kiểm tra" nhiều lần trong lúc đang chuyển câu

        function thcsInitTranslate(unit) {
            trIndex = 0;
            trWords = unit.words;
            thcsTranslateBusy = false;
            thcsRenderTranslate();
        }

        function thcsNormalize(s) {
            return String(s || '')
                .toLowerCase()
                .replace(/['".,!?;:]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        }

        function thcsEscapeRegex(s) {
            return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        // Tìm vị trí của "từ khóa" (trKey) trong câu đầy đủ (trAnswer) để tạo chỗ trống.
        // 1) Thử khớp chính xác (không phân biệt hoa/thường), phải đúng ranh giới từ.
        // 2) Nếu không có, thử khớp linh hoạt: cho phép số ít/số nhiều, thì của động từ
        //    (vd: từ khóa "outdoor activity" vẫn khớp với "outdoor activities" trong câu).
        // Trả về {start, end} theo chỉ số ký tự trong câu gốc, hoặc null nếu không tìm thấy.
        function thcsFindKeySpan(answer, key) {
            const ans = String(answer || '');
            const k = String(key || '').trim();
            if (!k) return null;
            const lowerAns = ans.toLowerCase();
            const lowerKey = k.toLowerCase();

            const idx = lowerAns.indexOf(lowerKey);
            if (idx !== -1) {
                const end = idx + lowerKey.length;
                const beforeOk = idx === 0 || !/[a-zA-Z]/.test(lowerAns[idx - 1]);
                const afterOk = end === lowerAns.length || !/[a-zA-Z]/.test(lowerAns[end]);
                if (beforeOk && afterOk) return { start: idx, end };
            }

            const words = lowerKey.split(/\s+/).filter(Boolean);
            const wordPatterns = words.map(w => {
                if (w.length > 2 && /[^aeiou]y$/.test(w)) {
                    return thcsEscapeRegex(w.slice(0, -1)) + '(?:y|ies)';
                }
                return thcsEscapeRegex(w) + '(?:e?s|ing|ed|d)?';
            });
            try {
                const re = new RegExp('\\b' + wordPatterns.join('\\s+') + '\\b', 'i');
                const m = ans.match(re);
                if (m) return { start: m.index, end: m.index + m[0].length };
            } catch (e) { /* bỏ qua nếu regex lỗi */ }

            return null;
        }

        function thcsRenderTranslate() {
            const w = trWords[trIndex];
            thcsTrProg.textContent = `Câu ${trIndex + 1} / ${trWords.length}`;
            thcsTrVi.textContent = w.trVi || w.vi;
            thcsTrFeedback.className = 'thcs-translate-feedback';
            thcsTrFeedback.innerHTML = '';

            const fullAnswer = w.trAnswer || w.ex || '';
            const span = thcsFindKeySpan(fullAnswer, w.trKey || w.en);
            const wrapFn = (window.vocabTap && window.vocabTap.wrap) ? window.vocabTap.wrap : (s => thcsEscHtml(s));
            const sourceLabel = (currentGradeNum && currentUnit) ? `Lớp ${currentGradeNum} - Unit ${currentUnit.number}: ${currentUnit.titleVi}` : '';

            if (span) {
                const before = fullAnswer.slice(0, span.start);
                const answerPart = fullAnswer.slice(span.start, span.end);
                const after = fullAnswer.slice(span.end);
                const widthCh = Math.max(answerPart.length + 2, 4);
                thcsTrSentence.innerHTML = wrapFn(before) +
                    `<input type="text" id="thcs-translate-blank-input" class="thcs-translate-blank-input" style="width:${widthCh}ch" autocomplete="off" autocapitalize="off" spellcheck="false">` +
                    wrapFn(after);
                thcsTrSentence.dataset.expectedAnswer = answerPart;
            } else {
                // Dữ liệu thiếu từ khóa khớp với câu — hiện cả câu (không tạo được chỗ trống)
                thcsTrSentence.innerHTML = wrapFn(fullAnswer);
                thcsTrSentence.dataset.expectedAnswer = '';
            }
            thcsTrSentence.dataset.vocabContext = fullAnswer;
            thcsTrSentence.dataset.vocabSource = sourceLabel;

            const blankInput = document.getElementById('thcs-translate-blank-input');
            if (blankInput) {
                blankInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') { e.preventDefault(); thcsCheckAnswer(); }
                });
                blankInput.focus();
            }
        }

        function thcsCheckAnswer() {
            if (thcsTranslateBusy) return;
            const expected = thcsTrSentence.dataset.expectedAnswer || '';

            if (!expected) {
                // Không tạo được chỗ trống cho câu này (thiếu dữ liệu trKey khớp) — bỏ qua, sang câu tiếp
                thcsAdvanceTranslate();
                return;
            }

            const blankInput = document.getElementById('thcs-translate-blank-input');
            if (!blankInput) return;
            const userAns = thcsNormalize(blankInput.value);
            if (!userAns) { blankInput.focus(); return; }
            const correctAns = thcsNormalize(expected);

            thcsTranslateBusy = true;
            blankInput.disabled = true;

            if (userAns === correctAns) {
                thcsPlayCorrectSound();
                thcsTrFeedback.className = 'thcs-translate-feedback is-correct';
                thcsTrFeedback.innerHTML = (trIndex === trWords.length - 1)
                    ? '✅ Chính xác! Bạn đã hoàn thành tất cả câu dịch của Unit này 🎉'
                    : '✅ Chính xác! Đang chuyển sang câu tiếp theo...';
                setTimeout(() => {
                    thcsTranslateBusy = false;
                    thcsAdvanceTranslate();
                }, 900);
            } else {
                thcsPlayWrongSound();
                blankInput.classList.add('is-wrong');
                thcsTrFeedback.className = 'thcs-translate-feedback is-wrong';
                thcsTrFeedback.innerHTML = `❌ Chưa đúng chỗ trống này. Đáp án đúng: <span class="tf-answer"><b>${thcsEscHtml(expected)}</b></span><br>Bạn sẽ làm lại từ câu đầu tiên nhé!`;
                setTimeout(() => {
                    thcsTranslateBusy = false;
                    trIndex = 0;
                    thcsRenderTranslate();
                }, 2000);
            }
        }

        // Chuyển sang câu tiếp theo; nếu vừa xong câu cuối cùng thì coi như đã hoàn thành
        // đúng hết tất cả các câu dịch theo thứ tự -> ghi nhận tiến độ + kiểm tra hoàn thành Unit.
        function thcsAdvanceTranslate() {
            if (trIndex >= trWords.length - 1) {
                thcsHandleTranslateCompleted();
                trIndex = 0; // cho phép luyện lại thoải mái, không ảnh hưởng tiến độ đã lưu
                thcsRenderTranslate();
                return;
            }
            trIndex += 1;
            thcsRenderTranslate();
        }

        async function thcsHandleTranslateCompleted() {
            if (!currentUnit) return;
            const merged = await thcsSaveProgress(currentGradeNum, currentUnit.id, { translate_done: true });
            if (merged && merged.completed) {
                thcsNotifyUnitCompleted();
            } else if (!currentUserId) {
                thcsNotifyLoginToSave();
            }
        }

        thcsTrCheckBtn.addEventListener('click', thcsCheckAnswer);
        thcsTrRestartBtn.addEventListener('click', () => {
            if (thcsTranslateBusy) return;
            trIndex = 0;
            thcsRenderTranslate();
        });

        // ---------- 3. CÂU CHUYỆN: tối đa 4 khung ảnh 16:9 + câu điền từ khóa ----------
        // Nội dung (ảnh + đoạn văn có từ khóa in đậm) do tài khoản giangvien@gmail.com
        // biên soạn và lưu chung trên Supabase (bảng "thcs_story_frames") — mọi học viên
        // đều thấy cùng 1 nội dung. Tiến độ MỞ từng khung ảnh thì lưu RIÊNG cho từng học
        // viên (bảng "thcs_story_frame_progress"). Xem file "thcs_story_frames_setup.sql".
        const thcsStoryFramesEl       = document.getElementById('thcs-story-frames');
        const thcsStoryEditorEl       = document.getElementById('thcs-story-editor');
        const thcsStoryEditorFramesEl = document.getElementById('thcs-story-editor-frames');

        // ----- CRUD nội dung khung truyện (chỉ giảng viên được ghi, chặn cả UI lẫn RLS) -----
        async function loadStoryFrames(gradeNum, unitId) {
            try {
                const { data, error } = await sb
                    .from('thcs_story_frames')
                    .select('*')
                    .eq('grade', gradeNum)
                    .eq('unit_id', unitId)
                    .order('frame_index', { ascending: true });
                if (error) throw error;
                return data || [];
            } catch (err) {
                console.error('Lỗi khi tải khung truyện:', err.message);
                return [];
            }
        }

        async function saveStoryFrame(gradeNum, unitId, frameIndex, fields) {
            const payload = Object.assign({
                grade: gradeNum,
                unit_id: unitId,
                frame_index: frameIndex,
                updated_by: currentEmail,
                updated_at: new Date().toISOString()
            }, fields);
            const { data, error } = await sb
                .from('thcs_story_frames')
                .upsert(payload, { onConflict: 'grade, unit_id, frame_index' })
                .select()
                .single();
            if (error) throw error;
            return data;
        }

        async function deleteStoryFrame(gradeNum, unitId, frameIndex) {
            const { error } = await sb
                .from('thcs_story_frames')
                .delete()
                .eq('grade', gradeNum)
                .eq('unit_id', unitId)
                .eq('frame_index', frameIndex);
            if (error) throw error;
        }

        // ----- Tiến độ MỞ khung ảnh của từng học viên -----
        let thcsFrameProgressMap = {}; // "grade::unitId::frameIndex" -> true/false

        function thcsFrameProgressKey(gradeNum, unitId, frameIndex) {
            return gradeNum + '::' + unitId + '::' + frameIndex;
        }

        async function thcsLoadFrameProgress(gradeNum, unitId) {
            if (!currentUserId) return;
            try {
                const { data, error } = await sb
                    .from('thcs_story_frame_progress')
                    .select('frame_index, completed')
                    .eq('user_id', currentUserId)
                    .eq('grade', gradeNum)
                    .eq('unit_id', unitId);
                if (error) throw error;
                (data || []).forEach(row => {
                    thcsFrameProgressMap[thcsFrameProgressKey(gradeNum, unitId, row.frame_index)] = !!row.completed;
                });
            } catch (err) {
                console.error('Lỗi khi tải tiến độ khung truyện:', err.message);
            }
        }

        function thcsIsFrameUnlocked(gradeNum, unitId, frameIndex) {
            return !!thcsFrameProgressMap[thcsFrameProgressKey(gradeNum, unitId, frameIndex)];
        }

        async function thcsSaveFrameProgress(gradeNum, unitId, frameIndex) {
            thcsFrameProgressMap[thcsFrameProgressKey(gradeNum, unitId, frameIndex)] = true;
            if (!currentUserId) return;
            try {
                const payload = {
                    user_id: currentUserId,
                    grade: gradeNum,
                    unit_id: unitId,
                    frame_index: frameIndex,
                    completed: true,
                    updated_at: new Date().toISOString()
                };
                const { error } = await sb
                    .from('thcs_story_frame_progress')
                    .upsert(payload, { onConflict: 'user_id, grade, unit_id, frame_index' });
                if (error) console.error('Lỗi khi lưu tiến độ khung truyện:', error);
            } catch (err) {
                console.error('Lỗi ngoại lệ khi lưu tiến độ khung truyện:', err.message);
            }
        }

        // ----- Tiện ích xử lý nội dung HTML của 1 khung truyện -----
        function thcsExtractKeywordsFromHtml(html) {
            const tmp = document.createElement('div');
            tmp.innerHTML = html || '';
            return Array.from(tmp.querySelectorAll('b, strong'))
                .map(el => el.textContent.trim())
                .filter(Boolean);
        }

        function thcsPlainTextFromHtml(html) {
            const tmp = document.createElement('div');
            tmp.innerHTML = html || '';
            return (tmp.textContent || '').replace(/\s+/g, ' ').trim();
        }

        // Dựng lại đoạn văn cho HỌC VIÊN: từ khóa (chữ in đậm) -> ô trống + nghĩa tiếng Việt gợi ý;
        // phần chữ còn lại vẫn được bọc "tappable-word" để chạm tra nghĩa như bình thường.
        function thcsBuildStoryBlankHtml(contentHtml, keywordsMeta) {
            const tmp = document.createElement('div');
            tmp.innerHTML = contentHtml || '';
            const wrapFn = (window.vocabTap && window.vocabTap.wrap) ? window.vocabTap.wrap : (s => thcsEscHtml(s));
            let keyIdx = 0;
            let out = '';

            function walk(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    out += wrapFn(node.textContent);
                    return;
                }
                if (node.nodeType !== Node.ELEMENT_NODE) return;
                const tag = node.tagName.toLowerCase();
                if (tag === 'b' || tag === 'strong') {
                    const meta = keywordsMeta[keyIdx] || {};
                    const answer = (meta.key || node.textContent || '').trim();
                    const meaningVi = meta.meaningVi || '';
                    keyIdx += 1;
                    const widthCh = Math.max(answer.length + 2, 3);
                    out += `<span class="thcs-story-blank-wrap">` +
                        `<input type="text" class="thcs-story-blank-input" data-answer="${thcsEscAttr(answer)}" style="width:${widthCh}ch" autocomplete="off" autocapitalize="off" spellcheck="false">` +
                        (meaningVi ? `<span class="thcs-story-blank-hint">(${thcsEscHtml(meaningVi)})</span>` : '') +
                        `</span>`;
                } else if (tag === 'br') {
                    out += '<br>';
                } else {
                    Array.from(node.childNodes).forEach(walk);
                    if (tag === 'div' || tag === 'p') out += '<br>';
                }
            }
            Array.from(tmp.childNodes).forEach(walk);
            return out;
        }

        // ----- Hiển thị lưới khung truyện cho HỌC VIÊN (và cả giảng viên, để xem trước) -----
        function thcsRenderStoryFramesGrid(unit, frames) {
            if (!frames.length) {
                thcsStoryFramesEl.innerHTML = '<p class="kid-hint">Unit này chưa có khung truyện nào. Giảng viên sẽ sớm cập nhật nhé!</p>';
                return;
            }
            thcsStoryFramesEl.innerHTML = '';
            frames.forEach(frame => {
                const unlocked = thcsIsFrameUnlocked(currentGradeNum, unit.id, frame.frame_index);
                const keywordsMeta = Array.isArray(frame.keywords) ? frame.keywords : [];
                const blankHtml = thcsBuildStoryBlankHtml(frame.content_html, keywordsMeta);
                const sourceLabel = `Lớp ${currentGradeNum} - Unit ${unit.number}: ${unit.titleVi} (câu chuyện - khung ${frame.frame_index})`;

                const card = document.createElement('div');
                card.className = 'thcs-story-frame-card' + (unlocked ? ' unlocked' : '');
                card.dataset.frameIndex = frame.frame_index;
                card.innerHTML = `
                    <div class="thcs-story-frame-img-wrap">
                        <img src="${thcsEscAttr(frame.image_url)}" class="thcs-story-frame-img" alt="Khung truyện ${frame.frame_index}">
                        <div class="thcs-story-frame-overlay">
                            <span class="thcs-story-frame-lock">🔒</span>
                            <span>Điền đúng câu bên dưới để mở ảnh</span>
                        </div>
                    </div>
                    <div class="thcs-story-frame-text" data-vocab-context="${thcsEscAttr(thcsPlainTextFromHtml(frame.content_html))}" data-vocab-source="${thcsEscAttr(sourceLabel)}">${blankHtml}</div>
                    <div class="thcs-story-frame-actions">
                        <button type="button" class="kid-btn kid-btn-primary thcs-story-frame-check-btn">✔️ Kiểm tra</button>
                    </div>
                    <div class="thcs-story-frame-feedback"></div>
                `;
                if (unlocked) {
                    card.querySelectorAll('.thcs-story-blank-input').forEach(inp => {
                        inp.value = inp.dataset.answer;
                        inp.disabled = true;
                        inp.classList.add('is-correct');
                    });
                    const checkBtn = card.querySelector('.thcs-story-frame-check-btn');
                    if (checkBtn) checkBtn.style.display = 'none';
                }
                thcsStoryFramesEl.appendChild(card);
            });
        }

        function thcsCheckStoryFrame(card) {
            const frameIndex = Number(card.dataset.frameIndex);
            const inputs = Array.from(card.querySelectorAll('.thcs-story-blank-input'));
            if (!inputs.length) return;
            let allCorrect = true;
            inputs.forEach(inp => {
                if (inp.disabled) return; // đã đúng từ trước
                const ok = thcsNormalize(inp.value) === thcsNormalize(inp.dataset.answer);
                inp.classList.remove('is-correct', 'is-wrong');
                inp.classList.add(ok ? 'is-correct' : 'is-wrong');
                if (ok) inp.disabled = true;
                else allCorrect = false;
            });
            const feedback = card.querySelector('.thcs-story-frame-feedback');
            if (allCorrect) {
                thcsPlayCorrectSound();
                card.classList.add('unlocked');
                const checkBtn = card.querySelector('.thcs-story-frame-check-btn');
                if (checkBtn) checkBtn.style.display = 'none';
                if (feedback) { feedback.className = 'thcs-story-frame-feedback is-correct'; feedback.innerHTML = '✅ Chính xác! Ảnh đã được mở.'; }
                thcsSaveFrameProgress(currentGradeNum, currentUnit.id, frameIndex);
            } else {
                thcsPlayWrongSound();
                if (feedback) { feedback.className = 'thcs-story-frame-feedback is-wrong'; feedback.innerHTML = '❌ Còn chỗ trống chưa đúng (đang tô đỏ), thử lại nhé!'; }
            }
        }

        thcsStoryFramesEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.thcs-story-frame-check-btn');
            if (!btn) return;
            const card = btn.closest('.thcs-story-frame-card');
            if (card) thcsCheckStoryFrame(card);
        });
        thcsStoryFramesEl.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const inp = e.target.closest('.thcs-story-blank-input');
            if (!inp) return;
            e.preventDefault();
            const card = inp.closest('.thcs-story-frame-card');
            if (card) thcsCheckStoryFrame(card);
        });

        // ----- Khung soạn thảo (CHỈ giảng viên) -----
        function thcsRenderKeywordInputs(card, contentEl, existingKeywords) {
            const keywordsWrap = card.querySelector('.thcs-story-editor-keywords');
            const existingMap = {};
            (existingKeywords || []).forEach(k => { existingMap[String(k.key || '').toLowerCase()] = k.meaningVi || ''; });

            function rebuild() {
                const typedMap = {};
                keywordsWrap.querySelectorAll('.thcs-story-editor-keyword-row').forEach(row => {
                    const key = row.dataset.key;
                    const input = row.querySelector('input');
                    if (key && input) typedMap[key.toLowerCase()] = input.value;
                });

                const keys = thcsExtractKeywordsFromHtml(contentEl.innerHTML);
                keywordsWrap.innerHTML = '';
                if (!keys.length) {
                    keywordsWrap.innerHTML = '<p class="thcs-story-editor-keyword-empty">Chưa có từ khóa nào được in đậm.</p>';
                    return;
                }
                keys.forEach(key => {
                    const lower = key.toLowerCase();
                    const meaning = (lower in typedMap) ? typedMap[lower] : (existingMap[lower] || '');
                    const row = document.createElement('div');
                    row.className = 'thcs-story-editor-keyword-row';
                    row.dataset.key = key;
                    row.innerHTML = `
                        <span class="thcs-story-editor-keyword-label"><b>${thcsEscHtml(key)}</b> →</span>
                        <input type="text" class="thcs-story-editor-keyword-input" placeholder="Nghĩa tiếng Việt cho từ khóa này...">
                    `;
                    row.querySelector('input').value = meaning;
                    keywordsWrap.appendChild(row);
                });
            }

            rebuild();
            contentEl.addEventListener('input', rebuild);
        }

        function thcsRenderStoryEditor(unit, frames) {
            if (!isTeacher) { thcsStoryEditorEl.style.display = 'none'; return; }
            thcsStoryEditorEl.style.display = 'block';
            thcsStoryEditorFramesEl.innerHTML = '';

            const frameByIndex = {};
            frames.forEach(f => { frameByIndex[f.frame_index] = f; });

            for (let i = 1; i <= 4; i++) {
                const frame = frameByIndex[i] || null;
                const card = document.createElement('div');
                card.className = 'thcs-story-editor-card';
                card.dataset.frameIndex = i;
                card.innerHTML = `
                    <h5 class="thcs-story-editor-card-title">Khung ${i}</h5>
                    <div class="thcs-story-editor-image-row">
                        <input type="text" class="thcs-story-editor-image-input" placeholder="Dán link ảnh 16:9 (.jpg/.png)..." value="${frame ? thcsEscAttr(frame.image_url) : ''}">
                        <img class="thcs-story-editor-preview" src="${frame ? thcsEscAttr(frame.image_url) : ''}" style="${frame && frame.image_url ? '' : 'display:none;'}">
                    </div>
                    <div class="thcs-story-editor-toolbar">
                        <button type="button" class="thcs-story-editor-bold-btn" title="In đậm phần đang chọn"><strong>B</strong> In đậm</button>
                        <span>Bôi đen từ khóa rồi bấm nút này để đánh dấu từ khóa</span>
                    </div>
                    <div class="thcs-story-editor-content news-editable" contenteditable="true" data-placeholder="Nhập đoạn văn tiếng Anh, bôi đen từ khóa rồi bấm 'In đậm'...">${frame ? frame.content_html : ''}</div>
                    <div class="thcs-story-editor-keywords"></div>
                    <div class="thcs-story-editor-actions">
                        <button type="button" class="kid-btn kid-btn-primary thcs-story-editor-save-btn">💾 Lưu Khung ${i}</button>
                        ${frame ? `<button type="button" class="kid-btn thcs-story-editor-delete-btn">🗑️ Xóa Khung ${i}</button>` : ''}
                        <span class="thcs-story-editor-status"></span>
                    </div>
                `;
                thcsStoryEditorFramesEl.appendChild(card);

                const contentEl = card.querySelector('.thcs-story-editor-content');
                const imageInput = card.querySelector('.thcs-story-editor-image-input');
                const preview = card.querySelector('.thcs-story-editor-preview');
                const statusEl = card.querySelector('.thcs-story-editor-status');

                thcsRenderKeywordInputs(card, contentEl, frame ? frame.keywords : []);

                imageInput.addEventListener('input', () => {
                    const url = imageInput.value.trim();
                    if (url) { preview.src = url; preview.style.display = ''; }
                    else { preview.style.display = 'none'; }
                });

                card.querySelector('.thcs-story-editor-bold-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    contentEl.focus();
                    document.execCommand('bold');
                    contentEl.dispatchEvent(new Event('input'));
                });

                card.querySelector('.thcs-story-editor-save-btn').addEventListener('click', async () => {
                    const imageUrl = imageInput.value.trim();
                    const contentHtml = contentEl.innerHTML.trim();
                    if (!imageUrl) { alert('Vui lòng dán link ảnh 16:9 trước khi lưu.'); return; }
                    if (!contentHtml) { alert('Vui lòng nhập đoạn văn tiếng Anh trước khi lưu.'); return; }

                    const keywords = Array.from(card.querySelectorAll('.thcs-story-editor-keyword-row')).map(row => ({
                        key: row.dataset.key,
                        meaningVi: row.querySelector('input').value.trim()
                    }));
                    const missing = keywords.find(k => !k.meaningVi);
                    if (missing && !confirm(`Từ khóa "${missing.key}" chưa có nghĩa tiếng Việt. Vẫn lưu?`)) return;

                    statusEl.textContent = 'Đang lưu...';
                    try {
                        await saveStoryFrame(currentGradeNum, unit.id, i, {
                            image_url: imageUrl,
                            content_html: contentHtml,
                            keywords,
                            created_by: frame ? frame.created_by : currentEmail
                        });
                        statusEl.textContent = '💾 Đã lưu Khung ' + i + '.';
                        await thcsInitStory(unit); // tải + vẽ lại cả 2 phía (học viên + soạn thảo)
                    } catch (err) {
                        statusEl.textContent = '❌ Lưu thất bại: ' + err.message;
                    }
                });

                const deleteBtn = card.querySelector('.thcs-story-editor-delete-btn');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', async () => {
                        if (!confirm(`Xóa Khung ${i}? Học viên sẽ không còn thấy khung này nữa.`)) return;
                        try {
                            await deleteStoryFrame(currentGradeNum, unit.id, i);
                            await thcsInitStory(unit);
                        } catch (err) {
                            alert('Xóa thất bại: ' + err.message);
                        }
                    });
                }
            }
        }

        // ----- Khởi tạo tab Câu chuyện khi mở 1 Unit -----
        async function thcsInitStory(unit) {
            thcsStoryFramesEl.innerHTML = '<p class="kid-hint">Đang tải khung truyện...</p>';
            thcsStoryEditorEl.style.display = 'none';

            const frames = await loadStoryFrames(currentGradeNum, unit.id);
            thcsFrameProgressMap = {};
            await thcsLoadFrameProgress(currentGradeNum, unit.id);

            thcsRenderStoryFramesGrid(unit, frames);
            thcsRenderStoryEditor(unit, frames);
        }

        // ---------- 4. TRÒ CHƠI HỨNG TỪ ----------
        const thcsGameStartBtn   = document.getElementById('thcs-game-start');
        const thcsGamePauseBtn   = document.getElementById('thcs-game-pause');
        const thcsGameRestartBtn = document.getElementById('thcs-game-restart');
        const thcsGameArea       = document.getElementById('thcs-game-area');
        const thcsGameStatus     = document.getElementById('thcs-game-status');
        const thcsGameSpeedInput = document.getElementById('thcs-game-speed');
        const thcsGameOverlay    = document.getElementById('thcs-game-overlay');
        const thcsGameRedline    = document.getElementById('thcs-game-redline');
        const thcsGameResultPanel= document.getElementById('thcs-game-result-panel');
        const thcsGameKeyword    = document.getElementById('thcs-game-keyword');

        let thcsGameFullWords = [];
        let thcsGameWordsPool = [];
        let thcsCurrentTurn   = 0;
        let thcsIsDeathMode   = false;
        let thcsGameRunId     = 0;
        let thcsGameLoopInterval = null;
        let thcsTurnTimer     = null;
        let thcsGameStatus2   = 'idle'; // tránh trùng tên với biến DOM thcsGameStatus (span hiển thị)
        let thcsTurnHistory   = [];

        function thcsCreatePausableTimeout(callback, delay) {
            let remaining = delay;
            let startedAt = Date.now();
            let timerId = setTimeout(callback, remaining);
            let paused = false;
            return {
                pause() {
                    if (paused || !timerId) return;
                    clearTimeout(timerId);
                    timerId = null;
                    remaining -= (Date.now() - startedAt);
                    if (remaining < 0) remaining = 0;
                    paused = true;
                },
                resume() {
                    if (!paused) return;
                    paused = false;
                    startedAt = Date.now();
                    timerId = setTimeout(callback, remaining);
                },
                cancel() {
                    if (timerId) clearTimeout(timerId);
                    timerId = null;
                }
            };
        }

        function thcsClearGameTimers() {
            if (thcsGameLoopInterval) { clearInterval(thcsGameLoopInterval); thcsGameLoopInterval = null; }
            if (thcsTurnTimer) { thcsTurnTimer.cancel(); thcsTurnTimer = null; }
        }

        function thcsResetGameVisuals() {
            document.querySelectorAll('#thcs-game-area .kid-game-block, #thcs-game-area .hell-eyes-decor').forEach(el => el.remove());
            thcsGameArea.classList.remove('death-mode', 'game-paused');
            thcsGameOverlay.style.display = 'none';
            thcsGameOverlay.innerHTML = '';
            if (thcsGameResultPanel) { thcsGameResultPanel.style.display = 'none'; thcsGameResultPanel.innerHTML = ''; }
            if (thcsGameKeyword) {
                thcsGameKeyword.textContent = '';
                thcsGameKeyword.classList.remove('kid-game-keyword-hidden');
            }
            thcsGameSpeedInput.disabled = false;
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        }

        function thcsResetGameState(autoStart) {
            thcsGameRunId++;
            thcsClearGameTimers();
            thcsResetGameVisuals();
            const poolSize = Math.min(20, thcsGameFullWords.length);
            thcsGameWordsPool = thcsShuffle(thcsGameFullWords).slice(0, poolSize);
            thcsCurrentTurn = 0;
            thcsIsDeathMode = false;
            thcsTurnHistory = [];
            thcsGameStatus2 = 'idle';
            thcsGameStatus.textContent = `Lượt: 0/${thcsGameWordsPool.length} | Chế độ: Thường`;
            if (thcsGamePauseBtn) {
                thcsGamePauseBtn.disabled = true;
                thcsGamePauseBtn.textContent = '⏸ Dừng lại';
                thcsGamePauseBtn.classList.remove('is-paused');
            }
            if (autoStart) {
                thcsGameStatus2 = 'running';
                if (thcsGameStartBtn) thcsGameStartBtn.disabled = true;
                if (thcsGamePauseBtn) thcsGamePauseBtn.disabled = false;
                thcsPlayTurn(thcsGameRunId);
            } else {
                if (thcsGameStartBtn) thcsGameStartBtn.disabled = false;
            }
        }

        function thcsInitGame(unit) {
            thcsGameFullWords = unit.words;
            thcsResetGameState(false);
        }

        function thcsStartGame() { thcsResetGameState(true); }
        function thcsRestartGame() { thcsResetGameState(false); }

        if (thcsGameStartBtn) thcsGameStartBtn.addEventListener('click', thcsStartGame);
        if (thcsGameRestartBtn) thcsGameRestartBtn.addEventListener('click', thcsRestartGame);

        function thcsPauseGame() {
            if (thcsGameStatus2 !== 'running') return;
            thcsGameStatus2 = 'paused';
            document.querySelectorAll('#thcs-game-area .kid-game-block').forEach(b => { b.style.animationPlayState = 'paused'; });
            if (thcsTurnTimer) thcsTurnTimer.pause();
            if ('speechSynthesis' in window) { try { window.speechSynthesis.pause(); } catch (e) {} }
            thcsGameArea.classList.add('game-paused');
            if (thcsGamePauseBtn) {
                thcsGamePauseBtn.disabled = false;
                thcsGamePauseBtn.textContent = '▶ Tiếp tục';
                thcsGamePauseBtn.classList.add('is-paused');
            }
        }

        function thcsResumeGame() {
            if (thcsGameStatus2 !== 'paused') return;
            thcsGameStatus2 = 'running';
            document.querySelectorAll('#thcs-game-area .kid-game-block').forEach(b => { b.style.animationPlayState = 'running'; });
            if (thcsTurnTimer) thcsTurnTimer.resume();
            if ('speechSynthesis' in window) { try { window.speechSynthesis.resume(); } catch (e) {} }
            thcsGameArea.classList.remove('game-paused');
            if (thcsGamePauseBtn) {
                thcsGamePauseBtn.textContent = '⏸ Dừng lại';
                thcsGamePauseBtn.classList.remove('is-paused');
            }
        }

        if (thcsGamePauseBtn) {
            thcsGamePauseBtn.addEventListener('click', () => {
                if (thcsGameStatus2 === 'running') thcsPauseGame();
                else if (thcsGameStatus2 === 'paused') thcsResumeGame();
            });
        }

        function thcsPlayTurn(runId) {
            if (runId !== thcsGameRunId) return;
            const total = thcsGameWordsPool.length;
            if (thcsCurrentTurn >= total) { thcsFinishGame(runId); return; }

            thcsCurrentTurn++;
            const deathStart = Math.floor(total / 2) + 1; // nửa sau của lượt chơi là chế độ Tử Thần
            const enteringDeathMode = (thcsCurrentTurn === deathStart);
            thcsIsDeathMode = thcsCurrentTurn >= deathStart;
            thcsGameStatus.textContent = `Lượt: ${thcsCurrentTurn}/${total} | Chế độ: ${thcsIsDeathMode ? 'TỬ THẦN 💀' : 'Thường'}`;
            thcsGameArea.classList.toggle('death-mode', thcsIsDeathMode);
            thcsGameSpeedInput.disabled = thcsIsDeathMode;

            if (enteringDeathMode) {
                thcsGameArea.insertAdjacentHTML('beforeend', '<div class="hell-eyes-decor"><span class="hell-eye"><span class="hell-pupil"></span></span><span class="hell-eye"><span class="hell-pupil"></span></span></div>');
                thcsGameOverlay.innerHTML = "🔥 MODE TỬ THẦN BẮT ĐẦU 🔥<br><span style='font-size:18px; color:#fff;'>Nghe kỹ và bấm thật nhanh!</span>";
                thcsGameOverlay.style.display = "flex";
                thcsPlayVillainLaugh();
                thcsTurnTimer = thcsCreatePausableTimeout(() => {
                    if (runId !== thcsGameRunId) return;
                    thcsGameOverlay.style.display = "none";
                    thcsSpawnFallingWords(runId);
                }, 8000);
            } else {
                thcsSpawnFallingWords(runId);
            }
        }

        function thcsSpawnFallingWords(runId) {
            thcsGameArea.querySelectorAll('.kid-game-block').forEach(b => b.remove());

            const correctWord = thcsGameWordsPool[thcsCurrentTurn - 1];
            const distractPool = thcsGameFullWords.filter(w => w !== correctWord);
            const wrongWords = thcsShuffle(distractPool).slice(0, Math.min(2, distractPool.length));
            const options = thcsShuffle([correctWord, ...wrongWords]);

            thcsSpeak(correctWord.en);

            if (thcsGameKeyword) {
                if (thcsIsDeathMode) {
                    thcsGameKeyword.textContent = '🔒 Bí mật — chỉ nghe và đoán!';
                    thcsGameKeyword.classList.add('kid-game-keyword-hidden');
                } else {
                    thcsGameKeyword.textContent = `🎯 Từ khóa: ${correctWord.en}`;
                    thcsGameKeyword.classList.remove('kid-game-keyword-hidden');
                }
            }

            let baseSpeed = parseFloat(thcsGameSpeedInput.value);
            if (isNaN(baseSpeed) || baseSpeed < 3) baseSpeed = 6;

            function recordTurnResult(isCorrect) {
                thcsTurnHistory.push({
                    turn: thcsCurrentTurn,
                    mode: thcsIsDeathMode ? 'death' : 'normal',
                    word: correctWord.en,
                    correct: isCorrect
                });
            }

            const blocks = [];
            options.forEach((opt, index) => {
                const block = document.createElement('div');
                block.className = 'kid-game-block';
                block.textContent = opt.en;
                const spacing = options.length > 1 ? (70 / (options.length - 1)) : 0;
                block.style.left = `${15 + index * (spacing || 30)}%`;

                const fallSeconds = thcsIsDeathMode
                    ? (4 + Math.random() * 2)
                    : Math.min(12, Math.max(3, baseSpeed + (Math.random() * 2 - 1)));
                block.style.animationDuration = fallSeconds.toFixed(2) + 's';

                thcsGameArea.appendChild(block);
                blocks.push({ el: block });

                block.addEventListener('click', () => {
                    if (runId !== thcsGameRunId || thcsGameStatus2 === 'paused' || block.style.pointerEvents === 'none') return;
                    freezeBlocks();

                    const isCorrect = (opt === correctWord);
                    if (isCorrect) {
                        block.style.backgroundColor = '#2fb56d';
                        block.style.color = '#fff';
                        thcsPlayCorrectSound();
                    } else {
                        block.style.backgroundColor = '#ff5d5d';
                        block.style.color = '#fff';
                        thcsPlayWrongSound();
                        if (thcsIsDeathMode) thcsPlayVillainLaugh();
                    }
                    recordTurnResult(isCorrect);
                    thcsEndTurn(runId);
                });
            });

            thcsGameLoopInterval = setInterval(() => {
                if (runId !== thcsGameRunId) { clearInterval(thcsGameLoopInterval); return; }
                if (thcsGameStatus2 === 'paused') return;

                const lineRect = thcsGameRedline.getBoundingClientRect();
                const passed = blocks.some(b => b.el.style.pointerEvents !== 'none' && b.el.getBoundingClientRect().bottom >= lineRect.top);

                if (passed) {
                    freezeBlocks();
                    thcsPlayWrongSound();
                    if (thcsIsDeathMode) thcsPlayVillainLaugh();
                    recordTurnResult(false);
                    thcsEndTurn(runId);
                }
            }, 50);

            function freezeBlocks() {
                clearInterval(thcsGameLoopInterval);
                blocks.forEach(b => {
                    const frozenTop = getComputedStyle(b.el).top;
                    b.el.style.animation = 'none';
                    b.el.style.top = frozenTop;
                    b.el.style.pointerEvents = 'none';
                });
            }
        }

        function thcsEndTurn(runId) {
            thcsTurnTimer = thcsCreatePausableTimeout(() => {
                if (runId !== thcsGameRunId) return;
                thcsPlayTurn(runId);
            }, 2000);
        }

        function thcsFinishGame(runId) {
            if (runId !== thcsGameRunId) return;
            thcsGameStatus2 = 'finished';
            thcsClearGameTimers();
            thcsGameArea.classList.remove('game-paused', 'death-mode');
            document.querySelectorAll('#thcs-game-area .hell-eyes-decor').forEach(el => el.remove());
            if (thcsGameStartBtn) thcsGameStartBtn.disabled = false;
            if (thcsGamePauseBtn) {
                thcsGamePauseBtn.disabled = true;
                thcsGamePauseBtn.textContent = '⏸ Dừng lại';
                thcsGamePauseBtn.classList.remove('is-paused');
            }
            thcsGameSpeedInput.disabled = false;
            thcsRenderResultPanel();
        }

        function thcsRenderResultPanel() {
            if (!thcsGameResultPanel) return;
            const correctCount = thcsTurnHistory.filter(h => h.correct).length;
            const total = thcsTurnHistory.length;

            const rows = thcsTurnHistory.map(h => {
                const modeLabel = h.mode === 'death' ? 'Tử Thần 💀' : 'Thường';
                const keywordCell = h.mode === 'death' ? '🔒 Ẩn' : thcsEscAttr(h.word);
                const resultCell = h.correct ? '✅ Đúng' : '❌ Sai';
                const rowClass = h.correct ? 'kid-result-row-correct' : 'kid-result-row-wrong';
                return `<tr class="${rowClass}"><td>${h.turn}</td><td>${modeLabel}</td><td>${keywordCell}</td><td>${resultCell}</td></tr>`;
            }).join('');

            thcsGameResultPanel.innerHTML = `
                <h3 class="kid-result-title">🎉 Hoàn thành ${total} lượt chơi!</h3>
                <div class="kid-result-score">Tổng điểm: ${correctCount}/${total} câu đúng</div>
                <table class="kid-result-table">
                    <thead><tr><th>Lượt</th><th>Chế độ</th><th>Từ khóa</th><th>Kết quả</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
                <button type="button" id="thcs-result-close-btn" class="kid-btn kid-btn-primary kid-result-close-btn">Đóng bảng kết quả</button>
            `;
            thcsGameResultPanel.style.display = 'flex';

            const closeBtn = document.getElementById('thcs-result-close-btn');
            if (closeBtn) closeBtn.addEventListener('click', () => { thcsGameResultPanel.style.display = 'none'; });
        }

        // ----- Tự động tạm dừng khi rời khỏi trò chơi -----
        document.addEventListener('visibilitychange', () => { if (document.hidden) thcsPauseGame(); });
        window.addEventListener('blur', thcsPauseGame);
        mainTabBtns.forEach(btn => btn.addEventListener('click', thcsPauseGame));
        if (thcsBackBtn) thcsBackBtn.addEventListener('click', thcsPauseGame);
        if (thcsGrade6BackBtn) thcsGrade6BackBtn.addEventListener('click', thcsPauseGame);

    })();
    // ===== KẾT THÚC: "THCS/THPT" — LỚP 6 =====

    // ===================================================================
    // ===== BẮT ĐẦU: TAB "HƯỚNG DẪN" (cách học / chat cộng đồng / liên hệ admin) =====
    // ===================================================================
    (() => {
        const huongDanTabBtn = document.querySelector('.main-tab-btn[data-main-target="tab-huong-dan"]');
        if (!huongDanTabBtn) return;

        // ---------- 1. ĐIỀU HƯỚNG 3 FOLDER (giống các tab khác) ----------
        const hdFolderGrid = document.getElementById('huongdan-folder-grid');
        const hdPanels = {
            'huongdan-cachhoc-card': document.getElementById('huongdan-cachhoc-panel'),
            'huongdan-chat-card':    document.getElementById('huongdan-chat-panel'),
            'huongdan-admin-card':   document.getElementById('huongdan-admin-panel')
        };

        function hdShowPanel(panel) {
            hdFolderGrid.style.display = 'none';
            Object.values(hdPanels).forEach(p => { if (p) p.style.display = 'none'; });
            if (panel) panel.style.display = '';
            if (panel === hdPanels['huongdan-chat-card']) {
                loadCommunityChat();
                subscribeCommunityChat();
            } else {
                unsubscribeCommunityChat();
            }
        }

        function hdShowGrid() {
            unsubscribeCommunityChat();
            Object.values(hdPanels).forEach(p => { if (p) p.style.display = 'none'; });
            hdFolderGrid.style.display = '';
        }

        Object.keys(hdPanels).forEach(cardId => {
            const card = document.getElementById(cardId);
            if (card) card.addEventListener('click', () => hdShowPanel(hdPanels[cardId]));
        });

        document.querySelectorAll('#tab-huong-dan .huongdan-back-btn').forEach(btn => {
            btn.addEventListener('click', hdShowGrid);
        });

        // Nếu rời khỏi tab Hướng dẫn (chuyển sang tab chính khác) thì hủy kết nối realtime chat
        mainTabBtns.forEach(btn => {
            if (btn !== huongDanTabBtn) {
                btn.addEventListener('click', unsubscribeCommunityChat);
            }
        });
        logoutBtn.addEventListener('click', unsubscribeCommunityChat);

        // ---------- 2. KHUNG CHAT CỘNG ĐỒNG (Supabase realtime) ----------
        // Bảng cần tạo trong Supabase: community_chat (id, user_id, email, content, created_at)
        // Xem file community_chat_schema.sql để lấy đúng câu lệnh SQL cần chạy 1 lần trong Supabase SQL Editor.
        const chatMessagesBox = document.getElementById('community-chat-messages');
        const chatInput       = document.getElementById('community-chat-input');
        const chatSendBtn     = document.getElementById('community-chat-send-btn');
        const chatStatus      = document.getElementById('community-chat-status');
        let chatChannel = null;
        let chatLoaded = false;

        function chatFormatTime(iso) {
            try {
                const d = new Date(iso);
                return d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
            } catch (e) { return ''; }
        }

        function chatSenderName(row) {
            if (row.email) return row.email.split('@')[0];
            if (row.user_id) return 'HV_' + row.user_id.substring(0, 6);
            return 'Ẩn danh';
        }

        function chatAppendMessage(row, scroll = true) {
            const emptyMsg = chatMessagesBox.querySelector('.chat-empty-msg');
            if (emptyMsg) emptyMsg.remove();

            const div = document.createElement('div');
            div.className = 'chat-message' + (currentUserId && row.user_id === currentUserId ? ' own' : '');

            const senderEl = document.createElement('div');
            senderEl.className = 'chat-sender';
            senderEl.textContent = chatSenderName(row);
            div.appendChild(senderEl);

            const textEl = document.createElement('div');
            textEl.className = 'chat-text';
            textEl.textContent = row.content;
            div.appendChild(textEl);

            if (row.created_at) {
                const timeEl = document.createElement('div');
                timeEl.className = 'chat-time';
                timeEl.textContent = chatFormatTime(row.created_at);
                div.appendChild(timeEl);
            }

            chatMessagesBox.appendChild(div);
            if (scroll) chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
        }

        async function loadCommunityChat() {
            if (chatLoaded) return; // đã tải rồi thì không tải lại mỗi lần mở panel
            chatMessagesBox.innerHTML = '<p class="chat-empty-msg">Đang tải tin nhắn...</p>';
            chatStatus.textContent = '';

            const { data, error } = await sb
                .from('community_chat')
                .select('*')
                .order('created_at', { ascending: true })
                .limit(200);

            if (error) {
                chatMessagesBox.innerHTML = '';
                chatStatus.textContent = '⚠️ Chưa tải được chat (' + error.message + '). Bạn đã chạy file community_chat_schema.sql trong Supabase SQL Editor chưa?';
                return;
            }

            chatMessagesBox.innerHTML = '';
            if (!data || data.length === 0) {
                chatMessagesBox.innerHTML = '<p class="chat-empty-msg">Chưa có tin nhắn nào. Hãy là người đầu tiên trao đổi nhé!</p>';
            } else {
                data.forEach(row => chatAppendMessage(row, false));
                chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
            }
            chatLoaded = true;
        }

        function subscribeCommunityChat() {
            if (chatChannel) return;
            chatChannel = sb
                .channel('community-chat-channel')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_chat' }, payload => {
                    if (payload.new) chatAppendMessage(payload.new, true);
                })
                .subscribe();
        }

        function unsubscribeCommunityChat() {
            if (chatChannel) { sb.removeChannel(chatChannel); chatChannel = null; }
        }
        window.unsubscribeCommunityChat = unsubscribeCommunityChat; // để có thể gọi từ ngoài nếu cần

        async function chatSendMessage() {
            const content = chatInput.value.trim();
            if (!content) return;
            if (!currentUserId) {
                chatStatus.textContent = 'Vui lòng đăng nhập để gửi tin nhắn.';
                return;
            }
            chatSendBtn.disabled = true;
            chatStatus.textContent = '';

            const { error } = await sb.from('community_chat').insert([{
                user_id: currentUserId,
                email: currentEmail,
                content: content,
                created_at: new Date().toISOString()
            }]);

            chatSendBtn.disabled = false;

            if (error) {
                chatStatus.textContent = 'Gửi thất bại: ' + error.message;
                return;
            }
            chatInput.value = '';
            chatInput.style.height = 'auto';
        }

        if (chatSendBtn) chatSendBtn.addEventListener('click', chatSendMessage);
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    chatSendMessage();
                }
            });
            // Tự giãn chiều cao ô nhập theo nội dung
            chatInput.addEventListener('input', () => {
                chatInput.style.height = 'auto';
                chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
            });
        }

    })();
    // ===== KẾT THÚC TAB "HƯỚNG DẪN" =====

});