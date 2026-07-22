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
        },
        {
            id: 7,
            matricula: "2024007",
            senha: "1234",
            nome: "Gabriel Ferreira Santos",
            turma: "Informática II",
            serie: "3º Ano",
            curso: "Informática",
            media: 5.1,
            frequencia: 62,
            ipa: 32,
            notas: {
                "Português": 5.0,
                "Matemática": 4.2,
                "História": 5.5,
                "Ciências": 4.8,
                "Ed. Física": 6.5,
                "Informática": 4.7
            },
            historicoIPA: [65, 55, 48, 42, 36, 32],
            historicoMedia: [6.8, 6.2, 5.8, 5.5, 5.2, 5.1],
            historicoFrequencia: [78, 72, 68, 65, 63, 62],
            observacoes: "Risco crítico. Notas muito abaixo da média, frequência alarmante. Necessita intervenção imediata da coordenação e encaminhamento para assistência social."
        },
        {
            id: 8,
            matricula: "2024008",
            senha: "1234",
            nome: "Letícia Oliveira Costa",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 6.8,
            frequencia: 78,
            ipa: 55,
            notas: {
                "Português": 7.2,
                "Matemática": 5.1,
                "História": 7.0,
                "Ciências": 6.5,
                "Ed. Física": 7.8,
                "Informática": 7.0
            },
            historicoIPA: [78, 72, 66, 62, 58, 55],
            historicoMedia: [7.5, 7.2, 7.0, 6.9, 6.8, 6.8],
            historicoFrequencia: [88, 85, 82, 80, 79, 78],
            observacoes: "Aluno com dificuldades específicas em Matemática. A frequência está caindo gradualmente. Recomenda-se reforço escolar na disciplina e conversa com responsáveis."
        },
        {
            id: 9,
            matricula: "2024009",
            senha: "1234",
            nome: "Rafael Mendes Lima",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 4.3,
            frequencia: 55,
            ipa: 22,
            notas: {
                "Português": 4.0,
                "Matemática": 3.5,
                "História": 4.8,
                "Ciências": 4.0,
                "Ed. Física": 5.5,
                "Informática": 4.0
            },
            historicoIPA: [58, 48, 40, 34, 28, 22],
            historicoMedia: [5.8, 5.4, 5.0, 4.7, 4.5, 4.3],
            historicoFrequencia: [70, 65, 62, 58, 56, 55],
            observacoes: "Situação gravíssima. Múltiplas reprovações prováveis. Frequência muito abaixo do mínimo exigido. Encaminhamento urgente para Conselho de Classe e orientação familiar."
        },
        {
            id: 10,
            matricula: "2024010",
            senha: "1234",
            nome: "Camila Rodrigues Pereira",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 7.5,
            frequencia: 84,
            ipa: 65,
            notas: {
                "Português": 7.8,
                "Matemática": 6.2,
                "História": 8.0,
                "Ciências": 7.5,
                "Ed. Física": 8.2,
                "Informática": 7.3
            },
            historicoIPA: [82, 78, 74, 70, 68, 65],
            historicoMedia: [8.0, 7.8, 7.7, 7.6, 7.5, 7.5],
            historicoFrequencia: [92, 90, 88, 86, 85, 84],
            observacoes: "Aluno em processo de queda gradual. Apesar das notas ainda serem aceitáveis, a tendência é negativa. Monitorar nos próximos bimestres."
        },
        {
            id: 11,
            matricula: "2024011",
            senha: "1234",
            nome: "Thiago Almeida Souza",
            turma: "Informática I",
            serie: "1º Ano",
            curso: "Informática",
            media: 6.0,
            frequencia: 72,
            ipa: 45,
            notas: {
                "Português": 5.5,
                "Matemática": 4.8,
                "História": 6.5,
                "Ciências": 5.8,
                "Ed. Física": 7.2,
                "Informática": 6.2
            },
            historicoIPA: [68, 62, 58, 52, 48, 45],
            historicoMedia: [7.0, 6.6, 6.4, 6.2, 6.1, 6.0],
            historicoFrequencia: [82, 78, 76, 74, 73, 72],
            observacoes: "Estudante com dificuldades em Matemática e Português. Frequência abaixo do esperado. Necessita acompanhamento pedagógico e apoio nas disciplinas básicas."
        },
        {
            id: 12,
            matricula: "2024012",
            senha: "1234",
            nome: "Juliana Martins Rocha",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 8.4,
            frequencia: 94,
            ipa: 86,
            notas: {
                "Português": 8.5,
                "Matemática": 8.0,
                "História": 8.8,
                "Ciências": 8.2,
                "Ed. Física": 9.0,
                "Informática": 8.5
            },
            historicoIPA: [80, 82, 83, 84, 85, 86],
            historicoMedia: [7.8, 7.9, 8.0, 8.1, 8.3, 8.4],
            historicoFrequencia: [90, 91, 92, 93, 93, 94],
            observacoes: "Aluno em constante melhoria. Demonstrado evolução significativa nas últimas avaliações. Bom exemplo de superação."
        },
        {
            id: 13,
            matricula: "2024013",
            senha: "1234",
            nome: "Felipe Gomes Barbosa",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 5.8,
            frequencia: 70,
            ipa: 42,
            notas: {
                "Português": 5.5,
                "Matemática": 4.5,
                "História": 6.0,
                "Ciências": 5.5,
                "Ed. Física": 7.0,
                "Informática": 6.2
            },
            historicoIPA: [72, 64, 58, 52, 46, 42],
            historicoMedia: [7.0, 6.6, 6.3, 6.0, 5.9, 5.8],
            historicoFrequencia: [84, 80, 76, 73, 71, 70],
            observacoes: "Aluno em risco de não conclusão do ensino médio. Notas abaixo da média em todas as disciplinas. Frequência insuficiente. Ação urgente necessária."
        },
        {
            id: 14,
            matricula: "2024014",
            senha: "1234",
            nome: "Amanda Nascimento Silva",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 9.2,
            frequencia: 97,
            ipa: 96,
            notas: {
                "Português": 9.5,
                "Matemática": 9.0,
                "História": 9.3,
                "Ciências": 9.1,
                "Ed. Física": 9.4,
                "Informática": 9.0
            },
            historicoIPA: [92, 93, 94, 95, 95, 96],
            historicoMedia: [8.8, 8.9, 9.0, 9.1, 9.1, 9.2],
            historicoFrequencia: [95, 96, 96, 97, 97, 97],
            observacoes: "Excelente aluna. Líder natural, participa ativamente de todas as atividades. Referência de comprometimento acadêmico."
        },
        {
            id: 15,
            matricula: "2024015",
            senha: "1234",
            nome: "Diego Castro Vieira",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 6.5,
            frequencia: 80,
            ipa: 58,
            notas: {
                "Português": 6.2,
                "Matemática": 5.8,
                "História": 7.0,
                "Ciências": 6.0,
                "Ed. Física": 7.5,
                "Informática": 6.5
            },
            historicoIPA: [75, 70, 66, 63, 60, 58],
            historicoMedia: [7.2, 7.0, 6.8, 6.7, 6.6, 6.5],
            historicoFrequencia: [88, 86, 84, 82, 81, 80],
            observacoes: "Aluno em zona de atenção. Evolução negativa constante. Recomenda-se monitoramento intensivo e apoio pedagógico nas disciplinas com menor desempenho."
        },
        {
            id: 16,
            matricula: "2024016",
            senha: "1234",
            nome: "Priscila Araújo Mendes",
            turma: "Informática II",
            serie: "3º Ano",
            curso: "Informática",
            media: 5.5,
            frequencia: 68,
            ipa: 38,
            notas: {
                "Português": 5.0,
                "Matemática": 4.0,
                "História": 6.0,
                "Ciências": 5.5,
                "Ed. Física": 6.8,
                "Informática": 5.8
            },
            historicoIPA: [70, 62, 55, 48, 42, 38],
            historicoMedia: [7.0, 6.5, 6.0, 5.7, 5.6, 5.5],
            historicoFrequencia: [82, 78, 74, 71, 69, 68],
            observacoes: "Aluno com histórico de queda acentuada. Dificuldades em Matemática e Português. Situação crítica que demanda intervenção imediata."
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
