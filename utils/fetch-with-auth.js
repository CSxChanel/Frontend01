// utils/fetch-with-auth.js
import { API_URL } from "../api/config.js";
import { getAccessToken, saveAccessToken } from "./token.js";

export async function fetchWithAuth(url, options = {}) {
    const token = getAccessToken();
    const headers = options.headers || {};

    if (token) headers["Authorization"] = `Bearer ${token}`;
    options.headers = headers;

    let response = await fetch(url, options);

    if (response.status === 403 || response.status === 401) {
        // Coba refresh token
        const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include"
        });
        const data = await refreshRes.json();
        if (data.success && data.data?.accessToken) {
            saveAccessToken(data.data.accessToken);
            // Ulangi permintaan awal
            headers["Authorization"] = `Bearer ${data.data.accessToken}`;
            response = await fetch(url, options);
        }
    }

    return response.json();
}
