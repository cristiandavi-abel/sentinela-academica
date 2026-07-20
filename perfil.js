// ==========================================
// SENTINELA ACADÊMICA
// Perfil do Aluno (coordenação + aluno)
// =========================================

const sessao = getSessao();
if (!sessao) {
    window.location.href = "index.html";
} else {

    App.initSidebar(sessao.tipo === "aluno" ? "perfil" : "alunos",
                    sessao.tipo === "aluno" ? "aluno" : "coordenacao");

    let aluno;

    if (sessao.tipo === "aluno") {
        aluno = getAlunoPorId(sessao.referencia);
        document.getElementById("btnVoltar").style.display = "none";
        document.getElementById("subPerfil").textContent = "Seu desempenho escolar.";
    } else {
        const params = new URLSearchParams(window.location.search);
        aluno = getAlunoPorId(params.get("id")) || getAlunos()[0];
        document.getElementById("subPerfil").textContent = "Detalhes do estudante.";
    }

    if (!aluno) {
        encerrarSessao();
    } else {

        const st = statusIPA(aluno.ipa);

        document.getElementById("perfilCard").innerHTML = `
            <div class="perfil-topo">
                <div class="avatar">${App.iniciais(aluno.nome)}</div>
                <div>
                    <h2>${aluno.nome}</h2>
                    <p>${aluno.turma} &middot; Mat. ${aluno.matricula}</p>
                    <span class="status-pill ${st.classe}">${st.texto}</span>
                </div>
            </div>
            <div class="perfil-grid">
                <div class="info-box">
                    <h3>Média Geral</h3>
                    <span>${aluno.media.toFixed(1)}</span>
                </div>
                <div class="info-box">
                    <h3>Frequência</h3>
                    <span>${aluno.frequencia}%</span>
                </div>
                <div class="info-box">
                    <h3>IPA</h3>
                    <span class="status-text ${st.classe}">${aluno.ipa}</span>
                </div>
            </div>
            <h3 style="margin-top:35px;">Observações</h3>
            <p>${aluno.observacoes}</p>
        `;

        const ctx = document.getElementById("graficoPerfil");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
                datasets: [{
                    label: "IPA",
                    data: aluno.historicoIPA,
                    borderColor: "#2563EB",
                    backgroundColor: "rgba(37,99,235,.12)",
                    fill: true, tension: .4,
                    pointRadius: 4, pointBackgroundColor: "#2563EB"
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { min: 0, max: 100, grid: { color: "#E2E8F0" } },
                          x: { grid: { display: false } } }
            }
        });

        document.getElementById("tabelaPerfil").innerHTML = Object.keys(aluno.notas).map(d => {
            const n = aluno.notas[d];
            const cls = n >= 7 ? "green" : n >= 5 ? "yellow" : "red";
            return `
                <tr>
                    <td>${d}</td>
                    <td><strong>${n.toFixed(1)}</strong></td>
                    <td><div class="barra"><span class="barra-preench ${cls}" style="width:${(n/10)*100}%"></span></div></td>
                </tr>
            `;
        }).join("");
    }
}
