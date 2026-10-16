// ==========================================
// SENTINELA ACADÊMICA
// Configurações
// ==========================================

const sessaoConfig = getSessao();
if (!sessaoConfig) { window.location.href = "index.html"; throw new Error("sem sessão"); }
App.initSidebar("configuracoes", sessaoConfig.tipo);

// ======== TEMA ========
const toggleTema = document.getElementById("toggleTema");
toggleTema.checked = Pref.getTheme() === "dark";
toggleTema.addEventListener("change", () => {
    Pref.setTheme(toggleTema.checked ? "dark" : "light");
});

// ======== FOTO DE PERFIL ========
const inputFoto = document.getElementById("inputFoto");
const fotoPreview = document.getElementById("fotoPreview");
const btnUploadFoto = document.getElementById("btnUploadFoto");
const btnRemoverFoto = document.getElementById("btnRemoverFoto");

const tipoFoto = sessaoConfig.tipo;
const refFoto = sessaoConfig.referencia;

function atualizarPreviewFoto() {
    const foto = Pref.getFoto(tipoFoto, refFoto);
    if (foto) {
        fotoPreview.innerHTML = `<img src="${foto}" alt="Foto de perfil" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    } else {
        fotoPreview.innerHTML = `<i class="fa-solid fa-user"></i>`;
    }
}

btnUploadFoto.addEventListener("click", () => inputFoto.click());

inputFoto.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const size = 200;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, size, size);
            const base64 = canvas.toDataURL("image/jpeg", 0.8);
            Pref.setFoto(tipoFoto, refFoto, base64);
            atualizarPreviewFoto();
            Pref.notificar("Foto atualizada", "Sua foto de perfil foi alterada com sucesso.", "notificacao");
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

btnRemoverFoto.addEventListener("click", () => {
    Pref.removerFoto(tipoFoto, refFoto);
    atualizarPreviewFoto();
});

atualizarPreviewFoto();

// ======== TAMANHO DA FONTE ========
const valorFonte = document.getElementById("valorFonte");
const btnFonteMenor = document.getElementById("btnFonteMenor");
const btnFonteMaior = document.getElementById("btnFonteMaior");

function atualizarValorFonte() {
    valorFonte.textContent = Pref.getFontSize() + "px";
}

btnFonteMenor.addEventListener("click", () => {
    const atual = Pref.getFontSize();
    if (atual > 12) {
        Pref.setFontSize(atual - 1);
        atualizarValorFonte();
    }
});

btnFonteMaior.addEventListener("click", () => {
    const atual = Pref.getFontSize();
    if (atual < 24) {
        Pref.setFontSize(atual + 1);
        atualizarValorFonte();
    }
});

atualizarValorFonte();

// ======== ACESSIBILIDADE ========
const toggleAnimacoes = document.getElementById("toggleAnimacoes");
const toggleContraste = document.getElementById("toggleContraste");
const toggleAutismo = document.getElementById("toggleAutismo");
const toggleTextoSimplificado = document.getElementById("toggleTextoSimplificado");

const configAcessibilidade = Pref.getAcessibilidade();
toggleAnimacoes.checked = configAcessibilidade.reduzirAnimacoes;
toggleContraste.checked = configAcessibilidade.altoContraste;
toggleAutismo.checked = configAcessibilidade.modoAutismo;
toggleTextoSimplificado.checked = configAcessibilidade.textoSimplificado;

function salvarAcessibilidade() {
    Pref.setAcessibilidade({
        reduzirAnimacoes: toggleAnimacoes.checked,
        altoContraste: toggleContraste.checked,
        modoAutismo: toggleAutismo.checked,
        textoSimplificado: toggleTextoSimplificado.checked
    });
}

toggleAnimacoes.addEventListener("change", salvarAcessibilidade);
toggleContraste.addEventListener("change", salvarAcessibilidade);
toggleAutismo.addEventListener("change", salvarAcessibilidade);
toggleTextoSimplificado.addEventListener("change", salvarAcessibilidade);

// ======== SOM E VIBRAÇÃO ========
const toggleSom = document.getElementById("toggleSom");
const toggleVibracao = document.getElementById("toggleVibracao");

toggleSom.checked = Pref.getSom();
toggleVibracao.checked = Pref.getVibracao();

toggleSom.addEventListener("change", () => {
    Pref.setSom(toggleSom.checked);
});

toggleVibracao.addEventListener("change", () => {
    Pref.setVibracao(toggleVibracao.checked);
});

// ======== STATUS ONLINE ========
const statusOnline = document.getElementById("statusOnline");

function atualizarStatusOnline() {
    if (sessaoConfig && Pref.estaOnline(sessaoConfig)) {
        statusOnline.innerHTML = '<i class="fa-solid fa-circle"></i> Online';
        statusOnline.className = "status-pill green";
    } else {
        statusOnline.innerHTML = '<i class="fa-solid fa-circle"></i> Offline';
        statusOnline.className = "status-pill red";
    }
}

atualizarStatusOnline();
setInterval(atualizarStatusOnline, 60000);
