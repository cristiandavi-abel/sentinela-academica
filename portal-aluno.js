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
        const corStatus = status.classe === "green" ? "#22C55E" : status.classe === "yellow" ? "#F59E0B" : "#EF4444";
        document.getElementById("statusVisual").innerHTML = `
            <div class="anel" style="--cor:${corStatus}; --valor:${aluno.ipa}">
                <span class="anel-valor">${aluno.ipa}</span>
                <span class="anel-label">IPA</span>
            </div>
            <p class="status-msg ${status.classe}">
                ${status.texto === "Estável"
                    ? "Você está indo muito bem! Continue assim."
                    : status.texto === "Atenção"
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
                        borderColor: "#22C55E",
                        backgroundColor: "rgba(34,197,94,.10)",
                        fill: true, tension: .4,
                        pointRadius: 4, pointBackgroundColor: "#22C55E"
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
        const notas = Object.values(aluno.notas);
        const ctxNotas = document.getElementById("graficoNotas");
        new Chart(ctxNotas, {
            type: "bar",
            data: {
                labels: disciplinas,
                datasets: [{
                    label: "Nota",
                    data: notas,
                    backgroundColor: notas.map(n => n >= 7 ? "#22C55E" : n >= 5 ? "#F59E0B" : "#EF4444"),
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
            const n = aluno.notas[d];
            const cls = n >= 7 ? "green" : n >= 5 ? "yellow" : "red";
            const largura = (n / 10) * 100;
            return `
                <tr>
                    <td>${d}</td>
                    <td><strong>${n.toFixed(1)}</strong></td>
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
