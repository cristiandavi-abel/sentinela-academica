// ==========================================
// SENTINELA ACADÊMICA
// Avisos / Notificações
// ==========================================

const sess = getSessao();
if (!sess) { window.location.href = "index.html"; throw new Error("sem sessão"); }

const tipo = sess.tipo;
App.initSidebar("avisos");

const blocoCriar = document.getElementById("blocoCriar");
const lista = document.getElementById("listaAvisos");
const subtitulo = document.getElementById("subtituloAvisos");

if (tipo === "coordenacao") {
    blocoCriar.style.display = "";
    subtitulo.textContent = "Crie e gerencie avisos para alunos e turmas.";
    // popular turmas
    const sel = document.getElementById("avisoTurma");
    getTurmas().forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        sel.appendChild(opt);
    });
} else {
    subtitulo.textContent = "Comunicados da escola para você.";
}

function render() {
    const avisos = getAvisosParaUsuario(sess);
    const chave = chaveUsuario(sess);

    if (avisos.length === 0) {
        lista.innerHTML = `<p class="sem-resultado">Nenhum aviso disponível.</p>`;
        return;
    }

    lista.innerHTML = avisos.map(a => {
        const lido = Array.isArray(a.lidoPor) && a.lidoPor.includes(chave);
        const data = new Date(a.data).toLocaleString("pt-BR");
        const podeRemover = tipo === "coordenacao";
        return `
            <div class="aviso-card">
                <h3>${a.titulo} ${!lido ? '<span style="font-size:11px;background:#EFF6FF;color:#2563EB;padding:3px 8px;border-radius:6px;">Novo</span>' : ''}</h3>
                <p>${a.texto}</p>
                <div class="aviso-meta">
                    ${a.autor} • ${data}${a.turma ? " • " + a.turma : " • Todos"}
                    ${podeRemover ? ` • <a href="#" data-id="${a.id}" class="remover-aviso" style="color:#DC2626;font-weight:600;">Remover</a>` : ""}
                </div>
            </div>
        `;
    }).join("");

    // marcar lidos ao visualizar
    avisos.forEach(a => marcarAvisoLido(a.id, sess));

    if (tipo === "coordenacao") {
        lista.querySelectorAll(".remover-aviso").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                if (confirm("Remover este aviso?")) {
                    removerAviso(Number(link.dataset.id));
                    render();
                }
            });
        });
    }
}

document.getElementById("formAviso")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (tipo !== "coordenacao") return;

    const titulo = document.getElementById("avisoTitulo").value.trim();
    const texto = document.getElementById("avisoTexto").value.trim();
    const turma = document.getElementById("avisoTurma").value || null;

    adicionarAviso({ titulo, texto, turma }, sess);
    e.target.reset();
    render();
});

// proteger manualmente
if (!sess) {
    window.location.href = "index.html";
} else {
    render();
}