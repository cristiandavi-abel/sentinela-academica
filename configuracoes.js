// ==========================================
// SENTINELA ACADÊMICA
// Configurações
// =========================================

protegerPagina("coordenacao");
App.initSidebar("configuracoes");

document.getElementById("btnResetar").addEventListener("click", () => {
    if (confirm("Deseja realmente restaurar os dados de exemplo?")) {
        resetarDados();
        const msg = document.getElementById("msgReset");
        msg.style.display = "block";
        setTimeout(() => { msg.style.display = "none"; }, 3000);
    }
});
