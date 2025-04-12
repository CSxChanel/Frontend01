// js/forgotPassword
import { forgotPassword } from "../api/api.js";

document.getElementById("forgotForm").addEventListener("submit", async e => {
    e.preventDefault();
    alert('di klik');
    const email = e.target.email.value;
    const res = await forgotPassword({ email });

    document.getElementById("message").textContent = res.message;
});
