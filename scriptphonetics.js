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

        // --- Refs cho khung dịch bài ---
        const newsTeacherBadge     = document.getElementById('news-teacher-badge');
        const newsTranslateCompose = document.getElementById('news-translate-compose');
        const newsTranslateTextarea = document.getElementById('news-translate-textarea');
        const newsTranslateStatus  = document.getElementById('news-translate-status');
        const newsTranslateSubmitBtn = document.getElementById('news-translate-submit-btn');
        const newsTranslateCancelBtn = document.getElementById('news-translate-cancel-btn');
        const newsTranslatePeers   = document.getElementById('news-translate-peers');
        const newsPeersRefreshBtn  = document.getElementById('news-peers-refresh-btn');

        const NEWS_TRANSLATE_PLACEHOLDER = 'Nhập bản dịch tiếng Việt của bạn cho bài báo này...';

        let currentArticleId = null;   // bài tin đang mở
        let mySubmitted = false;       // học viên đã nộp bài dịch cho bài tin đang mở chưa
        let myRowId = null;            // id hàng của bài dịch của chính mình (dùng khi cần)
        let myRowData = null;          // dữ liệu hàng bài dịch của chính mình (cache)
        let isEditingMine = false;     // học viên đang bấm ✏️ để sửa bài đã nộp
        let translateSaveTimer = null; // debounce timer cho autosave (chỉ dùng khi chưa nộp)

        if (!newsFolderCard) return;

        // ===== KHUNG DỊCH BÀI: helper & logic =====
        function escapeHtmlNews(str) {
            if (str === null || str === undefined) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function newsDisplayName(email) {
            if (!email) return 'Ẩn danh';
            return email.split('@')[0];
        }

        function newsFormatTime(iso) {
            if (!iso) return '';
            return new Date(iso).toLocaleString('vi-VN');
        }

        // Đặt lại toàn bộ khung dịch bài về trạng thái mặc định + tải dữ liệu cho bài tin mới
        async function initTranslateSection(articleId) {
            currentArticleId = articleId;
            mySubmitted = false;
            myRowId = null;
            myRowData = null;
            isEditingMine = false;

            newsTeacherBadge.style.display = isTeacher ? 'inline-block' : 'none';
            // Giảng viên không cần khung soạn bài — chỉ xem & nhận xét
            newsTranslateCompose.style.display = isTeacher ? 'none' : '';

            newsTranslateTextarea.placeholder = NEWS_TRANSLATE_PLACEHOLDER;
            newsTranslateTextarea.value = '';
            newsTranslateTextarea.disabled = true;
            newsTranslateSubmitBtn.style.display = '';
            newsTranslateSubmitBtn.textContent = 'Nộp bài dịch';
            newsTranslateSubmitBtn.disabled = true;
            newsTranslateCancelBtn.style.display = 'none';
            newsTranslateStatus.textContent = isTeacher ? '' : 'Đang tải bài dịch của bạn...';
            newsTranslateStatus.className = 'news-translate-status';
            newsTranslatePeers.innerHTML = '<p class="news-translate-locked-msg">Đang tải...</p>';

            if (!currentUserId) {
                newsTranslateStatus.textContent = 'Vui lòng đăng nhập để dịch bài.';
                newsTranslatePeers.innerHTML = '<p class="news-translate-locked-msg">Vui lòng đăng nhập để xem bài dịch của học viên khác.</p>';
                return;
            }

            if (!isTeacher) {
                newsTranslateTextarea.disabled = false;
                newsTranslateSubmitBtn.disabled = false;

                const myRow = await loadMyTranslation(articleId);
                myRowData = myRow;
                if (myRow) {
                    myRowId = myRow.id;
                    mySubmitted = !!myRow.submitted;
                    if (mySubmitted) {
                        enterLockedComposeState();
                    } else {
                        newsTranslateTextarea.value = myRow.translation || '';
                        newsTranslateStatus.textContent = 'Đã lưu bản nháp. Nộp bài để xem bài dịch của học viên khác.';
                    }
                } else {
                    newsTranslateStatus.textContent = 'Nhập bản dịch của bạn — hệ thống sẽ tự lưu khi bạn gõ.';
                }
            }

            await refreshPeerList(articleId);
        }

        // Trạng thái "đã nộp": ô soạn bài trống lại và bị khóa, không autosave
        function enterLockedComposeState() {
            isEditingMine = false;
            clearTimeout(translateSaveTimer);
            newsTranslateTextarea.value = '';
            newsTranslateTextarea.disabled = true;
            newsTranslateTextarea.placeholder = 'Bạn đã nộp bài dịch cho bài này. Bấm biểu tượng ✏️ trong danh sách bên dưới để chỉnh sửa.';
            newsTranslateSubmitBtn.style.display = 'none';
            newsTranslateCancelBtn.style.display = 'none';
            newsTranslateStatus.textContent = myRowData ? `✅ Đã nộp lúc ${newsFormatTime(myRowData.submitted_at)}.` : '✅ Đã nộp bài.';
            newsTranslateStatus.className = 'news-translate-status submitted';
        }

        // Trạng thái chỉnh sửa: học viên vừa bấm ✏️ trên bài dịch đã nộp của mình
        function enterEditingState() {
            isEditingMine = true;
            newsTranslateTextarea.placeholder = NEWS_TRANSLATE_PLACEHOLDER;
            newsTranslateTextarea.value = myRowData ? (myRowData.translation || '') : '';
            newsTranslateTextarea.disabled = false;
            newsTranslateSubmitBtn.style.display = '';
            newsTranslateSubmitBtn.textContent = 'Lưu chỉnh sửa';
            newsTranslateCancelBtn.style.display = '';
            newsTranslateStatus.textContent = 'Đang chỉnh sửa bài dịch của bạn...';
            newsTranslateStatus.className = 'news-translate-status';
            newsTranslateTextarea.focus();
            newsTranslateTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            refreshPeerList(currentArticleId); // ẩn tạm thẻ "Bạn" khỏi danh sách trong lúc sửa
        }

        // Tải bài dịch của chính học viên đang đăng nhập cho 1 bài tin
        async function loadMyTranslation(articleId) {
            try {
                const { data, error } = await sb
                    .from('news_translations')
                    .select('*')
                    .eq('article_id', articleId)
                    .eq('user_id', currentUserId)
                    .maybeSingle();
                if (error) throw error;
                return data;
            } catch (err) {
                console.error('Lỗi khi tải bài dịch của bạn:', err.message);
                return null;
            }
        }

        // Lưu (upsert) bài dịch của học viên — dùng cho autosave (bản nháp) và khi nộp/sửa bài
        // touchSubmittedAt: chỉ true ở lần NỘP ĐẦU TIÊN (để không ghi đè thời gian nộp gốc khi sửa sau đó).
        async function saveMyTranslation(articleId, translationText, submitted, touchSubmittedAt) {
            const payload = {
                article_id: articleId,
                user_id: currentUserId,
                email: currentEmail,
                translation: translationText,
                submitted: submitted,
                updated_at: new Date().toISOString()
            };
            if (touchSubmittedAt) payload.submitted_at = new Date().toISOString();

            const { data, error } = await sb
                .from('news_translations')
                .upsert(payload, { onConflict: 'article_id,user_id' })
                .select()
                .maybeSingle();

            if (error) throw error;
            return data;
        }

        // Autosave có debounce — CHỈ áp dụng khi đang soạn bản nháp (chưa nộp lần nào).
        // Sau khi đã nộp, việc sửa phải qua nút ✏️ + bấm "Lưu chỉnh sửa" một cách chủ động.
        function scheduleAutosave() {
            if (!currentUserId || currentArticleId === null || mySubmitted) return;
            newsTranslateStatus.textContent = 'Đang gõ...';
            newsTranslateStatus.className = 'news-translate-status';
            clearTimeout(translateSaveTimer);
            translateSaveTimer = setTimeout(async () => {
                const text = newsTranslateTextarea.value;
                try {
                    const saved = await saveMyTranslation(currentArticleId, text, false, false);
                    if (saved) { myRowId = saved.id; myRowData = saved; }
                    newsTranslateStatus.textContent = '💾 Đã lưu bản nháp tự động.';
                    newsTranslateStatus.className = 'news-translate-status saved';
                } catch (err) {
                    console.error('Lỗi autosave bài dịch:', err.message);
                    newsTranslateStatus.textContent = '❌ Lưu thất bại: ' + err.message;
                    newsTranslateStatus.className = 'news-translate-status';
                }
            }, 900);
        }

        newsTranslateTextarea.addEventListener('input', scheduleAutosave);

        // Nộp bài dịch (lần đầu) hoặc Lưu chỉnh sửa (sau khi bấm ✏️)
        newsTranslateSubmitBtn.addEventListener('click', async () => {
            if (!currentUserId || isTeacher) return;
            if (currentArticleId === null) return;
            const text = newsTranslateTextarea.value.trim();
            if (!text) {
                alert('Vui lòng nhập bản dịch trước khi nộp.');
                return;
            }
            clearTimeout(translateSaveTimer);
            const isFirstSubmission = !mySubmitted;
            newsTranslateSubmitBtn.disabled = true;
            newsTranslateStatus.textContent = isFirstSubmission ? 'Đang nộp bài...' : 'Đang lưu chỉnh sửa...';
            try {
                const saved = await saveMyTranslation(currentArticleId, text, true, isFirstSubmission);
                myRowData = saved || { ...(myRowData || {}), translation: text, submitted: true };
                myRowId = myRowData.id || myRowId;
                mySubmitted = true;
                enterLockedComposeState();
                await refreshPeerList(currentArticleId);
            } catch (err) {
                console.error('Lỗi khi nộp bài dịch:', err.message);
                newsTranslateStatus.textContent = '❌ Nộp bài thất bại: ' + err.message;
            } finally {
                newsTranslateSubmitBtn.disabled = false;
            }
        });

        // Hủy chỉnh sửa — quay lại trạng thái đã nộp, không lưu thay đổi
        newsTranslateCancelBtn.addEventListener('click', () => {
            enterLockedComposeState();
            refreshPeerList(currentArticleId);
        });

        // Tải danh sách bài dịch (RLS tự chặn nếu chưa nộp bài / không phải giảng viên)
        async function loadPeerTranslations(articleId) {
            try {
                const { data, error } = await sb
                    .from('news_translations')
                    .select('*')
                    .eq('article_id', articleId)
                    .order('updated_at', { ascending: false });
                if (error) throw error;
                return data || [];
            } catch (err) {
                console.error('Lỗi khi tải bài dịch của học viên khác:', err.message);
                return null; // null = có lỗi/không có quyền xem
            }
        }

        // Vẽ lại danh sách bài dịch — bao gồm cả bài của chính mình (đánh dấu "Bạn" + nút ✏️),
        // trừ khi đang trong lúc chỉnh sửa thì tạm ẩn thẻ của mình để tránh hiển thị trùng lặp.
        function renderPeerList(rows) {
            if (rows === null) {
                newsTranslatePeers.innerHTML = '<p class="news-translate-locked-msg">Hãy nộp bài dịch của bạn để xem bài dịch của các học viên khác.</p>';
                return;
            }
            const visibleRows = rows.filter(r => !(isEditingMine && r.user_id === currentUserId));
            if (visibleRows.length === 0) {
                newsTranslatePeers.innerHTML = '<p class="news-translate-locked-msg">Chưa có bài dịch nào được nộp cho bài này.</p>';
                return;
            }
            newsTranslatePeers.innerHTML = visibleRows.map(row => {
                const isMe = row.user_id === currentUserId;
                const canEdit = isMe && !isTeacher;
                const feedbackBlock = row.teacher_feedback
                    ? `<div class="news-peer-feedback-existing"><strong>💬 Nhận xét của giảng viên:</strong>${escapeHtmlNews(row.teacher_feedback)}</div>`
                    : '';
                const feedbackForm = isTeacher
                    ? `<div class="news-peer-feedback-form">
                            <textarea data-row-id="${row.id}" class="news-feedback-input" placeholder="Viết nhận xét cho bài dịch này...">${escapeHtmlNews(row.teacher_feedback || '')}</textarea>
                            <button type="button" class="news-peer-feedback-save-btn" data-row-id="${row.id}">Lưu nhận xét</button>
                       </div>`
                    : '';
                const editBtn = canEdit
                    ? `<button type="button" class="news-peer-edit-btn" data-row-id="${row.id}" title="Chỉnh sửa bài dịch của bạn">✏️</button>`
                    : '';
                return `<div class="news-peer-item ${isMe ? 'is-me' : ''}">
                    <div class="news-peer-header">
                        <span class="news-peer-name">${isMe ? '👤 Bạn' : '👤 ' + escapeHtmlNews(newsDisplayName(row.email))}</span>
                        <span class="news-peer-header-right">
                            <span class="news-peer-time">${row.submitted ? 'Nộp lúc ' + newsFormatTime(row.submitted_at) : 'Bản nháp'}</span>
                            ${editBtn}
                        </span>
                    </div>
                    <div class="news-peer-text">${escapeHtmlNews(row.translation)}</div>
                    ${feedbackBlock}
                    ${feedbackForm}
                </div>`;
            }).join('');
        }

        // Kết hợp tải + vẽ danh sách bài dịch
        async function refreshPeerList(articleId) {
            if (!currentUserId) return;
            if (!mySubmitted && !isTeacher) {
                newsTranslatePeers.innerHTML = '<p class="news-translate-locked-msg">Hãy nộp bài dịch của bạn để xem bài dịch của các học viên khác.</p>';
                return;
            }
            const rows = await loadPeerTranslations(articleId);
            renderPeerList(rows);
        }

        newsPeersRefreshBtn.addEventListener('click', () => {
            if (currentArticleId !== null) refreshPeerList(currentArticleId);
        });

        // Ủy quyền sự kiện trên danh sách: bấm ✏️ để sửa bài của mình, hoặc (giảng viên) lưu nhận xét
        newsTranslatePeers.addEventListener('click', async (e) => {
            const editBtn = e.target.closest('.news-peer-edit-btn');
            if (editBtn) {
                if (!isTeacher) enterEditingState();
                return;
            }

            const btn = e.target.closest('.news-peer-feedback-save-btn');
            if (!btn) return;
            if (!isTeacher) return;
            const rowId = btn.dataset.rowId;
            const textarea = newsTranslatePeers.querySelector(`.news-feedback-input[data-row-id="${rowId}"]`);
            const feedbackText = textarea ? textarea.value.trim() : '';
            btn.disabled = true;
            btn.textContent = 'Đang lưu...';
            try {
                const { error } = await sb
                    .from('news_translations')
                    .update({
                        teacher_feedback: feedbackText,
                        teacher_feedback_at: new Date().toISOString(),
                        teacher_feedback_by: currentEmail
                    })
                    .eq('id', rowId);
                if (error) throw error;
                btn.textContent = '✅ Đã lưu';
                setTimeout(() => { btn.disabled = false; btn.textContent = 'Lưu nhận xét'; }, 1200);
            } catch (err) {
                console.error('Lỗi khi lưu nhận xét:', err.message);
                alert('Lưu nhận xét thất bại: ' + err.message + '\n(Kiểm tra email giảng viên đã đúng trong TEACHER_EMAILS và trong policy RLS trên Supabase.)');
                btn.disabled = false;
                btn.textContent = 'Lưu nhận xét';
            }
        });
        // ===== KẾT THÚC KHUNG DỊCH BÀI =====

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

            // Khởi tạo khung dịch bài cho bài tin này
            initTranslateSection(article.id);

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
    })();
    // ===== KẾT THÚC LOGIC TIN NGẮN =====

    (function initGrammarTab() {
        const grammarFolderGrid = document.getElementById('grammar-folder-grid');
        const grammarPanels     = document.getElementById('grammar-panels');
        const searchInput       = document.getElementById('grammar-search-input');
        const searchClear       = document.getElementById('grammar-search-clear');
        const folderCards       = document.querySelectorAll('.grammar-folder-card');
        const quizModal         = document.getElementById('grammar-quiz-modal');
        const quizIframe        = document.getElementById('grammar-quiz-iframe');
        const quizClose         = document.getElementById('grammar-quiz-close');

        // Helper: hiển thị folder list, ẩn panels
        function showFolderList() {
            grammarFolderGrid.style.display = '';
            grammarPanels.style.display = 'none';
            document.querySelectorAll('.grammar-panel').forEach(p => p.classList.remove('active'));
        }

        // Helper: hiển thị panel cụ thể
        function showPanel(folderId) {
            grammarFolderGrid.style.display = 'none';
            grammarPanels.style.display = 'block';
            const panel = document.getElementById('panel-' + folderId);
            if (panel) panel.classList.add('active');
        }

        // Click folder card → mở panel
        folderCards.forEach(card => {
            card.addEventListener('click', () => {
                const folderId = card.dataset.folder;
                showPanel(folderId);
            });
        });

        // Nút quay lại trong panel
        document.querySelectorAll('.grammar-back-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                showFolderList();
            });
        });

        // Nút xem chi tiết hình minh họa → mở tab mới (tránh lỗi iframe Google Drive)
        document.querySelectorAll('.grammar-detail-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const url = btn.dataset.quizUrl;
                window.open(url, '_blank');
            });
        });

        // Nút kiểm tra → mở modal
        document.querySelectorAll('.grammar-quiz-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const url = btn.dataset.quizUrl;
                if (quizModal && quizIframe) {
                    quizIframe.src = url;
                    quizModal.style.display = 'flex';
                    quizModal.querySelector('span').textContent = '✏️ Bài kiểm tra ngữ pháp';
                }
            });
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

        // Thanh tìm kiếm
        const noResults = document.createElement('div');
        noResults.id = 'grammar-no-results';
        noResults.textContent = 'Không tìm thấy kết quả phù hợp.';
        grammarFolderGrid.after(noResults);

        function doSearch(query) {
            const q = query.trim().toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let visibleCount = 0;

            folderCards.forEach(card => {
                const text = card.textContent.toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const match = !q || text.includes(q);
                card.classList.toggle('search-hidden', !match);
                card.classList.toggle('search-match', !!q && match);
                if (match) visibleCount++;
            });

            noResults.classList.toggle('visible', visibleCount === 0);
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