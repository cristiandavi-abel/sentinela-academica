// ==========================================
// SENTINELA ACADÊMICA
// Gerenciamento de contas (Coordenação)
// ==========================================

protegerPagina("coordenacao");
App.initSidebar("contas");

function render() {
    const coords = getCoordenadores();
    const alunos = getAlunos();

    document.getElementById("totalCoord").textContent = coords.length;
    document.getElementById("totalAlunos").textContent = alunos.length;

    // Coordenadores
    const tbodyCoords = document.getElementById("tabelaCoords");
    tbodyCoords.innerHTML = coords.map((c) => `
        <tr>
            <td>${c.nome}</td>
            <td>${c.email}</td>
            <td>
                <button class="btn-voltar" style="padding:6px 12px;font-size:12px;" onclick="editarCoord('${c.email}')">
                    <i class="fa-solid fa-pen"></i> Editar
                </button>
                <button class="btn-perigo" style="padding:6px 12px;font-size:12px;" onclick="removerCoord('${c.email}')">
                    <i class="fa-solid fa-trash"></i> Remover
                </button>
            </td>
        </tr>
    `).join("") || `<tr><td colspan="3" class="sem-resultado">Nenhum coordenador cadastrado.</td></tr>`;

    // Alunos
    const tbodyAlunos = document.getElementById("tabelaAlunosContas");
    tbodyAlunos.innerHTML = alunos.map(a => `
        <tr>
            <td>${a.nome}</td>
            <td>${a.matricula}</td>
            <td>${a.turma}</td>
            <td>
                <button class="btn-voltar" style="padding:6px 12px;font-size:12px;" onclick="editarAluno(${a.id})">
                    <i class="fa-solid fa-pen"></i> Editar
                </button>
                <button class="btn-perigo" style="padding:6px 12px;font-size:12px;" onclick="removerAluno(${a.id})">
                    <i class="fa-solid fa-trash"></i> Remover
                </button>
            </td>
        </tr>
    `).join("") || `<tr><td colspan="4" class="sem-resultado">Nenhum aluno cadastrado.</td></tr>`;
}

window.editarCoord = function (email) {
    const dados = carregarDados();
    const idx = (dados.coordenadores || []).findIndex(c => c.email === email);
    if (idx === -1) return;

    const c = dados.coordenadores[idx];
    const nome = prompt("Novo nome:", c.nome);
    if (nome === null) return;
    const senha = prompt("Nova senha (deixe em branco para manter):", "");
    if (senha === null) return;

    if (nome.trim()) c.nome = nome.trim();
    if (senha.trim()) c.senha = senha.trim();
    salvarDados(dados);
    render();
};

window.removerCoord = function (email) {
    const dados = carregarDados();
    const idx = (dados.coordenadores || []).findIndex(c => c.email === email);
    if (idx === -1) return;

    const conta = dados.coordenadores[idx];

    if (conta.email === COORDENADOR.email) {
        alert("A conta de demonstração não pode ser removida.");
        return;
    }

    if (!confirm(`Remover a conta ${conta.email}?`)) return;
    dados.coordenadores.splice(idx, 1);
    salvarDados(dados);
    render();
};

window.editarAluno = function (id) {
    const aluno = getAlunoPorId(id);
    if (!aluno) return;

    const nome = prompt("Novo nome:", aluno.nome);
    if (nome === null) return;
    const senha = prompt("Nova senha (deixe em branco para manter):", "");
    if (senha === null) return;

    const campos = {};
    if (nome.trim()) campos.nome = nome.trim();
    if (senha.trim()) campos.senha = senha.trim();
    atualizarAluno(id, campos);
    render();
};

window.removerAluno = function (id) {
    const aluno = getAlunoPorId(id);
    if (!aluno) return;

    if (!confirm(`Remover ${aluno.nome} (${aluno.matricula}) e seus dados?`)) return;

    const dados = carregarDados();
    dados.alunos = dados.alunos.filter(a => String(a.id) !== String(id));
    salvarDados(dados);
    render();
};

// Criar conta de coordenação
document.getElementById("formCoord").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("coordNome").value.trim();
    const email = document.getElementById("coordEmail").value.trim();
    const senha = document.getElementById("coordSenha").value;

    if (getCoordenadorPorEmail(email) || email.toLowerCase() === COORDENADOR.email.toLowerCase()) {
        alert("Já existe uma conta com este email.");
        return;
    }

    const conta = adicionarCoordenador({ nome, email, senha });
    if (!conta) {
        alert("Não foi possível criar a conta.");
        return;
    }

    e.target.reset();
    render();
});

// Criar conta de aluno
document.getElementById("formAluno").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("alunoNome").value.trim();
    const turma = document.getElementById("alunoTurma").value.trim();
    const senha = document.getElementById("alunoSenha").value;

    adicionarAluno({ nome, turma: turma || "Não definida", senha });
    e.target.reset();
    render();
});

render();