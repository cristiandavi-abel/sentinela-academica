// ==========================================
// SENTINELA ACADÊMICA
// Login
// ==========================================

const usuario = {
    email: "coordenador@abel.edu.br",
    senha: "123456"
};

const form = document.getElementById("loginForm");
const erro = document.getElementById("erro");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (email === usuario.email && senha === usuario.senha) {

        window.location.href = "dashboard.html";

    } else {

        erro.style.display = "block";

    }

});