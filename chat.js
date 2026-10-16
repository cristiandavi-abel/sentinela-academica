// ==========================================
// SENTINELA ACADÊMICA
// Chat das turmas
// ==========================================

const sess = getSessao();
if (!sess) { window.location.href = "index.html"; throw new Error("sem sessão"); }
const tipo = sess.tipo;
App.initSidebar("chat");

let turmaAtual = null;
const titulo = document.getElementById("tituloChat");
const subtitulo = document.getElementById("subtituloChat");
const sidebar = document.getElementById("chatSidebar");
const listaTurmas = document.getElementById("listaTurmasChat");
const messagesEl = document.getElementById("chatMessages");
const input = document.getElementById("chatInput");

if (tipo === "coordenacao") {
    sidebar.style.display = "";
    const turmas = getTurmas();
    turmas.forEach(t => {
        const div = document.createElement("div");
        div.className = "chat-room";
        div.textContent = t;
        div.addEventListener("click", () => selecionarTurma(t, div));
        listaTurmas.appendChild(div);
    });
    if (turmas.length > 0) {
        const first = listaTurmas.querySelector(".chat-room");
        first.classList.add("active");
        selecionarTurma(turmas[0], first);
    }
} else {
    const aluno = getAlunoPorId(sess.referencia);
    turmaAtual = aluno ? aluno.turma : null;
    titulo.textContent = "Chat — " + (turmaAtual || "Turma");
    subtitulo.textContent = "Converse com sua turma.";
}

function selecionarTurma(t, el) {
    if (el) {
        listaTurmas.querySelectorAll(".chat-room").forEach(r => r.classList.remove("active"));
        el.classList.add("active");
    }
    turmaAtual = t;
    titulo.textContent = "Chat — " + t;
    renderMessages();
}

function nomeAutor(sessao) {
    if (sessao.tipo === "coordenacao") return "Coordenação";
    const aluno = getAlunoPorId(sessao.referencia);
    return aluno ? aluno.nome : "Aluno";
}

function renderMessages() {
    if (!turmaAtual) {
        messagesEl.innerHTML = `<p class="sem-resultado">Selecione uma turma.</p>`;
        return;
    }
    const msgs = getMensagensChat(turmaAtual);
    const minhaChave = sess.tipo === "aluno" ? `aluno:${sess.referencia}` : `coord:${sess.referencia}`;
    messagesEl.innerHTML = msgs.map(m => {
        const meu = (m.autorTipo === sess.tipo) && (
            sess.tipo === "coordenacao" ? true : String(m.autorRef) === String(sess.referencia)
        );
        const data = new Date(m.data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        const online = m.autorTipo === "aluno" ? Pref.estaOnline({ tipo: "aluno", referencia: m.autorRef }) : true;
        const onlineDot = m.autorTipo === "aluno" ? `<span class="online-dot ${online ? "online" : "offline"}" title="${online ? "Online" : "Offline"}"></span> ` : '';
        return `
            <div class="chat-msg ${meu ? "meu" : "outro"}">
                <div class="chat-msg-autor">${onlineDot}${m.autorNome}</div>
                ${escapeHtml(m.texto)}
                <div class="chat-msg-data">${data}</div>
            </div>
        `;
    }).join("");
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function enviar() {
    const texto = input.value.trim();
    if (!texto || !turmaAtual) return;

    // Verificar palavras ofensivas
    const ofensivas = Pref.verificarPalavrasOfensivas(texto);
    if (ofensivas.length > 0) {
        alert("Sua mensagem contém palavras ofensivas e não pode ser enviada. Por favor, respeite os colegas.");
        Pref.tocarSom("erro");
        return;
    }

    enviarMensagemChat({
        turma: turmaAtual,
        autorTipo: sess.tipo,
        autorNome: nomeAutor(sess),
        autorRef: sess.tipo === "aluno" ? sess.referencia : sess.referencia,
        texto
    });
    input.value = "";
    renderMessages();
    Pref.tocarSom("mensagem");
}

document.getElementById("chatEnviar").addEventListener("click", enviar);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); enviar(); }
});

renderMessages();
setInterval(renderMessages, 3000);

// Marcar como online periodicamente
if (typeof Pref !== "undefined") {
    Pref.marcarOnline(sess);
    setInterval(() => Pref.marcarOnline(sess), 30000);
}