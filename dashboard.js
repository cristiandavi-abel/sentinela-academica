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
const emAtencao = alunos.filter(a => a.ipa >= 70).length;
const freqMedia = total > 0 ? Math.round(alunos.reduce((s, a) => s + a.frequencia, 0) / total) : 0;

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
        <div><h3>${emAtencao}</h3><span>Alta Necessidade</span></div>
    </div>
    <div class="card-info">
        <i class="fa-solid fa-chart-line"></i>
        <div><h3>${freqMedia}%</h3><span>Frequência Média</span></div>
    </div>
`;

// Alunos em alta necessidade de acompanhamento (IPA >= 70), ordenados
const atencao = alunos
    .filter(a => a.ipa >= 70)
    .sort((a, b) => b.ipa - a.ipa);

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
    total > 0 ? Math.round(alunos.reduce((s, a) => s + (a.historicoIPA[i] || 0), 0) / total) : 0
);
const mediaMedio = meses.map((_, i) =>
    total > 0 ? (alunos.reduce((s, a) => s + (a.historicoMedia[i] || 0), 0) / total).toFixed(1) : "0.0"
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
                borderColor: "#14B8A6",
                backgroundColor: "rgba(20,184,210,.10)",
                fill: true,
                tension: .4,
                pointRadius: 4,
                pointBackgroundColor: "#14B8A6"
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
        scales: {
            y: { beginAtZero: true, min: 0, max: 100, grid: { color: "#E2E8F0" } },
            x: { grid: { display: false } }
        }
    }
});

// ==========================================
// SISTEMA DE GRÁFICOS DETALHADOS
// ==========================================

const TIPOS_GRAFICO = {
    alunosTurma: { titulo: "Alunos por Turma", tipo: "bar" },
    frequencia: { titulo: "Distribuição de Frequência", tipo: "bar" },
    notasBaixas: { titulo: "Notas Baixas vs Boas Notas", tipo: "doughnut" },
    matriculados: { titulo: "Alunos Matriculados", tipo: "line" },
    pendencias: { titulo: "Pendências por Turma", tipo: "bar" },
    desempenhoDisciplina: { titulo: "Desempenho por Disciplina", tipo: "bar" },
    evolucaoIPA: { titulo: "Evolução IPA vs Média", tipo: "line" }
};

let chartPrincipal = null;
let chartComparacao = null;

function getDadosGrafico(tipo) {
    const turmas = {};
    alunos.forEach(a => {
        if (!turmas[a.turma]) turmas[a.turma] = { n: 0, somaMedia: 0, somaIPA: 0, somaFreq: 0, notasBaixas: 0, boasNotas: 0, pendencias: 0 };
        const t = turmas[a.turma];
        t.n++;
        t.somaMedia += a.media;
        t.somaIPA += a.ipa;
        t.somaFreq += a.frequencia;
        if (a.media < 5) t.notasBaixas++;
        if (a.media >= 7) t.boasNotas++;
        if (a.ipa >= 40) t.pendencias++;
    });

    const nomesTurmas = Object.keys(turmas);

    switch (tipo) {
        case "alunosTurma":
            return {
                labels: nomesTurmas,
                data: nomesTurmas.map(t => turmas[t].n),
                cor: "#2563EB"
            };

        case "frequencia": {
            const faixas = ["< 60%", "60-70%", "70-80%", "80-90%", "90-100%"];
            const contagem = [0, 0, 0, 0, 0];
            alunos.forEach(a => {
                if (a.frequencia < 60) contagem[0]++;
                else if (a.frequencia < 70) contagem[1]++;
                else if (a.frequencia < 80) contagem[2]++;
                else if (a.frequencia < 90) contagem[3]++;
                else contagem[4]++;
            });
            return { labels: faixas, data: contagem, cor: "#14B8A6" };
        }

        case "notasBaixas": {
            let baixas = 0, medias = 0, boas = 0;
            alunos.forEach(a => {
                if (a.media < 5) baixas++;
                else if (a.media < 7) medias++;
                else boas++;
            });
            return {
                labels: ["Notas Baixas (< 5)", "Notas Médias (5-7)", "Boas Notas (≥ 7)"],
                data: [baixas, medias, boas],
                cores: ["#EF4444", "#F59E0B", "#14B8A6"]
            };
        }

        case "matriculados": {
            const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
            const acumulado = meses.map((_, i) => alunos.slice(0, Math.max(1, Math.round(alunos.length * (i + 1) / 6))).length);
            return { labels: meses, data: acumulado, cor: "#7C3AED" };
        }

        case "pendencias":
            return {
                labels: nomesTurmas,
                data: nomesTurmas.map(t => turmas[t].pendencias),
                cor: "#EF4444"
            };

        case "desempenhoDisciplina": {
            const disciplinas = {};
            alunos.forEach(a => {
                Object.entries(a.notas).forEach(([d, n]) => {
                    const media = (Array.isArray(n) ? n : [n]).reduce((s, v) => s + v, 0) / (Array.isArray(n) ? n.length : 1);
                    if (!disciplinas[d]) disciplinas[d] = { s: 0, n: 0 };
                    disciplinas[d].s += media;
                    disciplinas[d].n++;
                });
            });
            const nomes = Object.keys(disciplinas);
            return {
                labels: nomes,
                data: nomes.map(d => (disciplinas[d].s / disciplinas[d].n).toFixed(1)),
                cor: "#2563EB"
            };
        }

        case "evolucaoIPA": {
            const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
            const ipaMedio = meses.map((_, i) => total > 0 ? Math.round(alunos.reduce((s, a) => s + (a.historicoIPA[i] || 0), 0) / total) : 0);
            const mediaMedio = meses.map((_, i) => total > 0 ? parseFloat((alunos.reduce((s, a) => s + (a.historicoMedia[i] || 0), 0) / total).toFixed(1)) : 0);
            return { labels: meses, data: ipaMedio, data2: mediaMedio, cor: "#2563EB", cor2: "#14B8A6" };
        }

        default:
            return { labels: [], data: [], cor: "#2563EB" };
    }
}

function criarGrafico(canvasId, tipo) {
    const dados = getDadosGrafico(tipo);
    const info = TIPOS_GRAFICO[tipo];
    const ctx = document.getElementById(canvasId);

    const isLine = info.tipo === "line";
    const isDoughnut = info.tipo === "doughnut";

    const datasets = [];

    if (tipo === "evolucaoIPA") {
        datasets.push({
            label: "IPA Médio",
            data: dados.data,
            borderColor: dados.cor,
            backgroundColor: dados.cor + "20",
            fill: true,
            tension: .4,
            pointRadius: 4,
            pointBackgroundColor: dados.cor
        });
        datasets.push({
            label: "Média Geral",
            data: dados.data2,
            borderColor: dados.cor2,
            backgroundColor: dados.cor2 + "20",
            fill: true,
            tension: .4,
            pointRadius: 4,
            pointBackgroundColor: dados.cor2
        });
    } else {
        datasets.push({
            label: info.titulo,
            data: dados.data,
            backgroundColor: isDoughnut ? dados.cores : dados.cor + "CC",
            borderColor: isDoughnut ? "#fff" : dados.cor,
            borderWidth: isDoughnut ? 2 : 1,
            borderRadius: isDoughnut ? 0 : 8
        });
    }

    return new Chart(ctx, {
        type: info.tipo,
        data: { labels: dados.labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "bottom", display: isDoughnut || tipo === "evolucaoIPA" }
            },
            scales: isDoughnut ? {} : {
                y: { beginAtZero: true, grid: { color: "#E2E8F0" } },
                x: { grid: { display: false } }
            }
        }
    });
}

function atualizarGraficos() {
    const tipoPrincipal = document.getElementById("graficoPrincipal").value;
    const tipoComparacao = document.getElementById("graficoComparacao").value;

    document.getElementById("tituloPrincipal").textContent = TIPOS_GRAFICO[tipoPrincipal].titulo;

    if (chartPrincipal) chartPrincipal.destroy();
    chartPrincipal = criarGrafico("canvasPrincipal", tipoPrincipal);

    const boxComparacao = document.getElementById("boxComparacao");
    if (tipoComparacao && tipoComparacao !== tipoPrincipal) {
        boxComparacao.style.display = "";
        document.getElementById("tituloComparacao").textContent = TIPOS_GRAFICO[tipoComparacao].titulo;
        if (chartComparacao) chartComparacao.destroy();
        chartComparacao = criarGrafico("canvasComparacao", tipoComparacao);
    } else {
        boxComparacao.style.display = "none";
        if (chartComparacao) { chartComparacao.destroy(); chartComparacao = null; }
    }
}

document.getElementById("graficoPrincipal").addEventListener("change", atualizarGraficos);
document.getElementById("graficoComparacao").addEventListener("change", atualizarGraficos);

atualizarGraficos();
