// js/register.js
import { registerUser } from "../api/api.js";

const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;
  // const confirmPassword = form.confirmPassword.value;

  // if (password !== confirmPassword) {
  //     message.textContent = "Confirmasi password tidak sama!";
  //     message.style.color = "red";
  //     return;
  // }

  const result = await registerUser({
    username,
    email,
    password,
    // confirmPassword
  });

  if (result.success) {
    form.reset();
    message.textContent = result.message;

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  } else {
    message.textContent = result.message;
  }
});
