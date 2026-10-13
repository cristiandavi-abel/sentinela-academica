// ==========================================
// SENTINELA ACADÊMICA
// Administração de Professores (Coordenação)
// ==========================================

protegerPagina("coordenacao");
App.initSidebar("professores");

const TODAS_DISCIPLINAS = [
    "Arte","Biologia","Educação Física","Filosofia","Física","Geografia",
    "História","Língua Espanhola","Língua Inglesa","Língua Portuguesa",
    "Matemática","Metodologia do Trabalho Científico","Projeto de Vida",
    "Química","Sociologia do Trabalho",
    "Banco de Dados","Empreendedorismo","Fundamentos de Redes de Computadores",
    "Programação Estruturada e Orientada a Objetos","Programação WEB 1","Programação WEB 2"
];

function renderProfessores() {
    const container = document.getElementById("listaProfessores");
    if (!container) return;
    const profs = getProfessores();
    container.innerHTML = profs.map(p => `
        <section class="chart-card card-text" style="margin-bottom:20px;">
            <h2>${p.nome} <small style="font-weight:normal;color:#64748b;">(${p.email})</small></h2>
            <form class="form-prof" data-id="${p.id}" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;">
                ${TODAS_DISCIPLINAS.map(d => {
                    const checked = (p.disciplinas || []).includes(d) ? "checked" : "";
                    return `<label style="font-size:14px;"><input type="checkbox" data-disc="${d}" ${checked}> ${d}</label>`;
                }).join("")}
            </form>
            <div style="margin-top:12px;display:flex;gap:8px;">
                <button class="btn btn-salvar" data-id="${p.id}" style="width:auto;">Salvar disciplinas</button>
                <button class="btn btn-remover" data-id="${p.id}" style="width:auto;background:#EF4444;">Remover</button>
            </div>
        </section>
    `).join("");

    container.querySelectorAll(".btn-salvar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const form = container.querySelector(`.form-prof[data-id="${id}"]`);
            const discs = Array.from(form.querySelectorAll("input[type=checkbox]:checked"))
                .map(i => i.dataset.disc);
            atualizarProfessor(id, { disciplinas: discs });
            alert("Disciplinas atualizadas.");
        });
    });

    container.querySelectorAll(".btn-remover").forEach(btn => {
        btn.addEventListener("click", () => {
            if (!confirm("Remover este professor?")) return;
            removerProfessor(btn.dataset.id);
            renderProfessores();
        });
    });
}

document.getElementById("formProf").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("profNome").value.trim();
    const email = document.getElementById("profEmail").value.trim();
    const senha = document.getElementById("profSenha").value;
    if (nome.length < 3) { alert("Informe um nome válido."); return; }
    const conta = adicionarProfessor({ nome, email, senha, disciplinas: [] });
    if (!conta) { alert("Já existe um professor com este email."); return; }
    document.getElementById("formProf").reset();
    renderProfessores();
});

renderProfessores();