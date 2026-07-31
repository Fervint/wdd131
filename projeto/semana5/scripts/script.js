const input = document.querySelector('#capfav');
const botao = document.querySelector('#botao');
const lista = document.querySelector('#lista');

// Carrega a lista do localStorage ou inicia vazia
let arrayCapitulos = obterListaDeCapitulos() || [];

// Exibe os capítulos já salvos ao carregar a página
arrayCapitulos.forEach(capitulo => {
  exibirLista(capitulo);
});

// Evento de clique no botão "Adicionar"
botao.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    exibirLista(input.value);              // mostra na tela
    arrayCapitulos.push(input.value);      // adiciona ao array
    definirListaDeCapitulos();             // salva no localStorage
    input.value = '';                      // limpa campo
    input.focus();                         // volta o foco
  } else {
    input.focus();
  }
});

// Permite adicionar capítulos com Enter
input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    botao.click();
  }
});

// Função para exibir capítulo na lista
function exibirLista(item) {
  let li = document.createElement('li');
  let botaoExcluir = document.createElement('button');

  li.textContent = item;
  botaoExcluir.textContent = '❌';
  botaoExcluir.classList.add('delete');
  botaoExcluir.setAttribute('aria-label', `Excluir ${item}`);

  li.append(botaoExcluir);
  lista.append(li);

  // Evento para excluir capítulo
  botaoExcluir.addEventListener('click', function () {
    lista.removeChild(li);
    excluirCapitulo(li.textContent); // remove do array e do localStorage
    input.focus();
  });
}

// Função para salvar lista no localStorage
function definirListaDeCapitulos() {
  localStorage.setItem('minhaListaFavoritosLDM', JSON.stringify(arrayCapitulos));
}

// Função para obter lista do localStorage
function obterListaDeCapitulos() {
  return JSON.parse(localStorage.getItem('minhaListaFavoritosLDM'));
}

// Função para excluir capítulo
function excluirCapitulo(capitulo) {
  // remove o ❌ do final da string
  capitulo = capitulo.slice(0, capitulo.length - 1);
  // filtra o array removendo o capítulo
  arrayCapitulos = arrayCapitulos.filter(item => item !== capitulo);
  // atualiza o localStorage
  definirListaDeCapitulos();
}
