// ==========================================
// SENTINELA ACADÊMICA
// Sistema de Preferências e Acessibilidade
// ==========================================

const Pref = {
    // Chaves de armazenamento
    THEME_KEY: "sentinela_theme",
    FONT_SIZE_KEY: "sentinela_font_size",
    FOTO_KEY: "sentinela_foto_",
    ONLINE_KEY: "sentinela_online_",
    ACESSIBILIDADE_KEY: "sentinela_acessibilidade",
    SOM_KEY: "sentinela_som",

    // Valores padrão
    defaults: {
        theme: "light",
        fontSize: 16,
        acessibilidade: {
            reduzirAnimacoes: false,
            altoContraste: false,
            modoAutismo: false,
            textoSimplificado: false
        },
        som: true,
        vibracao: true
    },

    // Palavras ofensivas para bloqueio no chat
    palavrasOfensivas: [
        "burro", "burra", "idiota", "imbecil", "estúpido", "estúpida",
        "otário", "otária", "ridículo", "ridícula", "nojento", "nojenta",
        "feio", "feia", "gordo", "gorda", "magrelo", "magrela",
        "vadia", "piranha", "vagabundo", "vagabunda", "corno", "corna",
        "babaca", "besta", "bestial", "escroto", "escrota", "porra",
        "caralho", "bosta", "merda", "puta", "puto", "desgraça", "desgraçado", "desgraçada",
        "arrombado", "arrombada", "fudido", "fudida", "cacete", "buceta",
        "xota", "xoxota", "cu", "bosta", "cuzão", "cuzona", "piroca",
        "rola", "caralho", "porra", "merda", "bosta", "cacete", "puta",
        "puto", "piranha", "vadia", "vagabundo", "vagabunda", "desgraça", "desgraçado", "desgraçada",
        "arrombado", "arrombada", "fudido", "fudida", "babaca", "besta", "bestial",
        "escroto", "escrota", "corno", "corna", "xota", "xoxota", "rola", "piroca"
    ],

    init() {
        this.aplicarTema();
        this.aplicarTamanhoFonte();
        this.aplicarAcessibilidade();
        this.iniciarVerificacaoOnline();
    },

    // ======== TEMA CLARO/ESCURO ========
    getTheme() {
        return localStorage.getItem(this.THEME_KEY) || this.defaults.theme;
    },

    setTheme(theme) {
        localStorage.setItem(this.THEME_KEY, theme);
        this.aplicarTema();
    },

    toggleTheme() {
        const current = this.getTheme();
        const newTheme = current === "light" ? "dark" : "light";
        this.setTheme(newTheme);
        return newTheme;
    },

    aplicarTema() {
        const theme = this.getTheme();
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    },

    // ======== TAMANHO DA FONTE ========
    getFontSize() {
        return parseInt(localStorage.getItem(this.FONT_SIZE_KEY)) || this.defaults.fontSize;
    },

    setFontSize(size) {
        localStorage.setItem(this.FONT_SIZE_KEY, size);
        this.aplicarTamanhoFonte();
    },

    aplicarTamanhoFonte() {
        const size = this.getFontSize();
        document.documentElement.style.fontSize = size + "px";
    },

    // ======== ACESSIBILIDADE ========
    getAcessibilidade() {
        try {
            return JSON.parse(localStorage.getItem(this.ACESSIBILIDADE_KEY)) || this.defaults.acessibilidade;
        } catch {
            return this.defaults.acessibilidade;
        }
    },

    setAcessibilidade(opcoes) {
        localStorage.setItem(this.ACESSIBILIDADE_KEY, JSON.stringify(opcoes));
        this.aplicarAcessibilidade();
    },

    aplicarAcessibilidade() {
        const config = this.getAcessibilidade();

        if (config.reduzirAnimacoes) {
            document.documentElement.classList.add("reduzir-animacoes");
        } else {
            document.documentElement.classList.remove("reduzir-animacoes");
        }

        if (config.altoContraste) {
            document.documentElement.classList.add("alto-contraste");
        } else {
            document.documentElement.classList.remove("alto-contraste");
        }

        if (config.modoAutismo) {
            document.documentElement.classList.add("modo-autismo");
        } else {
            document.documentElement.classList.remove("modo-autismo");
        }

        if (config.textoSimplificado) {
            document.documentElement.classList.add("texto-simplificado");
        } else {
            document.documentElement.classList.remove("texto-simplificado");
        }
    },

    // ======== SOM E VIBRAÇÃO ========
    getSom() {
        const val = localStorage.getItem(this.SOM_KEY);
        return val === null ? true : val === "true";
    },

    setSom(valor) {
        localStorage.setItem(this.SOM_KEY, valor);
    },

    getVibracao() {
        const val = localStorage.getItem(this.SOM_KEY + "_vib");
        return val === null ? true : val === "true";
    },

    setVibracao(valor) {
        localStorage.setItem(this.SOM_KEY + "_vib", valor);
    },

    tocarSom(tipo = "notificacao") {
        if (!this.getSom()) return;

        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            if (tipo === "notificacao") {
                osc.frequency.value = 800;
                osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.3);
            } else if (tipo === "mensagem") {
                osc.frequency.value = 600;
                osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.2);
            } else if (tipo === "erro") {
                osc.type = "sawtooth";
                osc.frequency.value = 200;
                osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.4);
            }
        } catch (e) {
            console.warn("Som não disponível:", e);
        }
    },

    vibrar(padrao = 200) {
        if (!this.getVibracao()) return;
        if ("vibrate" in navigator) {
            navigator.vibrate(padrao);
        }
    },

    // ======== STATUS ONLINE ========
    marcarOnline(sessao) {
        if (!sessao) return;
        const chave = sessao.tipo === "aluno" ? `aluno_${sessao.referencia}` : `coord_${sessao.referencia}`;
        localStorage.setItem(this.ONLINE_KEY + chave, Date.now().toString());
    },

    estaOnline(sessao) {
        if (!sessao) return false;
        const chave = sessao.tipo === "aluno" ? `aluno_${sessao.referencia}` : `coord_${sessao.referencia}`;
        const ultimo = parseInt(localStorage.getItem(this.ONLINE_KEY + chave)) || 0;
        const agora = Date.now();
        // Online se última atividade foi há menos de 2 minutos
        return (agora - ultimo) < 120000;
    },

    iniciarVerificacaoOnline() {
        const sessao = (typeof getSessao === "function") ? getSessao() : null;
        if (sessao) {
            setInterval(() => this.marcarOnline(sessao), 30000);
        }
    },

    // ======== FOTO DE PERFIL ========
    getFoto(tipo, referencia) {
        try {
            return localStorage.getItem(this.FOTO_KEY + tipo + "_" + referencia);
        } catch {
            return null;
        }
    },

    setFoto(tipo, referencia, fotoBase64) {
        localStorage.setItem(this.FOTO_KEY + tipo + "_" + referencia, fotoBase64);
    },

    removerFoto(tipo, referencia) {
        localStorage.removeItem(this.FOTO_KEY + tipo + "_" + referencia);
    },

    // ======== PALAVRAS OFENSIVAS ========
    verificarPalavrasOfensivas(texto) {
        const textoLower = texto.toLowerCase();
        const encontradas = [];
        this.palavrasOfensivas.forEach(palavra => {
            if (textoLower.includes(palavra)) {
                encontradas.push(palavra);
            }
        });
        return encontradas;
    },

    filtrarTexto(texto) {
        let filtrado = texto;
        this.palavrasOfensivas.forEach(palavra => {
            const regex = new RegExp(palavra, "gi");
            filtrado = filtrado.replace(regex, "***");
        });
        return filtrado;
    },

    // ======== NOTIFICAÇÕES ========
    notificar(titulo, corpo, tipo = "notificacao") {
        // Notificação do navegador
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(titulo, {
                body: corpo,
                icon: "logo.svg",
                badge: "logo.svg"
            });
        }

        // Som e vibração
        this.tocarSom(tipo);
        this.vibrar(200);
    },

    solicitarPermissaoNotificacao() {
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }
    }
};

// Inicializar preferências quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    Pref.init();
    Pref.solicitarPermissaoNotificacao();
});
