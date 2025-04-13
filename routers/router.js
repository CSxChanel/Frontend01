//========== routers/router.js =========//

// Fungsi untuk memuat komponen HTML (seperti sidebar dan header) secara dinamis
const loadComponent = async (id, file) => {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    if (id === "sidebar") initSidebar();
    if (id === "header") initHeader();
};

// Load Sidebar dan Header
await loadComponent("sidebar", "../layouts/sidebar.html");
await loadComponent("header", "../layouts/header.html");

// Inisialisasi tombol toggle dari header (untuk responsive mobile)
function initHeader() {
    const sidebar = document.querySelector(".sidebar");
    const headerBtn = document.getElementById("toggleHeader");
    if (headerBtn) {
        headerBtn.addEventListener("click", function () {
            sidebar.classList.toggle("hidden");
        });
    }

    // Dark mode toggle
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    themeToggle.addEventListener("click", () => {
        html.classList.toggle("dark");

        // Simpan preferensi ke localStorage
        if (html.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // Cek preferensi tema
    if (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        html.classList.add("dark");
    } else {
        html.classList.remove("dark");
    }
}

// Inisialisasi menu sidebar (submenu toggle dan menu aktif)
function initSidebar() {
    document.querySelectorAll(".sidebar-menu-group").forEach(group => {
        const trigger = group.querySelector(".sidebar-item");
        const submenu = group.querySelector(".sidebar-submenu");
        const chevron = group.querySelector(".fa-chevron-down");

        if (trigger && submenu && chevron) {
            trigger.addEventListener("click", e => {
                e.preventDefault();
                trigger.classList.toggle("active");
                submenu.classList.toggle("open");
                chevron.classList.toggle("rotate-180");
            });
        }
    });
}

// Daftar halaman yang diperbolehkan
const allowedPages = [
    "dashboard",
    // users
    "user-all",
    "user-add",
    "new-user",
    "user-role",
    // products
    "product-inventory",
    "product-categories",
    "product-discounts",
    // analytics
    "analytics",
    // settings
    "setting-general",
    "setting-security",
    "setting-notification",

    "help",
    "logout",
    "login"
];

// Ambil parameter ?page= dari URL
const getPage = () =>
    new URLSearchParams(window.location.search).get("page") || "dashboard";

// Fungsi utama untuk memuat konten halaman
const loadPage = async (page, push = true) => {
    const spinner = document.getElementById("loading-spinner");
    spinner.style.display = "block";

    const file = allowedPages.includes(page)
        ? `../contents/${page}.html`
        : "../contents/404.html";

    try {
        const res = await fetch(file);
        const html = await res.text();
        document.getElementById("main-content").innerHTML = html;

        if (push) history.pushState({ page }, "", `?page=${page}`);
        document.title = `cPhone - ${page.charAt(0).toUpperCase() + page.slice(1)}`;
        updateActiveMenu(page);

        const titleEl = document.getElementById("page-title");
        if (titleEl)
            titleEl.textContent = page.charAt(0).toUpperCase() + page.slice(1);

        // FUNGSI KHUSUS BERDASARKAN PAGE
        if (page === "dashboard") {
            const mod = await import("../auth/auth-dashboard.js");
            await mod.authDashboardInit();
            window.logoutBtn = () => mod.logoutBtn?.(); // optional chaining
        }

        if (page === "login") {
            import("../js/auth-form-login.js").then(mod => {
                mod.setupLoginForm();
                window.togglePassword = () => mod.togglePassword();
            });
        }

    } catch (err) {
        console.error("Error loading page:", err);
    } finally {
        spinner.style.display = "none";
    }
};

// Update menu aktif di sidebar
const updateActiveMenu = page => {
    document.querySelectorAll("[data-page]").forEach(item => {
        item.classList.remove("bg-indigo-700", "active");
        if (item.dataset.page === page) {
            item.classList.add("bg-indigo-700", "active");
        }
    });
};

// Tangani navigasi back/forward dari browser
window.addEventListener("popstate", e => {
    if (e.state?.page) loadPage(e.state.page, false);
});

// Delegasi klik menu sidebar
document.addEventListener("click", e => {
    const target = e.target.closest("[data-page]");
    if (target) {
        e.preventDefault();
        const page = target.dataset.page;
        loadPage(page);
    }
});

// Load halaman saat pertama kali
loadPage(getPage());
