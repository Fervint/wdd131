// Exibir ano atual e data de modificação
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Função para calcular sensação térmica (Wind Chill em °C)
function calcularSensacaoTermica(temp, vento) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(vento, 0.16) +
    0.3965 * temp * Math.pow(vento, 0.16)
  ).toFixed(1);
}

// Captura os valores da página
const temp = parseFloat(document.getElementById("temp").textContent);
const vento = parseFloat(document.getElementById("wind").textContent);
const windChillElement = document.getElementById("windChill");

// Verifica se as condições são válidas para o cálculo
if (temp <= 10 && vento > 4.8) {
  windChillElement.textContent = `${calcularSensacaoTermica(temp, vento)} °C`;
} else {
  // Exibe "N/A" quando não aplicável
  windChillElement.textContent = "N/A";
}
