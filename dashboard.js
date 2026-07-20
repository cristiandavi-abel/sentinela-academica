// ==========================================
// SENTINELA ACADÊMICA
// Dashboard
// ==========================================

protegerPagina("coordenacao");
App.initSidebar("dashboard");

const alunos = getAlunos();

// Resumo geral
const total = alunos.length;
const turmasUnicas = new Set(alunos.map(a => a.turma)).size;
const emAtencao = alunos.filter(a => a.ipa < 80).length;
const freqMedia = Math.round(alunos.reduce((s, a) => s + a.frequencia, 0) / total);

document.getElementById("cardsResumo").innerHTML = `
    <div class="card-info">
        <i class="fa-solid fa-user-graduate"></i>
        <div><h3>${total}</h3><span>Alunos Monitorados</span></div>
    </div>
    <div class="card-info">
        <i class="fa-solid fa-school"></i>
        <div><h3>${turmasUnicas}</h3><span>Turmas</span></div>
    </div>
    <div class="card-info">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <div><h3>${emAtencao}</h3><span>Em Atenção</span></div>
    </div>
    <div class="card-info">
        <i class="fa-solid fa-chart-line"></i>
        <div><h3>${freqMedia}%</h3><span>Frequência Média</span></div>
    </div>
`;

// Alunos em atenção (IPA < 80), ordenados
const atencao = alunos
    .filter(a => a.ipa < 80)
    .sort((a, b) => a.ipa - b.ipa);

document.getElementById("listaAtencao").innerHTML = atencao.map(a => {
    const st = statusIPA(a.ipa);
    return `
        <li>
            <div>
                <strong>${a.nome}</strong>
                <span class="sub">${a.turma}</span>
            </div>
            <span class="status ${st.classe}">${a.ipa}</span>
        </li>
    `;
}).join("") || `<li class="vazio">Nenhum aluno em alerta. 🎉</li>`;

// Gráfico de evolução (média dos alunos por mês)
const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
const ipaMedio = meses.map((_, i) =>
    Math.round(alunos.reduce((s, a) => s + (a.historicoIPA[i] || 0), 0) / total)
);
const mediaMedio = meses.map((_, i) =>
    (alunos.reduce((s, a) => s + (a.historicoMedia[i] || 0), 0) / total).toFixed(1)
);

const ctx = document.getElementById("grafico");
new Chart(ctx, {
    type: "line",
    data: {
        labels: meses,
        datasets: [
            {
                label: "IPA Médio",
                data: ipaMedio,
                borderColor: "#2563EB",
                backgroundColor: "rgba(37,99,235,.12)",
                fill: true,
                tension: .4,
                pointRadius: 4,
                pointBackgroundColor: "#2563EB"
            },
            {
                label: "Média Geral",
                data: mediaMedio,
                borderColor: "#22C55E",
                backgroundColor: "rgba(34,197,94,.10)",
                fill: true,
                tension: .4,
                pointRadius: 4,
                pointBackgroundColor: "#22C55E"
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
        scales: {
            y: { beginAtZero: false, min: 60, max: 100, grid: { color: "#E2E8F0" } },
            x: { grid: { display: false } }
        }
    }
});
