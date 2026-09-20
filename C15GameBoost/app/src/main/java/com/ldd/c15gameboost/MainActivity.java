package com.ldd.c15gameboost;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.SystemClock;
import android.view.Gravity;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import rikka.shizuku.Shizuku;

public class MainActivity extends Activity {

    private static final int REQ = 2711;
    private static final String PREFS = "boost_state";
    private static final String GAME = "com.garena.game.kgvn";
    private static final String SELF = "com.ldd.c15gameboost";

    private static final int ACTION_NONE = 0;
    private static final int ACTION_NORMAL = 1;
    private static final int ACTION_EXTREME = 2;
    private static final int ACTION_RESTORE = 3;

    /*
     * Những package này không bao giờ bị Game Boost đụng tới.
     * Mục tiêu là giữ máy ổn định, giữ mạng/điện thoại/bàn phím/Shizuku
     * và không tự khóa launcher đang dùng.
     */
    private static final Set<String> ALWAYS_PROTECTED = new LinkedHashSet<>(Arrays.asList(
            SELF,
            GAME,
            "moe.shizuku.privileged.api",
            "app.lawnchair.play",
            "bitpit.launcher",

            "com.google.android.gms",
            "com.google.android.gsf",
            "com.google.android.webview",
            "com.google.android.inputmethod.latin",
            "com.google.android.verifier",

            "com.android.systemui",
            "com.android.phone",
            "com.android.mms",
            "com.android.contacts",
            "com.android.settings",
            "com.android.networkstack",
            "com.android.networkstack.process",

            "com.coloros.phonemanager",
            "com.coloros.securitypermission",

            "com.cloudflare.onedotonedotonedotone"
    ));

    /*
     * Normal Game Mode giữ liên lạc + tài chính + danh tính theo yêu cầu.
     * Extreme không giữ nhóm này, nhưng vẫn giữ ALWAYS_PROTECTED ở trên.
     */
    private static final Set<String> NORMAL_EXTRA_PROTECTED = new LinkedHashSet<>(Arrays.asList(
            "com.facebook.orca",
            "com.zing.zalo",
            "com.google.android.gm",
            "com.mservice.momotransfer",
            "com.mbmobile",
            "com.beeasy.toppay",
            "com.vnid",
            "com.etax.icanhan"
    ));

    /*
     * Các package hệ thống/OEM không thiết yếu có thể suspend tạm khi chơi.
     * App người dùng còn lại được lấy động từ "pm list packages -3".
     */
    private static final String[] NONESSENTIAL_SYSTEM = {
            "com.google.android.googlequicksearchbox",
            "com.android.vending",
            "com.android.chrome",
            "com.google.android.apps.maps",
            "com.google.android.apps.photos",
            "com.google.android.projection.gearhead",
            "com.google.android.apps.wellbeing",
            "com.google.android.feedback",
            "com.google.ar.core",
            "com.google.android.printservice.recommendation",
            "com.android.printspooler",

            "com.oppo.camera",
            "com.coloros.camera",
            "com.coloros.alarmclock",
            "com.coloros.gallery3d",
            "com.oppo.gallery3d",
            "com.heytap.photos",
            "com.nearme.gamecenter",
            "com.heytap.market",
            "com.heytap.themestore",
            "com.heytap.cast",
            "com.heytap.pictorial",
            "com.coloros.weather2",
            "com.coloros.weather.service",
            "com.coloros.compass2",
            "com.coloros.oshare",
            "com.oppo.quicksearchbox",
            "com.coloros.smartsidebar",
            "com.coloros.sau",
            "com.coloros.sauhelper",
            "com.coloros.logkit",
            "com.oplus.crashbox"
    };

    private final ExecutorService worker = Executors.newSingleThreadExecutor();
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    private IBoostService service;
    private boolean binding;
    private int bindGeneration;
    private int pendingAction = ACTION_NONE;
    private String serviceProblem = "";
    private String shellIdentity = "";

    private TextView status;
    private TextView log;
    private Button normalBtn;
    private Button extremeBtn;
    private Button restoreBtn;
    private Button connectBtn;

    private Shizuku.UserServiceArgs userServiceArgs;

    private final Shizuku.OnBinderReceivedListener binderReceived =
            () -> runOnUiThread(this::connect);

    private final Shizuku.OnBinderDeadListener binderDead =
            () -> runOnUiThread(() -> {
                service = null;
                binding = false;
                shellIdentity = "";
                serviceProblem = "Shizuku binder đã dừng";
                refresh();
            });

    private final Shizuku.OnRequestPermissionResultListener permissionResult =
            (requestCode, result) -> {
                if (requestCode != REQ) return;
                runOnUiThread(() -> {
                    if (result == PackageManager.PERMISSION_GRANTED) {
                        serviceProblem = "";
                        bindService();
                    } else {
                        serviceProblem = "chưa được cấp quyền";
                        refresh();
                    }
                });
            };

    private final ServiceConnection connection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder binder) {
            service = IBoostService.Stub.asInterface(binder);
            binding = false;
            serviceProblem = "";

            worker.execute(() -> {
                try {
                    String id = service.exec("id");
                    shellIdentity = oneLine(body(id));
                    runOnUiThread(() -> {
                        addLog("Shell sẵn sàng: " + shellIdentity);
                        refresh();
                        runPendingAction();
                    });
                } catch (Throwable t) {
                    serviceProblem = "test shell lỗi: " + t.getClass().getSimpleName();
                    runOnUiThread(thisActivity()::refresh);
                }
            });
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            service = null;
            binding = false;
            shellIdentity = "";
            runOnUiThread(MainActivity.this::refresh);
        }
    };

    private MainActivity thisActivity() {
        return this;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        /*
         * Dùng tag/version mới để Shizuku không tái sử dụng UserService V1 cũ.
         * debuggable(true) khớp với APK debug do GitHub Actions tạo.
         */
        userServiceArgs = new Shizuku.UserServiceArgs(
                new ComponentName(getPackageName(), BoostUserService.class.getName()))
                .processNameSuffix("boostv3")
                .tag("c15-game-boost-v3")
                .debuggable(true)
                .version(3)
                .daemon(false);

        buildUi();

        Shizuku.addBinderReceivedListenerSticky(binderReceived);
        Shizuku.addBinderDeadListener(binderDead);
        Shizuku.addRequestPermissionResultListener(permissionResult);

        refresh();
        mainHandler.postDelayed(this::connect, 600);
    }

    @Override
    protected void onDestroy() {
        mainHandler.removeCallbacksAndMessages(null);
        Shizuku.removeBinderReceivedListener(binderReceived);
        Shizuku.removeBinderDeadListener(binderDead);
        Shizuku.removeRequestPermissionResultListener(permissionResult);
        worker.shutdownNow();
        super.onDestroy();
    }

    private void buildUi() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(18), dp(22), dp(18), dp(24));
        root.setBackgroundColor(Color.WHITE);

        TextView title = new TextView(this);
        title.setText("C15 GAME BOOST V3");
        title.setTextSize(27);
        title.setTextColor(Color.BLACK);
        title.setGravity(Gravity.CENTER);
        root.addView(title, params(-1, -2, 10));

        TextView note = new TextView(this);
        note.setText(
                "RMX2194 • Không root\n" +
                "NORMAL giữ Messenger/Zalo/Gmail/MoMo/ngân hàng\n" +
                "EXTREME ưu tiên RAM tối đa");
        note.setTextSize(13);
        note.setTextColor(Color.DKGRAY);
        note.setGravity(Gravity.CENTER);
        root.addView(note, params(-1, -2, 16));

        status = new TextView(this);
        status.setTextSize(15);
        status.setTextColor(Color.BLACK);
        status.setPadding(dp(12), dp(12), dp(12), dp(12));
        status.setBackgroundColor(0xfff2f2f2);
        root.addView(status, params(-1, -2, 14));

        normalBtn = button("🎮 NORMAL GAME MODE");
        normalBtn.setOnClickListener(v -> requestAction(ACTION_NORMAL));
        root.addView(normalBtn, params(-1, dp(60), 8));

        extremeBtn = button("🚀 EXTREME GAME MODE");
        extremeBtn.setOnClickListener(v -> requestAction(ACTION_EXTREME));
        root.addView(extremeBtn, params(-1, dp(60), 8));

        restoreBtn = button("📱 KHÔI PHỤC BÌNH THƯỜNG");
        restoreBtn.setOnClickListener(v -> requestAction(ACTION_RESTORE));
        root.addView(restoreBtn, params(-1, dp(60), 12));

        connectBtn = button("Kết nối / cấp quyền Shizuku");
        connectBtn.setOnClickListener(v -> connect());
        root.addView(connectBtn, params(-1, dp(50), 14));

        log = new TextView(this);
        log.setTextSize(12);
        log.setTextColor(Color.DKGRAY);
        log.setBackgroundColor(0xfff7f7f7);
        log.setPadding(dp(10), dp(10), dp(10), dp(10));
        root.addView(log, params(-1, -2, 0));

        ScrollView scroll = new ScrollView(this);
        scroll.addView(root);
        setContentView(scroll);
    }

    private Button button(String text) {
        Button b = new Button(this);
        b.setText(text);
        b.setAllCaps(false);
        b.setTextSize(15);
        return b;
    }

    private LinearLayout.LayoutParams params(int w, int h, int bottom) {
        LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(w, h);
        p.bottomMargin = dp(bottom);
        return p;
    }

    private void connect() {
        if (!Shizuku.pingBinder()) {
            service = null;
            binding = false;
            serviceProblem = "Shizuku chưa chạy";
            addLog("Mở Shizuku và Start bằng Wireless debugging trước.");
            refresh();
            return;
        }

        if (Shizuku.isPreV11()) {
            serviceProblem = "Shizuku API quá cũ";
            refresh();
            return;
        }

        if (Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED) {
            bindService();
        } else if (!Shizuku.shouldShowRequestPermissionRationale()) {
            Shizuku.requestPermission(REQ);
        } else {
            serviceProblem = "quyền đã bị từ chối";
            addLog("Vào Shizuku > Ứng dụng được ủy quyền và cấp lại quyền.");
            refresh();
        }
    }

    private void bindService() {
        if (service != null || binding) {
            refresh();
            return;
        }

        binding = true;
        serviceProblem = "";
        final int generation = ++bindGeneration;
        refresh();

        try {
            Shizuku.bindUserService(userServiceArgs, connection);
        } catch (Throwable t) {
            binding = false;
            serviceProblem = t.getClass().getSimpleName() + ": " + String.valueOf(t.getMessage());
            addLog("Bind lỗi: " + serviceProblem);
            refresh();
            return;
        }

        /*
         * Không để UI treo vô hạn. Nếu 12 giây không có callback thì xóa record
         * UserService V3 và bind lại đúng một lần.
         */
        mainHandler.postDelayed(() -> {
            if (generation != bindGeneration || service != null || !binding) return;

            binding = false;
            serviceProblem = "UserService không phản hồi";
            addLog("UserService không phản hồi sau 12 giây. Đang tạo lại service V3…");
            try {
                Shizuku.unbindUserService(userServiceArgs, connection, true);
            } catch (Throwable ignored) {
            }
            refresh();

            mainHandler.postDelayed(() -> {
                if (service == null && Shizuku.pingBinder()
                        && Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED) {
                    bindService();
                }
            }, 900);
        }, 12000);
    }

    private void requestAction(int action) {
        if (!Shizuku.pingBinder()
                || Shizuku.checkSelfPermission() != PackageManager.PERMISSION_GRANTED) {
            pendingAction = action;
            connect();
            toast("Đang kết nối Shizuku…");
            return;
        }

        if (service == null) {
            pendingAction = action;
            bindService();
            toast("Đang chuẩn bị shell…");
            return;
        }

        if (action == ACTION_NORMAL) enableMode(false);
        else if (action == ACTION_EXTREME) enableMode(true);
        else if (action == ACTION_RESTORE) restoreNormal();
    }

    private void runPendingAction() {
        if (service == null) return;
        int action = pendingAction;
        pendingAction = ACTION_NONE;
        requestAction(action);
    }

    private void enableMode(boolean extreme) {
        final String mode = extreme ? "EXTREME" : "NORMAL";
        SharedPreferences p = getSharedPreferences(PREFS, MODE_PRIVATE);

        if (p.getBoolean("active", false)) {
            String current = p.getString("mode", "");
            if (!mode.equals(current)) {
                toast("Hãy Khôi phục trước khi đổi chế độ");
                return;
            }
        }

        setButtons(false);

        worker.execute(() -> {
            try {
                if (!p.getBoolean("active", false)) {
                    saveAnimation(p);
                    p.edit()
                            .putString("changed", "")
                            .putString("mode", mode)
                            .putBoolean("active", true)
                            .apply();
                }

                long beforeKb = readMemAvailableKb();
                String currentLauncher = getCurrentLauncher();

                Set<String> disabled = parsePackageList(service.exec("pm list packages -d"));
                Set<String> candidates = parsePackageList(service.exec("pm list packages -3"));
                candidates.addAll(Arrays.asList(NONESSENTIAL_SYSTEM));

                // Nếu Lawnchair/Niagara đang là Home, giảm phần Oppo Launcher còn chạy nền.
                if (currentLauncher != null
                        && !currentLauncher.isEmpty()
                        && !"com.oppo.launcher".equals(currentLauncher)) {
                    candidates.add("com.oppo.launcher");
                }

                int forceStopped = 0;
                int suspended = 0;
                int skipped = 0;
                int suspendFailed = 0;
                StringBuilder failedPackages = new StringBuilder();

                Set<String> alreadyChanged = csvToSet(p.getString("changed", ""));
                boolean playStoreDisabledByBoost = p.getBoolean("play_store_disabled_by_boost", false);

                for (String pkg : candidates) {
                    if (!validPackage(pkg)) continue;
                    if (disabled.contains(pkg)) {
                        skipped++;
                        continue;
                    }
                    if (isProtected(pkg, extreme, currentLauncher)) {
                        skipped++;
                        continue;
                    }
                    if (!isInstalled(pkg)) continue;

                    boolean wasSuspended = isSuspended(pkg);

                    // Force-stop trước để hạ RSS/PSS ngay.
                    service.exec("am force-stop '" + pkg + "' >/dev/null 2>&1");
                    forceStopped++;

                    if (!wasSuspended) {
                        String out = service.exec("pm suspend --user 0 '" + pkg + "'");
                        if (suspendSucceeded(out, pkg)) {
                            alreadyChanged.add(pkg);
                            suspended++;

                            // Ghi ngay sau từng package để nếu app bị đóng giữa chừng vẫn Restore được.
                            p.edit().putString("changed", join(alreadyChanged)).apply();
                        } else {
                            suspendFailed++;
                            if (failedPackages.length() < 1200) {
                                if (failedPackages.length() > 0) failedPackages.append(", ");
                                failedPackages.append(pkg);
                                String detail = oneLine(body(out));
                                if (!detail.isEmpty()) {
                                    failedPackages.append(" [").append(detail).append("]");
                                }
                            }
                        }
                    }

                    // ColorOS trên RMX2194 vẫn có thể cho mở CH Play dù suspend.
                    // Khóa cứng riêng CH Play trong Game Mode để nó không thể launch/chạy nền.
                    if ("com.android.vending".equals(pkg) && !playStoreDisabledByBoost) {
                        String hardLock = service.exec("pm disable-user --user 0 com.android.vending");
                        if (hardLock.contains("new state: disabled-user")
                                || hardLock.contains("new state: disabled")
                                || body(service.exec("pm list packages -d | grep -F 'package:com.android.vending'"))
                                .contains("package:com.android.vending")) {
                            playStoreDisabledByBoost = true;
                            p.edit().putBoolean("play_store_disabled_by_boost", true).apply();
                        } else if (failedPackages.length() < 1200) {
                            if (failedPackages.length() > 0) failedPackages.append(", ");
                            failedPackages.append("com.android.vending [hard-lock thất bại: ")
                                    .append(oneLine(body(hardLock))).append("]");
                        }
                    }
                }

                service.exec(
                        "settings put global window_animation_scale 0; " +
                        "settings put global transition_animation_scale 0; " +
                        "settings put global animator_duration_scale 0; " +
                        "am kill-all >/dev/null 2>&1");

                SystemClock.sleep(1100);
                long afterKb = readMemAvailableKb();

                final int fForce = forceStopped;
                final int fSuspend = suspended;
                final int fSkipped = skipped;
                final int fFailed = suspendFailed;
                final String fFailedPackages = failedPackages.toString();
                final long fBefore = beforeKb;
                final long fAfter = afterKb;
                final String fLauncher = currentLauncher;

                runOnUiThread(() -> {
                    addLog(
                            mode + " hoàn tất" +
                            "\nLauncher bảo vệ: " + safe(fLauncher) +
                            "\nForce-stop: " + fForce +
                            " • Suspend mới: " + fSuspend +
                            " • Suspend lỗi: " + fFailed +
                            " • Bỏ qua: " + fSkipped +
                            (fFailedPackages.isEmpty() ? "" : "\nKhông suspend được: " + fFailedPackages) +
                            "\nRAM khả dụng: " + mb(fBefore) + " → " + mb(fAfter) +
                            " (Δ " + signedMb(fAfter - fBefore) + ")");
                    refresh();
                    setButtons(true);
                    launchGame();
                });

            } catch (Throwable t) {
                runOnUiThread(() -> {
                    addLog(mode + " lỗi: " + t.getClass().getSimpleName() + ": " + t.getMessage());
                    refresh();
                    setButtons(true);
                });
            }
        });
    }

    private void restoreNormal() {
        setButtons(false);

        worker.execute(() -> {
            try {
                SharedPreferences p = getSharedPreferences(PREFS, MODE_PRIVATE);
                Set<String> changed = csvToSet(p.getString("changed", ""));
                int restored = 0;

                for (String pkg : changed) {
                    if (!validPackage(pkg)) continue;
                    String out = service.exec("pm unsuspend --user 0 '" + pkg + "'");
                    if (out.contains("new suspended state: false") || !isSuspended(pkg)) {
                        restored++;
                    }
                }

                if (p.getBoolean("play_store_disabled_by_boost", false)) {
                    service.exec("pm enable --user 0 com.android.vending");
                }

                service.exec(
                        "settings put global window_animation_scale " + scale(p, "w") + "; " +
                        "settings put global transition_animation_scale " + scale(p, "t") + "; " +
                        "settings put global animator_duration_scale " + scale(p, "a"));

                p.edit()
                        .putBoolean("active", false)
                        .remove("mode")
                        .remove("changed")
                        .remove("play_store_disabled_by_boost")
                        .apply();

                long available = readMemAvailableKb();
                final int fRestored = restored;

                runOnUiThread(() -> {
                    addLog("Đã khôi phục " + fRestored + " package. RAM khả dụng hiện tại: " + mb(available));
                    refresh();
                    setButtons(true);
                    toast("Đã khôi phục");
                });

            } catch (Throwable t) {
                runOnUiThread(() -> {
                    addLog("Khôi phục lỗi: " + t.getClass().getSimpleName() + ": " + t.getMessage());
                    refresh();
                    setButtons(true);
                });
            }
        });
    }

    private boolean isProtected(String pkg, boolean extreme, String currentLauncher) {
        if (pkg == null) return true;
        if (pkg.equals(currentLauncher)) return true;
        if (ALWAYS_PROTECTED.contains(pkg)) return true;

        if (!extreme) {
            if (NORMAL_EXTRA_PROTECTED.contains(pkg)) return true;

            // Bảo vệ app tài chính mới cài về sau bằng tên package.
            String x = pkg.toLowerCase(Locale.ROOT);
            if (x.contains("bank")
                    || x.contains("mbmobile")
                    || x.contains("momo")
                    || x.contains("wallet")
                    || x.contains("vnpay")
                    || x.contains("finance")
                    || x.contains(".pay")) {
                return true;
            }
        }

        return false;
    }

    private Set<String> parsePackageList(String out) {
        Set<String> result = new LinkedHashSet<>();
        for (String line : body(out).split("\\R")) {
            line = line.trim();
            if (line.startsWith("package:")) {
                String pkg = line.substring(8).trim();
                if (validPackage(pkg)) result.add(pkg);
            }
        }
        return result;
    }

    private boolean isInstalled(String pkg) throws Exception {
        String out = service.exec("pm path '" + pkg + "'");
        return body(out).contains("package:");
    }

    private boolean isSuspended(String pkg) throws Exception {
        String out = service.exec(
                "dumpsys package '" + pkg + "' | grep -m 1 'User 0:'");
        return body(out).contains("suspended=true");
    }

    private boolean suspendSucceeded(String out, String pkg) throws Exception {
        if (out != null && out.contains("new suspended state: true")) return true;
        return out != null && out.startsWith("EXIT=0") && isSuspended(pkg);
    }

    private String getCurrentLauncher() throws Exception {
        String out = body(service.exec(
                "cmd package resolve-activity --brief " +
                "-a android.intent.action.MAIN " +
                "-c android.intent.category.HOME"));

        String[] lines = out.split("\\R");
        for (int i = lines.length - 1; i >= 0; i--) {
            String line = lines[i].trim();
            int slash = line.indexOf('/');
            if (slash > 0) {
                String pkg = line.substring(0, slash).trim();
                if (validPackage(pkg)) return pkg;
            }
        }
        return "";
    }

    private long readMemAvailableKb() {
        try {
            String out = body(service.exec("grep '^MemAvailable:' /proc/meminfo"));
            String[] parts = out.trim().split("\\s+");
            for (String part : parts) {
                if (part.matches("\\d+")) return Long.parseLong(part);
            }
        } catch (Throwable ignored) {
        }
        return -1;
    }

    private void saveAnimation(SharedPreferences p) throws Exception {
        String out = body(service.exec(
                "settings get global window_animation_scale; " +
                "settings get global transition_animation_scale; " +
                "settings get global animator_duration_scale"));

        String[] x = out.split("\\R");
        p.edit()
                .putString("w", cleanScale(x, 0))
                .putString("t", cleanScale(x, 1))
                .putString("a", cleanScale(x, 2))
                .apply();
    }

    private String cleanScale(String[] x, int i) {
        String s = i < x.length ? x[i].trim() : "1";
        return s.matches("[0-9]+(?:\\.[0-9]+)?") ? s : "1";
    }

    private String scale(SharedPreferences p, String key) {
        String s = p.getString(key, "1");
        return s != null && s.matches("[0-9]+(?:\\.[0-9]+)?") ? s : "1";
    }

    private Set<String> csvToSet(String csv) {
        Set<String> r = new LinkedHashSet<>();
        if (csv == null || csv.trim().isEmpty()) return r;
        for (String x : csv.split(",")) {
            x = x.trim();
            if (validPackage(x)) r.add(x);
        }
        return r;
    }

    private String join(Set<String> xs) {
        StringBuilder s = new StringBuilder();
        for (String x : xs) {
            if (s.length() > 0) s.append(',');
            s.append(x);
        }
        return s.toString();
    }

    private boolean validPackage(String s) {
        return s != null && s.matches("[A-Za-z0-9_]+(?:\\.[A-Za-z0-9_]+)+");
    }

    private String body(String out) {
        if (out == null) return "";
        return out.replaceFirst("(?s)^EXIT=[^\\n]*\\n?", "").trim();
    }

    private String oneLine(String s) {
        return s == null ? "" : s.replace('\n', ' ').replace('\r', ' ').trim();
    }

    private String safe(String s) {
        return s == null || s.isEmpty() ? "(không xác định)" : s;
    }

    private String mb(long kb) {
        if (kb < 0) return "N/A";
        return String.format(Locale.US, "%.2f GB", kb / 1024.0 / 1024.0);
    }

    private String signedMb(long kb) {
        if (kb == 0) return "0 MB";
        if (kb < 0 && kb > -100000000) {
            return String.format(Locale.US, "%.0f MB", kb / 1024.0);
        }
        if (kb < 0) return "N/A";
        return String.format(Locale.US, "+%.0f MB", kb / 1024.0);
    }

    private void launchGame() {
        Intent i = getPackageManager().getLaunchIntentForPackage(GAME);
        if (i != null) {
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(i);
        } else {
            toast("Không tìm thấy Liên Quân");
        }
    }

    private void refresh() {
        boolean running = Shizuku.pingBinder();
        boolean granted = running
                && Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED;

        SharedPreferences p = getSharedPreferences(PREFS, MODE_PRIVATE);
        boolean active = p.getBoolean("active", false);
        String mode = p.getString("mode", "");

        String serviceState;
        if (service != null) serviceState = "✅ shell sẵn sàng";
        else if (binding) serviceState = "⏳ đang tạo shell…";
        else if (!serviceProblem.isEmpty()) serviceState = "❌ " + serviceProblem;
        else serviceState = "chưa kết nối";

        String uid = "";
        if (running) {
            try {
                uid = "\nShizuku UID: " + Shizuku.getUid() + " • API: " + Shizuku.getVersion();
            } catch (Throwable ignored) {
            }
        }

        status.setText(
                "Chế độ: " + (active ? "🎮 " + mode : "📱 BÌNH THƯỜNG") +
                "\nShizuku: " + (running
                ? (granted ? "✅ Running • đã cấp quyền" : "⚠️ Running • chưa cấp quyền")
                : "❌ chưa chạy") +
                uid +
                "\nShell: " + serviceState +
                (shellIdentity.isEmpty() ? "" : "\n" + shellIdentity));

        setButtons(service != null);
        connectBtn.setEnabled(running);
    }

    private void setButtons(boolean enabled) {
        normalBtn.setEnabled(enabled);
        extremeBtn.setEnabled(enabled);
        restoreBtn.setEnabled(enabled);
    }

    private void addLog(String s) {
        if (log == null) return;
        String old = log.getText().toString();
        log.setText(s + (old.isEmpty() ? "" : "\n\n" + old));
    }

    private void toast(String s) {
        Toast.makeText(this, s, Toast.LENGTH_SHORT).show();
    }

    private int dp(int v) {
        return Math.round(v * getResources().getDisplayMetrics().density);
    }
}
