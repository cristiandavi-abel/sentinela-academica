// ==========================================
// SENTINELA ACADÊMICA
// Fonte de dados central (protótipo client-side)
// ==========================================

const STORAGE_KEY = "sentinela_dados_v2";
const SESSION_KEY = "sentinela_sessao_v1";

const COORDENADOR = {
    email: "coordenador@abel.edu.br",
    senha: "123456"
};

// Dados base usados para inicializar/resetar o sistema
const DADOS_BASE = {
    escola: "Escola Estadual Professor Abel Freire Coelho",
    coordenadores: [
        {
            nome: "Coordenação Pedagógica",
            email: "coordenador@abel.edu.br",
            senha: "123456"
        }
    ],
    avisos: [
        {
            id: 1,
            titulo: "Bem-vindos ao Sentinela Acadêmica!",
            texto: "Acompanhem seus indicadores e participem dos chats das turmas. Em caso de dúvidas, procurem a coordenação.",
            autor: "Coordenação Pedagógica",
            data: new Date().toISOString(),
            turma: null,
            lidoPor: []
        }
    ],
    chats: {},
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
            ipa: 8,
            notas: {
                "Arte": 8.3,
                "Biologia": 8.5,
                "Educação Física": 8.7,
                "Filosofia": 8.9,
                "Física": 9.1,
                "Geografia": 8.3,
                "História": 8.5,
                "Língua Espanhola": 8.7,
                "Língua Inglesa": 8.9,
                "Língua Portuguesa": 9.1,
                "Matemática": 8.3,
                "Metodologia do Trabalho Científico": 8.5,
                "Projeto de Vida": 8.7,
                "Química": 8.9,
                "Sociologia do Trabalho": 9.1,
                "Banco de Dados": 8.3,
                "Empreendedorismo": 8.5,
                "Fundamentos de Redes de Computadores": 8.7,
                "Programação Estruturada e Orientada a Objetos": 8.9,
                "Programação WEB 1": 9.1,
                "Programação WEB 2": 8.3
            },
            historicoIPA: [12, 11, 10, 9, 8, 8],
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
            ipa: 32,
            notas: {
                "Arte": 6.9,
                "Biologia": 7.1,
                "Educação Física": 7.3,
                "Filosofia": 7.5,
                "Física": 7.7,
                "Geografia": 6.9,
                "História": 7.1,
                "Língua Espanhola": 7.3,
                "Língua Inglesa": 7.5,
                "Língua Portuguesa": 7.7,
                "Matemática": 6.9,
                "Metodologia do Trabalho Científico": 7.1,
                "Projeto de Vida": 7.3,
                "Química": 7.5,
                "Sociologia do Trabalho": 7.7
            },
            historicoIPA: [20, 24, 26, 28, 30, 32],
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
            ipa: 51,
            notas: {
                "Arte": 5.8,
                "Biologia": 6.0,
                "Educação Física": 6.2,
                "Filosofia": 6.4,
                "Física": 6.6,
                "Geografia": 5.8,
                "História": 6.0,
                "Língua Espanhola": 6.2,
                "Língua Inglesa": 6.4,
                "Língua Portuguesa": 6.6,
                "Matemática": 5.8,
                "Metodologia do Trabalho Científico": 6.0,
                "Projeto de Vida": 6.2,
                "Química": 6.4,
                "Sociologia do Trabalho": 6.6
            },
            historicoIPA: [30, 36, 40, 45, 48, 51],
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
            ipa: 12,
            notas: {
                "Arte": 7.7,
                "Biologia": 7.9,
                "Educação Física": 8.1,
                "Filosofia": 8.3,
                "Física": 8.5,
                "Geografia": 7.7,
                "História": 7.9,
                "Língua Espanhola": 8.1,
                "Língua Inglesa": 8.3,
                "Língua Portuguesa": 8.5,
                "Matemática": 7.7,
                "Metodologia do Trabalho Científico": 7.9,
                "Projeto de Vida": 8.1,
                "Química": 8.3,
                "Sociologia do Trabalho": 8.5,
                "Banco de Dados": 7.7,
                "Empreendedorismo": 7.9,
                "Fundamentos de Redes de Computadores": 8.1,
                "Programação Estruturada e Orientada a Objetos": 8.3,
                "Programação WEB 1": 8.5,
                "Programação WEB 2": 7.7
            },
            historicoIPA: [16, 15, 14, 13, 13, 12],
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
            ipa: 21,
            notas: {
                "Arte": 7.4,
                "Biologia": 7.6,
                "Educação Física": 7.8,
                "Filosofia": 8.0,
                "Física": 8.2,
                "Geografia": 7.4,
                "História": 7.6,
                "Língua Espanhola": 7.8,
                "Língua Inglesa": 8.0,
                "Língua Portuguesa": 8.2,
                "Matemática": 7.4,
                "Metodologia do Trabalho Científico": 7.6,
                "Projeto de Vida": 7.8,
                "Química": 8.0,
                "Sociologia do Trabalho": 8.2
            },
            historicoIPA: [24, 23, 22, 22, 21, 21],
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
            ipa: 5,
            notas: {
                "Arte": 8.7,
                "Biologia": 8.9,
                "Educação Física": 9.1,
                "Filosofia": 9.3,
                "Física": 9.5,
                "Geografia": 8.7,
                "História": 8.9,
                "Língua Espanhola": 9.1,
                "Língua Inglesa": 9.3,
                "Língua Portuguesa": 9.5,
                "Matemática": 8.7,
                "Metodologia do Trabalho Científico": 8.9,
                "Projeto de Vida": 9.1,
                "Química": 9.3,
                "Sociologia do Trabalho": 9.5
            },
            historicoIPA: [10, 9, 8, 7, 6, 5],
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
            ipa: 68,
            notas: {
                "Arte": 4.7,
                "Biologia": 4.9,
                "Educação Física": 5.1,
                "Filosofia": 5.3,
                "Física": 5.5,
                "Geografia": 4.7,
                "História": 4.9,
                "Língua Espanhola": 5.1,
                "Língua Inglesa": 5.3,
                "Língua Portuguesa": 5.5,
                "Matemática": 4.7,
                "Metodologia do Trabalho Científico": 4.9,
                "Projeto de Vida": 5.1,
                "Química": 5.3,
                "Sociologia do Trabalho": 5.5,
                "Banco de Dados": 4.7,
                "Empreendedorismo": 4.9,
                "Fundamentos de Redes de Computadores": 5.1,
                "Programação Estruturada e Orientada a Objetos": 5.3,
                "Programação WEB 1": 5.5,
                "Programação WEB 2": 4.7
            },
            historicoIPA: [35, 45, 52, 58, 64, 68],
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
            ipa: 45,
            notas: {
                "Arte": 6.4,
                "Biologia": 6.6,
                "Educação Física": 6.8,
                "Filosofia": 7.0,
                "Física": 7.2,
                "Geografia": 6.4,
                "História": 6.6,
                "Língua Espanhola": 6.8,
                "Língua Inglesa": 7.0,
                "Língua Portuguesa": 7.2,
                "Matemática": 6.4,
                "Metodologia do Trabalho Científico": 6.6,
                "Projeto de Vida": 6.8,
                "Química": 7.0,
                "Sociologia do Trabalho": 7.2
            },
            historicoIPA: [22, 28, 34, 38, 42, 45],
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
            ipa: 78,
            notas: {
                "Arte": 3.9,
                "Biologia": 4.1,
                "Educação Física": 4.3,
                "Filosofia": 4.5,
                "Física": 4.7,
                "Geografia": 3.9,
                "História": 4.1,
                "Língua Espanhola": 4.3,
                "Língua Inglesa": 4.5,
                "Língua Portuguesa": 4.7,
                "Matemática": 3.9,
                "Metodologia do Trabalho Científico": 4.1,
                "Projeto de Vida": 4.3,
                "Química": 4.5,
                "Sociologia do Trabalho": 4.7
            },
            historicoIPA: [42, 52, 60, 66, 72, 78],
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
            ipa: 35,
            notas: {
                "Arte": 7.1,
                "Biologia": 7.3,
                "Educação Física": 7.5,
                "Filosofia": 7.7,
                "Física": 7.9,
                "Geografia": 7.1,
                "História": 7.3,
                "Língua Espanhola": 7.5,
                "Língua Inglesa": 7.7,
                "Língua Portuguesa": 7.9,
                "Matemática": 7.1,
                "Metodologia do Trabalho Científico": 7.3,
                "Projeto de Vida": 7.5,
                "Química": 7.7,
                "Sociologia do Trabalho": 7.9
            },
            historicoIPA: [18, 22, 26, 30, 32, 35],
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
            ipa: 55,
            notas: {
                "Arte": 5.6,
                "Biologia": 5.8,
                "Educação Física": 6.0,
                "Filosofia": 6.2,
                "Física": 6.4,
                "Geografia": 5.6,
                "História": 5.8,
                "Língua Espanhola": 6.0,
                "Língua Inglesa": 6.2,
                "Língua Portuguesa": 6.4,
                "Matemática": 5.6,
                "Metodologia do Trabalho Científico": 5.8,
                "Projeto de Vida": 6.0,
                "Química": 6.2,
                "Sociologia do Trabalho": 6.4,
                "Banco de Dados": 5.6,
                "Empreendedorismo": 5.8,
                "Fundamentos de Redes de Computadores": 6.0,
                "Programação Estruturada e Orientada a Objetos": 6.2,
                "Programação WEB 1": 6.4,
                "Programação WEB 2": 5.6
            },
            historicoIPA: [32, 38, 42, 48, 52, 55],
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
            ipa: 14,
            notas: {
                "Arte": 8.0,
                "Biologia": 8.2,
                "Educação Física": 8.4,
                "Filosofia": 8.6,
                "Física": 8.8,
                "Geografia": 8.0,
                "História": 8.2,
                "Língua Espanhola": 8.4,
                "Língua Inglesa": 8.6,
                "Língua Portuguesa": 8.8,
                "Matemática": 8.0,
                "Metodologia do Trabalho Científico": 8.2,
                "Projeto de Vida": 8.4,
                "Química": 8.6,
                "Sociologia do Trabalho": 8.8
            },
            historicoIPA: [20, 18, 17, 16, 15, 14],
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
            ipa: 58,
            notas: {
                "Arte": 5.4,
                "Biologia": 5.6,
                "Educação Física": 5.8,
                "Filosofia": 6.0,
                "Física": 6.2,
                "Geografia": 5.4,
                "História": 5.6,
                "Língua Espanhola": 5.8,
                "Língua Inglesa": 6.0,
                "Língua Portuguesa": 6.2,
                "Matemática": 5.4,
                "Metodologia do Trabalho Científico": 5.6,
                "Projeto de Vida": 5.8,
                "Química": 6.0,
                "Sociologia do Trabalho": 6.2
            },
            historicoIPA: [28, 36, 42, 48, 54, 58],
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
            ipa: 4,
            notas: {
                "Arte": 8.8,
                "Biologia": 9.0,
                "Educação Física": 9.2,
                "Filosofia": 9.4,
                "Física": 9.6,
                "Geografia": 8.8,
                "História": 9.0,
                "Língua Espanhola": 9.2,
                "Língua Inglesa": 9.4,
                "Língua Portuguesa": 9.6,
                "Matemática": 8.8,
                "Metodologia do Trabalho Científico": 9.0,
                "Projeto de Vida": 9.2,
                "Química": 9.4,
                "Sociologia do Trabalho": 9.6
            },
            historicoIPA: [8, 7, 6, 5, 5, 4],
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
            ipa: 42,
            notas: {
                "Arte": 6.1,
                "Biologia": 6.3,
                "Educação Física": 6.5,
                "Filosofia": 6.7,
                "Física": 6.9,
                "Geografia": 6.1,
                "História": 6.3,
                "Língua Espanhola": 6.5,
                "Língua Inglesa": 6.7,
                "Língua Portuguesa": 6.9,
                "Matemática": 6.1,
                "Metodologia do Trabalho Científico": 6.3,
                "Projeto de Vida": 6.5,
                "Química": 6.7,
                "Sociologia do Trabalho": 6.9
            },
            historicoIPA: [25, 30, 34, 37, 40, 42],
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
            ipa: 62,
            notas: {
                "Arte": 5.1,
                "Biologia": 5.3,
                "Educação Física": 5.5,
                "Filosofia": 5.7,
                "Física": 5.9,
                "Geografia": 5.1,
                "História": 5.3,
                "Língua Espanhola": 5.5,
                "Língua Inglesa": 5.7,
                "Língua Portuguesa": 5.9,
                "Matemática": 5.1,
                "Metodologia do Trabalho Científico": 5.3,
                "Projeto de Vida": 5.5,
                "Química": 5.7,
                "Sociologia do Trabalho": 5.9,
                "Banco de Dados": 5.1,
                "Empreendedorismo": 5.3,
                "Fundamentos de Redes de Computadores": 5.5,
                "Programação Estruturada e Orientada a Objetos": 5.7,
                "Programação WEB 1": 5.9,
                "Programação WEB 2": 5.1
            },
            historicoIPA: [30, 38, 45, 52, 58, 62],
            historicoMedia: [7.0, 6.5, 6.0, 5.7, 5.6, 5.5],
            historicoFrequencia: [82, 78, 74, 71, 69, 68],
            observacoes: "Aluno com histórico de queda acentuada. Dificuldades em Matemática e Português. Situação crítica que demanda intervenção imediata."
        },
        {
            id: 17,
            matricula: "2024017",
            senha: "1234",
            nome: "Vinícius Santos Lopes",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 8.9,
            frequencia: 96,
            ipa: 9,
            notas: {
                "Arte": 8.5,
                "Biologia": 8.7,
                "Educação Física": 8.9,
                "Filosofia": 9.1,
                "Física": 9.3,
                "Geografia": 8.5,
                "História": 8.7,
                "Língua Espanhola": 8.9,
                "Língua Inglesa": 9.1,
                "Língua Portuguesa": 9.3,
                "Matemática": 8.5,
                "Metodologia do Trabalho Científico": 8.7,
                "Projeto de Vida": 8.9,
                "Química": 9.1,
                "Sociologia do Trabalho": 9.3
            },
            historicoIPA: [14, 13, 12, 11, 10, 9],
            historicoMedia: [8.4, 8.5, 8.6, 8.7, 8.8, 8.9],
            historicoFrequencia: [93, 94, 94, 95, 95, 96],
            observacoes: "Aluno disciplinado e com ótimo desempenho. Participa ativamente das aulas e é referência de comportamento."
        },
        {
            id: 18,
            matricula: "2024018",
            senha: "1234",
            nome: "Isabela Ferreira Costa",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 7.6,
            frequencia: 88,
            ipa: 24,
            notas: {
                "Arte": 7.2,
                "Biologia": 7.4,
                "Educação Física": 7.6,
                "Filosofia": 7.8,
                "Física": 8.0,
                "Geografia": 7.2,
                "História": 7.4,
                "Língua Espanhola": 7.6,
                "Língua Inglesa": 7.8,
                "Língua Portuguesa": 8.0,
                "Matemática": 7.2,
                "Metodologia do Trabalho Científico": 7.4,
                "Projeto de Vida": 7.6,
                "Química": 7.8,
                "Sociologia do Trabalho": 8.0
            },
            historicoIPA: [20, 21, 22, 23, 23, 24],
            historicoMedia: [7.8, 7.7, 7.7, 7.6, 7.6, 7.6],
            historicoFrequencia: [92, 91, 90, 89, 88, 88],
            observacoes: "Desempenho satisfatório com leve tendência de queda. Monitorar para evitar agravamento."
        },
        {
            id: 19,
            matricula: "2024019",
            senha: "1234",
            nome: "Matheus Oliveira Ribeiro",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 4.7,
            frequencia: 58,
            ipa: 72,
            notas: {
                "Arte": 4.3,
                "Biologia": 4.5,
                "Educação Física": 4.7,
                "Filosofia": 4.9,
                "Física": 5.1,
                "Geografia": 4.3,
                "História": 4.5,
                "Língua Espanhola": 4.7,
                "Língua Inglesa": 4.9,
                "Língua Portuguesa": 5.1,
                "Matemática": 4.3,
                "Metodologia do Trabalho Científico": 4.5,
                "Projeto de Vida": 4.7,
                "Química": 4.9,
                "Sociologia do Trabalho": 5.1
            },
            historicoIPA: [40, 48, 56, 62, 68, 72],
            historicoMedia: [6.0, 5.6, 5.2, 5.0, 4.8, 4.7],
            historicoFrequencia: [74, 70, 66, 63, 60, 58],
            observacoes: "Situação crítica. Reprovação quase certa. Frequência e notas muito abaixo do exigido. Encaminhamento para Conselho de Classe urgente."
        },
        {
            id: 20,
            matricula: "2024020",
            senha: "1234",
            nome: "Larissa Mendes Albuquerque",
            turma: "Informática I",
            serie: "1º Ano",
            curso: "Informática",
            media: 9.3,
            frequencia: 99,
            ipa: 3,
            notas: {
                "Arte": 8.9,
                "Biologia": 9.1,
                "Educação Física": 9.3,
                "Filosofia": 9.5,
                "Física": 9.7,
                "Geografia": 8.9,
                "História": 9.1,
                "Língua Espanhola": 9.3,
                "Língua Inglesa": 9.5,
                "Língua Portuguesa": 9.7,
                "Matemática": 8.9,
                "Metodologia do Trabalho Científico": 9.1,
                "Projeto de Vida": 9.3,
                "Química": 9.5,
                "Sociologia do Trabalho": 9.7,
                "Banco de Dados": 8.9,
                "Empreendedorismo": 9.1,
                "Fundamentos de Redes de Computadores": 9.3,
                "Programação Estruturada e Orientada a Objetos": 9.5,
                "Programação WEB 1": 9.7,
                "Programação WEB 2": 8.9
            },
            historicoIPA: [7, 6, 5, 4, 4, 3],
            historicoMedia: [9.0, 9.1, 9.1, 9.2, 9.2, 9.3],
            historicoFrequencia: [97, 98, 98, 99, 99, 99],
            observacoes: "Aluna exemplar. Nota máxima em diversas avaliações. Frequência impecável. Líder da turma e monitora voluntária."
        },
        {
            id: 21,
            matricula: "2024021",
            senha: "1234",
            nome: "Rafael Augusto Campos",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 6.8,
            frequencia: 76,
            ipa: 46,
            notas: {
                "Arte": 6.4,
                "Biologia": 6.6,
                "Educação Física": 6.8,
                "Filosofia": 7.0,
                "Física": 7.2,
                "Geografia": 6.4,
                "História": 6.6,
                "Língua Espanhola": 6.8,
                "Língua Inglesa": 7.0,
                "Língua Portuguesa": 7.2,
                "Matemática": 6.4,
                "Metodologia do Trabalho Científico": 6.6,
                "Projeto de Vida": 6.8,
                "Química": 7.0,
                "Sociologia do Trabalho": 7.2
            },
            historicoIPA: [28, 34, 38, 42, 44, 46],
            historicoMedia: [7.4, 7.2, 7.0, 6.9, 6.8, 6.8],
            historicoFrequencia: [85, 82, 80, 78, 77, 76],
            observacoes: "Aluno em zona de atenção. Dificuldades em Matemática arrastam o desempenho geral. Reforço escolar recomendado."
        },
        {
            id: 22,
            matricula: "2024022",
            senha: "1234",
            nome: "Fernanda Lima dos Reis",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 8.2,
            frequencia: 92,
            ipa: 16,
            notas: {
                "Arte": 7.8,
                "Biologia": 8.0,
                "Educação Física": 8.2,
                "Filosofia": 8.4,
                "Física": 8.6,
                "Geografia": 7.8,
                "História": 8.0,
                "Língua Espanhola": 8.2,
                "Língua Inglesa": 8.4,
                "Língua Portuguesa": 8.6,
                "Matemática": 7.8,
                "Metodologia do Trabalho Científico": 8.0,
                "Projeto de Vida": 8.2,
                "Química": 8.4,
                "Sociologia do Trabalho": 8.6
            },
            historicoIPA: [22, 20, 19, 18, 17, 16],
            historicoMedia: [7.6, 7.7, 7.9, 8.0, 8.1, 8.2],
            historicoFrequencia: [88, 89, 90, 91, 91, 92],
            observacoes: "Aluna em constante evolução. Melhorou significativamente nas últimas avaliações. Continue acompanhando."
        },
        {
            id: 23,
            matricula: "2024023",
            senha: "1234",
            nome: "Lucas Gabriel Nascimento",
            turma: "Informática II",
            serie: "3º Ano",
            curso: "Informática",
            media: 7.1,
            frequencia: 82,
            ipa: 35,
            notas: {
                "Arte": 6.7,
                "Biologia": 6.9,
                "Educação Física": 7.1,
                "Filosofia": 7.3,
                "Física": 7.5,
                "Geografia": 6.7,
                "História": 6.9,
                "Língua Espanhola": 7.1,
                "Língua Inglesa": 7.3,
                "Língua Portuguesa": 7.5,
                "Matemática": 6.7,
                "Metodologia do Trabalho Científico": 6.9,
                "Projeto de Vida": 7.1,
                "Química": 7.3,
                "Sociologia do Trabalho": 7.5,
                "Banco de Dados": 6.7,
                "Empreendedorismo": 6.9,
                "Fundamentos de Redes de Computadores": 7.1,
                "Programação Estruturada e Orientada a Objetos": 7.3,
                "Programação WEB 1": 7.5,
                "Programação WEB 2": 6.7
            },
            historicoIPA: [25, 28, 30, 32, 34, 35],
            historicoMedia: [7.5, 7.4, 7.3, 7.2, 7.1, 7.1],
            historicoFrequencia: [88, 86, 85, 84, 83, 82],
            observacoes: "Aluno com desempenho mediano e leve tendência de queda. Acompanhar de perto nos próximos bimestres."
        },
        {
            id: 24,
            matricula: "2024024",
            senha: "1234",
            nome: "Camila Beatriz Tavares",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 8.6,
            frequencia: 94,
            ipa: 12,
            notas: {
                "Arte": 8.2,
                "Biologia": 8.4,
                "Educação Física": 8.6,
                "Filosofia": 8.8,
                "Física": 9.0,
                "Geografia": 8.2,
                "História": 8.4,
                "Língua Espanhola": 8.6,
                "Língua Inglesa": 8.8,
                "Língua Portuguesa": 9.0,
                "Matemática": 8.2,
                "Metodologia do Trabalho Científico": 8.4,
                "Projeto de Vida": 8.6,
                "Química": 8.8,
                "Sociologia do Trabalho": 9.0
            },
            historicoIPA: [18, 16, 15, 14, 13, 12],
            historicoMedia: [8.0, 8.2, 8.3, 8.4, 8.5, 8.6],
            historicoFrequencia: [90, 91, 92, 93, 93, 94],
            observacoes: "Aluna dedicada e com ótimo aproveitamento. Histórico de melhoria contínua. Exemplo para a turma."
        },
        {
            id: 25,
            matricula: "2024025",
            senha: "1234",
            nome: "Gabriel Henrique Martins",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 5.3,
            frequencia: 65,
            ipa: 64,
            notas: {
                "Arte": 4.9,
                "Biologia": 5.1,
                "Educação Física": 5.3,
                "Filosofia": 5.5,
                "Física": 5.7,
                "Geografia": 4.9,
                "História": 5.1,
                "Língua Espanhola": 5.3,
                "Língua Inglesa": 5.5,
                "Língua Portuguesa": 5.7,
                "Matemática": 4.9,
                "Metodologia do Trabalho Científico": 5.1,
                "Projeto de Vida": 5.3,
                "Química": 5.5,
                "Sociologia do Trabalho": 5.7
            },
            historicoIPA: [38, 45, 50, 56, 60, 64],
            historicoMedia: [6.5, 6.2, 5.9, 5.6, 5.4, 5.3],
            historicoFrequencia: [78, 74, 72, 69, 67, 65],
            observacoes: "Aluno em risco. Notas e frequência em declínio acentuado. Intervenção pedagógica urgente necessária."
        },
        {
            id: 26,
            matricula: "2024026",
            senha: "1234",
            nome: "Amanda Luísa Barbosa",
            turma: "Informática I",
            serie: "1º Ano",
            curso: "Informática",
            media: 7.8,
            frequencia: 87,
            ipa: 26,
            notas: {
                "Arte": 7.4,
                "Biologia": 7.6,
                "Educação Física": 7.8,
                "Filosofia": 8.0,
                "Física": 8.2,
                "Geografia": 7.4,
                "História": 7.6,
                "Língua Espanhola": 7.8,
                "Língua Inglesa": 8.0,
                "Língua Portuguesa": 8.2,
                "Matemática": 7.4,
                "Metodologia do Trabalho Científico": 7.6,
                "Projeto de Vida": 7.8,
                "Química": 8.0,
                "Sociologia do Trabalho": 8.2,
                "Banco de Dados": 7.4,
                "Empreendedorismo": 7.6,
                "Fundamentos de Redes de Computadores": 7.8,
                "Programação Estruturada e Orientada a Objetos": 8.0,
                "Programação WEB 1": 8.2,
                "Programação WEB 2": 7.4
            },
            historicoIPA: [30, 29, 28, 27, 27, 26],
            historicoMedia: [7.4, 7.5, 7.6, 7.7, 7.7, 7.8],
            historicoFrequencia: [84, 85, 85, 86, 86, 87],
            observacoes: "Aluna com desempenho regular e leve melhoria. Bom potencial, só precisa de mais consistência."
        },
        {
            id: 27,
            matricula: "2024027",
            senha: "1234",
            nome: "Thales Eduardo Moreira",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 6.4,
            frequencia: 74,
            ipa: 52,
            notas: {
                "Arte": 6.0,
                "Biologia": 6.2,
                "Educação Física": 6.4,
                "Filosofia": 6.6,
                "Física": 6.8,
                "Geografia": 6.0,
                "História": 6.2,
                "Língua Espanhola": 6.4,
                "Língua Inglesa": 6.6,
                "Língua Portuguesa": 6.8,
                "Matemática": 6.0,
                "Metodologia do Trabalho Científico": 6.2,
                "Projeto de Vida": 6.4,
                "Química": 6.6,
                "Sociologia do Trabalho": 6.8
            },
            historicoIPA: [35, 40, 44, 48, 50, 52],
            historicoMedia: [7.0, 6.8, 6.6, 6.5, 6.4, 6.4],
            historicoFrequencia: [82, 80, 78, 76, 75, 74],
            observacoes: "Aluno com dificuldades em disciplinas teóricas. Precisa de apoio pedagógico para reverter a tendência de queda."
        },
        {
            id: 28,
            matricula: "2024028",
            senha: "1234",
            nome: "Juliana Cristina Pires",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 9.0,
            frequencia: 97,
            ipa: 6,
            notas: {
                "Arte": 8.6,
                "Biologia": 8.8,
                "Educação Física": 9.0,
                "Filosofia": 9.2,
                "Física": 9.4,
                "Geografia": 8.6,
                "História": 8.8,
                "Língua Espanhola": 9.0,
                "Língua Inglesa": 9.2,
                "Língua Portuguesa": 9.4,
                "Matemática": 8.6,
                "Metodologia do Trabalho Científico": 8.8,
                "Projeto de Vida": 9.0,
                "Química": 9.2,
                "Sociologia do Trabalho": 9.4
            },
            historicoIPA: [12, 11, 10, 9, 7, 6],
            historicoMedia: [8.5, 8.6, 8.7, 8.8, 8.9, 9.0],
            historicoFrequencia: [94, 95, 95, 96, 96, 97],
            observacoes: "Excelente desempenho acadêmico e frequência exemplar. Aluna muito dedicada e comprometida."
        },
        {
            id: 29,
            matricula: "2024029",
            senha: "1234",
            nome: "Felipe da Silva Borges",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 5.9,
            frequencia: 69,
            ipa: 59,
            notas: {
                "Arte": 5.5,
                "Biologia": 5.7,
                "Educação Física": 5.9,
                "Filosofia": 6.1,
                "Física": 6.3,
                "Geografia": 5.5,
                "História": 5.7,
                "Língua Espanhola": 5.9,
                "Língua Inglesa": 6.1,
                "Língua Portuguesa": 6.3,
                "Matemática": 5.5,
                "Metodologia do Trabalho Científico": 5.7,
                "Projeto de Vida": 5.9,
                "Química": 6.1,
                "Sociologia do Trabalho": 6.3
            },
            historicoIPA: [32, 40, 45, 50, 55, 59],
            historicoMedia: [7.0, 6.6, 6.3, 6.1, 6.0, 5.9],
            historicoFrequencia: [82, 78, 75, 72, 70, 69],
            observacoes: "Aluno em situação de risco com queda consistente. Necessita acompanhamento pedagógico e conversa com responsáveis."
        },
        {
            id: 30,
            matricula: "2024030",
            senha: "1234",
            nome: "Raquel Cristina Moura",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 7.4,
            frequencia: 85,
            ipa: 30,
            notas: {
                "Arte": 7.0,
                "Biologia": 7.2,
                "Educação Física": 7.4,
                "Filosofia": 7.6,
                "Física": 7.8,
                "Geografia": 7.0,
                "História": 7.2,
                "Língua Espanhola": 7.4,
                "Língua Inglesa": 7.6,
                "Língua Portuguesa": 7.8,
                "Matemática": 7.0,
                "Metodologia do Trabalho Científico": 7.2,
                "Projeto de Vida": 7.4,
                "Química": 7.6,
                "Sociologia do Trabalho": 7.8
            },
            historicoIPA: [22, 24, 26, 28, 29, 30],
            historicoMedia: [7.8, 7.7, 7.6, 7.5, 7.4, 7.4],
            historicoFrequencia: [92, 90, 89, 87, 86, 85],
            observacoes: "Aluna com desempenho regular. Nota em Matemática precisa de atenção. Monitorar evolução."
        },
        {
            id: 31,
            matricula: "2024031",
            senha: "1234",
            nome: "André Luis Fernandes",
            turma: "Informática II",
            serie: "3º Ano",
            curso: "Informática",
            media: 8.3,
            frequencia: 91,
            ipa: 15,
            notas: {
                "Arte": 7.9,
                "Biologia": 8.1,
                "Educação Física": 8.3,
                "Filosofia": 8.5,
                "Física": 8.7,
                "Geografia": 7.9,
                "História": 8.1,
                "Língua Espanhola": 8.3,
                "Língua Inglesa": 8.5,
                "Língua Portuguesa": 8.7,
                "Matemática": 7.9,
                "Metodologia do Trabalho Científico": 8.1,
                "Projeto de Vida": 8.3,
                "Química": 8.5,
                "Sociologia do Trabalho": 8.7,
                "Banco de Dados": 7.9,
                "Empreendedorismo": 8.1,
                "Fundamentos de Redes de Computadores": 8.3,
                "Programação Estruturada e Orientada a Objetos": 8.5,
                "Programação WEB 1": 8.7,
                "Programação WEB 2": 7.9
            },
            historicoIPA: [22, 20, 18, 17, 16, 15],
            historicoMedia: [7.8, 7.9, 8.0, 8.1, 8.2, 8.3],
            historicoFrequencia: [86, 87, 88, 89, 90, 91],
            observacoes: "Aluno com desempenho bom e consistente. Evolução positiva nos últimos bimestres."
        },
        {
            id: 32,
            matricula: "2024032",
            senha: "1234",
            nome: "Bianca Souza Nogueira",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 7.0,
            frequencia: 80,
            ipa: 40,
            notas: {
                "Arte": 6.6,
                "Biologia": 6.8,
                "Educação Física": 7.0,
                "Filosofia": 7.2,
                "Física": 7.4,
                "Geografia": 6.6,
                "História": 6.8,
                "Língua Espanhola": 7.0,
                "Língua Inglesa": 7.2,
                "Língua Portuguesa": 7.4,
                "Matemática": 6.6,
                "Metodologia do Trabalho Científico": 6.8,
                "Projeto de Vida": 7.0,
                "Química": 7.2,
                "Sociologia do Trabalho": 7.4
            },
            historicoIPA: [28, 32, 35, 37, 38, 40],
            historicoMedia: [7.5, 7.3, 7.2, 7.1, 7.0, 7.0],
            historicoFrequencia: [88, 86, 84, 82, 81, 80],
            observacoes: "Aluna em zona de atenção. Tendência de queda precisa ser revertida. Acompanhar de perto."
        },
        {
            id: 33,
            matricula: "2024033",
            senha: "1234",
            nome: "Carlos Eduardo Ribeiro",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 8.5,
            frequencia: 93,
            ipa: 13,
            notas: {
                "Arte": 8.1,
                "Biologia": 8.3,
                "Educação Física": 8.5,
                "Filosofia": 8.7,
                "Física": 8.9,
                "Geografia": 8.1,
                "História": 8.3,
                "Língua Espanhola": 8.5,
                "Língua Inglesa": 8.7,
                "Língua Portuguesa": 8.9,
                "Matemática": 8.1,
                "Metodologia do Trabalho Científico": 8.3,
                "Projeto de Vida": 8.5,
                "Química": 8.7,
                "Sociologia do Trabalho": 8.9
            },
            historicoIPA: [18, 17, 16, 15, 14, 13],
            historicoMedia: [8.0, 8.1, 8.2, 8.3, 8.4, 8.5],
            historicoFrequencia: [90, 91, 91, 92, 92, 93],
            observacoes: "Aluno com desempenho sólido e em melhoria contínua. Excelente potencial."
        },
        {
            id: 34,
            matricula: "2024034",
            senha: "1234",
            nome: "Mariana Alves da Cunha",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 6.2,
            frequencia: 72,
            ipa: 54,
            notas: {
                "Arte": 5.8,
                "Biologia": 6.0,
                "Educação Física": 6.2,
                "Filosofia": 6.4,
                "Física": 6.6,
                "Geografia": 5.8,
                "História": 6.0,
                "Língua Espanhola": 6.2,
                "Língua Inglesa": 6.4,
                "Língua Portuguesa": 6.6,
                "Matemática": 5.8,
                "Metodologia do Trabalho Científico": 6.0,
                "Projeto de Vida": 6.2,
                "Química": 6.4,
                "Sociologia do Trabalho": 6.6
            },
            historicoIPA: [32, 38, 44, 48, 52, 54],
            historicoMedia: [7.0, 6.7, 6.5, 6.3, 6.2, 6.2],
            historicoFrequencia: [84, 80, 77, 75, 73, 72],
            observacoes: "Aluna com dificuldades em Matemática e Informática. Frequência e notas abaixo do esperado. Reforço escolar urgente."
        },
        {
            id: 35,
            matricula: "2024035",
            senha: "1234",
            nome: "Diego Fernando Pinto",
            turma: "Informática I",
            serie: "1º Ano",
            curso: "Informática",
            media: 7.5,
            frequencia: 86,
            ipa: 28,
            notas: {
                "Arte": 7.1,
                "Biologia": 7.3,
                "Educação Física": 7.5,
                "Filosofia": 7.7,
                "Física": 7.9,
                "Geografia": 7.1,
                "História": 7.3,
                "Língua Espanhola": 7.5,
                "Língua Inglesa": 7.7,
                "Língua Portuguesa": 7.9,
                "Matemática": 7.1,
                "Metodologia do Trabalho Científico": 7.3,
                "Projeto de Vida": 7.5,
                "Química": 7.7,
                "Sociologia do Trabalho": 7.9,
                "Banco de Dados": 7.1,
                "Empreendedorismo": 7.3,
                "Fundamentos de Redes de Computadores": 7.5,
                "Programação Estruturada e Orientada a Objetos": 7.7,
                "Programação WEB 1": 7.9,
                "Programação WEB 2": 7.1
            },
            historicoIPA: [32, 31, 30, 29, 29, 28],
            historicoMedia: [7.2, 7.3, 7.3, 7.4, 7.4, 7.5],
            historicoFrequencia: [82, 83, 84, 85, 85, 86],
            observacoes: "Aluno com desempenho mediano e leve tendência de melhoria. Manter acompanhamento."
        },
        {
            id: 36,
            matricula: "2024036",
            senha: "1234",
            nome: "Patrícia Helena Gomes",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 9.4,
            frequencia: 98,
            ipa: 4,
            notas: {
                "Arte": 9.0,
                "Biologia": 9.2,
                "Educação Física": 9.4,
                "Filosofia": 9.6,
                "Física": 9.8,
                "Geografia": 9.0,
                "História": 9.2,
                "Língua Espanhola": 9.4,
                "Língua Inglesa": 9.6,
                "Língua Portuguesa": 9.8,
                "Matemática": 9.0,
                "Metodologia do Trabalho Científico": 9.2,
                "Projeto de Vida": 9.4,
                "Química": 9.6,
                "Sociologia do Trabalho": 9.8
            },
            historicoIPA: [8, 7, 6, 5, 5, 4],
            historicoMedia: [9.0, 9.1, 9.2, 9.3, 9.3, 9.4],
            historicoFrequencia: [96, 97, 97, 98, 98, 98],
            observacoes: "Aluna de excelência. Melhor desempenho da turma. Referência acadêmica e comportamental."
        },
        {
            id: 37,
            matricula: "2024037",
            senha: "1234",
            nome: "Rodrigo César Machado",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 5.6,
            frequencia: 66,
            ipa: 63,
            notas: {
                "Arte": 5.2,
                "Biologia": 5.4,
                "Educação Física": 5.6,
                "Filosofia": 5.8,
                "Física": 6.0,
                "Geografia": 5.2,
                "História": 5.4,
                "Língua Espanhola": 5.6,
                "Língua Inglesa": 5.8,
                "Língua Portuguesa": 6.0,
                "Matemática": 5.2,
                "Metodologia do Trabalho Científico": 5.4,
                "Projeto de Vida": 5.6,
                "Química": 5.8,
                "Sociologia do Trabalho": 6.0
            },
            historicoIPA: [38, 45, 50, 56, 60, 63],
            historicoMedia: [6.5, 6.2, 5.9, 5.7, 5.6, 5.6],
            historicoFrequencia: [80, 76, 72, 70, 68, 66],
            observacoes: "Aluno em risco. Queda acentuada no desempenho e na frequência. Ação pedagógica urgente."
        },
        {
            id: 38,
            matricula: "2024038",
            senha: "1234",
            nome: "Tatiane Regina Lopes",
            turma: "Informática II",
            serie: "3º Ano",
            curso: "Informática",
            media: 8.0,
            frequencia: 90,
            ipa: 20,
            notas: {
                "Arte": 7.6,
                "Biologia": 7.8,
                "Educação Física": 8.0,
                "Filosofia": 8.2,
                "Física": 8.4,
                "Geografia": 7.6,
                "História": 7.8,
                "Língua Espanhola": 8.0,
                "Língua Inglesa": 8.2,
                "Língua Portuguesa": 8.4,
                "Matemática": 7.6,
                "Metodologia do Trabalho Científico": 7.8,
                "Projeto de Vida": 8.0,
                "Química": 8.2,
                "Sociologia do Trabalho": 8.4,
                "Banco de Dados": 7.6,
                "Empreendedorismo": 7.8,
                "Fundamentos de Redes de Computadores": 8.0,
                "Programação Estruturada e Orientada a Objetos": 8.2,
                "Programação WEB 1": 8.4,
                "Programação WEB 2": 7.6
            },
            historicoIPA: [25, 24, 23, 22, 21, 20],
            historicoMedia: [7.5, 7.6, 7.7, 7.8, 7.9, 8.0],
            historicoFrequencia: [86, 87, 88, 89, 89, 90],
            observacoes: "Aluna em evolução consistente. Demonstra interesse e dedicação nas atividades."
        },
        {
            id: 39,
            matricula: "2024039",
            senha: "1234",
            nome: "Eduardo José Miranda",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 7.3,
            frequencia: 83,
            ipa: 33,
            notas: {
                "Arte": 6.9,
                "Biologia": 7.1,
                "Educação Física": 7.3,
                "Filosofia": 7.5,
                "Física": 7.7,
                "Geografia": 6.9,
                "História": 7.1,
                "Língua Espanhola": 7.3,
                "Língua Inglesa": 7.5,
                "Língua Portuguesa": 7.7,
                "Matemática": 6.9,
                "Metodologia do Trabalho Científico": 7.1,
                "Projeto de Vida": 7.3,
                "Química": 7.5,
                "Sociologia do Trabalho": 7.7
            },
            historicoIPA: [26, 28, 30, 31, 32, 33],
            historicoMedia: [7.5, 7.4, 7.4, 7.3, 7.3, 7.3],
            historicoFrequencia: [88, 87, 86, 85, 84, 83],
            observacoes: "Aluno com desempenho estável mas abaixo do potencial. Precisa de motivação para se dedicar mais."
        },
        {
            id: 40,
            matricula: "2024040",
            senha: "1234",
            nome: "Vanessa Cristiane Duarte",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 8.7,
            frequencia: 95,
            ipa: 10,
            notas: {
                "Arte": 8.3,
                "Biologia": 8.5,
                "Educação Física": 8.7,
                "Filosofia": 8.9,
                "Física": 9.1,
                "Geografia": 8.3,
                "História": 8.5,
                "Língua Espanhola": 8.7,
                "Língua Inglesa": 8.9,
                "Língua Portuguesa": 9.1,
                "Matemática": 8.3,
                "Metodologia do Trabalho Científico": 8.5,
                "Projeto de Vida": 8.7,
                "Química": 8.9,
                "Sociologia do Trabalho": 9.1
            },
            historicoIPA: [16, 14, 13, 12, 11, 10],
            historicoMedia: [8.2, 8.3, 8.4, 8.5, 8.6, 8.7],
            historicoFrequencia: [92, 93, 93, 94, 94, 95],
            observacoes: "Aluna dedicada e com ótimo aproveitamento. Destaque em Matemática e Ciências."
        },
        {
            id: 41,
            matricula: "2024041",
            senha: "1234",
            nome: "Bruno Leonardo Cavalcanti",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 6.1,
            frequencia: 71,
            ipa: 56,
            notas: {
                "Arte": 5.7,
                "Biologia": 5.9,
                "Educação Física": 6.1,
                "Filosofia": 6.3,
                "Física": 6.5,
                "Geografia": 5.7,
                "História": 5.9,
                "Língua Espanhola": 6.1,
                "Língua Inglesa": 6.3,
                "Língua Portuguesa": 6.5,
                "Matemática": 5.7,
                "Metodologia do Trabalho Científico": 5.9,
                "Projeto de Vida": 6.1,
                "Química": 6.3,
                "Sociologia do Trabalho": 6.5
            },
            historicoIPA: [38, 42, 46, 50, 53, 56],
            historicoMedia: [6.8, 6.5, 6.3, 6.2, 6.1, 6.1],
            historicoFrequencia: [80, 77, 75, 73, 72, 71],
            observacoes: "Aluno com dificuldades de aprendizagem. Frequência e notas abaixo do esperado. Necessita apoio pedagógico."
        },
        {
            id: 42,
            matricula: "2024042",
            senha: "1234",
            nome: "Letícia Priscila Teixeira",
            turma: "Informática I",
            serie: "1º Ano",
            curso: "Informática",
            media: 8.4,
            frequencia: 92,
            ipa: 14,
            notas: {
                "Arte": 8.0,
                "Biologia": 8.2,
                "Educação Física": 8.4,
                "Filosofia": 8.6,
                "Física": 8.8,
                "Geografia": 8.0,
                "História": 8.2,
                "Língua Espanhola": 8.4,
                "Língua Inglesa": 8.6,
                "Língua Portuguesa": 8.8,
                "Matemática": 8.0,
                "Metodologia do Trabalho Científico": 8.2,
                "Projeto de Vida": 8.4,
                "Química": 8.6,
                "Sociologia do Trabalho": 8.8,
                "Banco de Dados": 8.0,
                "Empreendedorismo": 8.2,
                "Fundamentos de Redes de Computadores": 8.4,
                "Programação Estruturada e Orientada a Objetos": 8.6,
                "Programação WEB 1": 8.8,
                "Programação WEB 2": 8.0
            },
            historicoIPA: [20, 18, 17, 16, 15, 14],
            historicoMedia: [7.9, 8.0, 8.1, 8.2, 8.3, 8.4],
            historicoFrequencia: [88, 89, 90, 91, 91, 92],
            observacoes: "Aluna com bom desempenho e evolução positiva. Demonstrado interesse pela área de Informática."
        },
        {
            id: 43,
            matricula: "2024043",
            senha: "1234",
            nome: "Paulo Ricardo Teles",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 4.9,
            frequencia: 60,
            ipa: 70,
            notas: {
                "Arte": 4.5,
                "Biologia": 4.7,
                "Educação Física": 4.9,
                "Filosofia": 5.1,
                "Física": 5.3,
                "Geografia": 4.5,
                "História": 4.7,
                "Língua Espanhola": 4.9,
                "Língua Inglesa": 5.1,
                "Língua Portuguesa": 5.3,
                "Matemática": 4.5,
                "Metodologia do Trabalho Científico": 4.7,
                "Projeto de Vida": 4.9,
                "Química": 5.1,
                "Sociologia do Trabalho": 5.3
            },
            historicoIPA: [42, 50, 56, 62, 66, 70],
            historicoMedia: [6.2, 5.8, 5.4, 5.2, 5.0, 4.9],
            historicoFrequencia: [75, 70, 67, 64, 62, 60],
            observacoes: "Aluno em situação crítica. Múltiplas disciplinas com nota abaixo de 5. Frequência insuficiente. Encaminhamento urgente para Conselho de Classe."
        },
        {
            id: 44,
            matricula: "2024044",
            senha: "1234",
            nome: "Carolina Beatriz Rezende",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 7.8,
            frequencia: 88,
            ipa: 23,
            notas: {
                "Arte": 7.4,
                "Biologia": 7.6,
                "Educação Física": 7.8,
                "Filosofia": 8.0,
                "Física": 8.2,
                "Geografia": 7.4,
                "História": 7.6,
                "Língua Espanhola": 7.8,
                "Língua Inglesa": 8.0,
                "Língua Portuguesa": 8.2,
                "Matemática": 7.4,
                "Metodologia do Trabalho Científico": 7.6,
                "Projeto de Vida": 7.8,
                "Química": 8.0,
                "Sociologia do Trabalho": 8.2
            },
            historicoIPA: [28, 27, 26, 25, 24, 23],
            historicoMedia: [7.4, 7.5, 7.6, 7.7, 7.7, 7.8],
            historicoFrequencia: [84, 85, 86, 87, 87, 88],
            observacoes: "Aluna com desempenho bom e melhoria gradual. Boa participação nas atividades escolares."
        },
        {
            id: 45,
            matricula: "2024045",
            senha: "1234",
            nome: "Fábio Augusto Neves",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 6.6,
            frequencia: 77,
            ipa: 44,
            notas: {
                "Arte": 6.2,
                "Biologia": 6.4,
                "Educação Física": 6.6,
                "Filosofia": 6.8,
                "Física": 7.0,
                "Geografia": 6.2,
                "História": 6.4,
                "Língua Espanhola": 6.6,
                "Língua Inglesa": 6.8,
                "Língua Portuguesa": 7.0,
                "Matemática": 6.2,
                "Metodologia do Trabalho Científico": 6.4,
                "Projeto de Vida": 6.6,
                "Química": 6.8,
                "Sociologia do Trabalho": 7.0
            },
            historicoIPA: [30, 34, 38, 40, 42, 44],
            historicoMedia: [7.2, 7.0, 6.8, 6.7, 6.6, 6.6],
            historicoFrequencia: [85, 82, 80, 79, 78, 77],
            observacoes: "Aluno em zona de atenção. Queda leve mas constante. Reforço escolar em Matemática recomendado."
        },
        {
            id: 46,
            matricula: "2024046",
            senha: "1234",
            nome: "Ana Carolina Duarte Lima",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 9.1,
            frequencia: 97,
            ipa: 7,
            notas: {
                "Arte": 8.7,
                "Biologia": 8.9,
                "Educação Física": 9.1,
                "Filosofia": 9.3,
                "Física": 9.5,
                "Geografia": 8.7,
                "História": 8.9,
                "Língua Espanhola": 9.1,
                "Língua Inglesa": 9.3,
                "Língua Portuguesa": 9.5,
                "Matemática": 8.7,
                "Metodologia do Trabalho Científico": 8.9,
                "Projeto de Vida": 9.1,
                "Química": 9.3,
                "Sociologia do Trabalho": 9.5
            },
            historicoIPA: [12, 11, 10, 9, 8, 7],
            historicoMedia: [8.6, 8.7, 8.8, 8.9, 9.0, 9.1],
            historicoFrequencia: [95, 95, 96, 96, 97, 97],
            observacoes: "Aluna exemplar. Notas altas e frequência impecável. Líder da turma."
        },
        {
            id: 47,
            matricula: "2024047",
            senha: "1234",
            nome: "Renato Oliveira da Cruz",
            turma: "Informática II",
            serie: "3º Ano",
            curso: "Informática",
            media: 5.2,
            frequencia: 63,
            ipa: 67,
            notas: {
                "Arte": 4.8,
                "Biologia": 5.0,
                "Educação Física": 5.2,
                "Filosofia": 5.4,
                "Física": 5.6,
                "Geografia": 4.8,
                "História": 5.0,
                "Língua Espanhola": 5.2,
                "Língua Inglesa": 5.4,
                "Língua Portuguesa": 5.6,
                "Matemática": 4.8,
                "Metodologia do Trabalho Científico": 5.0,
                "Projeto de Vida": 5.2,
                "Química": 5.4,
                "Sociologia do Trabalho": 5.6,
                "Banco de Dados": 4.8,
                "Empreendedorismo": 5.0,
                "Fundamentos de Redes de Computadores": 5.2,
                "Programação Estruturada e Orientada a Objetos": 5.4,
                "Programação WEB 1": 5.6,
                "Programação WEB 2": 4.8
            },
            historicoIPA: [38, 45, 52, 58, 63, 67],
            historicoMedia: [6.5, 6.0, 5.7, 5.4, 5.3, 5.2],
            historicoFrequencia: [78, 74, 70, 67, 65, 63],
            observacoes: "Aluno em risco crítico. Notas e frequência muito baixas. Intervenção imediata necessária."
        },
        {
            id: 48,
            matricula: "2024048",
            senha: "1234",
            nome: "Sofia Mariana Pacheco",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 7.7,
            frequencia: 89,
            ipa: 22,
            notas: {
                "Arte": 7.3,
                "Biologia": 7.5,
                "Educação Física": 7.7,
                "Filosofia": 7.9,
                "Física": 8.1,
                "Geografia": 7.3,
                "História": 7.5,
                "Língua Espanhola": 7.7,
                "Língua Inglesa": 7.9,
                "Língua Portuguesa": 8.1,
                "Matemática": 7.3,
                "Metodologia do Trabalho Científico": 7.5,
                "Projeto de Vida": 7.7,
                "Química": 7.9,
                "Sociologia do Trabalho": 8.1
            },
            historicoIPA: [28, 26, 25, 24, 23, 22],
            historicoMedia: [7.3, 7.4, 7.5, 7.6, 7.6, 7.7],
            historicoFrequencia: [85, 86, 87, 88, 88, 89],
            observacoes: "Aluna com desempenho bom e evolução positiva. Destaque em Ciências e Ed. Física."
        },
        {
            id: 49,
            matricula: "2024049",
            senha: "1234",
            nome: "Matheus Henrique Campos",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 6.7,
            frequencia: 75,
            ipa: 48,
            notas: {
                "Arte": 6.3,
                "Biologia": 6.5,
                "Educação Física": 6.7,
                "Filosofia": 6.9,
                "Física": 7.1,
                "Geografia": 6.3,
                "História": 6.5,
                "Língua Espanhola": 6.7,
                "Língua Inglesa": 6.9,
                "Língua Portuguesa": 7.1,
                "Matemática": 6.3,
                "Metodologia do Trabalho Científico": 6.5,
                "Projeto de Vida": 6.7,
                "Química": 6.9,
                "Sociologia do Trabalho": 7.1
            },
            historicoIPA: [30, 36, 40, 44, 46, 48],
            historicoMedia: [7.2, 7.0, 6.8, 6.7, 6.7, 6.7],
            historicoFrequencia: [84, 80, 78, 77, 76, 75],
            observacoes: "Aluno em situação de atenção. Queda gradual no desempenho. Precisa de acompanhamento pedagógico."
        },
        {
            id: 50,
            matricula: "2024050",
            senha: "1234",
            nome: "Isabela Cristina Faria",
            turma: "Informática I",
            serie: "1º Ano",
            curso: "Informática",
            media: 7.2,
            frequencia: 84,
            ipa: 34,
            notas: {
                "Arte": 6.8,
                "Biologia": 7.0,
                "Educação Física": 7.2,
                "Filosofia": 7.4,
                "Física": 7.6,
                "Geografia": 6.8,
                "História": 7.0,
                "Língua Espanhola": 7.2,
                "Língua Inglesa": 7.4,
                "Língua Portuguesa": 7.6,
                "Matemática": 6.8,
                "Metodologia do Trabalho Científico": 7.0,
                "Projeto de Vida": 7.2,
                "Química": 7.4,
                "Sociologia do Trabalho": 7.6,
                "Banco de Dados": 6.8,
                "Empreendedorismo": 7.0,
                "Fundamentos de Redes de Computadores": 7.2,
                "Programação Estruturada e Orientada a Objetos": 7.4,
                "Programação WEB 1": 7.6,
                "Programação WEB 2": 6.8
            },
            historicoIPA: [28, 30, 32, 33, 33, 34],
            historicoMedia: [7.5, 7.4, 7.3, 7.2, 7.2, 7.2],
            historicoFrequencia: [90, 88, 87, 86, 85, 84],
            observacoes: "Aluna com desempenho mediano. Frequência em leve queda. Monitorar nos próximos bimestres."
        },
        {
            id: 51,
            matricula: "2024051",
            senha: "1234",
            nome: "Gustavo Pereira Melo",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 8.1,
            frequencia: 91,
            ipa: 17,
            notas: {
                "Arte": 7.7,
                "Biologia": 7.9,
                "Educação Física": 8.1,
                "Filosofia": 8.3,
                "Física": 8.5,
                "Geografia": 7.7,
                "História": 7.9,
                "Língua Espanhola": 8.1,
                "Língua Inglesa": 8.3,
                "Língua Portuguesa": 8.5,
                "Matemática": 7.7,
                "Metodologia do Trabalho Científico": 7.9,
                "Projeto de Vida": 8.1,
                "Química": 8.3,
                "Sociologia do Trabalho": 8.5
            },
            historicoIPA: [22, 21, 20, 19, 18, 17],
            historicoMedia: [7.6, 7.7, 7.8, 7.9, 8.0, 8.1],
            historicoFrequencia: [87, 88, 89, 90, 90, 91],
            observacoes: "Aluno com desempenho bom e evolução constante. Interesse genuíno pelo aprendizado."
        },
        {
            id: 52,
            matricula: "2024052",
            senha: "1234",
            nome: "Aline Cristina dos Santos",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 5.4,
            frequencia: 64,
            ipa: 65,
            notas: {
                "Arte": 5.0,
                "Biologia": 5.2,
                "Educação Física": 5.4,
                "Filosofia": 5.6,
                "Física": 5.8,
                "Geografia": 5.0,
                "História": 5.2,
                "Língua Espanhola": 5.4,
                "Língua Inglesa": 5.6,
                "Língua Portuguesa": 5.8,
                "Matemática": 5.0,
                "Metodologia do Trabalho Científico": 5.2,
                "Projeto de Vida": 5.4,
                "Química": 5.6,
                "Sociologia do Trabalho": 5.8
            },
            historicoIPA: [38, 45, 52, 58, 62, 65],
            historicoMedia: [6.5, 6.0, 5.7, 5.5, 5.4, 5.4],
            historicoFrequencia: [78, 74, 70, 68, 66, 64],
            observacoes: "Aluna em risco. Queda acentuada no desempenho. Frequência alarmante. Ação urgente necessária."
        },
        {
            id: 53,
            matricula: "2024053",
            senha: "1234",
            nome: "Ricardo Henrique Freitas",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 8.8,
            frequencia: 95,
            ipa: 9,
            notas: {
                "Arte": 8.4,
                "Biologia": 8.6,
                "Educação Física": 8.8,
                "Filosofia": 9.0,
                "Física": 9.2,
                "Geografia": 8.4,
                "História": 8.6,
                "Língua Espanhola": 8.8,
                "Língua Inglesa": 9.0,
                "Língua Portuguesa": 9.2,
                "Matemática": 8.4,
                "Metodologia do Trabalho Científico": 8.6,
                "Projeto de Vida": 8.8,
                "Química": 9.0,
                "Sociologia do Trabalho": 9.2
            },
            historicoIPA: [14, 13, 12, 11, 10, 9],
            historicoMedia: [8.3, 8.4, 8.5, 8.6, 8.7, 8.8],
            historicoFrequencia: [92, 93, 93, 94, 94, 95],
            observacoes: "Aluno dedicado e com excelente desempenho. Referência de comportamento e estudo na turma."
        },
        {
            id: 54,
            matricula: "2024054",
            senha: "1234",
            nome: "Juliana Campos Ribeiro",
            turma: "Informática II",
            serie: "3º Ano",
            curso: "Informática",
            media: 7.6,
            frequencia: 87,
            ipa: 27,
            notas: {
                "Arte": 7.2,
                "Biologia": 7.4,
                "Educação Física": 7.6,
                "Filosofia": 7.8,
                "Física": 8.0,
                "Geografia": 7.2,
                "História": 7.4,
                "Língua Espanhola": 7.6,
                "Língua Inglesa": 7.8,
                "Língua Portuguesa": 8.0,
                "Matemática": 7.2,
                "Metodologia do Trabalho Científico": 7.4,
                "Projeto de Vida": 7.6,
                "Química": 7.8,
                "Sociologia do Trabalho": 8.0,
                "Banco de Dados": 7.2,
                "Empreendedorismo": 7.4,
                "Fundamentos de Redes de Computadores": 7.6,
                "Programação Estruturada e Orientada a Objetos": 7.8,
                "Programação WEB 1": 8.0,
                "Programação WEB 2": 7.2
            },
            historicoIPA: [30, 29, 28, 28, 27, 27],
            historicoMedia: [7.2, 7.3, 7.4, 7.5, 7.5, 7.6],
            historicoFrequencia: [83, 84, 85, 86, 86, 87],
            observacoes: "Aluna com desempenho mediano-bom. Evolução lenta mas positiva. Manter acompanhamento."
        },
        {
            id: 55,
            matricula: "2024055",
            senha: "1234",
            nome: "Fernando Augusto Marques",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 6.3,
            frequencia: 73,
            ipa: 53,
            notas: {
                "Arte": 5.9,
                "Biologia": 6.1,
                "Educação Física": 6.3,
                "Filosofia": 6.5,
                "Física": 6.7,
                "Geografia": 5.9,
                "História": 6.1,
                "Língua Espanhola": 6.3,
                "Língua Inglesa": 6.5,
                "Língua Portuguesa": 6.7,
                "Matemática": 5.9,
                "Metodologia do Trabalho Científico": 6.1,
                "Projeto de Vida": 6.3,
                "Química": 6.5,
                "Sociologia do Trabalho": 6.7
            },
            historicoIPA: [35, 40, 45, 48, 51, 53],
            historicoMedia: [7.0, 6.7, 6.5, 6.4, 6.3, 6.3],
            historicoFrequencia: [82, 79, 77, 75, 74, 73],
            observacoes: "Aluno em zona de atenção. Dificuldades em Matemática impactam o desempenho geral. Reforço recomendado."
        },
        {
            id: 56,
            matricula: "2024056",
            senha: "1234",
            nome: "Patrícia Souza Moreira",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 7.9,
            frequencia: 90,
            ipa: 19,
            notas: {
                "Arte": 7.5,
                "Biologia": 7.7,
                "Educação Física": 7.9,
                "Filosofia": 8.1,
                "Física": 8.3,
                "Geografia": 7.5,
                "História": 7.7,
                "Língua Espanhola": 7.9,
                "Língua Inglesa": 8.1,
                "Língua Portuguesa": 8.3,
                "Matemática": 7.5,
                "Metodologia do Trabalho Científico": 7.7,
                "Projeto de Vida": 7.9,
                "Química": 8.1,
                "Sociologia do Trabalho": 8.3
            },
            historicoIPA: [24, 23, 22, 21, 20, 19],
            historicoMedia: [7.5, 7.6, 7.7, 7.8, 7.8, 7.9],
            historicoFrequencia: [87, 88, 88, 89, 89, 90],
            observacoes: "Aluna com bom desempenho e evolução positiva. Destaque em Ciências."
        },
        {
            id: 57,
            matricula: "2024057",
            senha: "1234",
            nome: "Daniel Ribeiro Alencar",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 5.0,
            frequencia: 61,
            ipa: 69,
            notas: {
                "Arte": 4.6,
                "Biologia": 4.8,
                "Educação Física": 5.0,
                "Filosofia": 5.2,
                "Física": 5.4,
                "Geografia": 4.6,
                "História": 4.8,
                "Língua Espanhola": 5.0,
                "Língua Inglesa": 5.2,
                "Língua Portuguesa": 5.4,
                "Matemática": 4.6,
                "Metodologia do Trabalho Científico": 4.8,
                "Projeto de Vida": 5.0,
                "Química": 5.2,
                "Sociologia do Trabalho": 5.4
            },
            historicoIPA: [40, 48, 55, 62, 66, 69],
            historicoMedia: [6.5, 6.0, 5.5, 5.2, 5.1, 5.0],
            historicoFrequencia: [76, 72, 68, 65, 63, 61],
            observacoes: "Aluno em situação crítica. Notas muito abaixo da média. Frequência alarmante. Intervenção imediata."
        },
        {
            id: 58,
            matricula: "2024058",
            senha: "1234",
            nome: "Bianca Oliveira Nascimento",
            turma: "Informática I",
            serie: "1º Ano",
            curso: "Informática",
            media: 9.0,
            frequencia: 96,
            ipa: 8,
            notas: {
                "Arte": 8.6,
                "Biologia": 8.8,
                "Educação Física": 9.0,
                "Filosofia": 9.2,
                "Física": 9.4,
                "Geografia": 8.6,
                "História": 8.8,
                "Língua Espanhola": 9.0,
                "Língua Inglesa": 9.2,
                "Língua Portuguesa": 9.4,
                "Matemática": 8.6,
                "Metodologia do Trabalho Científico": 8.8,
                "Projeto de Vida": 9.0,
                "Química": 9.2,
                "Sociologia do Trabalho": 9.4,
                "Banco de Dados": 8.6,
                "Empreendedorismo": 8.8,
                "Fundamentos de Redes de Computadores": 9.0,
                "Programação Estruturada e Orientada a Objetos": 9.2,
                "Programação WEB 1": 9.4,
                "Programação WEB 2": 8.6
            },
            historicoIPA: [14, 12, 11, 10, 9, 8],
            historicoMedia: [8.5, 8.6, 8.7, 8.8, 8.9, 9.0],
            historicoFrequencia: [93, 94, 94, 95, 95, 96],
            observacoes: "Aluna de excelência. Notas altas e frequência exemplar. Referência para a turma."
        },
        {
            id: 59,
            matricula: "2024059",
            senha: "1234",
            nome: "Lucas Felipe Araújo",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 7.1,
            frequencia: 82,
            ipa: 36,
            notas: {
                "Arte": 6.7,
                "Biologia": 6.9,
                "Educação Física": 7.1,
                "Filosofia": 7.3,
                "Física": 7.5,
                "Geografia": 6.7,
                "História": 6.9,
                "Língua Espanhola": 7.1,
                "Língua Inglesa": 7.3,
                "Língua Portuguesa": 7.5,
                "Matemática": 6.7,
                "Metodologia do Trabalho Científico": 6.9,
                "Projeto de Vida": 7.1,
                "Química": 7.3,
                "Sociologia do Trabalho": 7.5
            },
            historicoIPA: [28, 30, 32, 34, 35, 36],
            historicoMedia: [7.5, 7.4, 7.3, 7.2, 7.1, 7.1],
            historicoFrequencia: [88, 86, 85, 84, 83, 82],
            observacoes: "Aluno com desempenho mediano. Queda leve mas constante. Acompanhar evolução."
        },
        {
            id: 60,
            matricula: "2024060",
            senha: "1234",
            nome: "Amanda Raquel Correia",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 8.6,
            frequencia: 94,
            ipa: 11,
            notas: {
                "Arte": 8.2,
                "Biologia": 8.4,
                "Educação Física": 8.6,
                "Filosofia": 8.8,
                "Física": 9.0,
                "Geografia": 8.2,
                "História": 8.4,
                "Língua Espanhola": 8.6,
                "Língua Inglesa": 8.8,
                "Língua Portuguesa": 9.0,
                "Matemática": 8.2,
                "Metodologia do Trabalho Científico": 8.4,
                "Projeto de Vida": 8.6,
                "Química": 8.8,
                "Sociologia do Trabalho": 9.0
            },
            historicoIPA: [18, 16, 14, 13, 12, 11],
            historicoMedia: [8.0, 8.2, 8.3, 8.4, 8.5, 8.6],
            historicoFrequencia: [90, 91, 92, 93, 93, 94],
            observacoes: "Aluna dedicada e com ótimo aproveitamento. Evolução constante nas avaliações."
        },
        {
            id: 61,
            matricula: "2024061",
            senha: "1234",
            nome: "Carlos Eduardo Lima",
            turma: "Informática II",
            serie: "3º Ano",
            curso: "Informática",
            media: 6.9,
            frequencia: 79,
            ipa: 42,
            notas: {
                "Arte": 6.5,
                "Biologia": 6.7,
                "Educação Física": 6.9,
                "Filosofia": 7.1,
                "Física": 7.3,
                "Geografia": 6.5,
                "História": 6.7,
                "Língua Espanhola": 6.9,
                "Língua Inglesa": 7.1,
                "Língua Portuguesa": 7.3,
                "Matemática": 6.5,
                "Metodologia do Trabalho Científico": 6.7,
                "Projeto de Vida": 6.9,
                "Química": 7.1,
                "Sociologia do Trabalho": 7.3,
                "Banco de Dados": 6.5,
                "Empreendedorismo": 6.7,
                "Fundamentos de Redes de Computadores": 6.9,
                "Programação Estruturada e Orientada a Objetos": 7.1,
                "Programação WEB 1": 7.3,
                "Programação WEB 2": 6.5
            },
            historicoIPA: [28, 32, 35, 38, 40, 42],
            historicoMedia: [7.4, 7.2, 7.1, 7.0, 6.9, 6.9],
            historicoFrequencia: [86, 84, 82, 81, 80, 79],
            observacoes: "Aluno em zona de atenção. Queda progressiva no desempenho. Necessita acompanhamento."
        },
        {
            id: 62,
            matricula: "2024062",
            senha: "1234",
            nome: "Letícia Helena Cavalcante",
            turma: "3º Ano A",
            serie: "3º Ano",
            curso: "Regular",
            media: 7.5,
            frequencia: 86,
            ipa: 29,
            notas: {
                "Arte": 7.1,
                "Biologia": 7.3,
                "Educação Física": 7.5,
                "Filosofia": 7.7,
                "Física": 7.9,
                "Geografia": 7.1,
                "História": 7.3,
                "Língua Espanhola": 7.5,
                "Língua Inglesa": 7.7,
                "Língua Portuguesa": 7.9,
                "Matemática": 7.1,
                "Metodologia do Trabalho Científico": 7.3,
                "Projeto de Vida": 7.5,
                "Química": 7.7,
                "Sociologia do Trabalho": 7.9
            },
            historicoIPA: [22, 24, 26, 27, 28, 29],
            historicoMedia: [7.8, 7.7, 7.6, 7.5, 7.5, 7.5],
            historicoFrequencia: [90, 89, 88, 87, 87, 86],
            observacoes: "Aluna com desempenho mediano. Dificuldades em Matemática. Reforço escolar recomendado."
        },
        {
            id: 63,
            matricula: "2024063",
            senha: "1234",
            nome: "Gabriel Santos Moura",
            turma: "2º Ano A",
            serie: "2º Ano",
            curso: "Regular",
            media: 9.2,
            frequencia: 97,
            ipa: 5,
            notas: {
                "Arte": 8.8,
                "Biologia": 9.0,
                "Educação Física": 9.2,
                "Filosofia": 9.4,
                "Física": 9.6,
                "Geografia": 8.8,
                "História": 9.0,
                "Língua Espanhola": 9.2,
                "Língua Inglesa": 9.4,
                "Língua Portuguesa": 9.6,
                "Matemática": 8.8,
                "Metodologia do Trabalho Científico": 9.0,
                "Projeto de Vida": 9.2,
                "Química": 9.4,
                "Sociologia do Trabalho": 9.6
            },
            historicoIPA: [10, 9, 8, 7, 6, 5],
            historicoMedia: [8.7, 8.8, 8.9, 9.0, 9.1, 9.2],
            historicoFrequencia: [95, 96, 96, 97, 97, 97],
            observacoes: "Aluno de excelência. Melhor desempenho da turma. Referência acadêmica."
        },
        {
            id: 64,
            matricula: "2024064",
            senha: "1234",
            nome: "Mariana Duarte Costa",
            turma: "Informática I",
            serie: "1º Ano",
            curso: "Informática",
            media: 6.4,
            frequencia: 74,
            ipa: 51,
            notas: {
                "Arte": 6.0,
                "Biologia": 6.2,
                "Educação Física": 6.4,
                "Filosofia": 6.6,
                "Física": 6.8,
                "Geografia": 6.0,
                "História": 6.2,
                "Língua Espanhola": 6.4,
                "Língua Inglesa": 6.6,
                "Língua Portuguesa": 6.8,
                "Matemática": 6.0,
                "Metodologia do Trabalho Científico": 6.2,
                "Projeto de Vida": 6.4,
                "Química": 6.6,
                "Sociologia do Trabalho": 6.8,
                "Banco de Dados": 6.0,
                "Empreendedorismo": 6.2,
                "Fundamentos de Redes de Computadores": 6.4,
                "Programação Estruturada e Orientada a Objetos": 6.6,
                "Programação WEB 1": 6.8,
                "Programação WEB 2": 6.0
            },
            historicoIPA: [35, 40, 44, 48, 50, 51],
            historicoMedia: [7.0, 6.8, 6.6, 6.5, 6.4, 6.4],
            historicoFrequencia: [82, 79, 77, 76, 75, 74],
            observacoes: "Aluna com dificuldades em disciplinas básicas. Frequência abaixo do esperado. Apoio pedagógico necessário."
        },
        {
            id: 65,
            matricula: "2024065",
            senha: "1234",
            nome: "Eduardo Nascimento Reis",
            turma: "1º Ano A",
            serie: "1º Ano",
            curso: "Regular",
            media: 7.4,
            frequencia: 85,
            ipa: 31,
            notas: {
                "Arte": 7.0,
                "Biologia": 7.2,
                "Educação Física": 7.4,
                "Filosofia": 7.6,
                "Física": 7.8,
                "Geografia": 7.0,
                "História": 7.2,
                "Língua Espanhola": 7.4,
                "Língua Inglesa": 7.6,
                "Língua Portuguesa": 7.8,
                "Matemática": 7.0,
                "Metodologia do Trabalho Científico": 7.2,
                "Projeto de Vida": 7.4,
                "Química": 7.6,
                "Sociologia do Trabalho": 7.8
            },
            historicoIPA: [26, 28, 29, 30, 30, 31],
            historicoMedia: [7.6, 7.5, 7.5, 7.4, 7.4, 7.4],
            historicoFrequencia: [89, 88, 87, 86, 86, 85],
            observacoes: "Aluno com desempenho mediano-estável. Boa participação nas atividades."
        },
        {
            id: 66,
            matricula: "2024066",
            senha: "1234",
            nome: "Vanessa Cristina Lopes",
            turma: "2º Ano B",
            serie: "2º Ano",
            curso: "Regular",
            media: 4.5,
            frequencia: 57,
            ipa: 75,
            notas: {
                "Arte": 4.1,
                "Biologia": 4.3,
                "Educação Física": 4.5,
                "Filosofia": 4.7,
                "Física": 4.9,
                "Geografia": 4.1,
                "História": 4.3,
                "Língua Espanhola": 4.5,
                "Língua Inglesa": 4.7,
                "Língua Portuguesa": 4.9,
                "Matemática": 4.1,
                "Metodologia do Trabalho Científico": 4.3,
                "Projeto de Vida": 4.5,
                "Química": 4.7,
                "Sociologia do Trabalho": 4.9
            },
            historicoIPA: [45, 52, 58, 65, 70, 75],
            historicoMedia: [6.0, 5.5, 5.0, 4.8, 4.6, 4.5],
            historicoFrequencia: [72, 67, 63, 60, 58, 57],
            observacoes: "Situação gravíssima. Reprovação quase certa. Frequência e notas criticamente baixas. Encaminhamento urgente para Conselho de Classe e assistência social."
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
    if (ipa >= 70) return { classe: "red", texto: "Alta necessidade de acompanhamento" };
    if (ipa >= 40) return { classe: "yellow", texto: "Necessidade moderada" };
    return { classe: "green", texto: "Baixa necessidade de acompanhamento" };
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

// ---------- Contas de coordenação ----------
function getCoordenadores() {
    const dados = carregarDados();
    if (!Array.isArray(dados.coordenadores)) {
        dados.coordenadores = [];
        salvarDados(dados);
    }
    return dados.coordenadores;
}

function getCoordenadorPorEmail(email) {
    return getCoordenadores().find(c => c.email.toLowerCase() === String(email).toLowerCase().trim());
}

function adicionarCoordenador(campos) {
    const dados = carregarDados();
    if (!Array.isArray(dados.coordenadores)) dados.coordenadores = [];
    const email = String(campos.email).trim().toLowerCase();
    if (dados.coordenadores.some(c => c.email.toLowerCase() === email)) {
        return null;
    }
    const conta = {
        nome: campos.nome.trim(),
        email,
        senha: campos.senha
    };
    dados.coordenadores.push(conta);
    salvarDados(dados);
    return conta;
}

// ---------- Cadastro de alunos ----------
function proximaMatricula(alunos) {
    const base = new Date().getFullYear();
    const maxSeq = (alunos || []).reduce((max, a) => {
        const m = String(a.matricula || "").match(/(\d{4})(\d{3,})$/);
        if (m && Number(m[1]) === base) return Math.max(max, Number(m[2]));
        return max;
    }, 0);
    return `${base}${String(maxSeq + 1).padStart(3, "0")}`;
}

function notasPadrao(curso) {
    const base = {
        "Arte": 7.0,
        "Biologia": 7.0,
        "Educação Física": 7.0,
        "Filosofia": 7.0,
        "Física": 7.0,
        "Geografia": 7.0,
        "História": 7.0,
        "Língua Espanhola": 7.0,
        "Língua Inglesa": 7.0,
        "Língua Portuguesa": 7.0,
        "Matemática": 7.0,
        "Metodologia do Trabalho Científico": 7.0,
        "Projeto de Vida": 7.0,
        "Química": 7.0,
        "Sociologia do Trabalho": 7.0
    };
    if (curso === "Informática") {
        base["Banco de Dados"] = 7.0;
        base["Empreendedorismo"] = 7.0;
        base["Fundamentos de Redes de Computadores"] = 7.0;
        base["Programação Estruturada e Orientada a Objetos"] = 7.0;
        base["Programação WEB 1"] = 7.0;
        base["Programação WEB 2"] = 7.0;
    }
    return base;
}

function adicionarAluno(campos) {
    const dados = carregarDados();
    if (!Array.isArray(dados.alunos)) dados.alunos = [];
    const alunos = dados.alunos;
    const maxId = alunos.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0);
    const id = maxId + 1;
    const matricula = campos.matricula || proximaMatricula(alunos);

    const aluno = {
        id,
        matricula,
        senha: campos.senha,
        nome: campos.nome.trim(),
        turma: campos.turma ? campos.turma.trim() : "Não definida",
        serie: campos.serie || "",
        curso: campos.curso || "Regular",
        media: 7.0,
        frequencia: 100,
        ipa: 20,
        notas: notasPadrao(campos.curso || "Regular"),
        historicoIPA: [20, 20, 20, 20, 20, 20],
        historicoMedia: [7.0, 7.0, 7.0, 7.0, 7.0, 7.0],
        historicoFrequencia: [100, 100, 100, 100, 100, 100],
        observacoes: "Conta criada pelo estudante. Acompanhamento inicial em andamento."
    };

    if (campos.email) aluno.email = campos.email.trim();

    alunos.push(aluno);
    salvarDados(dados);
    return aluno;
}

// ---------- Turmas ----------
function getTurmas() {
    const turmas = Array.from(new Set(getAlunos().map(a => a.turma)));
    return turmas.filter(Boolean);
}

// ---------- Avisos ----------
function getAvisos() {
    const dados = carregarDados();
    if (!Array.isArray(dados.avisos)) {
        dados.avisos = [];
        salvarDados(dados);
    }
    return dados.avisos;
}

function chaveUsuario(sessao) {
    if (!sessao) return null;
    if (sessao.tipo === "aluno") return `aluno:${sessao.referencia}`;
    return `coord:${String(sessao.referencia).toLowerCase()}`;
}

function getAvisosParaUsuario(sessao) {
    const avisos = getAvisos();
    const aluno = sessao && sessao.tipo === "aluno" ? getAlunoPorId(sessao.referencia) : null;
    const turmaAluno = aluno ? aluno.turma : null;

    return avisos.filter(a => {
        if (sessao && sessao.tipo !== "aluno") return true; // coordenação vê tudo
        return !a.turma || a.turma === turmaAluno;
    }).sort((a, b) => new Date(b.data) - new Date(a.data));
}

function adicionarAviso(campos, sessao) {
    const dados = carregarDados();
    if (!Array.isArray(dados.avisos)) dados.avisos = [];
    const id = dados.avisos.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0) + 1;
    const aviso = {
        id,
        titulo: campos.titulo.trim(),
        texto: campos.texto.trim(),
        autor: (sessao && sessao.tipo === "aluno")
            ? "Aluno"
            : "Coordenação Pedagógica",
        data: new Date().toISOString(),
        turma: campos.turma || null,
        lidoPor: []
    };
    dados.avisos.push(aviso);
    salvarDados(dados);
    return aviso;
}

function removerAviso(id) {
    const dados = carregarDados();
    if (!Array.isArray(dados.avisos)) return;
    dados.avisos = dados.avisos.filter(a => Number(a.id) !== Number(id));
    salvarDados(dados);
}

function marcarAvisoLido(id, sessao) {
    const chave = chaveUsuario(sessao);
    if (!chave) return;
    const dados = carregarDados();
    const aviso = (dados.avisos || []).find(a => Number(a.id) === Number(id));
    if (!aviso) return;
    if (!Array.isArray(aviso.lidoPor)) aviso.lidoPor = [];
    if (!aviso.lidoPor.includes(chave)) {
        aviso.lidoPor.push(chave);
        salvarDados(dados);
    }
}

function marcarTodosAvisosLidos(sessao) {
    const chave = chaveUsuario(sessao);
    if (!chave) return;
    const dados = carregarDados();
    (dados.avisos || []).forEach(a => {
        if (!Array.isArray(a.lidoPor)) a.lidoPor = [];
        if (!a.lidoPor.includes(chave)) a.lidoPor.push(chave);
    });
    salvarDados(dados);
}

function contarAvisosNaoLidos(sessao) {
    if (!sessao) return 0;
    const visiveis = getAvisosParaUsuario(sessao);
    const chave = chaveUsuario(sessao);
    return visiveis.filter(a => !Array.isArray(a.lidoPor) || !a.lidoPor.includes(chave)).length;
}

// ---------- Chat das turmas ----------
function getChats() {
    const dados = carregarDados();
    if (!dados.chats || typeof dados.chats !== "object") {
        dados.chats = {};
        salvarDados(dados);
    }
    return dados.chats;
}

function getMensagensChat(turma) {
    const chats = getChats();
    return Array.isArray(chats[turma]) ? chats[turma] : [];
}

function enviarMensagemChat(campos) {
    const dados = carregarDados();
    if (!dados.chats || typeof dados.chats !== "object") dados.chats = {};
    if (!Array.isArray(dados.chats[campos.turma])) dados.chats[campos.turma] = [];

    const id = dados.chats[campos.turma].reduce((m, m2) => Math.max(m, Number(m2.id) || 0), 0) + 1;
    const msg = {
        id,
        autorTipo: campos.autorTipo,
        autorNome: campos.autorNome,
        autorRef: campos.autorRef || null,
        texto: campos.texto.trim(),
        data: new Date().toISOString()
    };
    dados.chats[campos.turma].push(msg);
    salvarDados(dados);
    return msg;
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
