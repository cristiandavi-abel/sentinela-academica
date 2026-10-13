// ==========================================
// SENTINELA ACADÊMICA
// Login (Aluno / Professor / Coordenação)
// ==========================================

let modoAcesso = "login";

const labelUsuario = document.getElementById("labelUsuario");
const inputUsuario = document.getElementById("usuario");
const dicaLogin = document.getElementById("dicaLogin");
const erroLogin = document.getElementById("erroLogin");

const textos = {
    label: "Login",
    placeholder: "Digite seu email ou matrícula",
    dica: "Aluno: matrícula + senha. Professor/Coordenação: email + senha."
};

function aplicarTextoLogin() {
    if (labelUsuario) labelUsuario.textContent = textos.label;
    if (inputUsuario) inputUsuario.placeholder = textos.placeholder;
    if (dicaLogin) dicaLogin.textContent = textos.dica;
}

function setModo(modo) {
    modoAcesso = modo;
    const loginForm = document.getElementById("loginForm");
    const cadastroForm = document.getElementById("cadastroForm");
    const titulo = document.getElementById("tituloAcesso");

    if (modo === "login") {
        loginForm.style.display = "";
        cadastroForm.style.display = "none";
        titulo.textContent = "Bem-vindo!";
    } else {
        loginForm.style.display = "none";
        cadastroForm.style.display = "";
        titulo.textContent = "Criar conta de Aluno";
    }
    erroLogin.style.display = "none";
    document.getElementById("erroCadastro").style.display = "none";
    document.getElementById("sucessoCadastro").style.display = "none";
}

const modoEntrarBtn = document.getElementById("modoEntrar");
const modoCadastrarBtn = document.getElementById("modoCadastrar");
if (modoEntrarBtn) modoEntrarBtn.addEventListener("click", () => setModo("login"));
if (modoCadastrarBtn) modoCadastrarBtn.addEventListener("click", () => setModo("cadastro"));

aplicarTextoLogin();
setModo("login");

// Login unificado
const formLogin = document.getElementById("loginForm");
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = inputUsuario.value.trim();
    const senha = document.getElementById("senha").value.trim();
    erroLogin.style.display = "none";

    if (usuario.includes("@")) {
        // Professor
        const prof = getProfessorPorEmail(usuario);
        if (prof && prof.senha === senha) {
            iniciarSessao("professor", prof.id);
            window.location.href = "professor.html";
            return;
        }
        // Coordenação
        let ok = (usuario === COORDENADOR.email && senha === COORDENADOR.senha);
        if (!ok) {
            const conta = getCoordenadorPorEmail(usuario);
            if (conta && conta.senha === senha) ok = true;
        }
        if (ok) {
            iniciarSessao("coordenacao", usuario.toLowerCase());
            window.location.href = "dashboard.html";
            return;
        }
        erroLogin.textContent = "Email ou senha incorretos.";
        erroLogin.style.display = "block";
    } else {
        const aluno = getAlunoPorMatricula(usuario);
        if (aluno && aluno.senha === senha) {
            iniciarSessao("aluno", aluno.id);
            window.location.href = "portal-aluno.html";
        } else {
            erroLogin.textContent = "Matrícula ou senha incorretos.";
            erroLogin.style.display = "block";
        }
    }
});

// Cadastro apenas de aluno
const formCadastro = document.getElementById("cadastroForm");
formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();

    const erroCadastro = document.getElementById("erroCadastro");
    const sucesso = document.getElementById("sucessoCadastro");
    erroCadastro.style.display = "none";
    sucesso.style.display = "none";

    const nome = document.getElementById("regNome").value.trim();
    const senha = document.getElementById("regSenha").value;
    const confirmar = document.getElementById("regConfirmar").value;
    const turma = (document.getElementById("regTurma").value || "").trim();

    if (nome.length < 3) {
        erroCadastro.textContent = "Informe um nome válido.";
        erroCadastro.style.display = "block";
        return;
    }
    if (senha.length < 4) {
        erroCadastro.textContent = "A senha deve ter ao menos 4 caracteres.";
        erroCadastro.style.display = "block";
        return;
    }
    if (senha !== confirmar) {
        erroCadastro.textContent = "As senhas não coincidem.";
        erroCadastro.style.display = "block";
        return;
    }

    const aluno = adicionarAluno({
        nome,
        senha,
        turma: turma || "Não definida"
    });

    sucesso.textContent = `Conta criada! Sua matrícula é ${aluno.matricula}. Redirecionando...`;
    sucesso.style.display = "block";

    setTimeout(() => {
        iniciarSessao("aluno", aluno.id);
        window.location.href = "portal-aluno.html";
    }, 1500);
});