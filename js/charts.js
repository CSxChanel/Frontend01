
    // Contoh dummy chart, butuh Chart.js terpasang
    document.addEventListener("DOMContentLoaded", () => {
        if (typeof Chart !== "undefined") {
            new Chart(document.getElementById("monthlyVisitsChart"), {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr"],
                    datasets: [
                        {
                            label: "Kunjungan",
                            data: [120, 190, 300, 250],
                            borderColor: "#6366f1",
                            fill: false
                        }
                    ]
                }
            });
            new Chart(document.getElementById("weeklyRevenueChart"), {
                type: "bar",
                data: {
                    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
                    datasets: [
                        {
                            label: "Rp",
                            data: [4, 6, 8, 5],
                            backgroundColor: "#10b981"
                        }
                    ]
                }
            });
        }
    });
