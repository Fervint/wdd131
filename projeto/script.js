// Lista de dicas (array de objetos)
const dicas = [
  { id: 1, texto: "Aprenda a subir e descer do skate com equilíbrio.", concluida: false },
  { id: 2, texto: "Pratique o impulso com o pé de trás.", concluida: false },
  { id: 3, texto: "Mantenha os joelhos flexionados para estabilidade.", concluida: false },
  { id: 4, texto: "Evite locais com muito movimento no início.", concluida: false }
];

// Função para renderizar dicas na tela
function renderizarDicas() {
  const lista = document.getElementById("lista-dicas");
  lista.innerHTML = "";

  dicas.forEach(dica => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" ${dica.concluida ? "checked" : ""} data-id="${dica.id}">
        ${dica.texto}
      </label>
    `;
    lista.appendChild(li);
  });
}

// Função para salvar progresso no localStorage
function salvarProgresso() {
  localStorage.setItem("dicasSkate", JSON.stringify(dicas));
}

// Função para carregar progresso salvo
function carregarProgresso() {
  const dadosSalvos = localStorage.getItem("dicasSkate");
  if (dadosSalvos) {
    const dicasSalvas = JSON.parse(dadosSalvos);
    dicasSalvas.forEach((dica, i) => dicas[i].concluida = dica.concluida);
  }
}

// Função para atualizar status das dicas
function atualizarStatus(event) {
  if (event.target.tagName === "INPUT") {
    const id = parseInt(event.target.dataset.id);
    const dica = dicas.find(d => d.id === id);
    dica.concluida = event.target.checked;
    salvarProgresso();
  }
}

// Mostrar/ocultar dicas extras
document.getElementById("mostrarExtras").addEventListener("click", () => {
  const extras = document.getElementById("extras");
  extras.classList.toggle("oculto");
});

// Inicialização
carregarProgresso();
renderizarDicas();
document.getElementById("lista-dicas").addEventListener("change", atualizarStatus);
