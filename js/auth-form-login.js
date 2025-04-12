// js/login.js
import { loginUser } from "../api/api.js";
import { saveAccessToken } from "../utils/token.js";

export function setupLoginForm() {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");
    // login form
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Sembunyikan dulu hasil sebelumnya
        message.className = "hidden px-4 py-3 rounded mb-4";
        message.innerText = "";

        const identifikasi = form.identifikasi.value;
        const password = form.password.value;
        const res = await loginUser({ identifikasi, password });

        if (res.success) {
            saveAccessToken(res.data.token);
            message.classList.add(
                "bg-green-100",
                "border",
                "border-green-500",
                "text-green-700"
            );
            message.innerText = "Login berhasil, Redirecting...";
            form.reset();
            // redirect ke dashboard
            setTimeout(() => {
                window.location.href = "/pages/dashboard.html";
            }, 1000);
        } else {
            alert(res.message || "Login gagal.");
            message.classList.add(
                "bg-red-100",
                "border",
                "border-red-500",
                "text-red-700"
            );
            message.innerText = res.message || "Login gagal!";
        }
    });

    //fungsi untuk melihat password
    const toggleBtn = document.querySelector("#eyeIconPassword");
    const passwordInput = document.getElementById("password");
    if (toggleBtn && passwordInput) {
        toggleBtn.parentElement.addEventListener("click", () => {
            const isHidden = passwordInput.type === "password";
            passwordInput.type = isHidden ? "text" : "password";
            toggleBtn.classList.toggle("fa-eye");
            toggleBtn.classList.t;
            oggle("fa-eye-slash");
        });
    }
}
