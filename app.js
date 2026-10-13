// ==========================================
// SENTINELA ACADÊMICA
// Layout compartilhado (sidebar, logout, menu mobile)
// ==========================================

const App = {
    _navCoordenacao: [
        { key: "dashboard", href: "dashboard.html", icon: "fa-house", label: "Visão Geral" },
        { key: "alunos", href: "alunos.html", icon: "fa-user-graduate", label: "Alunos" },
        { key: "turmas", href: "turmas.html", icon: "fa-school", label: "Turmas" },
        { key: "alertas", href: "alertas.html", icon: "fa-triangle-exclamation", label: "Alertas" },
        { key: "avisos", href: "avisos.html", icon: "fa-bullhorn", label: "Avisos" },
        { key: "chat", href: "chat.html", icon: "fa-comments", label: "Chat das Turmas" },
        { key: "relatorios", href: "relatorios.html", icon: "fa-chart-column", label: "Relatórios" },
        { key: "contas", href: "contas.html", icon: "fa-users-gear", label: "Contas e Acessos" },
        { key: "professores", href: "professores.html", icon: "fa-chalkboard-user", label: "Professores" },
        { key: "configuracoes", href: "configuracoes.html", icon: "fa-gear", label: "Configurações" }
    ],

    _navProfessor: [
        { key: "notas", href: "professor.html", icon: "fa-pen-to-square", label: "Lançar Notas" }
    ],

    _navAluno: [
        { key: "portal", href: "portal-aluno.html", icon: "fa-gauge-high", label: "Meu Desempenho" },
        { key: "avisos", href: "avisos.html", icon: "fa-bell", label: "Avisos" },
        { key: "chat", href: "chat.html", icon: "fa-comments", label: "Chat da Turma" },
        { key: "perfil", href: "perfil.html", icon: "fa-id-card", label: "Meu Perfil" },
        { key: "boletim", href: "portal-aluno.html#boletim", icon: "fa-file-lines", label: "Boletim" },
        { key: "frequencia", href: "portal-aluno.html#frequencia", icon: "fa-calendar-check", label: "Frequência" }
    ],

    montarSidebar(active, tipo) {
        const nav = tipo === "aluno" ? this._navAluno : tipo === "professor" ? this._navProfessor : this._navCoordenacao;
        const itens = nav.map(item => `
            <a href="${item.href}" class="${item.key === active ? "active" : ""}">
                <i class="fa-solid ${item.icon}"></i>
                <span>${item.label}</span>
            </a>
        `).join("");

        const rodape = tipo === "aluno"
            ? `<div class="user-mini"><i class="fa-solid fa-user-graduate"></i><span>Área do Aluno</span></div>`
            : tipo === "professor"
                ? `<div class="user-mini"><i class="fa-solid fa-chalkboard-user"></i><span>Área do Professor</span></div>`
                : `<div class="user-mini"><i class="fa-solid fa-user-shield"></i><span>Coordenação Pedagógica</span></div>`;

        return `
            <div class="logo-area">
                <img src="logo.svg" alt="Logo">
                <h2>Sentinela Acadêmica</h2>
            </div>
            <nav>${itens}</nav>
            <div class="sidebar-footer">
                ${rodape}
                <button class="btn-sair" id="btnSair"><i class="fa-solid fa-right-from-bracket"></i> Sair</button>
            </div>
        `;
    },

    initSidebar(active, tipo = "coordenacao") {
        const el = document.getElementById("sidebar");
        if (!el) return;
        el.innerHTML = this.montarSidebar(active, tipo);
        const btn = document.getElementById("btnSair");
        if (btn) btn.addEventListener("click", encerrarSessao);

        // Botão de menu mobile
        this._injectMenuButton();
        // Notificações
        this._injectNotificacoes();
    },

    _injectMenuButton() {
        if (document.getElementById("menuToggle")) return;
        const btn = document.createElement("button");
        btn.id = "menuToggle";
        btn.className = "menu-toggle";
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.appendChild(btn);

        btn.addEventListener("click", () => {
            const dash = document.querySelector(".dashboard");
            if (dash) dash.classList.toggle("sidebar-open");
        });

        // Fecha ao clicar fora (overlay)
        document.addEventListener("click", (e) => {
            const dash = document.querySelector(".dashboard");
            if (!dash) return;
            if (dash.classList.contains("sidebar-open") &&
                !e.target.closest(".sidebar") &&
                !e.target.closest("#menuToggle")) {
                dash.classList.remove("sidebar-open");
            }
        });
    },

    // ===== Notificações =====
    _injectNotificacoes() {
        if (document.getElementById("btnNotificacoes")) return;
        const sessao = (typeof getSessao === "function") ? getSessao() : null;
        if (!sessao) return;

        const topBar = document.querySelector(".top-bar");
        if (!topBar) return;

        const wrap = document.createElement("div");
        wrap.className = "notif-wrap";
        wrap.innerHTML = `
            <button class="notif-btn" id="btnNotificacoes" aria-label="Notificações">
                <i class="fa-solid fa-bell"></i>
                <span class="notif-badge" id="notifBadge" style="display:none;">0</span>
            </button>
            <div class="notif-dropdown" id="notifDropdown">
                <div class="notif-header">
                    <strong>Avisos</strong>
                    <button class="notif-marcar" id="notifMarcar">Marcar tudo como lido</button>
                </div>
                <div class="notif-lista" id="notifLista"></div>
            </div>
        `;
        topBar.appendChild(wrap);

        const btn = document.getElementById("btnNotificacoes");
        const dd = document.getElementById("notifDropdown");

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            dd.classList.toggle("open");
            if (dd.classList.contains("open")) {
                this._carregarNotificacoes(sessao);
            }
        });

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".notif-wrap")) dd.classList.remove("open");
        });

        document.getElementById("notifMarcar").addEventListener("click", () => {
            marcarTodosAvisosLidos(sessao);
            this._carregarNotificacoes(sessao);
        });

        this._carregarNotificacoes(sessao);
        this._timerNotif = setInterval(() => this._carregarNotificacoes(sessao), 10000);
    },

    _carregarNotificacoes(sessao) {
        const lista = document.getElementById("notifLista");
        const badge = document.getElementById("notifBadge");
        if (!lista || !badge) return;

        const avisos = getAvisosParaUsuario(sessao);
        const chave = chaveUsuario(sessao);
        const naoLidos = avisos.filter(a => !Array.isArray(a.lidoPor) || !a.lidoPor.includes(chave)).length;

        if (naoLidos > 0) {
            badge.textContent = naoLidos > 99 ? "99+" : naoLidos;
            badge.style.display = "flex";
        } else {
            badge.style.display = "none";
        }

        if (avisos.length === 0) {
            lista.innerHTML = `<div class="notif-vazio">Nenhum aviso.</div>`;
            return;
        }

        lista.innerHTML = avisos.map(a => {
            const lido = Array.isArray(a.lidoPor) && a.lidoPor.includes(chave);
            const data = new Date(a.data).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
            return `
                <div class="notif-item ${lido ? "lido" : "nao-lido"}" data-id="${a.id}">
                    <div class="notif-titulo">${a.titulo}</div>
                    <div class="notif-texto">${a.texto}</div>
                    <div class="notif-meta">${a.autor} • ${data}${a.turma ? " • " + a.turma : ""}</div>
                </div>
            `;
        }).join("");

        lista.querySelectorAll(".notif-item").forEach(el => {
            el.addEventListener("click", () => {
                const id = Number(el.dataset.id);
                marcarAvisoLido(id, sessao);
                this._carregarNotificacoes(sessao);
            });
        });
    },

    // Gera as iniciais para avatar
    iniciais(nome) {
        return nome.split(" ").filter(Boolean).slice(0, 2)
            .map(p => p[0].toUpperCase()).join("");
    }
};
