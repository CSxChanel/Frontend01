// js/reset-password.js
import { resetPassword } from "../api/api.js";

// Ambil token dari URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

document.getElementById("resetForm").addEventListener("submit", async e => {
    e.preventDefault();
    alert('di klik');
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
        document.getElementById("message").textContent = "Password tidak sama!";
        return;
    }

    const res = await resetPassword({ token, newPassword });
    document.getElementById("message").textContent = res.message;
});
