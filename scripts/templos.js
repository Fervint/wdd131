// Atualiza ano e data de modificação
document.getElementById("ano").textContent = new Date().getFullYear();
document.getElementById("modificacao").textContent = document.lastModified;

// Menu hambúrguer responsivo
const botao = document.getElementById("hamburguer");
const links = document.getElementById("nav-links");

botao.addEventListener("click", () => {
  if (links.style.display === "flex") {
    links.style.display = "none";
  } else {
    links.style.display = "flex";
    links.style.flexDirection = "column";
    links.style.alignItems = "center";
  }
});
