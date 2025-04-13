import { fetchWithAuth } from "../utils/fetch-with-auth.js";
import { removeAccessToken, getAccessToken } from "../utils/token.js";
import { API_URL } from "../api/config.js";

export async function authDashboardInit() {
    // Cek apakah user sudah login
    const token = getAccessToken();
    if (!token || token === "undefined") {
        window.location.href = "../index.html";
        return;
    }

    // Fungsi logout
    function logout() {
        fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include"
        });

        removeAccessToken();
        window.location.href = "../index.html";
    }

    // Tunggu elemen muncul (karena sidebar async)
    const waitForElement = id =>
        new Promise(resolve => {
            const check = () => {
                const el = document.getElementById(id);
                if (el) resolve(el);
                else setTimeout(check, 100);
            };
            check();
        });

    // Fungsi untuk menampilkan profil user
    function renderUserProfile({ username, email, role }) {
        document.querySelectorAll("#userName").forEach(el => el.textContent = username);
        document.querySelectorAll("#userEmail").forEach(el => el.textContent = email);
        document.querySelectorAll("#userRole").forEach(el => el.textContent = role);

        const greeting = document.getElementById("userGreeting");
        if (greeting) greeting.textContent = `Halo, ${username}`;
    }

    try {
        // Tunggu tombol logout muncul
        const logoutBtn = await waitForElement("logoutBtn");
        logoutBtn.addEventListener("click", logout);

        // Ambil data profil user
        const res = await fetchWithAuth(`${API_URL}/user/profile`);

        if (res.success && res.data) {
            renderUserProfile(res.data);
        } else {
            alert("Gagal memuat data user.");
            window.location.href = "../index.html";
        }
    } catch (err) {
        console.error("Gagal memuat data user:", err);
        window.location.href = "../index.html";
    }
}
