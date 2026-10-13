// ==========================================
// SENTINELA ACADÊMICA
// Login e Cadastro (Coordenação e Aluno)
// ==========================================

let tipoAcesso = "coordenacao";
let modoAcesso = "login";

const tabs = document.querySelectorAll("#tabsPerfil .tab");
const labelUsuario = document.getElementById("labelUsuario");
const inputUsuario = document.getElementById("usuario");
const dicaLogin = document.getElementById("dicaLogin");
const erroLogin = document.getElementById("erroLogin");

const tabsPerfil = document.querySelectorAll("#tabsPerfil .tab");

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

const textosCadastro = {
    coordenacao: {
        dica: "Informe seus dados para criar uma conta de Coordenação.",
        exigeEmail: true,
        exigeTurma: false
    },
    aluno: {
        dica: "Crie sua conta de Aluno. Sua matrícula será gerada automaticamente.",
        exigeEmail: false,
        exigeTurma: true
    }
};

function atualizarPerfilUI() {
    labelUsuario.textContent = textos[tipoAcesso].label;
    inputUsuario.placeholder = textos[tipoAcesso].placeholder;
    dicaLogin.textContent = textos[tipoAcesso].dica;

    const cad = textosCadastro[tipoAcesso];
    document.getElementById("dicaCadastro").textContent = cad.dica;
    document.getElementById("groupRegEmail").style.display = cad.exigeEmail ? "" : "none";
    document.getElementById("groupRegTurma").style.display = cad.exigeTurma ? "" : "none";

    const regEmail = document.getElementById("regEmail");
    const regTurma = document.getElementById("regTurma");
    if (cad.exigeEmail) regEmail.setAttribute("required", "required");
    else regEmail.removeAttribute("required");
    if (!cad.exigeTurma) regTurma.removeAttribute("required");

    // ajusta campos obrigatórios do email
    if (!cad.exigeEmail) regEmail.value = "";
    erroLogin.style.display = "none";
    document.getElementById("erroCadastro").style.display = "none";
    document.getElementById("sucessoCadastro").style.display = "none";
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        tipoAcesso = tab.dataset.tipo;
        atualizarPerfilUI();
        inputUsuario.value = "";
        document.getElementById("senha").value = "";
    });
});

// Modo entrar / cadastrar
const modoEntrarBtn = document.getElementById("modoEntrar");
const modoCadastrarBtn = document.getElementById("modoCadastrar");

function setModo(modo) {
    modoAcesso = modo;
    const loginForm = document.getElementById("loginForm");
    const cadastroForm = document.getElementById("cadastroForm");
    const titulo = document.getElementById("tituloAcesso");

    if (modo === "login") {
        modoEntrarBtn.classList.add("active");
        modoCadastrarBtn.classList.remove("active");
        loginForm.style.display = "";
        cadastroForm.style.display = "none";
        titulo.textContent = "Bem-vindo!";
    } else {
        modoCadastrarBtn.classList.add("active");
        modoEntrarBtn.classList.remove("active");
        loginForm.style.display = "none";
        cadastroForm.style.display = "";
        titulo.textContent = "Criar conta";
    }
    erroLogin.style.display = "none";
    document.getElementById("erroCadastro").style.display = "none";
    document.getElementById("sucessoCadastro").style.display = "none";
}

modoEntrarBtn.addEventListener("click", () => setModo("login"));
modoCadastrarBtn.addEventListener("click", () => setModo("cadastro"));

atualizarPerfilUI();

// Login
const formLogin = document.getElementById("loginForm");
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = inputUsuario.value.trim();
    const senha = document.getElementById("senha").value.trim();

    erroLogin.style.display = "none";

    if (tipoAcesso === "coordenacao") {

        let ok = (usuario === COORDENADOR.email && senha === COORDENADOR.senha);
        if (!ok) {
            const conta = getCoordenadorPorEmail(usuario);
            if (conta && conta.senha === senha) ok = true;
        }

        if (ok) {
            iniciarSessao("coordenacao", usuario.toLowerCase());
            window.location.href = "dashboard.html";
        } else {
            erroLogin.textContent = "Email ou senha incorretos.";
            erroLogin.style.display = "block";
        }

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

// Cadastro
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
    const cad = textosCadastro[tipoAcesso];

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

    if (tipoAcesso === "coordenacao") {
        const email = document.getElementById("regEmail").value.trim();
        if (!email) {
            erroCadastro.textContent = "Informe um email válido.";
            erroCadastro.style.display = "block";
            return;
        }

        // e-mail já existe?
        if (getCoordenadorPorEmail(email) || email.toLowerCase() === COORDENADOR.email.toLowerCase()) {
            erroCadastro.textContent = "Já existe uma conta com este email.";
            erroCadastro.style.display = "block";
            return;
        }

        const conta = adicionarCoordenador({ nome, email, senha });
        if (!conta) {
            erroCadastro.textContent = "Não foi possível criar a conta.";
            erroCadastro.style.display = "block";
            return;
        }

        iniciarSessao("coordenacao", conta.email.toLowerCase());
        window.location.href = "dashboard.html";
    } else {
        const turma = document.getElementById("regTurma").value.trim();

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
    }
});