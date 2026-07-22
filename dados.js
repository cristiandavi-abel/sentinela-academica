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
            ipa: 91,
            notas: {
                "Português": 9.0,
                "Matemática": 8.7,
                "História": 9.1,
                "Ciências": 8.8,
                "Ed. Física": 9.2,
                "Informática": 8.6
            },
            historicoIPA: [86, 87, 88, 89, 90, 91],
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
            ipa: 76,
            notas: {
                "Português": 7.5,
                "Matemática": 7.0,
                "História": 8.0,
                "Ciências": 7.4,
                "Ed. Física": 8.2,
                "Informática": 7.5
            },
            historicoIPA: [80, 79, 78, 77, 77, 76],
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
            ipa: 28,
            notas: {
                "Português": 4.5,
                "Matemática": 3.8,
                "História": 5.0,
                "Ciências": 4.2,
                "Ed. Física": 6.0,
                "Informática": 4.8
            },
            historicoIPA: [60, 52, 44, 38, 32, 28],
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
            ipa: 97,
            notas: {
                "Português": 9.2,
                "Matemática": 9.5,
                "História": 9.0,
                "Ciências": 9.4,
                "Ed. Física": 9.6,
                "Informática": 9.1
            },
            historicoIPA: [93, 94, 95, 96, 96, 97],
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
            ipa: 54,
            notas: {
                "Português": 6.5,
                "Matemática": 5.5,
                "História": 7.2,
                "Ciências": 6.8,
                "Ed. Física": 7.8,
                "Informática": 7.0
            },
            historicoIPA: [72, 66, 62, 58, 56, 54],
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
            ipa: 84,
            notas: {
                "Português": 8.0,
                "Matemática": 8.5,
                "História": 7.8,
                "Ciências": 8.3,
                "Ed. Física": 8.8,
                "Informática": 7.9
            },
            historicoIPA: [78, 80, 81, 82, 83, 84],
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
            ipa: 65,
            notas: {
                "Português": 6.8,
                "Matemática": 6.5,
                "História": 7.5,
                "Ciências": 7.0,
                "Ed. Física": 8.0,
                "Informática": 6.8
            },
            historicoIPA: [75, 72, 70, 68, 66, 65],
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
            ipa: 88,
            notas: {
                "Português": 8.8,
                "Matemática": 8.2,
                "História": 9.0,
                "Ciências": 8.5,
                "Ed. Física": 9.0,
                "Informática": 8.1
            },
            historicoIPA: [82, 84, 85, 86, 87, 88],
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
            ipa: 36,
            notas: {
                "Português": 5.0,
                "Matemática": 4.2,
                "História": 5.8,
                "Ciências": 5.0,
                "Ed. Física": 6.5,
                "Informática": 5.3
            },
            historicoIPA: [62, 55, 50, 44, 40, 36],
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
            ipa: 74,
            notas: {
                "Português": 7.5,
                "Matemática": 7.8,
                "História": 7.2,
                "Ciências": 8.0,
                "Ed. Física": 8.5,
                "Informática": 7.8
            },
            historicoIPA: [70, 71, 72, 73, 73, 74],
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
            ipa: 48,
            notas: {
                "Português": 6.0,
                "Matemática": 5.5,
                "História": 6.8,
                "Ciências": 6.2,
                "Ed. Física": 7.5,
                "Informática": 6.4
            },
            historicoIPA: [65, 60, 56, 52, 50, 48],
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
            ipa: 94,
            notas: {
                "Português": 9.2,
                "Matemática": 8.8,
                "História": 9.1,
                "Ciências": 9.0,
                "Ed. Física": 9.5,
                "Informática": 8.4
            },
            historicoIPA: [88, 89, 90, 91, 93, 94],
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
            ipa: 41,
            notas: {
                "Português": 5.5,
                "Matemática": 4.8,
                "História": 6.2,
                "Ciências": 5.8,
                "Ed. Física": 7.2,
                "Informática": 6.0
            },
            historicoIPA: [68, 60, 55, 50, 45, 41],
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
            ipa: 70,
            notas: {
                "Português": 7.5,
                "Matemática": 6.5,
                "História": 7.8,
                "Ciências": 7.2,
                "Ed. Física": 8.2,
                "Informática": 7.2
            },
            historicoIPA: [78, 76, 74, 72, 71, 70],
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
            ipa: 85,
            notas: {
                "Português": 8.0,
                "Matemática": 8.5,
                "História": 8.0,
                "Ciências": 8.2,
                "Ed. Física": 9.0,
                "Informática": 8.1
            },
            historicoIPA: [78, 80, 82, 83, 84, 85],
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
            ipa: 60,
            notas: {
                "Português": 7.2,
                "Matemática": 6.0,
                "História": 7.5,
                "Ciências": 6.8,
                "Ed. Física": 7.8,
                "Informática": 6.7
            },
            historicoIPA: [72, 68, 65, 63, 62, 60],
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
            ipa: 87,
            notas: {
                "Português": 8.3,
                "Matemática": 8.8,
                "História": 8.2,
                "Ciências": 8.6,
                "Ed. Física": 9.0,
                "Informática": 8.1
            },
            historicoIPA: [82, 83, 84, 85, 86, 87],
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
            ipa: 46,
            notas: {
                "Português": 6.5,
                "Matemática": 5.0,
                "História": 6.8,
                "Ciências": 6.0,
                "Ed. Física": 7.5,
                "Informática": 5.4
            },
            historicoIPA: [68, 62, 56, 52, 48, 46],
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
            ipa: 72,
            notas: {
                "Português": 7.0,
                "Matemática": 7.8,
                "História": 7.2,
                "Ciências": 7.5,
                "Ed. Física": 8.2,
                "Informática": 7.3
            },
            historicoIPA: [68, 69, 70, 71, 71, 72],
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
            ipa: 96,
            notas: {
                "Português": 9.5,
                "Matemática": 9.2,
                "História": 9.6,
                "Ciências": 9.3,
                "Ed. Física": 9.7,
                "Informática": 9.1
            },
            historicoIPA: [92, 93, 94, 95, 95, 96],
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
            ipa: 37,
            notas: {
                "Português": 5.5,
                "Matemática": 4.5,
                "História": 6.0,
                "Ciências": 5.2,
                "Ed. Física": 6.8,
                "Informática": 5.7
            },
            historicoIPA: [62, 55, 50, 44, 40, 37],
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
            ipa: 80,
            notas: {
                "Português": 7.8,
                "Matemática": 8.2,
                "História": 7.5,
                "Ciências": 8.0,
                "Ed. Física": 8.8,
                "Informática": 7.7
            },
            historicoIPA: [75, 76, 77, 78, 79, 80],
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
            ipa: 67,
            notas: {
                "Português": 7.0,
                "Matemática": 6.8,
                "História": 7.5,
                "Ciências": 7.2,
                "Ed. Física": 8.0,
                "Informática": 7.3
            },
            historicoIPA: [74, 72, 70, 69, 68, 67],
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
            ipa: 90,
            notas: {
                "Português": 8.5,
                "Matemática": 9.0,
                "História": 8.3,
                "Ciências": 8.8,
                "Ed. Física": 9.2,
                "Informática": 8.4
            },
            historicoIPA: [84, 86, 87, 88, 89, 90],
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
            ipa: 44,
            notas: {
                "Português": 5.8,
                "Matemática": 5.0,
                "História": 6.5,
                "Ciências": 6.0,
                "Ed. Física": 7.2,
                "Informática": 6.1
            },
            historicoIPA: [62, 58, 54, 50, 47, 44],
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
            ipa: 86,
            notas: {
                "Português": 8.2,
                "Matemática": 8.6,
                "História": 8.0,
                "Ciências": 8.5,
                "Ed. Física": 9.0,
                "Informática": 8.1
            },
            historicoIPA: [80, 82, 83, 84, 85, 86],
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
            ipa: 30,
            notas: {
                "Português": 4.5,
                "Matemática": 3.8,
                "História": 5.2,
                "Ciências": 4.8,
                "Ed. Física": 6.2,
                "Informática": 5.0
            },
            historicoIPA: [58, 50, 44, 38, 34, 30],
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
            ipa: 77,
            notas: {
                "Português": 8.0,
                "Matemática": 7.2,
                "História": 8.2,
                "Ciências": 7.6,
                "Ed. Física": 8.5,
                "Informática": 7.3
            },
            historicoIPA: [72, 73, 74, 75, 76, 77],
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
            ipa: 56,
            notas: {
                "Português": 6.2,
                "Matemática": 5.5,
                "História": 7.0,
                "Ciências": 6.5,
                "Ed. Física": 7.5,
                "Informática": 6.9
            },
            historicoIPA: [70, 66, 62, 60, 58, 56],
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
            ipa: 93,
            notas: {
                "Português": 9.3,
                "Matemática": 8.8,
                "História": 9.2,
                "Ciências": 9.0,
                "Ed. Física": 9.5,
                "Informática": 8.7
            },
            historicoIPA: [88, 89, 90, 91, 92, 93],
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
            ipa: 33,
            notas: {
                "Português": 5.0,
                "Matemática": 4.0,
                "História": 5.5,
                "Ciências": 5.0,
                "Ed. Física": 6.5,
                "Informática": 5.2
            },
            historicoIPA: [62, 55, 48, 42, 37, 33],
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
            ipa: 78,
            notas: {
                "Português": 7.5,
                "Matemática": 7.8,
                "História": 7.2,
                "Ciências": 7.8,
                "Ed. Física": 8.5,
                "Informática": 7.5
            },
            historicoIPA: [72, 74, 75, 76, 77, 78],
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
            ipa: 52,
            notas: {
                "Português": 6.5,
                "Matemática": 5.5,
                "História": 7.0,
                "Ciências": 6.5,
                "Ed. Física": 7.8,
                "Informática": 6.9
            },
            historicoIPA: [70, 64, 60, 56, 54, 52],
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
            ipa: 66,
            notas: {
                "Português": 7.0,
                "Matemática": 6.5,
                "História": 7.5,
                "Ciências": 7.0,
                "Ed. Física": 8.0,
                "Informática": 7.2
            },
            historicoIPA: [72, 70, 68, 67, 67, 66],
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
            ipa: 83,
            notas: {
                "Português": 8.0,
                "Matemática": 8.2,
                "História": 7.8,
                "Ciências": 8.3,
                "Ed. Física": 8.8,
                "Informática": 7.4
            },
            historicoIPA: [78, 79, 80, 81, 82, 83],
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
            ipa: 35,
            notas: {
                "Português": 5.0,
                "Matemática": 4.2,
                "História": 5.8,
                "Ciências": 5.2,
                "Ed. Física": 6.5,
                "Informática": 5.7
            },
            historicoIPA: [62, 55, 48, 42, 38, 35],
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
            ipa: 91,
            notas: {
                "Português": 9.0,
                "Matemática": 8.5,
                "História": 8.8,
                "Ciências": 8.7,
                "Ed. Física": 9.2,
                "Informática": 8.6
            },
            historicoIPA: [86, 87, 88, 89, 90, 91],
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
            ipa: 73,
            notas: {
                "Português": 7.5,
                "Matemática": 7.0,
                "História": 7.8,
                "Ciências": 7.5,
                "Ed. Física": 8.5,
                "Informática": 7.2
            },
            historicoIPA: [70, 71, 72, 72, 73, 73],
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
            ipa: 47,
            notas: {
                "Português": 6.0,
                "Matemática": 5.2,
                "História": 6.8,
                "Ciências": 6.0,
                "Ed. Física": 7.5,
                "Informática": 6.3
            },
            historicoIPA: [65, 60, 55, 52, 49, 47],
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
            ipa: 81,
            notas: {
                "Português": 7.8,
                "Matemática": 8.0,
                "História": 7.5,
                "Ciências": 8.2,
                "Ed. Física": 8.5,
                "Informática": 7.4
            },
            historicoIPA: [76, 77, 78, 79, 80, 81],
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
            ipa: 31,
            notas: {
                "Português": 4.8,
                "Matemática": 3.5,
                "História": 5.5,
                "Ciências": 4.8,
                "Ed. Física": 6.2,
                "Informática": 5.2
            },
            historicoIPA: [60, 52, 45, 38, 34, 31],
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
            ipa: 92,
            notas: {
                "Português": 9.0,
                "Matemática": 9.2,
                "História": 8.8,
                "Ciências": 9.1,
                "Ed. Física": 9.4,
                "Informática": 8.5
            },
            historicoIPA: [86, 88, 89, 90, 91, 92],
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
            ipa: 64,
            notas: {
                "Português": 7.0,
                "Matemática": 6.2,
                "História": 7.5,
                "Ciências": 7.0,
                "Ed. Física": 8.0,
                "Informática": 6.8
            },
            historicoIPA: [72, 70, 68, 66, 65, 64],
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
            ipa: 89,
            notas: {
                "Português": 8.5,
                "Matemática": 8.8,
                "História": 8.2,
                "Ciências": 8.7,
                "Ed. Física": 9.2,
                "Informática": 8.2
            },
            historicoIPA: [82, 84, 86, 87, 88, 89],
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
            ipa: 58,
            notas: {
                "Português": 6.5,
                "Matemática": 6.0,
                "História": 7.2,
                "Ciências": 6.8,
                "Ed. Física": 8.0,
                "Informática": 6.9
            },
            historicoIPA: [72, 68, 65, 62, 60, 58],
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
            ipa: 71,
            notas: {
                "Português": 7.8,
                "Matemática": 6.5,
                "História": 8.0,
                "Ciências": 7.2,
                "Ed. Física": 8.5,
                "Informática": 7.0
            },
            historicoIPA: [78, 76, 74, 73, 72, 71],
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
            ipa: 95,
            notas: {
                "Português": 9.0,
                "Matemática": 9.5,
                "História": 8.8,
                "Ciências": 9.3,
                "Ed. Física": 9.6,
                "Informática": 9.0
            },
            historicoIPA: [90, 91, 92, 93, 94, 95],
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
            ipa: 49,
            notas: {
                "Português": 6.0,
                "Matemática": 5.5,
                "História": 6.8,
                "Ciências": 6.2,
                "Ed. Física": 7.5,
                "Informática": 6.4
            },
            historicoIPA: [65, 60, 56, 52, 50, 49],
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
            ipa: 69,
            notas: {
                "Português": 7.2,
                "Matemática": 6.8,
                "História": 7.5,
                "Ciências": 7.0,
                "Ed. Física": 8.2,
                "Informática": 7.6
            },
            historicoIPA: [74, 72, 71, 70, 70, 69],
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
            ipa: 25,
            notas: {
                "Português": 4.0,
                "Matemática": 3.2,
                "História": 5.0,
                "Ciências": 4.5,
                "Ed. Física": 5.8,
                "Informática": 4.5
            },
            historicoIPA: [55, 48, 42, 35, 30, 25],
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
