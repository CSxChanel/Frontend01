// api/api.js
import { API_URL } from "config.js";

// UNTUK REGISTRASI
export async function registerUser(data) {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const hasil = await res.json();
        // console.log("Hasil response", hasil);
        return hasil;
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "Gagal terhubung ke server.",
            error: error.message
        };
    }
}

// UNTUK LOGIN
export async function loginUser(data) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data)
        });

        const hasil = await res.json();
        // console.log("Hasil response", hasil);
        return hasil;
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "Gagal terhubung ke server.",
            error: error.message
        };
    }
}

// FORGOT PASSWORD
export async function forgotPassword(data) {
    try {
        const res = await fetch(`${API_URL}/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (err) {
        return {
            success: false,
            message: "Gagal mengirim permintaan reset password."
        };
    }
}

// RESET PASSWORD
export async function resetPassword(data) {
    try {
        const res = await fetch(`${API_URL}/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (err) {
        return { success: false, message: "Gagal mereset password." };
    }
}

//
async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include" // kirim cookie refresh token
    });

    // Coba refresh token kalau expired
    if (res.status === 401) {
        const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include"
        });

        if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            localStorage.setItem("token", refreshData.data.accessToken);

            // Retry request asli
            return await apiFetch(endpoint, options);
        } else {
            // Logout paksa
            localStorage.removeItem("token");
            window.location.href = "../views/login.html";
            throw new Error("Session expired. Please login again.");
        }
    }

    const data = await res.json();
    return data;
}
