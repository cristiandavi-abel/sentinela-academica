// ==========================================
// SENTINELA ACADÊMICA
// Portal do Aluno
// =========================================

const sessao = protegerPagina("aluno");

if (sessao) {

    const aluno = getAlunoPorId(sessao.referencia);

    if (!aluno) {
        encerrarSessao();
    } else {

        App.initSidebar("portal", "aluno");

        const status = statusIPA(aluno.ipa);

        // Saudação
        document.getElementById("saudacao").textContent = `Olá, ${aluno.nome.split(" ")[0]}!`;
        document.getElementById("avatarAluno").textContent = App.iniciais(aluno.nome);

        // Cards
        document.getElementById("cardsAluno").innerHTML = `
            <div class="card-info">
                <i class="fa-solid fa-star"></i>
                <div><h3>${aluno.media.toFixed(1)}</h3><span>Média Geral</span></div>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-calendar-check"></i>
                <div><h3>${aluno.frequencia}%</h3><span>Frequência</span></div>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-shield-heart"></i>
                <div><h3>${aluno.ipa}</h3><span>IPA</span></div>
            </div>
            <div class="card-info">
                <i class="fa-solid fa-circle-info"></i>
                <div><h3 class="status-text ${status.classe}">${status.texto}</h3><span>Situação</span></div>
            </div>
        `;

        // Status visual
        const corStatus = status.classe === "green" ? "#14B8A6" : status.classe === "yellow" ? "#F59E0B" : "#EF4444";
        document.getElementById("statusVisual").innerHTML = `
            <div class="anel" style="--cor:${corStatus}; --valor:${aluno.ipa}">
                <span class="anel-valor">${aluno.ipa}</span>
                <span class="anel-label">IPA</span>
            </div>
            <p class="status-msg ${status.classe}">
                ${status.classe === "green"
                    ? "Você está indo muito bem! Continue assim."
                    : status.classe === "yellow"
                        ? "Atenção: vale revisar sua rotina de estudos."
                        : "Alerta: procure a coordenação para apoio."}
            </p>
            <p class="status-turma"><i class="fa-solid fa-school"></i> ${aluno.turma}</p>
        `;

        // Gráfico de evolução (IPA + Média)
        const ctxEvo = document.getElementById("graficoEvolucao");
        new Chart(ctxEvo, {
            type: "line",
            data: {
                labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
                datasets: [
                    {
                        label: "IPA",
                        data: aluno.historicoIPA,
                        borderColor: "#2563EB",
                        backgroundColor: "rgba(37,99,235,.12)",
                        fill: true, tension: .4,
                        pointRadius: 4, pointBackgroundColor: "#2563EB"
                    },
                    {
                        label: "Média",
                        data: aluno.historicoMedia,
                        borderColor: "#14B8A6",
                        backgroundColor: "rgba(20,184,166,.10)",
                        fill: true, tension: .4,
                        pointRadius: 4, pointBackgroundColor: "#14B8A6"
                    }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
                scales: {
                    y: { min: 0, max: 100, grid: { color: "#E2E8F0" } },
                    x: { grid: { display: false } }
                }
            }
        });

        // Gráfico de notas por disciplina
        const disciplinas = Object.keys(aluno.notas);
        const notas = Object.values(aluno.notas).map(arr => (Array.isArray(arr) ? arr.reduce((s, v) => s + v, 0) / arr.length : arr));
        const ctxNotas = document.getElementById("graficoNotas");
        new Chart(ctxNotas, {
            type: "bar",
            data: {
                labels: disciplinas,
                datasets: [{
                    label: "Média",
                    data: notas,
                    backgroundColor: notas.map(n => n >= 7 ? "#14B8A6" : n >= 5 ? "#F59E0B" : "#EF4444"),
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { min: 0, max: 10, grid: { color: "#E2E8F0" } },
                    x: { grid: { display: false } }
                }
            }
        });

        // Tabela de notas
        document.getElementById("tabelaNotas").innerHTML = disciplinas.map(d => {
            const bims = Array.isArray(aluno.notas[d]) ? aluno.notas[d] : [aluno.notas[d]];
            const media = bims.reduce((s, v) => s + v, 0) / bims.length;
            const cls = media >= 7 ? "green" : media >= 5 ? "yellow" : "red";
            const largura = (media / 10) * 100;
            return `
                <tr>
                    <td>${d}</td>
                    ${bims.map(b => `<td>${Number(b).toFixed(1)}</td>`).join("")}
                    <td><strong>${media.toFixed(1)}</strong></td>
                    <td>
                        <div class="barra">
                            <span class="barra-preench ${cls}" style="width:${largura}%"></span>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");

        document.getElementById("observacoesAluno").textContent = aluno.observacoes;
    }
}
