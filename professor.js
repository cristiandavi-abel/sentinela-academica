// ==========================================
// SENTINELA ACADÊMICA
// Área do Professor
// ==========================================

const sessao = protegerPagina("professor");
if (sessao) {
    const prof = getProfessorPorId(sessao.referencia);
    if (!prof) { encerrarSessao(); }
    else {
        App.initSidebar("notas", "professor");
        const sub = document.getElementById("subProfessor");
        if (sub) sub.textContent = `${prof.nome} • ${prof.disciplinas.join(", ")}`;

        function mediaBim(arr) {
            const a = Array.isArray(arr) ? arr : [arr];
            return a.reduce((s, v) => s + v, 0) / a.length;
        }

        function atualizarDisciplinasDoAluno() {
            const alunoId = document.getElementById("selectAluno").value;
            const aluno = getAlunoPorId(alunoId);
            const selDisc = document.getElementById("selectDisciplina");
            selDisc.innerHTML = "";
            if (!aluno) return;
            const discs = prof.disciplinas.filter(d => Object.prototype.hasOwnProperty.call(aluno.notas, d));
            discs.forEach(d => {
                const opt = document.createElement("option");
                opt.value = d; opt.textContent = d;
                selDisc.appendChild(opt);
            });
            if (discs.length === 0) {
                const opt = document.createElement("option");
                opt.textContent = "Sem disciplinas atribuídas";
                selDisc.appendChild(opt);
            }
        }

        function carregarAlunos() {
            const sel = document.getElementById("selectAluno");
            sel.innerHTML = "";
            getAlunos().forEach(a => {
                const opt = document.createElement("option");
                opt.value = a.id;
                opt.textContent = `${a.nome} (${a.turma})`;
                sel.appendChild(opt);
            });
            atualizarDisciplinasDoAluno();
        }

        function renderTabela() {
            const tbody = document.getElementById("tabelaProfessor");
            if (!tbody) return;
            const rows = [];
            getAlunos().forEach(a => {
                prof.disciplinas.forEach(d => {
                    if (!Object.prototype.hasOwnProperty.call(a.notas, d)) return;
                    const bims = Array.isArray(a.notas[d]) ? a.notas[d] : [a.notas[d]];
                    const m = mediaBim(bims);
                    rows.push(`
                        <tr>
                            <td>${a.nome}</td>
                            <td>${a.turma}</td>
                            <td>${d}</td>
                            ${bims.map(b => `<td>${Number(b).toFixed(1)}</td>`).join("")}
                            <td><strong>${m.toFixed(1)}</strong></td>
                        </tr>
                    `);
                });
            });
            tbody.innerHTML = rows.join("") || `<tr><td colspan="8">Nenhum aluno.</td></tr>`;
        }

        carregarAlunos();
        document.getElementById("selectAluno").addEventListener("change", atualizarDisciplinasDoAluno);
        renderTabela();

        document.getElementById("formNota").addEventListener("submit", (e) => {
            e.preventDefault();
            const alunoId = document.getElementById("selectAluno").value;
            const disc = document.getElementById("selectDisciplina").value;
            const bim = Number(document.getElementById("selectBimestre").value);
            const nota = parseFloat(document.getElementById("inputNota").value);
            if (isNaN(nota) || nota < 0 || nota > 10) {
                const msg = document.getElementById("msgNota");
                msg.textContent = "Informe uma nota entre 0 e 10.";
                msg.style.color = "#EF4444";
                return;
            }
            const aluno = getAlunoPorId(alunoId);
            if (!aluno || !Object.prototype.hasOwnProperty.call(aluno.notas, disc)) return;
            const novas = {};
            Object.keys(aluno.notas).forEach(k => {
                novas[k] = Array.isArray(aluno.notas[k]) ? [...aluno.notas[k]] : [aluno.notas[k]];
            });
            if (!Array.isArray(novas[disc])) novas[disc] = [0,0,0,0];
            while (novas[disc].length < 4) novas[disc].push(0);
            novas[disc][bim - 1] = nota;
            atualizarAluno(alunoId, { notas: novas });
            const msg = document.getElementById("msgNota");
            msg.textContent = "Nota salva com sucesso!";
            msg.style.color = "#14B8A6";
            renderTabela();
            atualizarGraficos();
        });

        // ==========================================
        // SISTEMA DE GRÁFICOS DO PROFESSOR
        // ==========================================

        const TIPOS_GRAFICO = {
            notasDisciplina: { titulo: "Minhas Disciplinas", tipo: "bar" },
            desempenhoAlunos: { titulo: "Desempenho dos Alunos", tipo: "bar" },
            distribuicaoNotas: { titulo: "Distribuição de Notas", tipo: "doughnut" },
            frequenciaAlunos: { titulo: "Frequência dos Alunos", tipo: "bar" }
        };

        let chartPrincipal = null;
        let chartComparacao = null;

        function getAlunosDoProfessor() {
            return getAlunos().filter(a =>
                prof.disciplinas.some(d => Object.prototype.hasOwnProperty.call(a.notas, d))
            );
        }

        function getDadosGrafico(tipo) {
            const alunosProf = getAlunosDoProfessor();

            switch (tipo) {
                case "notasDisciplina": {
                    const medias = prof.disciplinas.map(d => {
                        const mediasDisc = [];
                        alunosProf.forEach(a => {
                            if (Object.prototype.hasOwnProperty.call(a.notas, d)) {
                                mediasDisc.push(mediaBim(a.notas[d]));
                            }
                        });
                        return mediasDisc.length > 0 ? mediasDisc.reduce((s, v) => s + v, 0) / mediasDisc.length : 0;
                    });
                    return { labels: prof.disciplinas, data: medias.map(v => v.toFixed(1)), cor: "#2563EB" };
                }

                case "desempenhoAlunos": {
                    const mediasAlunos = [];
                    const nomesAlunos = [];
                    alunosProf.forEach(a => {
                        let soma = 0, count = 0;
                        prof.disciplinas.forEach(d => {
                            if (Object.prototype.hasOwnProperty.call(a.notas, d)) {
                                soma += mediaBim(a.notas[d]);
                                count++;
                            }
                        });
                        if (count > 0) {
                            mediasAlunos.push((soma / count).toFixed(1));
                            nomesAlunos.push(a.nome.split(" ")[0]);
                        }
                    });
                    return { labels: nomesAlunos, data: mediasAlunos, cor: "#14B8A6" };
                }

                case "distribuicaoNotas": {
                    let baixas = 0, medias = 0, boas = 0;
                    alunosProf.forEach(a => {
                        prof.disciplinas.forEach(d => {
                            if (!Object.prototype.hasOwnProperty.call(a.notas, d)) return;
                            const m = mediaBim(a.notas[d]);
                            if (m < 5) baixas++;
                            else if (m < 7) medias++;
                            else boas++;
                        });
                    });
                    return {
                        labels: ["Notas Baixas (< 5)", "Notas Médias (5-7)", "Boas Notas (≥ 7)"],
                        data: [baixas, medias, boas],
                        cores: ["#EF4444", "#F59E0B", "#14B8A6"]
                    };
                }

                case "frequenciaAlunos": {
                    const alunos = getAlunosDoProfessor();
                    const faixas = ["< 60%", "60-70%", "70-80%", "80-90%", "90-100%"];
                    const contagem = [0, 0, 0, 0, 0];
                    alunos.forEach(a => {
                        if (a.frequencia < 60) contagem[0]++;
                        else if (a.frequencia < 70) contagem[1]++;
                        else if (a.frequencia < 80) contagem[2]++;
                        else if (a.frequencia < 90) contagem[3]++;
                        else contagem[4]++;
                    });
                    return { labels: faixas, data: contagem, cor: "#7C3AED" };
                }

                default:
                    return { labels: [], data: [], cor: "#2563EB" };
            }
        }

        function criarGrafico(canvasId, tipo) {
            const dados = getDadosGrafico(tipo);
            const info = TIPOS_GRAFICO[tipo];
            const ctx = document.getElementById(canvasId);

            const isDoughnut = info.tipo === "doughnut";

            return new Chart(ctx, {
                type: info.tipo,
                data: {
                    labels: dados.labels,
                    datasets: [{
                        label: info.titulo,
                        data: dados.data,
                        backgroundColor: isDoughnut ? dados.cores : dados.cor + "CC",
                        borderColor: isDoughnut ? "#fff" : dados.cor,
                        borderWidth: isDoughnut ? 2 : 1,
                        borderRadius: isDoughnut ? 0 : 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "bottom", display: isDoughnut }
                    },
                    scales: isDoughnut ? {} : {
                        y: { beginAtZero: true, grid: { color: "#E2E8F0" } },
                        x: { grid: { display: false } }
                    }
                }
            });
        }

        function atualizarGraficos() {
            const tipoPrincipal = document.getElementById("graficoPrincipal").value;
            const tipoComparacao = document.getElementById("graficoComparacao").value;

            document.getElementById("tituloPrincipal").textContent = TIPOS_GRAFICO[tipoPrincipal].titulo;

            if (chartPrincipal) chartPrincipal.destroy();
            chartPrincipal = criarGrafico("canvasPrincipal", tipoPrincipal);

            const boxComparacao = document.getElementById("boxComparacao");
            if (tipoComparacao && tipoComparacao !== tipoPrincipal) {
                boxComparacao.style.display = "";
                document.getElementById("tituloComparacao").textContent = TIPOS_GRAFICO[tipoComparacao].titulo;
                if (chartComparacao) chartComparacao.destroy();
                chartComparacao = criarGrafico("canvasComparacao", tipoComparacao);
            } else {
                boxComparacao.style.display = "none";
                if (chartComparacao) { chartComparacao.destroy(); chartComparacao = null; }
            }
        }

        document.getElementById("graficoPrincipal").addEventListener("change", atualizarGraficos);
        document.getElementById("graficoComparacao").addEventListener("change", atualizarGraficos);

        atualizarGraficos();
    }
}
