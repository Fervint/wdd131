const resultadoRaio = document.getElementById('raio');
const resultadoArea = document.querySelector('#area');

let area = 0;
const PI = 3.14159;

let raio = 10;
area = PI * raio * raio;
resultadoRaio.textContent = raio;
resultadoArea.textContent = area;

raio = 20;
raio = raio + 5;
area = PI * raio * raio;
resultadoRaio.innerHTML = `<strong>${raio}</strong>`;
resultadoArea.innerHTML = `<strong>${area}</strong>`; 