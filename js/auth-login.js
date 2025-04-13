// js/login.js
import { loginUser } from "../api/api.js";
import { saveAccessToken } from "../utils/token.js";
// ... kode login ...
const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async e => {
    e.preventDefault();

    const identifikasi = form.identifikasi.value;
    const password = form.password.value;

    const res = await loginUser({ identifikasi, password });

    if (res.success) {
        saveAccessToken(res.data.token);
        message.textContent = "Login berhasil! Redirecting...";
        form.reset();
        // redirect ke dashboard
        setTimeout(() => {
            window.location.href = "/Frontend01/dashboard.html?page=dashboard";

        }, 1000);
    } else {
        alert(res.message || "Login gagal.");
        message.textContent = res.message || "Login gagal.";
    }
});
