// ==========================================
// SENTINELA ACADÊMICA
// Relatórios
// =========================================

protegerPagina("coordenacao");
App.initSidebar("relatorios");

const alunos = getAlunos();
const total = alunos.length;

const verde = alunos.filter(a => a.ipa >= 80).length;
const amarelo = alunos.filter(a => a.ipa >= 60 && a.ipa < 80).length;
const vermelho = alunos.filter(a => a.ipa < 60).length;

const mediaGeral = (alunos.reduce((s, a) => s + a.media, 0) / total).toFixed(1);
const freqMedia = Math.round(alunos.reduce((s, a) => s + a.frequencia, 0) / total);

document.getElementById("cardsRelatorio").innerHTML = `
    <div class="card-info">
        <i class="fa-solid fa-user-graduate"></i>
        <div><h3>${total}</h3><span>Alunos</span></div>
    </div>
    <div class="card-info">
        <i class="fa-solid fa-star"></i>
        <div><h3>${mediaGeral}</h3><span>Média Geral</span></div>
    </div>
    <div class="card-info">
        <i class="fa-solid fa-calendar-check"></i>
        <div><h3>${freqMedia}%</h3><span>Frequência Média</span></div>
    </div>
    <div class="card-info">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <div><h3>${vermelho}</h3><span>Alto Risco</span></div>
    </div>
`;

// Distribuição
new Chart(document.getElementById("graficoDistribuicao"), {
    type: "doughnut",
    data: {
        labels: ["Estáveis", "Atenção", "Alto Risco"],
        datasets: [{
            data: [verde, amarelo, vermelho],
            backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } }
    }
});

// IPA por turma
const turmas = {};
alunos.forEach(a => {
    if (!turmas[a.turma]) turmas[a.turma] = { n: 0, s: 0 };
    turmas[a.turma].n++;
    turmas[a.turma].s += a.ipa;
});
const nomesTurmas = Object.keys(turmas);
const ipaTurmas = nomesTurmas.map(t => Math.round(turmas[t].s / turmas[t].n));

new Chart(document.getElementById("graficoTurmas"), {
    type: "bar",
    data: {
        labels: nomesTurmas,
        datasets: [{
            label: "IPA Médio",
            data: ipaTurmas,
            backgroundColor: "#2563EB",
            borderRadius: 8
        }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 0, max: 100, grid: { color: "#E2E8F0" } },
                  x: { grid: { display: false } } }
    }
});

// Desempenho por disciplina (média geral)
const disciplinas = {};
alunos.forEach(a => {
    Object.entries(a.notas).forEach(([d, n]) => {
        if (!disciplinas[d]) disciplinas[d] = { s: 0, n: 0 };
        disciplinas[d].s += n;
        disciplinas[d].n++;
    });
});
const nomesDisc = Object.keys(disciplinas);
const mediasDisc = nomesDisc.map(d => (disciplinas[d].s / disciplinas[d].n).toFixed(1));

new Chart(document.getElementById("graficoDisciplinas"), {
    type: "bar",
    data: {
        labels: nomesDisc,
        datasets: [{
            label: "Média",
            data: mediasDisc,
            backgroundColor: mediasDisc.map(v => v >= 7 ? "#22C55E" : v >= 5 ? "#F59E0B" : "#EF4444"),
            borderRadius: 8
        }]
    },
    options: {
        indexAxis: "y",
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { min: 0, max: 10, grid: { color: "#E2E8F0" } },
                  y: { grid: { display: false } } }
    }
});
