// ==========================================
// SENTINELA ACADÊMICA
// Alertas (ordenado por risco)
// =========================================

protegerPagina("coordenacao");
App.initSidebar("alertas");

const alunos = getAlunos();

const alertas = alunos
    .filter(a => a.ipa < 80)
    .sort((a, b) => a.ipa - b.ipa);

const tabela = document.getElementById("tabelaAlertas");
const vazio = document.getElementById("semAlertas");

if (alertas.length === 0) {
    tabela.innerHTML = "";
    vazio.style.display = "block";
} else {
    tabela.innerHTML = alertas.map(a => {
        const st = statusIPA(a.ipa);
        const icone = st.classe === "red" ? "fa-skull-crossbones" : "fa-triangle-exclamation";
        return `
            <tr>
                <td>
                    <div class="aluno-cell">
                        <span class="avatar-pequeno ${st.classe}">${App.iniciais(a.nome)}</span>
                        <strong>${a.nome}</strong>
                    </div>
                </td>
                <td>${a.turma}</td>
                <td><span class="status ${st.classe}">${a.ipa}</span></td>
                <td>
                    <span class="status-pill ${st.classe}">
                        <i class="fa-solid ${icone}"></i> ${st.texto}
                    </span>
                </td>
                <td><a href="perfil.html?id=${a.id}" title="Ver perfil"><i class="fa-solid fa-eye"></i></a></td>
            </tr>
        `;
    }).join("");
}
