// ==========================================
// SENTINELA ACADÊMICA
// Pesquisa de alunos
// ==========================================

const pesquisa = document.getElementById("pesquisa");
const linhas = document.querySelectorAll("#tabelaAlunos tr");

pesquisa.addEventListener("keyup", () => {

    const texto = pesquisa.value.toLowerCase();

    linhas.forEach(linha => {

        const nome = linha.children[0].textContent.toLowerCase();
        const turma = linha.children[1].textContent.toLowerCase();

        if (nome.includes(texto) || turma.includes(texto)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }

    });

});

// Filtros (visual)

const filtros = document.querySelectorAll(".filter");

filtros.forEach(botao => {

    botao.addEventListener("click", () => {

        filtros.forEach(item => item.classList.remove("active"));

        botao.classList.add("active");

    });

});