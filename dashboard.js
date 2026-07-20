// ==========================================
// SENTINELA ACADÊMICA
// Dashboard
// ==========================================

const ctx = document.getElementById("grafico");

new Chart(ctx, {
    type: "line",
    data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [{
            label: "IPA Médio",
            data: [82, 80, 78, 76, 79, 83],
            borderColor: "#2563EB",
            backgroundColor: "rgba(37,99,235,.12)",
            fill: true,
            tension: .4,
            pointRadius: 4,
            pointBackgroundColor: "#2563EB"
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: false,
                min: 60,
                max: 100,
                grid: {
                    color: "#E2E8F0"
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});