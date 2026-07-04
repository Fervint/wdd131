document.addEventListener("DOMContentLoaded", () => {
    console.log("Script obterdatas.js carregado com sucesso!");
    const footer = document.querySelector("footer p:last-child");
    const dataAtual = new Date().toLocaleDateString("pt-BR");
    footer.insertAdjacentHTML("beforeend", `<br>Última atualização: ${dataAtual}`);
});
