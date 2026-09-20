package com.ldd.c15gameboost;

import android.content.Context;
import android.os.RemoteException;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class BoostUserService extends IBoostService.Stub {

    public BoostUserService() {}
    public BoostUserService(Context context) {}

    @Override
    public String exec(String command) throws RemoteException {
        Process process = null;
        try {
            process = Runtime.getRuntime().exec(new String[]{"/system/bin/sh", "-c", command});
            String out = readAll(process.getInputStream());
            String err = readAll(process.getErrorStream());
            int code = process.waitFor();
            return "EXIT=" + code + "\n" + out + (err.isEmpty() ? "" : "\nERR:\n" + err);
        } catch (Throwable t) {
            return "EXIT=-1\nERR:\n" + t.getClass().getSimpleName() + ": " + t.getMessage();
        } finally {
            if (process != null) process.destroy();
        }
    }

    private static String readAll(InputStream in) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            if (sb.length() > 0) sb.append('\n');
            sb.append(line);
        }
        return sb.toString();
    }

    @Override
    public void destroy() throws RemoteException {
        System.exit(0);
    }
}
