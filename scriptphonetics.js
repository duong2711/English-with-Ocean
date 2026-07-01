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

        const NEWS_DATA = [
            {
                id: 1,
                date: "2026-06-24",
                title: "Giant Panda Twins Born at Zoo",
                thumb: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&q=80",
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
                thumb: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80",
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
                thumb: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80",
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
                thumb: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
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
                thumb: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
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
                thumb: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
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
    // ===== BẮT ĐẦU: "CHO BÉ" — 50 CHỦ ĐỀ (flashcard / nối từ / câu chuyện / dịch câu) =====
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
            initTranslate(topic);
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

        function initFlashcards(topic) {
            flashIndex = 0;
            flashOrder = topic.words;
            renderFlashcard();
        }

        function renderFlashcard() {
            const w = flashOrder[flashIndex];
            kidFlashcard.classList.remove('flipped');
            kidFlashFront.innerHTML = `<div class="kf-word">${w.en}</div><div class="kf-ipa">${w.ipa}</div>`;
            kidFlashBack.innerHTML  = `<div class="kf-vi">${w.vi}</div><div class="kf-ex">"${w.ex}"</div>`;
            kidFlashProg.textContent = `Thẻ ${flashIndex + 1} / ${flashOrder.length}`;
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
            matchPairs = pool.map((w, i) => ({ id: i, en: w.en, vi: w.vi, done: false }));
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
                el.textContent = p.en;
                el.dataset.id = p.id;
                el.dataset.side = 'en';
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
                    kidMatchResult.textContent = `✅ Đúng! (${matchCorrectCount}/${matchPairs.length})`;
                    if (matchCorrectCount === matchPairs.length) {
                        kidMatchResult.textContent = `🎉 Hoàn thành! Bạn đã nối đúng tất cả ${matchPairs.length} cặp từ.`;
                    }
                } else {
                    matchSelectedEn.classList.add('wrong');
                    matchSelectedVi.classList.add('wrong');
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
        function initStory(topic) {
            document.getElementById('kid-story-title').textContent = topic.story.title;
            document.getElementById('kid-story-text').innerHTML = topic.story.text;
        }

        // ---------- 4. DỊCH CÂU ----------
        const kidTrProg     = document.getElementById('kid-translate-progress');
        const kidTrVi       = document.getElementById('kid-translate-vi');
        const kidTrInput    = document.getElementById('kid-translate-input');
        const kidTrCheck    = document.getElementById('kid-translate-check');
        const kidTrNext     = document.getElementById('kid-translate-next');
        const kidTrFeedback = document.getElementById('kid-translate-feedback');

        let trIndex = 0;
        let trWords = [];

        function initTranslate(topic) {
            trIndex = 0;
            trWords = topic.words;
            renderTranslate();
        }

        function renderTranslate() {
            const w = trWords[trIndex];
            kidTrProg.textContent = `Câu ${trIndex + 1} / ${trWords.length}`;
            kidTrVi.textContent = `"${w.trVi}"  (gợi ý từ: ${w.en})`;
            kidTrInput.value = '';
            kidTrFeedback.className = 'kid-translate-feedback';
            kidTrFeedback.textContent = '';
            kidTrInput.focus();
        }

        kidTrCheck.addEventListener('click', () => {
            const w = trWords[trIndex];
            const userAns = kidTrInput.value.trim().toLowerCase();
            const keyword = w.trKey.toLowerCase();
            if (userAns.length > 0 && userAns.includes(keyword)) {
                kidTrFeedback.className = 'kid-translate-feedback ok';
                kidTrFeedback.textContent = `✅ Tốt lắm! Gợi ý đáp án: "${w.trAnswer}"`;
            } else {
                kidTrFeedback.className = 'kid-translate-feedback no';
                kidTrFeedback.textContent = `❌ Chưa đúng. Đáp án gợi ý: "${w.trAnswer}"`;
            }
        });

        kidTrNext.addEventListener('click', () => {
            trIndex = (trIndex + 1) % trWords.length;
            renderTranslate();
        });

    })();
    // ===== KẾT THÚC: "CHO BÉ" — 50 CHỦ ĐỀ =====

});
