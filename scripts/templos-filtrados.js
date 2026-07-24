const templos = [
  {
    nomeDoTemplo: "Aba Nigeria",
    localizacao: "Aba, Nigéria",
    consagracao: "2005, 7 de agosto",
    area: 11500,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Manti Utah",
    localizacao: "Manti, Utah, Estados Unidos",
    consagracao: "1888, 21 de maio",
    area: 74792,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Payson Utah",
    localizacao: "Payson, Utah, Estados Unidos",
    consagracao: "2015, 7 de junho",
    area: 96630,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Yigo Guam",
    localizacao: "Yigo, Guam",
    consagracao: "2020, 2 de maio",
    area: 6861,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    nomeDoTemplo: "Washington D.C.",
    localizacao: "Kensington, Maryland, Estados Unidos",
    consagracao: "1974, 19 de novembro",
    area: 156558,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    nomeDoTemplo: "Lima Peru",
    localizacao: "Lima, Peru",
    consagracao: "1986, 10 de janeiro",
    area: 9600,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Cidade do México, México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Recife Brasil",
    localizacao: "Recife, Pernambuco, Brasil",
    consagracao: "2000, 15 de dezembro",
    area: 37600,
    urlDaImagem: "imagens/recife.jpg"
  },
  {
    nomeDoTemplo: "Curitiba Brasil",
    localizacao: "Curitiba, Paraná, Brasil",
    consagracao: "2008, 1 de junho",
    area: 27900,
    urlDaImagem: "imagens/curitiba.jpg"
  },
  {
    nomeDoTemplo: "São Paulo Brasil",
    localizacao: "São Paulo, São Paulo, Brasil",
    consagracao: "1978, 30 de outubro",
    area: 59246,
    urlDaImagem: "imagens/sao-paulo.jpg"
  }
];

// Função para exibir templos
function exibirTemplos(lista) {
  const container = document.querySelector(".grid-templos");
  container.innerHTML = "";
  lista.forEach(t => {
    const card = document.createElement("figure");
    card.innerHTML = `
      <img src="${t.urlDaImagem}" alt="${t.nomeDoTemplo}" loading="lazy">
      <figcaption>
        <h3>${t.nomeDoTemplo}</h3>
        <p>${t.localizacao}</p>
        <p>Consagrado em: ${t.consagracao}</p>
        <p>Área: ${t.area.toLocaleString()} pés²</p>
      </figcaption>
    `;
    container.appendChild(card);
  });
}

// Filtros
document.querySelector("#nav-links").addEventListener("click", (e) => {
  e.preventDefault();
  const filtro = e.target.dataset.filter;
  let filtrados = templos;

  if (filtro === "old") filtrados = templos.filter(t => parseInt(t.consagracao) < 1900);
  if (filtro === "new") filtrados = templos.filter(t => parseInt(t.consagracao) > 2000);
  if (filtro === "large") filtrados = templos.filter(t => t.area > 90000);
  if (filtro === "small") filtrados = templos.filter(t => t.area < 10000);

  exibirTemplos(filtrados);
});

// Exibe todos inicialmente
exibirTemplos(templos);

// Rodapé automático
document.getElementById("ano").textContent = new Date().getFullYear();
document.getElementById("modificacao").textContent = document.lastModified;
