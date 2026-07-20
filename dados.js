// ==========================================
// SENTINELA ACADÊMICA
// Fonte de dados central (protótipo client-side)
// ==========================================

const STORAGE_KEY = "sentinela_dados_v1";
const SESSION_KEY = "sentinela_sessao_v1";

const COORDENADOR = {
    email: "coordenador@abel.edu.br",
    senha: "123456"
};

// Dados base usados para inicializar/resetar o sistema
const DADOS_BASE = {
    escola: "Escola Estadual Professor Abel Freire Coelho",
    alunos: [
        {
            id: 1,
            matricula: "2024001",
            senha: "1234",
            nome: "João Pedro Silva",
            turma: "Informática II",
            serie: "3º Ano",
            curso: "Informática",
            media: 8.7,
            frequencia: 95,
            ipa: 92,
            notas: {
                "Português": 8.5,
                "Matemática": 9.2,
                "História": 8.0,
                "Ciências": 8.8,
                "Ed. Física": 9.5,
                "Informática": 9.0
            },
            historicoIPA: [88, 89, 90, 91, 92, 92],
            historicoMedia: [8.1, 8.3, 8.4, 8.5, 8.6, 8.7],
            historicoFrequencia: [92, 93, 94, 94, 95, 95],
            observacoes: "O estudante apresenta excelente desempenho acadêmico, boa frequência e participação nas atividades escolares."
        },
        {
            id: 2,
            matricula: "2024002",
            senha: "1234",
            nome: "Maria Clara Souza",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 7.3,
            frequencia: 86,
            ipa: 68,
            notas: {
                "Português": 7.0,
                "Matemática": 6.8,
                "História": 7.5,
                "Ciências": 7.2,
                "Ed. Física": 8.0,
                "Informática": 7.1
            },
            historicoIPA: [80, 76, 74, 72, 70, 68],
            historicoMedia: [7.9, 7.7, 7.6, 7.4, 7.3, 7.3],
            historicoFrequencia: [94, 92, 90, 88, 87, 86],
            observacoes: "Queda gradual no desempenho e na frequência. Recomenda-se acompanhamento da coordenação e conversa com a família."
        },
        {
            id: 3,
            matricula: "2024003",
            senha: "1234",
            nome: "Lucas Henrique",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 6.2,
            frequencia: 75,
            ipa: 49,
            notas: {
                "Português": 6.0,
                "Matemática": 5.4,
                "História": 6.5,
                "Ciências": 6.1,
                "Ed. Física": 7.0,
                "Informática": 6.4
            },
            historicoIPA: [70, 64, 60, 55, 52, 49],
            historicoMedia: [7.0, 6.8, 6.6, 6.4, 6.3, 6.2],
            historicoFrequencia: [88, 84, 82, 79, 77, 75],
            observacoes: "Indicadores de alerta alto. Frequência abaixo do esperado e notas em declínio. Encaminhamento para apoio pedagógico recomendado."
        },
        {
            id: 4,
            matricula: "2024004",
            senha: "1234",
            nome: "Ana Júlia Lima",
            turma: "Informática I",
            serie: "1º Ano",
            curso: "Informática",
            media: 8.1,
            frequencia: 91,
            ipa: 88,
            notas: {
                "Português": 8.0,
                "Matemática": 8.3,
                "História": 7.9,
                "Ciências": 8.2,
                "Ed. Física": 8.6,
                "Informática": 8.4
            },
            historicoIPA: [84, 85, 86, 87, 87, 88],
            historicoMedia: [7.8, 7.9, 8.0, 8.0, 8.1, 8.1],
            historicoFrequencia: [90, 90, 91, 91, 91, 91],
            observacoes: "Bom desempenho e estabilidade ao longo do período. Participa ativamente das aulas."
        },
        {
            id: 5,
            matricula: "2024005",
            senha: "1234",
            nome: "Pedro Henrique Alves",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 7.8,
            frequencia: 89,
            ipa: 79,
            notas: {
                "Português": 7.6,
                "Matemática": 7.9,
                "História": 7.4,
                "Ciências": 8.1,
                "Ed. Física": 8.0,
                "Informática": 7.7
            },
            historicoIPA: [76, 77, 78, 78, 79, 79],
            historicoMedia: [7.5, 7.6, 7.7, 7.7, 7.8, 7.8],
            historicoFrequencia: [87, 88, 88, 89, 89, 89],
            observacoes: "Desempenho regular e em leve ascensão. Acompanhar evolução no próximo bimestre."
        },
        {
            id: 6,
            matricula: "2024006",
            senha: "1234",
            nome: "Beatriz Carvalho",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 9.1,
            frequencia: 98,
            ipa: 95,
            notas: {
                "Português": 9.0,
                "Matemática": 9.3,
                "História": 8.9,
                "Ciências": 9.2,
                "Ed. Física": 9.4,
                "Informática": 9.1
            },
            historicoIPA: [90, 91, 92, 93, 94, 95],
            historicoMedia: [8.6, 8.7, 8.8, 8.9, 9.0, 9.1],
            historicoFrequencia: [96, 96, 97, 97, 98, 98],
            observacoes: "Excelente desempenho e frequência exemplar. Referência para a turma."
        }
    ]
};

// ---------- Persistência ----------

function carregarDados() {
    try {
        const salvo = localStorage.getItem(STORAGE_KEY);
        if (salvo) return JSON.parse(salvo);
    } catch (e) {
        console.warn("Falha ao ler dados do localStorage", e);
    }
    const base = structuredClone(DADOS_BASE);
    salvarDados(base);
    return base;
}

function salvarDados(dados) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    } catch (e) {
        console.warn("Falha ao salvar dados", e);
    }
}

function resetarDados() {
    const base = structuredClone(DADOS_BASE);
    salvarDados(base);
    return base;
}

// ---------- Helpers de domínio ----------

function statusIPA(ipa) {
    if (ipa >= 80) return { classe: "green", texto: "Estável" };
    if (ipa >= 60) return { classe: "yellow", texto: "Atenção" };
    return { classe: "red", texto: "Alto Risco" };
}

function getAlunos() {
    return carregarDados().alunos;
}

function getAlunoPorId(id) {
    return getAlunos().find(a => String(a.id) === String(id));
}

function getAlunoPorMatricula(matricula) {
    return getAlunos().find(a => a.matricula === matricula);
}

function atualizarAluno(id, campos) {
    const dados = carregarDados();
    const aluno = dados.alunos.find(a => String(a.id) === String(id));
    if (aluno) {
        Object.assign(aluno, campos);
        salvarDados(dados);
    }
    return aluno;
}

// ---------- Sessão ----------

function iniciarSessao(tipo, referencia) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ tipo, referencia }));
}

function getSessao() {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY));
    } catch (e) {
        return null;
    }
}

function encerrarSessao() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "index.html";
}

function protegerPagina(tipoEsperado) {
    const sessao = getSessao();
    if (!sessao || sessao.tipo !== tipoEsperado) {
        window.location.href = "index.html";
        return null;
    }
    return sessao;
}
