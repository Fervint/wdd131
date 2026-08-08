// Lista de dicas (array de objetos)
const dicas = [
  { id: 1, texto: "Aprenda a subir e descer do skate com equilíbrio.", concluida: false },
  { id: 2, texto: "Pratique o impulso com o pé de trás.", concluida: false },
  { id: 3, texto: "Mantenha os joelhos flexionados para estabilidade.", concluida: false },
  { id: 4, texto: "Evite locais com muito movimento no início.", concluida: false }
];

// -------------------- Dicas de Skate --------------------
function renderizarDicas() {
  const lista = document.getElementById("lista-dicas");
  if (!lista) return;

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

function salvarProgresso() {
  localStorage.setItem("dicasSkate", JSON.stringify(dicas));
}

function carregarProgresso() {
  const dadosSalvos = localStorage.getItem("dicasSkate");
  if (dadosSalvos) {
    const dicasSalvas = JSON.parse(dadosSalvos);
    dicasSalvas.forEach((dica, i) => {
      if (dicas[i]) dicas[i].concluida = dica.concluida;
    });
  }
}

function atualizarStatus(event) {
  if (event.target.tagName === "INPUT") {
    const id = parseInt(event.target.dataset.id);
    const dica = dicas.find(d => d.id === id);
    if (!dica) return;
    dica.concluida = event.target.checked;
    salvarProgresso();
  }
}

function initDicasPage() {
  const lista = document.getElementById("lista-dicas");
  const botaoExtras = document.getElementById("mostrarExtras");
  const extras = document.getElementById("extras");

  if (!lista || !botaoExtras || !extras) return;

  carregarProgresso();
  renderizarDicas();
  lista.addEventListener("change", atualizarStatus);

  // garantir texto inicial do botão conforme estado atual
  botaoExtras.textContent = extras.classList.contains("oculto") ? "Mostrar dicas extras" : "Ocultar dicas extras";

  botaoExtras.addEventListener("click", () => {
    extras.classList.toggle("oculto");
    if (extras.classList.contains("oculto")) {
      botaoExtras.textContent = "Mostrar dicas extras";
    } else {
      botaoExtras.textContent = "Ocultar dicas extras";
    }
  });
}

// -------------------- Mini Jogo: Skate Jump --------------------
function initSkateGame() {
  const canvas = document.getElementById("skateGame");
  const playButton = document.getElementById("playGame");
  const scoreText = document.getElementById("gameScore");
  const gameMessage = document.getElementById("gameMessage");
  const rankingList = document.getElementById("ranking");

  if (!canvas || !playButton || !scoreText || !gameMessage || !rankingList) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const groundY = 130;
  const playerX = 30;
  const playerWidth = 40;
  const playerHeight = 40;
  const playerVisualOffset = 18;
  const obstacleWidth = 22;
  const obstacleHeight = 22;
  const obstacleStartX = canvas.width + 20;
  const baseSpeed = 4;
  const jumpForce = -11;
  const gravity = 0.55;

  let playerY = groundY - playerHeight;
  let playerVelocity = 0;
  let obstacleX = obstacleStartX;
  const obstacleY = groundY - obstacleHeight;
  let currentSpeed = baseSpeed;
  let distanceTravelled = 0;
  let score = 0;
  let gameActive = false;
  let hasStarted = false;
  let ranking = loadRanking();

  const playerImage = new Image();
  playerImage.src = "imagens/skater.png";

  function loadRanking() {
    const stored = localStorage.getItem("skateRanking");
    return stored ? JSON.parse(stored) : [];
  }

  function saveRanking() {
    localStorage.setItem("skateRanking", JSON.stringify(ranking));
  }

  function updateRanking() {
    ranking.push(score);
    ranking = ranking.sort((a, b) => b - a).slice(0, 5);
    saveRanking();
    renderRanking();
  }

  function renderRanking() {
    rankingList.innerHTML = ranking.length === 0 ? "<li>Sem pontuação ainda</li>" : "";
    ranking.forEach((value, index) => {
      const item = document.createElement("li");
      item.textContent = `${index + 1}. ${value} pontos`;
      rankingList.appendChild(item);
    });
  }

  function resetGame() {
    playerY = groundY - playerHeight;
    playerVelocity = 0;
    obstacleX = obstacleStartX;
    currentSpeed = baseSpeed;
    distanceTravelled = 0;
    score = 0;
    gameActive = false;
    updateScore();
  }

  function startGame() {
    hasStarted = true;
    gameActive = true;
    obstacleX = obstacleStartX;
    currentSpeed = baseSpeed;
    score = 0;
    distanceTravelled = 0;
    playButton.disabled = true;
    gameMessage.textContent = "Use espaço para pular. Boa sorte!";
    updateScore();
  }

  function updateScore() {
    scoreText.textContent = `Pontuação: ${score}`;
  }

  function drawPlayer() {
    if (playerImage.complete && playerImage.naturalWidth > 0) {
      ctx.drawImage(playerImage, playerX, playerY - playerVisualOffset, playerWidth, playerHeight);
    } else {
      ctx.fillStyle = "#1e90ff";
      ctx.fillRect(playerX, playerY - playerVisualOffset, playerWidth, playerHeight);
    }
  }

  function drawObstacle() {
    ctx.fillStyle = "#ff4500";
    ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
  }

  function drawGround() {
    ctx.fillStyle = "rgba(15, 23, 42, 0.14)";
    ctx.fillRect(0, groundY + 2, canvas.width, 10);
  }

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#dde8ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGround();
    drawPlayer();
    drawObstacle();

    if (gameActive) {
      playerVelocity += gravity;
      playerY += playerVelocity;
      if (playerY > groundY) {
        playerY = groundY;
        playerVelocity = 0;
      }

      obstacleX -= currentSpeed;
      distanceTravelled += currentSpeed * 0.1;
      currentSpeed = baseSpeed + distanceTravelled * 0.002;

      if (obstacleX + obstacleWidth < 0) {
        obstacleX = canvas.width + Math.random() * 80;
        score += 15;
        updateScore();
      }

      const playerRight = playerX + playerWidth - 4;
      const obstacleLeft = obstacleX + 6;
      const obstacleRight = obstacleX + obstacleWidth - 6;
      const playerBottom = playerY + playerHeight - 2;
      const collisionY = playerBottom >= obstacleY + obstacleHeight - 3;

      if (obstacleRight > playerX + 4 && obstacleLeft < playerRight && collisionY) {
        gameActive = false;
        playButton.disabled = false;
        gameMessage.textContent = `Você caiu! Pontuação final: ${score}. Clique em Jogar para tentar novamente.`;
        updateRanking();
      }
    }

    requestAnimationFrame(drawGame);
  }

  function handleJump(event) {
    if (!gameActive) return;
    if (event.code === "Space" || event.key === " ") {
      event.preventDefault();
      if (playerY === groundY) {
        playerVelocity = jumpForce;
      }
    }
  }

  playButton.addEventListener("click", () => {
    startGame();
  });

  document.addEventListener("keydown", handleJump);
  renderRanking();
  resetGame();
  drawGame();
}

initDicasPage();
initSkateGame();

