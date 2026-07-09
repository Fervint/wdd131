// scripts/script.js
const input = document.querySelector('#capfav');
const botao = document.querySelector('button');
const lista = document.querySelector('#lista');

botao.addEventListener('click', function() {
  // Verifica se o campo não está vazio
  if (input.value.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = input.value;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = '❌';
    botaoExcluir.setAttribute('aria-label', `Excluir ${input.value}`);

    // Evento para excluir o item
    botaoExcluir.addEventListener('click', function() {
      lista.removeChild(li);
      input.focus(); // volta o foco para o campo
    });

    li.append(botaoExcluir);
    lista.append(li);

    input.value = ''; // limpa o campo
    input.focus();    // mantém o foco para nova entrada
  } else {
    // Se o campo estiver vazio, apenas foca novamente
    input.focus();
  }
});
