// ==========================================
// SENTINELA ACADÊMICA
// Alunos (render + filtros funcionais)
// =========================================

protegerPagina("coordenacao");
App.initSidebar("alunos");

const tabela = document.getElementById("tabelaAlunos");
const pesquisa = document.getElementById("pesquisa");
const semResultado = document.getElementById("semResultado");
const filtros = document.querySelectorAll("#filtros .filter");

let filtroAtivo = "todos";

function render() {
    const texto = pesquisa.value.toLowerCase().trim();
    const alunos = getAlunos();

    const filtrados = alunos.filter(a => {
        const nome = a.nome.toLowerCase();
        const turma = a.turma.toLowerCase();
        const casa = nome.includes(texto) || turma.includes(texto);

        let passaFiltro = true;
        if (filtroAtivo === "verde") passaFiltro = a.ipa >= 80;
        else if (filtroAtivo === "amarelo") passaFiltro = a.ipa >= 60 && a.ipa < 80;
        else if (filtroAtivo === "vermelho") passaFiltro = a.ipa < 60;
        else if (filtroAtivo === "informatica") passaFiltro = a.curso === "Informática";

        return casa && passaFiltro;
    });

    if (filtrados.length === 0) {
        tabela.innerHTML = "";
        semResultado.style.display = "block";
        return;
    }

    semResultado.style.display = "none";

    tabela.innerHTML = filtrados.map(a => {
        const st = statusIPA(a.ipa);
        return `
            <tr>
                <td>
                    <div class="aluno-cell">
                        <span class="avatar-pequeno">${App.iniciais(a.nome)}</span>
                        <div>
                            <strong>${a.nome}</strong>
                            <span class="mat">Mat. ${a.matricula}</span>
                        </div>
                    </div>
                </td>
                <td>${a.turma}</td>
                <td><strong>${a.media.toFixed(1)}</strong></td>
                <td>
                    <div class="freq-mini">
                        <span>${a.frequencia}%</span>
                        <div class="barra"><span class="barra-preench ${st.classe}" style="width:${a.frequencia}%"></span></div>
                    </div>
                </td>
                <td><span class="status ${st.classe}">${a.ipa}</span></td>
                <td>
                    <a href="perfil.html?id=${a.id}" title="Ver perfil">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                </td>
            </tr>
        `;
    }).join("");
}

pesquisa.addEventListener("keyup", render);

filtros.forEach(botao => {
    botao.addEventListener("click", () => {
        filtros.forEach(f => f.classList.remove("active"));
        botao.classList.add("active");
        filtroAtivo = botao.dataset.filtro;
        render();
    });
});

render();
