// auth/auth-dashboard.js
import { fetchWithAuth } from "../utils/fetch-with-auth.js";
import { removeAccessToken, getAccessToken } from "../utils/token.js";
import { API_URL } from "../api/config.js";

// Cek apakah user sudah login
const token = getAccessToken();
if (!token || token === "undefined") {
    window.location.href = "..index.html";
}

// Fungsi logout & hapus token
function logout() {
    fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include"
    });

    removeAccessToken();
    window.location.href = "index.html";
}

// Setelah halaman siap, ambil data user dan pasang listener logout
document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("logoutBtn").addEventListener("click", logout);

    try {
        // ambil data Profile-user
        const data = await fetchWithAuth(`${API_URL}/user/profile`);
        const userName = document.getElementById("userName");
        const userEmail = document.getElementById("userEmail");
        if (data.success) {
            userName.textContent = `Halo, ${data.data.username}`;
            userEmail.textContent = data.data.email;
        } else {
            alert("Gagal memuat data user, silakan login ulang.");
            window.location.href = "index.html";
        }
    } catch (err) {
        console.error("Gagal ambil data user:", err);
        window.location.href = "index.html";
    }
});
