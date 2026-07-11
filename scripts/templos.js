// Atualiza ano e data de modificação
document.getElementById("ano").textContent = new Date().getFullYear();
document.getElementById("modificacao").textContent = document.lastModified;

// Menu hambúrguer
const botao = document.getElementById("hamburguer");
const links = document.getElementById("nav-links");

botao.addEventListener("click", () => {
  links.style.display = links.style.display === "block" ? "none" : "block";
});
