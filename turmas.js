// ==========================================
// SENTINELA ACADÊMICA
// Turmas (agregado dos alunos)
// =========================================

protegerPagina("coordenacao");
App.initSidebar("turmas");

const alunos = getAlunos();

const mapa = {};

alunos.forEach(a => {
    if (!mapa[a.turma]) {
        mapa[a.turma] = { turma: a.turma, n: 0, somaMedia: 0, somaIPA: 0 };
    }
    const t = mapa[a.turma];
    t.n++;
    t.somaMedia += a.media;
    t.somaIPA += a.ipa;
});

const linhas = Object.values(mapa).map(t => {
    const media = (t.somaMedia / t.n).toFixed(1);
    const ipa = Math.round(t.somaIPA / t.n);
    const st = statusIPA(ipa);
    return `<tr>
        <td><strong>${t.turma}</strong></td>
        <td>${t.n}</td>
        <td>${media}</td>
        <td><span class="status ${st.classe}">${ipa}</span></td>
        <td>${st.texto}</td>
    </tr>`;
}).join("");

document.getElementById("tabelaTurmas").innerHTML = linhas;
