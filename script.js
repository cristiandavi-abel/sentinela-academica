// ==========================================
// SENTINELA ACADÊMICA
// Login (Coordenação e Aluno)
// ==========================================

let tipoAcesso = "coordenacao";

const tabs = document.querySelectorAll(".tab");
const labelUsuario = document.getElementById("labelUsuario");
const inputUsuario = document.getElementById("usuario");
const dicaLogin = document.getElementById("dicaLogin");
const erro = document.getElementById("erro");

const textos = {
    coordenacao: {
        label: "Email",
        placeholder: "Digite seu email",
        dica: "Coordenação: coordenador@abel.edu.br / 123456"
    },
    aluno: {
        label: "Matrícula",
        placeholder: "Digite sua matrícula (ex: 2024001)",
        dica: "Aluno: use sua matrícula e senha (padrão 1234)"
    }
};

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        tipoAcesso = tab.dataset.tipo;

        labelUsuario.textContent = textos[tipoAcesso].label;
        inputUsuario.placeholder = textos[tipoAcesso].placeholder;
        dicaLogin.textContent = textos[tipoAcesso].dica;
        erro.style.display = "none";
        inputUsuario.value = "";
        document.getElementById("senha").value = "";
    });
});

const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const usuario = inputUsuario.value.trim();
    const senha = document.getElementById("senha").value.trim();

    erro.style.display = "none";

    if (tipoAcesso === "coordenacao") {

        if (usuario === COORDENADOR.email && senha === COORDENADOR.senha) {
            iniciarSessao("coordenacao", COORDENADOR.email);
            window.location.href = "dashboard.html";
        } else {
            erro.textContent = "Email ou senha incorretos.";
            erro.style.display = "block";
        }

    } else {

        const aluno = getAlunoPorMatricula(usuario);

        if (aluno && aluno.senha === senha) {
            iniciarSessao("aluno", aluno.id);
            window.location.href = "portal-aluno.html";
        } else {
            erro.textContent = "Matrícula ou senha incorretos.";
            erro.style.display = "block";
        }

    }

});
