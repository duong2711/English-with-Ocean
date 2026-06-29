document.addEventListener('DOMContentLoaded', () => {

    // --- CẤU HÌNH SUPABASE (GIỮ NGUYÊN) ---
    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co'; 
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ'; 
    const AUDIO_BUCKET_NAME = 'audio_comments'; 
    const ADMIN_PASSWORD = 'admin'; 
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
    const authStatus = document.getElementById('auth-status');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const ipaChart = document.querySelector('.ipa-chart'); 
    const guideDisplay = document.getElementById('guide-display'); 
    
    let currentUserId = null; 
    let currentEmail = ''; 
    let holdTimer = null; // Thêm biến này

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
            authContainer.style.display = 'none';
            logoutBtn.style.display = 'block';
            authStatus.textContent = `Đã đăng nhập: ${user.email} (ID: ${user.id.substring(0, 8)}...)`;
            
            // [CẬP NHẬT] Hiển thị Menu và xóa trạng thái ẩn của các Tab
            if (mainMenu) mainMenu.style.display = 'flex';
            mainTabContents.forEach(tab => tab.style.display = ''); // Để CSS tự quản lý bằng class .active
            
            // Xóa inline style cũ để CSS Grid mới tự hoạt động chuẩn xác
            if (ipaChart) ipaChart.style.display = ''; 
            if (guideDisplay) guideDisplay.style.display = ''; 

            // Tải trạng thái hoàn thành ngay lập tức
            loadCompletionStatus(user);

            // Làm sạch danh sách ghi âm khi mới vừa đăng nhập
            commentsList.innerHTML = '<p>Hãy chọn một ký tự IPA để bắt đầu học và gửi ghi âm.</p>';
            commentSymbolDisplay.textContent = '...';
            currentSymbol = ''; // Reset ký tự đang chọn

        } else {
            currentUserId = null;
            currentEmail = '';
            authContainer.style.display = 'block';
            logoutBtn.style.display = 'none';
            authStatus.innerText = 'Tài khoản demo: hv2@gmail.com, Mật khẩu: hv2\n\nTài khoản demo: hv3@gmail.com, Mật khẩu: hv3';

            // [CẬP NHẬT] Ẩn Menu và TOÀN BỘ các Tab khi chưa đăng nhập
            if (mainMenu) mainMenu.style.display = 'none';
            mainTabContents.forEach(tab => tab.style.display = 'none');

            ipaChart.style.display = 'none'; 
            guideDisplay.style.display = 'none'; 
            hideVideoAndShowPlaceholder();
            
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
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.target.dataset.target;
            activateTab(targetId);
        });
    });
    
    // Đảm bảo tab đầu tiên được hiển thị khi tải trang
    activateTab('monophthongs');
    
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

        for (let h = 0; h <= 23; h++) {
            for (let m = 0; m < 60; m += 15) {
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

        const NEWS_DATA = [
            {
                id: 1,
                date: "2026-06-24",
                title: "Giant Panda Twins Born at Zoo",
                thumb: "https://www.newsinlevels.com/wp-content/uploads/2026/06/Depositphotos_301584360_L.jpg.avif",
                content: `<p>A zoo in the United States celebrated the birth of giant panda twins last week. The two cubs, a male and a female, were born to mother <strong>Bao Bao</strong>, who arrived from China three years ago. Zoo staff say the babies are healthy and feeding well.</p>
<p>Giant pandas are an endangered species. There are fewer than 2,000 of them living in the wild today. Most live in the mountains of central China, where they eat bamboo all day long. Zoos around the world help protect pandas through special breeding programs.</p>
<p>The twin cubs do not have names yet. The zoo plans to hold a public naming contest next month. Visitors are excited to see the new arrivals, but the cubs will stay in a private area for several weeks until they are strong enough to be seen by the public.</p>`,
                quiz: [
                    {
                        q: "Where were the panda twins born?",
                        options: ["In China", "At a zoo in the US", "In the wild", "At a university"],
                        answer: 1
                    },
                    {
                        q: "What do giant pandas eat every day?",
                        options: ["Fish", "Fruit", "Bamboo", "Insects"],
                        answer: 2
                    },
                    {
                        q: "What does the zoo plan to do next month?",
                        options: ["Release the pandas into the wild", "Hold a naming contest", "Send the cubs back to China", "Open a new panda exhibit"],
                        answer: 1
                    }
                ]
            },
            {
                id: 2,
                date: "2026-06-25",
                title: "Electric Cars Now Outsell Gas Cars in Norway",
                thumb: "https://www.newsinlevels.com/wp-content/uploads/2026/06/Depositphotos_301584360_L.jpg.avif",
                content: `<p>Norway has become the first country in the world where <strong>electric cars</strong> outsell traditional gasoline-powered cars. In the last quarter, electric vehicles made up over 80% of all new car sales in the country.</p>
<p>The Norwegian government has supported electric cars for many years. It offers tax benefits and allows electric cars to use bus lanes. There are also many charging stations across the country, making it easy for people to charge their vehicles.</p>
<p>Other countries are now looking at Norway's example. Experts say that if more governments offer similar support, electric car sales could grow quickly around the world. The goal for many countries is to stop selling new gasoline cars by 2035.</p>`,
                quiz: [
                    {
                        q: "What percentage of new car sales in Norway are electric vehicles?",
                        options: ["Over 50%", "Over 80%", "Over 60%", "Over 90%"],
                        answer: 1
                    },
                    {
                        q: "Which of the following is NOT a benefit the Norwegian government offers for electric cars?",
                        options: ["Tax benefits", "Use of bus lanes", "Free parking everywhere", "Many charging stations"],
                        answer: 2
                    },
                    {
                        q: "What is the goal for many countries regarding gasoline cars?",
                        options: ["Stop making them by 2025", "Stop selling new ones by 2035", "Make them cheaper by 2030", "Ban them immediately"],
                        answer: 1
                    }
                ]
            },
            {
                id: 3,
                date: "2026-06-26",
                title: "Scientists Discover New Deep-Sea Species",
                thumb: "https://www.newsinlevels.com/wp-content/uploads/2026/06/Depositphotos_301584360_L.jpg.avif",
                content: `<p>A team of marine biologists has discovered several new species of fish and other sea creatures deep in the Pacific Ocean. The scientists used a special underwater robot to explore areas more than 3,000 meters below the surface.</p>
<p>One of the most interesting discoveries was a glowing jellyfish that had never been seen before. The jellyfish produces its own light, a process called <strong>bioluminescence</strong>. Scientists believe this light helps it attract prey in the dark ocean depths.</p>
<p>The researchers say that the deep sea is still one of the least explored places on Earth. Less than 20% of the ocean floor has been mapped in detail. Each expedition brings new surprises and shows just how much we still have to learn about our planet.</p>`,
                quiz: [
                    {
                        q: "How deep did the scientists explore in the Pacific Ocean?",
                        options: ["1,000 meters", "2,000 meters", "3,000 meters", "5,000 meters"],
                        answer: 2
                    },
                    {
                        q: "What is 'bioluminescence'?",
                        options: ["A deep-sea robot", "The ability to produce one's own light", "A type of jellyfish", "A mapping technique"],
                        answer: 1
                    },
                    {
                        q: "How much of the ocean floor has been mapped in detail?",
                        options: ["Less than 10%", "About 50%", "Less than 20%", "About 30%"],
                        answer: 2
                    }
                ]
            },
            {
                id: 4,
                date: "2026-06-27",
                title: "Young Chef Wins International Cooking Contest",
                thumb: "https://www.newsinlevels.com/wp-content/uploads/2026/06/Depositphotos_301584360_L.jpg.avif",
                content: `<p>A 16-year-old student from Vietnam has won an international cooking competition held in Paris, France. <strong>Nguyen Minh Duc</strong> beat more than 200 competitors from 45 countries to take the top prize.</p>
<p>Duc prepared a three-course meal that combined traditional Vietnamese ingredients with French cooking techniques. The judges praised his creative use of lemongrass, fish sauce, and fresh herbs. They said his food was both delicious and beautifully presented.</p>
<p>Duc said he learned to cook from his grandmother when he was just six years old. He hopes to open his own restaurant one day and show the world how wonderful Vietnamese cuisine can be. His school in Ho Chi Minh City held a small celebration in his honor after he returned home.</p>`,
                quiz: [
                    {
                        q: "How old is Nguyen Minh Duc?",
                        options: ["14", "15", "16", "17"],
                        answer: 2
                    },
                    {
                        q: "Where was the cooking competition held?",
                        options: ["Vietnam", "London", "Paris", "Tokyo"],
                        answer: 2
                    },
                    {
                        q: "Who taught Duc how to cook?",
                        options: ["His mother", "His teacher", "A famous chef", "His grandmother"],
                        answer: 3
                    }
                ]
            },
            {
                id: 5,
                date: "2026-06-28",
                title: "City Plants One Million Trees in Green Initiative",
                thumb: "https://www.newsinlevels.com/wp-content/uploads/2026/06/Depositphotos_301584360_L.jpg.avif",
                content: `<p>The city of Melbourne, Australia, has completed its goal of planting one million trees over the past ten years as part of a major environmental project. City officials announced the milestone last Tuesday at a ceremony in the central park.</p>
<p>The project was started in 2015 after scientists warned that rising temperatures in the city were causing health problems for residents. Trees provide <strong>shade</strong>, reduce heat, clean the air, and provide homes for birds and insects. Officials say the city is now measurably cooler than it was a decade ago.</p>
<p>Other cities around the world have noticed Melbourne's success and are planning similar programs. Environmental groups say this kind of urban greening is one of the most effective and affordable ways to fight climate change at the local level.</p>`,
                quiz: [
                    {
                        q: "How long did the tree-planting project take?",
                        options: ["5 years", "10 years", "15 years", "20 years"],
                        answer: 1
                    },
                    {
                        q: "Why was the tree-planting project started in 2015?",
                        options: ["To attract tourists", "To build new parks", "Because rising temperatures caused health problems", "To celebrate a city anniversary"],
                        answer: 2
                    },
                    {
                        q: "According to environmental groups, what is urban greening?",
                        options: ["An expensive solution to climate change", "One of the most effective and affordable ways to fight climate change", "Only useful in large cities", "A temporary solution"],
                        answer: 1
                    }
                ]
            },
            {
                id: 6,
                date: "2026-06-29",
                title: "Robot Helps Elderly People Live Independently",
                thumb: "https://www.newsinlevels.com/wp-content/uploads/2026/06/Depositphotos_301584360_L.jpg.avif",
                content: `<p>A Japanese technology company has released a home robot designed to help elderly people with daily tasks. The robot, called <strong>CareBot</strong>, can remind users to take their medicine, help them stand up from chairs, and even call for help if there is an emergency.</p>
<p>Japan has one of the oldest populations in the world, and there is a growing need for elderly care. Many older people want to continue living at home rather than move to a care facility. The CareBot is designed to make this possible by providing support throughout the day.</p>
<p>Early users say they feel safer and more confident with the robot at home. One 82-year-old user said, "It feels like having a patient helper who never gets tired." The robot currently costs around $3,000, but the company hopes to lower the price as production increases.</p>`,
                quiz: [
                    {
                        q: "What is the name of the Japanese home robot?",
                        options: ["HomeBot", "CareBot", "ElderBot", "HelpBot"],
                        answer: 1
                    },
                    {
                        q: "Which of the following can CareBot NOT do?",
                        options: ["Remind users to take medicine", "Help users stand up", "Cook meals", "Call for help in emergencies"],
                        answer: 2
                    },
                    {
                        q: "How much does the CareBot currently cost?",
                        options: ["$1,000", "$2,000", "$3,000", "$5,000"],
                        answer: 2
                    }
                ]
            }
        ];

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
        const newsQuizQuestions    = document.getElementById('news-quiz-questions');
        const newsQuizSubmit       = document.getElementById('news-quiz-submit');
        const newsQuizResult       = document.getElementById('news-quiz-result');

        if (!newsFolderCard) return;

        // Render thumbnail cards
        function renderNewsCards() {
            newsCardsGrid.innerHTML = '';
            NEWS_DATA.forEach(article => {
                const card = document.createElement('div');
                card.className = 'news-card';
                card.innerHTML = `
                    <img class="news-card-thumb" src="${article.thumb}" alt="${article.title}" loading="lazy" onerror="this.style.background='var(--surface-2)';this.style.minHeight='120px'">
                    <div class="news-card-title">${article.title}</div>
                    <div class="news-card-date">📅 ${formatDate(article.date)}</div>
                `;
                card.addEventListener('click', () => openArticle(article));
                newsCardsGrid.appendChild(card);
            });
        }

        // Mở folder tin ngắn
        newsFolderCard.addEventListener('click', () => {
            vocabFolderGrid.style.display = 'none';
            newsPanel.style.display = 'block';
            newsArticlePanel.style.display = 'none';
            renderNewsCards();
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

        // Mở bài báo chi tiết
        function openArticle(article) {
            newsPanel.style.display = 'none';
            newsArticlePanel.style.display = 'block';
            newsArticleTitle.textContent = article.title;

            // Hiển thị ngày đăng bên dưới tiêu đề
            let dateEl = document.getElementById('news-article-date');
            if (!dateEl) {
                dateEl = document.createElement('div');
                dateEl.id = 'news-article-date';
                dateEl.className = 'news-article-date';
                newsArticleTitle.after(dateEl);
            }
            dateEl.textContent = '📅 ' + formatDate(article.date);

            newsArticleImg.src = article.thumb;
            newsArticleImg.alt = article.title;
            newsArticleText.innerHTML = article.content;

            // Render quiz
            newsQuizQuestions.innerHTML = '';
            newsQuizResult.style.display = 'none';
            newsQuizResult.className = 'news-quiz-result';
            newsQuizSubmit.style.display = 'block';
            newsQuizSubmit.disabled = false;

            article.quiz.forEach((q, qi) => {
                const block = document.createElement('div');
                block.className = 'news-question-block';
                block.innerHTML = `<div class="news-question-text">${qi + 1}. ${q.q}</div>
                    <div class="news-options">
                        ${q.options.map((opt, oi) => `
                            <label class="news-option-label">
                                <input type="radio" name="news-q${qi}" value="${oi}"> ${opt}
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

    // =========================================================
    //  🎴  TRÒ LÔ TÔ  (2 người chơi — Supabase Realtime)
    // =========================================================
    (function initLotoGame() {

        // ─── DOM refs ───
        const lotoFolderCard  = document.getElementById('loto-folder-card');
        const lotoPanel       = document.getElementById('loto-panel');
        const lotoBackBtn     = document.getElementById('loto-back-btn');
        const giaotriGrid     = document.getElementById('giaitori-folder-grid');

        const rolePicker      = document.getElementById('loto-role-picker');
        const roleStatus      = document.getElementById('loto-role-status');
        const roleBtns        = document.querySelectorAll('.loto-role-btn');

        const gameArea        = document.getElementById('loto-game-area');
        const adminControls   = document.getElementById('loto-admin-controls');
        const playerTimerDiv  = document.getElementById('loto-player-timer');

        const p1Badge         = document.getElementById('loto-p1-badge');
        const p2Badge         = document.getElementById('loto-p2-badge');
        const adminBadge      = document.getElementById('loto-admin-badge');
        const sheet1OwnerLbl  = document.getElementById('sheet1-owner-label');
        const sheet2OwnerLbl  = document.getElementById('sheet2-owner-label');

        const resultInput     = document.getElementById('loto-result-input');
        const confirmBtn      = document.getElementById('loto-confirm-btn');
        const nextBtn         = document.getElementById('loto-next-btn');
        const adminHint       = document.getElementById('loto-admin-hint');
        const timerDisplay    = document.getElementById('loto-timer-display');
        const playerTimerDisp = document.getElementById('loto-player-timer-display');
        const currentNumDisp  = document.getElementById('loto-current-number-display');
        const timerSetting    = document.getElementById('loto-timer-setting');
        const timerResetBtn   = document.getElementById('loto-timer-reset-btn');
        const calledList      = document.getElementById('loto-called-list');
        const newGameBtn      = document.getElementById('loto-new-game-btn');
        const roundResultEl   = document.getElementById('loto-round-result');
        const bingoBtns       = [
            document.getElementById('loto-bingo-btn-1'),
            document.getElementById('loto-bingo-btn-2')
        ];

        // ─── State ───
        let myRole       = null;   // 'player1' | 'player2' | 'admin'
        let mySheetIdx   = null;   // 1 | 2 | null
        let boards       = [[], []]; // boards[0]=sheet1, boards[1]=sheet2 (arrays of 25 nums)
        let selected     = [new Set(), new Set()]; // selected cells per sheet
        let calledNums   = [];
        let currentNum   = null;
        let timerSec     = 15;
        let timerLeft    = 0;
        let timerInterval= null;
        let roundActive  = false;
        let gameStarted  = false;
        let roomChannel  = null;
        let waitingState = { player1: null, player2: null, admin: null }; // email strings
        let bingoShown   = [false, false];

        // ─── Helpers ───
        function shuffle(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
        function generateBoard() {
            const nums = [];
            while (nums.length < 25) {
                const n = Math.floor(Math.random() * 100) + 1;
                if (!nums.includes(n)) nums.push(n);
            }
            return nums; // 25 unique 1–100
        }
        function numToWords(n) {
            const ones = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín',
                          'mười','mười một','mười hai','mười ba','mười bốn','mười lăm',
                          'mười sáu','mười bảy','mười tám','mười chín'];
            const tens = ['','','hai mươi','ba mươi','bốn mươi','năm mươi',
                          'sáu mươi','bảy mươi','tám mươi','chín mươi'];
            if (n <= 19) return ones[n];
            const t = Math.floor(n / 10);
            const o = n % 10;
            if (o === 0) return tens[t];
            if (o === 5) return tens[t] + ' lăm';
            return tens[t] + ' ' + ones[o];
        }

        // ─── Render board ───
        function renderBoard(sheetIdx) {
            // sheetIdx = 0 or 1
            const cardEl = document.getElementById('loto-card-' + (sheetIdx + 1));
            cardEl.innerHTML = '';
            const nums = boards[sheetIdx];
            nums.forEach((num, i) => {
                const cell = document.createElement('div');
                cell.className = 'loto-cell';
                cell.textContent = num;
                cell.dataset.num = num;
                cell.dataset.idx = i;

                // Xác định ai có thể click
                const ownerRole = sheetIdx === 0 ? 'player1' : 'player2';
                if (myRole === ownerRole) {
                    cell.classList.add('clickable');
                    cell.addEventListener('click', () => {
                        if (!roundActive) return;
                        toggleCell(sheetIdx, num, cell);
                    });
                } else {
                    cell.classList.add('readonly');
                }

                // Restore selected state
                if (selected[sheetIdx].has(num)) {
                    cell.classList.add('selected');
                }
                cardEl.appendChild(cell);
            });
        }

        function refreshAllCells(sheetIdx) {
            const cardEl = document.getElementById('loto-card-' + (sheetIdx + 1));
            cardEl.querySelectorAll('.loto-cell').forEach(cell => {
                const num = parseInt(cell.dataset.num);
                cell.classList.remove('selected', 'correct-hit', 'wrong-hit', 'bingo-line');
                if (selected[sheetIdx].has(num)) cell.classList.add('selected');
            });
        }

        // ─── Toggle cell selection (player only) ───
        function toggleCell(sheetIdx, num, cellEl) {
            if (selected[sheetIdx].has(num)) {
                selected[sheetIdx].delete(num);
                cellEl.classList.remove('selected');
            } else {
                selected[sheetIdx].add(num);
                cellEl.classList.add('selected');
            }
            // Broadcast to other player
            broadcast({ type: 'cell_select', sheet: sheetIdx + 1, num, selected: selected[sheetIdx].has(num) });
        }

        // ─── Receive remote cell update ───
        function applyRemoteCellSelect(sheet, num, isSelected) {
            const cardEl = document.getElementById('loto-card-' + sheet);
            const sheetIdx = sheet - 1;
            const cell = cardEl.querySelector(`[data-num="${num}"]`);
            if (isSelected) {
                selected[sheetIdx].add(num);
                if (cell) cell.classList.add('selected');
            } else {
                selected[sheetIdx].delete(num);
                if (cell) cell.classList.remove('selected');
            }
        }

        // ─── Check bingo ───
        function checkBingo(sheetIdx) {
            // Returns array of winning cell indices or null
            const nums = boards[sheetIdx];
            const sel  = selected[sheetIdx];

            // Rows
            for (let r = 0; r < 5; r++) {
                const row = [r*5, r*5+1, r*5+2, r*5+3, r*5+4];
                if (row.every(i => sel.has(nums[i]))) return row;
            }
            // Cols
            for (let c = 0; c < 5; c++) {
                const col = [c, c+5, c+10, c+15, c+20];
                if (col.every(i => sel.has(nums[i]))) return col;
            }
            // Diagonals
            const d1 = [0,6,12,18,24];
            if (d1.every(i => sel.has(nums[i]))) return d1;
            const d2 = [4,8,12,16,20];
            if (d2.every(i => sel.has(nums[i]))) return d2;
            return null;
        }

        function highlightBingo(sheetIdx, indices) {
            const cardEl = document.getElementById('loto-card-' + (sheetIdx + 1));
            const nums = boards[sheetIdx];
            indices.forEach(i => {
                const cell = cardEl.querySelector(`[data-num="${nums[i]}"]`);
                if (cell) cell.classList.add('bingo-line');
            });
        }

        function updateBingoButtons() {
            for (let s = 0; s < 2; s++) {
                const ownerRole = s === 0 ? 'player1' : 'player2';
                if (myRole !== ownerRole) continue;
                const winIndices = checkBingo(s);
                if (winIndices && !bingoShown[s]) {
                    bingoShown[s] = true;
                    bingoBtns[s].style.display = 'block';
                    highlightBingo(s, winIndices);
                }
            }
        }

        // ─── Timer ───
        function startTimer(seconds, onEnd) {
            clearInterval(timerInterval);
            timerLeft = seconds;
            updateTimerDisplay();
            timerInterval = setInterval(() => {
                timerLeft--;
                updateTimerDisplay();
                if (timerLeft <= 0) {
                    clearInterval(timerInterval);
                    if (onEnd) onEnd();
                }
            }, 1000);
        }

        function updateTimerDisplay() {
            const disp = myRole === 'admin' ? timerDisplay : playerTimerDisp;
            if (!disp) return;
            disp.textContent = '⏱ ' + timerLeft;
            disp.classList.remove('warning', 'danger');
            if (timerLeft <= 5) disp.classList.add('danger');
            else if (timerLeft <= 10) disp.classList.add('warning');
        }

        function stopTimer() {
            clearInterval(timerInterval);
        }

        // ─── Supabase Realtime channel ───
        const ROOM_CHANNEL = 'loto-game-room-v1';

        function broadcast(payload) {
            if (!roomChannel) return;
            roomChannel.send({ type: 'broadcast', event: 'game', payload });
        }

        function joinRoom() {
            if (roomChannel) {
                sb.removeChannel(roomChannel);
            }
            roomChannel = sb.channel(ROOM_CHANNEL, {
                config: { broadcast: { self: false } }
            });

            roomChannel
                .on('broadcast', { event: 'game' }, ({ payload }) => handleRemoteEvent(payload))
                .subscribe((status) => {
                    if (status === 'SUBSCRIBED') {
                        // Announce presence
                        broadcast({ type: 'join', role: myRole, email: currentEmail });
                        // If admin, send boards to everyone
                        if (myRole === 'admin' && gameStarted) {
                            broadcast({ type: 'game_state', boards, calledNums, selected: [
                                Array.from(selected[0]), Array.from(selected[1])
                            ], currentNum, roundActive });
                        }
                    }
                });
        }

        function handleRemoteEvent(payload) {
            switch (payload.type) {

                case 'join': {
                    // Update waiting state / badges
                    if (payload.role === 'player1') {
                        waitingState.player1 = payload.email;
                        p1Badge.textContent = '🟥 Tờ 1: ' + (payload.email || 'Người chơi 1');
                        p1Badge.classList.add('online');
                        sheet1OwnerLbl.textContent = '(' + (payload.email || '') + ')';
                    } else if (payload.role === 'player2') {
                        waitingState.player2 = payload.email;
                        p2Badge.textContent = '🟦 Tờ 2: ' + (payload.email || 'Người chơi 2');
                        p2Badge.classList.add('online');
                        sheet2OwnerLbl.textContent = '(' + (payload.email || '') + ')';
                    } else if (payload.role === 'admin') {
                        waitingState.admin = payload.email;
                        adminBadge.textContent = '👑 Admin: ' + (payload.email || 'Trọng tài');
                        adminBadge.classList.add('online');
                    }
                    // If I am admin and boards already generated, re-send state
                    if (myRole === 'admin' && boards[0].length === 25) {
                        broadcast({ type: 'game_state', boards, calledNums, selected: [
                            Array.from(selected[0]), Array.from(selected[1])
                        ], currentNum, roundActive });
                    }
                    break;
                }

                case 'game_state': {
                    // Received from admin on join
                    boards    = payload.boards;
                    calledNums= payload.calledNums || [];
                    selected[0] = new Set(payload.selected[0]);
                    selected[1] = new Set(payload.selected[1]);
                    currentNum  = payload.currentNum;
                    roundActive = payload.roundActive;
                    gameStarted = true;
                    renderBoard(0);
                    renderBoard(1);
                    updateCalledList();
                    if (currentNum) {
                        currentNumDisp.textContent = '🔢 Số: ' + currentNum + ' — ' + numToWords(currentNum).toUpperCase();
                        currentNumDisp.classList.add('active');
                    }
                    break;
                }

                case 'cell_select': {
                    applyRemoteCellSelect(payload.sheet, payload.num, payload.selected);
                    updateBingoButtons();
                    break;
                }

                case 'round_start': {
                    // Admin called a number
                    currentNum  = payload.num;
                    timerSec    = payload.timerSec;
                    roundActive = true;
                    roundResultEl.style.display = 'none';
                    // For player: show number + start timer
                    if (myRole !== 'admin') {
                        currentNumDisp.textContent = '🔢 Số: ' + currentNum + ' — ' + numToWords(currentNum).toUpperCase();
                        currentNumDisp.classList.add('active');
                        startTimer(timerSec, () => {
                            // Time's up for player — do nothing (admin resolves)
                        });
                    }
                    break;
                }

                case 'round_end': {
                    // Admin resolved the round
                    stopTimer();
                    roundActive = false;
                    const results = payload.results; // {sheet1: 'correct'|'wrong', sheet2: ...}
                    showRoundResult(results, payload.adminOk);

                    // Highlight correct/wrong on own sheet
                    for (let s = 0; s < 2; s++) {
                        const cardEl = document.getElementById('loto-card-' + (s + 1));
                        const status = s === 0 ? results.sheet1 : results.sheet2;
                        if (status === 'correct') {
                            const cell = cardEl.querySelector(`[data-num="${payload.calledNum}"]`);
                            if (cell && selected[s].has(payload.calledNum)) cell.classList.add('correct-hit');
                        } else if (status === 'wrong') {
                            selected[s].forEach(n => {
                                if (n !== payload.calledNum) {
                                    const cell = cardEl.querySelector(`[data-num="${n}"]`);
                                    if (cell) cell.classList.add('wrong-hit');
                                }
                            });
                        }
                    }
                    // Update called list (admin already sent it)
                    calledNums = payload.calledNums;
                    updateCalledList();
                    updateBingoButtons();
                    break;
                }

                case 'bingo_claim': {
                    // A player claims bingo
                    showBingoClaim(payload.sheet, payload.email, payload.winIndices);
                    break;
                }

                case 'new_game': {
                    resetGame(payload.boards);
                    break;
                }

                case 'timer_tick': {
                    // Admin broadcasts ticks to keep everyone in sync
                    if (myRole !== 'admin') {
                        timerLeft = payload.left;
                        updateTimerDisplay();
                    }
                    break;
                }
            }
        }

        // ─── Show round result ───
        function showRoundResult(results, adminOk) {
            roundResultEl.style.display = 'block';
            if (!adminOk) {
                roundResultEl.className = 'loto-round-result lose';
                roundResultEl.textContent = '❌ Admin chưa nhập đúng số hoặc chưa xác nhận → Admin thua lượt này!';
                return;
            }
            // Determine message for this player
            let myResult = null;
            if (myRole === 'player1') myResult = results.sheet1;
            else if (myRole === 'player2') myResult = results.sheet2;

            if (myRole === 'admin') {
                roundResultEl.className = 'loto-round-result neutral';
                const s1 = results.sheet1 === 'correct' ? '✅ Tờ 1 đúng' : '❌ Tờ 1 sai';
                const s2 = results.sheet2 === 'correct' ? '✅ Tờ 2 đúng' : '❌ Tờ 2 sai';
                roundResultEl.textContent = `Kết quả lượt: ${s1} · ${s2}`;
            } else if (myResult === 'correct') {
                roundResultEl.className = 'loto-round-result win';
                roundResultEl.textContent = '✅ Bạn chọn đúng! Tiếp tục lượt mới.';
            } else if (myResult === 'wrong') {
                roundResultEl.className = 'loto-round-result lose';
                roundResultEl.textContent = '❌ Bạn chọn sai! Thua lượt này.';
            } else {
                roundResultEl.className = 'loto-round-result neutral';
                roundResultEl.textContent = '⏸ Lượt đã kết thúc. Chờ lượt mới.';
            }
        }

        function showBingoClaim(sheet, email, winIndices) {
            const sheetIdx = sheet - 1;
            highlightBingo(sheetIdx, winIndices);
            roundResultEl.style.display = 'block';
            roundResultEl.className = 'loto-round-result win';
            roundResultEl.textContent = `🎉 ${email || 'Người chơi ' + sheet} tuyên bố BINGO trên Tờ ${sheet}! Kiểm tra hàng thắng.`;
        }

        // ─── Called numbers list ───
        function updateCalledList() {
            calledList.innerHTML = '';
            calledNums.forEach(n => {
                const chip = document.createElement('span');
                chip.className = 'loto-called-chip';
                chip.textContent = n;
                calledList.appendChild(chip);
            });
        }

        // ─── Reset / new game ───
        function resetGame(newBoards) {
            boards      = newBoards || [generateBoard(), generateBoard()];
            selected    = [new Set(), new Set()];
            calledNums  = [];
            currentNum  = null;
            roundActive = false;
            bingoShown  = [false, false];
            gameStarted = true;
            bingoBtns.forEach(b => b.style.display = 'none');
            roundResultEl.style.display = 'none';
            renderBoard(0);
            renderBoard(1);
            updateCalledList();
            if (myRole !== 'admin') {
                currentNumDisp.textContent = 'Chờ admin gọi số...';
                currentNumDisp.classList.remove('active');
                playerTimerDisp.textContent = '⏱ --';
                playerTimerDisp.classList.remove('warning', 'danger');
            }
            stopTimer();
            if (myRole === 'admin') {
                timerDisplay.textContent = '⏱ --';
                timerDisplay.classList.remove('warning', 'danger');
                resultInput.value = '';
                confirmBtn.disabled = false;
                nextBtn.style.display = 'none';
                timerStartedThisRound = false;
                adminHint.textContent = '💡 Ván mới! Gõ tên số bằng tiếng Anh (vd: eighteen) để bắt đầu lượt.';
            }
        }

        // ─── English word → number map (1–100) ───
        const WORD_TO_NUM = (() => {
            const map = {};
            const ones = ['','one','two','three','four','five','six','seven','eight','nine',
                          'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen',
                          'seventeen','eighteen','nineteen'];
            const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
            for (let i = 1; i <= 19; i++) map[ones[i]] = i;
            for (let t = 2; t <= 9; t++) {
                map[tens[t]] = t * 10;
                for (let o = 1; o <= 9; o++) {
                    // "twenty-one", "twenty one", "twentyone"
                    const word = tens[t] + '-' + ones[o];
                    const wordSpace = tens[t] + ' ' + ones[o];
                    const wordJoined = tens[t] + ones[o];
                    map[word]       = t * 10 + o;
                    map[wordSpace]  = t * 10 + o;
                    map[wordJoined] = t * 10 + o;
                }
            }
            map['one hundred'] = 100;
            map['onehundred']  = 100;
            map['a hundred']   = 100;
            map['hundred']     = 100;
            return map;
        })();

        function parseWordInput(raw) {
            return WORD_TO_NUM[raw.trim().toLowerCase()] || null;
        }

        // ─── Admin: confirm number (word-based) ───
        let timerStartedThisRound = false;

        function adminConfirm() {
            const raw = resultInput.value.trim();
            const val = parseWordInput(raw);

            if (!val || val < 1 || val > 100) {
                // Admin typed wrong word → Admin loses this round
                adminHint.textContent = `❌ "${raw}" không phải tên số hợp lệ → Admin thua lượt này!`;
                stopTimer();
                if (timerStartedThisRound) {
                    // Round was already live — resolve as admin fail
                    resolveRound(false);
                } else {
                    // Admin confirmed before timer — still admin fault
                    roundActive = true;
                    currentNum  = null;
                    calledNums.push(null); // placeholder so round advances
                    resolveRound(false);
                    calledNums.pop();
                }
                timerStartedThisRound = false;
                return;
            }

            if (calledNums.includes(val)) {
                adminHint.textContent = `⚠️ Số ${val} đã được gọi rồi! Chọn số khác.`;
                return;
            }

            // Valid word & unused number
            currentNum  = val;
            roundActive = true;
            timerSec    = parseInt(timerSetting.value) || 15;
            confirmBtn.disabled = true;
            nextBtn.style.display = 'none';
            adminHint.textContent = `✅ Số ${val} (${raw}) — đang đếm ngược...`;

            // Broadcast round start
            broadcast({ type: 'round_start', num: val, timerSec });

            // If timer was already running (started on first keystroke), just let it continue;
            // otherwise start it now
            if (!timerStartedThisRound) {
                startTimer(timerSec, adminTimerEnd);
                timerStartedThisRound = true;
            }

            // Sync ticks
            const syncInterval = setInterval(() => {
                broadcast({ type: 'timer_tick', left: timerLeft });
                if (timerLeft <= 0) clearInterval(syncInterval);
            }, 1000);

            // Add to called list
            calledNums.push(val);
        }

        function adminTimerEnd() {
            stopTimer();
            timerDisplay.textContent = '⏱ 0';
            timerDisplay.classList.add('danger');
            resolveRound(true);
        }

        function resolveRound(adminOk) {
            roundActive = false;
            // Determine results for each sheet
            const results = {};
            // Correct = player selected exactly currentNum (and nothing else outside calledNums)
            // Logic: player must have selected the called number; any selected number NOT in calledNums = wrong
            for (let s = 0; s < 2; s++) {
                const sel = selected[s];
                const hasCurrentNum = sel.has(currentNum);
                // Wrong if they selected a number that was NOT called
                const selectedWrong = [...sel].some(n => !calledNums.includes(n) && n !== currentNum);
                if (selectionIsCorrect(s, currentNum)) {
                    results['sheet' + (s + 1)] = 'correct';
                } else {
                    results['sheet' + (s + 1)] = 'wrong';
                }
            }
            const calledNumsCopy = [...calledNums];
            broadcast({ type: 'round_end', results, adminOk, calledNum: currentNum, calledNums: calledNumsCopy });
            showRoundResult(results, adminOk);
            updateCalledList();
            updateBingoButtons();

            // Show next round button
            nextBtn.style.display = 'inline-block';
            confirmBtn.disabled = false;
            resultInput.value = '';
            timerStartedThisRound = false;
            adminHint.textContent = '💡 Nhấn "Lượt mới" hoặc gõ tên số tiếp theo.';
        }

        function selectionIsCorrect(sheetIdx, calledNum) {
            // A player is "correct" if they selected the called number 
            // and did NOT select any number that has not been called
            const sel = selected[sheetIdx];
            if (!sel.has(calledNum)) return false;
            // Check for stray selections (numbers selected but not in calledNums)
            for (const n of sel) {
                if (!calledNums.includes(n)) return false;
            }
            return true;
        }

        // ─── Role assignment ───
        function assignRole(role) {
            myRole = role;
            if (role === 'player1') mySheetIdx = 0;
            else if (role === 'player2') mySheetIdx = 1;
            else mySheetIdx = null;

            // Show game area
            rolePicker.style.display = 'none';
            gameArea.style.display   = 'block';

            // Show admin controls or player timer
            if (role === 'admin') {
                adminControls.style.display  = 'block';
                playerTimerDiv.style.display = 'none';
                // Admin generates boards on first join
                if (!gameStarted) {
                    resetGame();
                    // Broadcast initial state to anyone already connected
                    setTimeout(() => {
                        broadcast({ type: 'game_state', boards, calledNums, selected: [
                            Array.from(selected[0]), Array.from(selected[1])
                        ], currentNum, roundActive });
                    }, 800);
                }
            } else {
                adminControls.style.display  = 'none';
                playerTimerDiv.style.display = 'block';
            }

            // Update my own badge
            if (role === 'player1') {
                p1Badge.textContent = '🟥 Tờ 1: ' + currentEmail + ' (Bạn)';
                p1Badge.classList.add('online');
                sheet1OwnerLbl.textContent = '(Bạn)';
            } else if (role === 'player2') {
                p2Badge.textContent = '🟦 Tờ 2: ' + currentEmail + ' (Bạn)';
                p2Badge.classList.add('online');
                sheet2OwnerLbl.textContent = '(Bạn)';
            } else {
                adminBadge.textContent = '👑 Admin: ' + currentEmail + ' (Bạn)';
                adminBadge.classList.add('online');
            }

            joinRoom();
        }

        // ─── Open/close panel ───
        if (lotoFolderCard) {
            lotoFolderCard.addEventListener('click', () => {
                giaotriGrid.style.display  = 'none';
                lotoPanel.style.display    = 'block';
                roleStatus.textContent = currentEmail
                    ? `Đang đăng nhập: ${currentEmail}`
                    : 'Bạn chưa đăng nhập!';
                // Disable role buttons if already picked
                if (myRole) {
                    rolePicker.style.display = 'none';
                    gameArea.style.display   = 'block';
                }
            });
        }

        if (lotoBackBtn) {
            lotoBackBtn.addEventListener('click', () => {
                lotoPanel.style.display    = 'none';
                giaotriGrid.style.display  = '';
            });
        }

        // ─── Role picker buttons ───
        roleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!currentUserId) {
                    roleStatus.textContent = '⚠️ Bạn cần đăng nhập trước!';
                    return;
                }
                const sheet = btn.dataset.sheet;
                if (sheet === '1') assignRole('player1');
                else if (sheet === '2') assignRole('player2');
                else assignRole('admin');
            });
        });

        // ─── Admin controls events ───
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                if (myRole !== 'admin') return;
                adminConfirm();
            });
        }

        // Also start timer when admin starts typing in the input
        if (resultInput) {
            resultInput.addEventListener('input', () => {
                if (myRole !== 'admin') return;
                const raw = resultInput.value.trim();

                // Start timer on very first character typed this round
                if (raw.length > 0 && !timerStartedThisRound && !roundActive) {
                    timerSec = parseInt(timerSetting.value) || 15;
                    timerStartedThisRound = true;
                    startTimer(timerSec, adminTimerEnd);
                    // Broadcast that round is live (no number yet — players just see timer start)
                    broadcast({ type: 'timer_tick', left: timerLeft });
                    adminHint.textContent = '⏱ Đồng hồ đang chạy! Gõ tên số rồi nhấn Xác nhận.';
                }

                // Live feedback: show parsed number if valid
                const val = parseWordInput(raw);
                if (raw.length >= 3 && val) {
                    adminHint.textContent = `🔢 Nhận dạng: ${val} — nhấn Xác nhận để gọi số.`;
                } else if (raw.length >= 3 && !val) {
                    adminHint.textContent = `❓ Chưa nhận dạng được "${raw}"...`;
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextBtn.style.display = 'none';
                roundResultEl.style.display = 'none';
                // Reset selections for new round
                selected = [new Set(), new Set()];
                refreshAllCells(0);
                refreshAllCells(1);
                bingoShown = [false, false];
                bingoBtns.forEach(b => b.style.display = 'none');
                timerStartedThisRound = false;
                confirmBtn.disabled = false;
                resultInput.value = '';
                timerDisplay.textContent = '⏱ --';
                timerDisplay.classList.remove('warning', 'danger');
                broadcast({ type: 'game_state', boards, calledNums, selected: [[],[]], currentNum: null, roundActive: false });
                adminHint.textContent = '💡 Gõ tên số bằng tiếng Anh (vd: thirty five) để bắt đầu lượt mới.';
            });
        }

        if (timerResetBtn) {
            timerResetBtn.addEventListener('click', () => {
                if (myRole !== 'admin') return;
                stopTimer();
                timerLeft = parseInt(timerSetting.value) || 15;
                timerDisplay.textContent = '⏱ ' + timerLeft;
                timerDisplay.classList.remove('warning', 'danger');
                broadcast({ type: 'timer_tick', left: timerLeft });
            });
        }

        if (newGameBtn) {
            newGameBtn.addEventListener('click', () => {
                if (myRole !== 'admin') return;
                if (!confirm('Bạn có chắc muốn bắt đầu ván mới? Toàn bộ dữ liệu sẽ bị reset!')) return;
                const newBoards = [generateBoard(), generateBoard()];
                resetGame(newBoards);
                broadcast({ type: 'new_game', boards: newBoards });
            });
        }

        // ─── Bingo buttons ───
        bingoBtns.forEach((btn, i) => {
            if (!btn) return;
            btn.addEventListener('click', () => {
                const sheetIdx = i;
                const ownerRole = sheetIdx === 0 ? 'player1' : 'player2';
                if (myRole !== ownerRole) return;
                const winIndices = checkBingo(sheetIdx);
                if (!winIndices) return;
                highlightBingo(sheetIdx, winIndices);
                broadcast({ type: 'bingo_claim', sheet: sheetIdx + 1, email: currentEmail, winIndices });
                roundResultEl.style.display = 'block';
                roundResultEl.className = 'loto-round-result win';
                roundResultEl.textContent = '🎉 Bạn đã tuyên bố BINGO! Chờ xác nhận từ trọng tài.';
            });
        });

        // ─── Tab switch: folder nav ───
        const giaotriTabBtn = document.querySelector('[data-main-target="tab-giai-tri"]');
        if (giaotriTabBtn) {
            giaotriTabBtn.addEventListener('click', () => {
                // Make sure folder grid is visible (in case we navigated away)
                if (lotoPanel && lotoPanel.style.display === 'none') {
                    giaotriGrid.style.display = '';
                }
            });
        }

    })();
    // ===== KẾT THÚC LOGIC TRÒ LÔ TÔ =====

});