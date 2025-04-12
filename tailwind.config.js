/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./*.html",
        "./contents/**/*.html",
        "./layouts/**/*.html",
        "./views/**/*.html",
        "./components/**/*.html"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#00f0ff",
                    100: "#ccf9ff",
                    200: "#99f3ff",
                    300: "#66ecff",
                    400: "#33e5ff",
                    500: "#00f0ff",
                    600: "#00b8cc",
                    700: "#008099",
                    800: "#004866",
                    900: "#001833"
                },
                cyberpunk: {
                    pink: "#ff2a6d",
                    blue: "#05d9e8",
                    purple: "#d300c5",
                    yellow: "#f9f002"
                }
            },
            animation: {
                glow: "glow 2s ease-in-out infinite alternate",
                float: "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            },
            keyframes: {
                glow: {
                    from: {
                        "text-shadow": "0 0 5px #00f0ff, 0 0 10px #00f0ff"
                    },
                    to: { "text-shadow": "0 0 10px #00f0ff, 0 0 20px #00f0ff" }
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" }
                }
            }
        }
    },

    plugins: []
};
