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
        { key: "relatorios", href: "relatorios.html", icon: "fa-chart-column", label: "Relatórios" },
        { key: "configuracoes", href: "configuracoes.html", icon: "fa-gear", label: "Configurações" }
    ],

    _navAluno: [
        { key: "portal", href: "portal-aluno.html", icon: "fa-gauge-high", label: "Meu Desempenho" },
        { key: "perfil", href: "perfil.html", icon: "fa-id-card", label: "Meu Perfil" },
        { key: "boletim", href: "portal-aluno.html#boletim", icon: "fa-file-lines", label: "Boletim" },
        { key: "frequencia", href: "portal-aluno.html#frequencia", icon: "fa-calendar-check", label: "Frequência" }
    ],

    montarSidebar(active, tipo) {
        const nav = tipo === "aluno" ? this._navAluno : this._navCoordenacao;
        const itens = nav.map(item => `
            <a href="${item.href}" class="${item.key === active ? "active" : ""}">
                <i class="fa-solid ${item.icon}"></i>
                <span>${item.label}</span>
            </a>
        `).join("");

        const rodape = tipo === "aluno"
            ? `<div class="user-mini"><i class="fa-solid fa-user-graduate"></i><span>Área do Aluno</span></div>`
            : `<div class="user-mini"><i class="fa-solid fa-user-shield"></i><span>Coordenação Pedagógica</span></div>`;

        return `
            <div class="logo-area">
                <img src="logo.png" alt="Logo">
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

    // Gera as iniciais para avatar
    iniciais(nome) {
        return nome.split(" ").filter(Boolean).slice(0, 2)
            .map(p => p[0].toUpperCase()).join("");
    }
};
