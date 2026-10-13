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
        });
    }
}