package com.ldd.c15gameboost;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Bundle;
import android.os.IBinder;
import android.view.Gravity;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import rikka.shizuku.Shizuku;

public class MainActivity extends Activity {
    private static final int REQ = 2711;
    private static final String PREFS = "boost_state";
    private static final String GAME = "com.garena.game.kgvn";
    private static final int ACTION_NONE = 0;
    private static final int ACTION_GAME = 1;
    private static final int ACTION_RESTORE = 2;

    private static final String[] TARGETS = {
            "com.facebook.katana", "com.instagram.barcelona",
            "com.grabtaxi.passenger", "xyz.be.customer", "com.shopee.vn",
            "com.microsoft.office.outlook", "com.microsoft.todos",
            "com.google.android.googlequicksearchbox", "com.android.vending",
            "com.google.android.projection.gearhead", "com.nearme.gamecenter",
            "com.heytap.market", "com.coloros.weather2", "com.coloros.weather.service",
            "com.coloros.compass2", "com.heytap.themestore", "com.heytap.cast",
            "com.coloros.oshare", "com.oppo.quicksearchbox",
            "com.google.android.apps.wellbeing", "com.google.android.feedback",
            "com.google.ar.core", "com.google.android.printservice.recommendation",
            "com.android.printspooler", "com.oplus.crashbox",
            "com.coloros.sau", "com.coloros.sauhelper", "com.coloros.logkit"
    };

    // Hard whitelist: never suspend / force-stop these.
    private static final String[] PROTECTED = {
            "com.facebook.orca", "com.zing.zalo", "com.google.android.gms", GAME,
            "bitpit.launcher", "app.lawnchair.play", "com.oppo.launcher",
            "com.android.systemui", "com.android.phone"
    };

    private final ExecutorService worker = Executors.newSingleThreadExecutor();
    private IBoostService service;
    private boolean binding;
    private int pendingAction = ACTION_NONE;
    private TextView status, log;
    private Button gameBtn, normalBtn, connectBtn;
    private Shizuku.UserServiceArgs userServiceArgs;

    private final Shizuku.OnBinderReceivedListener binderReceived = () -> runOnUiThread(this::connect);
    private final Shizuku.OnBinderDeadListener binderDead = () -> runOnUiThread(() -> {
        service = null;
        binding = false;
        refresh();
    });
    private final Shizuku.OnRequestPermissionResultListener permissionResult = (requestCode, result) -> {
        if (requestCode == REQ && result == PackageManager.PERMISSION_GRANTED) runOnUiThread(() -> {
            refresh();
            bind();
        });
    };

    private final ServiceConnection connection = new ServiceConnection() {
        @Override public void onServiceConnected(ComponentName name, IBinder binder) {
            service = IBoostService.Stub.asInterface(binder);
            binding = false;
            runOnUiThread(() -> {
                addLog("Shizuku UserService đã sẵn sàng.");
                refresh();
                runPendingAction();
            });
        }
        @Override public void onServiceDisconnected(ComponentName name) {
            service = null;
            binding = false;
            runOnUiThread(MainActivity.this::refresh);
        }
    };

    @Override protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        userServiceArgs = new Shizuku.UserServiceArgs(new ComponentName(this, BoostUserService.class))
                .processNameSuffix("boost").tag("c15-game-boost").version(1).daemon(false);
        buildUi();
        Shizuku.addBinderReceivedListenerSticky(binderReceived);
        Shizuku.addBinderDeadListener(binderDead);
        Shizuku.addRequestPermissionResultListener(permissionResult);
        refresh();
        connect();
    }

    @Override protected void onDestroy() {
        Shizuku.removeBinderReceivedListener(binderReceived);
        Shizuku.removeBinderDeadListener(binderDead);
        Shizuku.removeRequestPermissionResultListener(permissionResult);
        worker.shutdownNow();
        super.onDestroy();
    }

    private void buildUi() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(20), dp(24), dp(20), dp(24));
        root.setBackgroundColor(Color.WHITE);

        TextView title = new TextView(this);
        title.setText("C15 GAME BOOST");
        title.setTextSize(28); title.setTextColor(Color.BLACK); title.setGravity(Gravity.CENTER);
        root.addView(title, params(-1, -2, 12));

        TextView note = new TextView(this);
        note.setText("RMX2194 • Ưu tiên RAM cho Liên Quân\nMessenger + Zalo luôn được giữ hoạt động");
        note.setGravity(Gravity.CENTER); note.setTextSize(14); note.setTextColor(Color.DKGRAY);
        root.addView(note, params(-1, -2, 20));

        status = new TextView(this);
        status.setTextSize(16); status.setTextColor(Color.BLACK); status.setPadding(dp(12),dp(12),dp(12),dp(12));
        status.setBackgroundColor(0xfff2f2f2);
        root.addView(status, params(-1,-2,16));

        gameBtn = button("🎮 BẬT CHẾ ĐỘ LIÊN QUÂN");
        gameBtn.setOnClickListener(v -> enableGameMode());
        root.addView(gameBtn, params(-1,dp(62),10));

        normalBtn = button("📱 KHÔI PHỤC BÌNH THƯỜNG");
        normalBtn.setOnClickListener(v -> restoreNormal());
        root.addView(normalBtn, params(-1,dp(62),10));

        connectBtn = button("Kết nối / cấp quyền Shizuku");
        connectBtn.setOnClickListener(v -> connect());
        root.addView(connectBtn, params(-1,dp(52),16));

        log = new TextView(this);
        log.setTextSize(12); log.setTextColor(Color.DKGRAY); log.setBackgroundColor(0xfff6f6f6);
        log.setPadding(dp(10),dp(10),dp(10),dp(10));
        root.addView(log, params(-1,-2,0));

        ScrollView scroll = new ScrollView(this); scroll.addView(root); setContentView(scroll);
    }

    private Button button(String text) {
        Button b = new Button(this); b.setText(text); b.setAllCaps(false); b.setTextSize(15); return b;
    }

    private LinearLayout.LayoutParams params(int w, int h, int bottom) {
        LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(w,h); p.bottomMargin = dp(bottom); return p;
    }

    private void connect() {
        if (!Shizuku.pingBinder()) {
            addLog("Shizuku chưa chạy. Mở Shizuku và Start trước."); refresh(); return;
        }
        if (Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED) bind();
        else if (!Shizuku.shouldShowRequestPermissionRationale()) Shizuku.requestPermission(REQ);
        else addLog("Hãy cấp lại quyền trong Shizuku > Authorized applications.");
        refresh();
    }

    private void bind() {
        if (service != null || binding) return;
        binding = true;
        try { Shizuku.bindUserService(userServiceArgs, connection); }
        catch (Throwable t) {
            binding = false;
            pendingAction = ACTION_NONE;
            addLog("Bind lỗi: " + t.getMessage());
            refresh();
        }
    }

    private void enableGameMode() {
        if (service == null) {
            pendingAction = ACTION_GAME;
            connect();
            toast(binding ? "Đang kết nối Shizuku…" : "Đang chuẩn bị Shizuku…");
            return;
        }
        pendingAction = ACTION_NONE;
        setButtons(false);
        worker.execute(() -> {
            try {
                SharedPreferences p = getSharedPreferences(PREFS, MODE_PRIVATE);
                if (!p.getBoolean("game", false)) saveAnimation(p);

                StringBuilder cmd = new StringBuilder();
                cmd.append("settings put global window_animation_scale 0; ")
                   .append("settings put global transition_animation_scale 0; ")
                   .append("settings put global animator_duration_scale 0; ");
                for (String pkg : TARGETS) {
                    if (isProtected(pkg)) continue;
                    cmd.append("if pm path '").append(pkg).append("' >/dev/null 2>&1; then ")
                       .append("if dumpsys package '").append(pkg).append("' | grep -q 'User 0:.*suspended=true'; then echo KEEP:").append(pkg).append("; ")
                       .append("else if pm suspend --user 0 '").append(pkg).append("' >/dev/null 2>&1; then echo SUSPEND:").append(pkg).append("; fi; fi; ")
                       .append("am force-stop '").append(pkg).append("' >/dev/null 2>&1; fi; ");
                }
                String out = service.exec(cmd.toString());
                List<String> changed = parseChanged(out);
                p.edit().putString("changed", join(changed)).putBoolean("game", true).apply();
                runOnUiThread(() -> { addLog("Đã tối ưu " + changed.size() + " app.\n" + compact(out)); refresh(); setButtons(true); launchGame(); });
            } catch (Throwable t) {
                runOnUiThread(() -> { addLog("Game mode lỗi: " + t.getMessage()); setButtons(true); });
            }
        });
    }

    private void restoreNormal() {
        if (service == null) {
            pendingAction = ACTION_RESTORE;
            connect();
            toast(binding ? "Đang kết nối Shizuku…" : "Đang chuẩn bị Shizuku…");
            return;
        }
        pendingAction = ACTION_NONE;
        setButtons(false);
        worker.execute(() -> {
            try {
                SharedPreferences p = getSharedPreferences(PREFS, MODE_PRIVATE);
                StringBuilder cmd = new StringBuilder();
                String changed = p.getString("changed", "");
                if (!changed.isEmpty()) for (String pkg : changed.split(",")) {
                    if (!pkg.isEmpty() && !isProtected(pkg)) cmd.append("pm unsuspend --user 0 '").append(pkg).append("' >/dev/null 2>&1; ");
                }
                cmd.append("settings put global window_animation_scale ").append(scale(p,"w")).append("; ")
                   .append("settings put global transition_animation_scale ").append(scale(p,"t")).append("; ")
                   .append("settings put global animator_duration_scale ").append(scale(p,"a")).append("; echo RESTORED;");
                String out = service.exec(cmd.toString());
                p.edit().putBoolean("game", false).remove("changed").apply();
                runOnUiThread(() -> { addLog(compact(out)); refresh(); setButtons(true); toast("Đã khôi phục"); });
            } catch (Throwable t) {
                runOnUiThread(() -> { addLog("Khôi phục lỗi: " + t.getMessage()); setButtons(true); });
            }
        });
    }

    private void saveAnimation(SharedPreferences p) throws Exception {
        String out = service.exec("settings get global window_animation_scale; settings get global transition_animation_scale; settings get global animator_duration_scale");
        String body = out.replaceFirst("(?s)^EXIT=[^\\n]*\\n?", "").trim();
        String[] x = body.split("\\R");
        p.edit().putString("w", clean(x,0)).putString("t", clean(x,1)).putString("a", clean(x,2)).apply();
    }

    private String clean(String[] x, int i) {
        String s = i < x.length ? x[i].trim() : "1";
        return s.matches("[0-9]+(?:\\.[0-9]+)?") ? s : "1";
    }
    private String scale(SharedPreferences p, String key) {
        String s = p.getString(key,"1"); return s != null && s.matches("[0-9]+(?:\\.[0-9]+)?") ? s : "1";
    }
    private boolean isProtected(String pkg) { for (String x : PROTECTED) if (x.equals(pkg)) return true; return false; }

    private List<String> parseChanged(String out) {
        List<String> r = new ArrayList<>();
        if (out == null) return r;
        for (String line : out.split("\\R")) if (line.startsWith("SUSPEND:")) r.add(line.substring(8).trim());
        return r;
    }
    private String join(List<String> xs) {
        StringBuilder s = new StringBuilder();
        for (String x : xs) { if (s.length() > 0) s.append(','); s.append(x); }
        return s.toString();
    }

    private void launchGame() {
        Intent i = getPackageManager().getLaunchIntentForPackage(GAME);
        if (i != null) startActivity(i); else toast("Không tìm thấy Liên Quân");
    }
    private void refresh() {
        boolean running = Shizuku.pingBinder();
        boolean granted = running && Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED;
        boolean game = getSharedPreferences(PREFS,MODE_PRIVATE).getBoolean("game",false);

        String serviceState = service != null ? "sẵn sàng" : (binding ? "đang kết nối…" : "chưa bind");
        status.setText(
                "Chế độ: " + (game ? "🎮 LIÊN QUÂN" : "📱 BÌNH THƯỜNG") +
                "\nShizuku: " + (running ? (granted ? "Running • đã cấp quyền" : "Running • chưa cấp quyền") : "chưa chạy") +
                "\nUserService: " + serviceState
        );

        // Quan trọng: hai nút được bật ngay khi Shizuku đang chạy + đã cấp quyền.
        // Nếu UserService chưa bind, lúc bấm nút app sẽ tự bind rồi tiếp tục tác vụ.
        setButtons(running && granted);
    }

    private void runPendingAction() {
        if (service == null) return;
        int action = pendingAction;
        pendingAction = ACTION_NONE;
        if (action == ACTION_GAME) enableGameMode();
        else if (action == ACTION_RESTORE) restoreNormal();
    }

    private void setButtons(boolean enabled) { gameBtn.setEnabled(enabled); normalBtn.setEnabled(enabled); }
    private void addLog(String s) { if (log != null) log.setText(s + (log.getText().length() == 0 ? "" : "\n\n" + log.getText())); }
    private String compact(String s) { if (s == null) return ""; return s.length() > 2500 ? s.substring(0,2500) + "…" : s; }
    private void toast(String s) { Toast.makeText(this,s,Toast.LENGTH_SHORT).show(); }
    private int dp(int v) { return Math.round(v * getResources().getDisplayMetrics().density); }
}
