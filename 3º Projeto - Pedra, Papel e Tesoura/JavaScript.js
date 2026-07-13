// ===============================
// Pedra/Papel/Tesoura - versão com interface
// ===============================

const choices = ["Pedra", "Papel", "Tesoura"];
const TOTAL_ROUNDS = 5;

let pontuacaoHumana = 0;
let pontuacaoComputador = 0;
let rodadaAtual = 1;
let jogoAtivo = true;

const elRound = document.getElementById("round");
const elScoreHumana = document.getElementById("scoreHumana");
const elScoreComputador = document.getElementById("scoreComputador");
const elMessage = document.getElementById("message");
const elReset = document.getElementById("reset");
const buttons = document.querySelectorAll(".choice");

const choiceToEmoji = {
    Pedra: "🪨",
    Papel: "📄",
    Tesoura: "✂️",
};

const elTurn = document.getElementById("turn");

let turnHumana = true;
let esperandoComputador = false;

function isChoiceValid(choice) {
    return choices.includes(choice);
}

function escolha_do_computador() {
    const numeroAleatorio = Math.floor(Math.random() * 3);
    return choices[numeroAleatorio];
}

function playRound(escolhaHumana, escolhaComputador) {
    if (!isChoiceValid(escolhaHumana)) {
        // Não deveria acontecer pois só acionamos via botões.
        elMessage.textContent = "Escolha inválida.";
        return;
    }

    // Empate
    if (escolhaHumana === escolhaComputador) {
        elMessage.textContent = `Você escolheu ${escolhaHumana}. Computador escolheu ${escolhaComputador}. Empate!`;
        return;
    }

    const humanaVence =
        (escolhaHumana === "Pedra" && escolhaComputador === "Tesoura") ||
        (escolhaHumana === "Papel" && escolhaComputador === "Pedra") ||
        (escolhaHumana === "Tesoura" && escolhaComputador === "Papel");

    if (humanaVence) {
        pontuacaoHumana++;
        elMessage.textContent = `Você escolheu ${escolhaHumana}. Computador escolheu ${escolhaComputador}. Você venceu!`;
    } else {
        pontuacaoComputador++;
        elMessage.textContent = `Você escolheu ${escolhaHumana}. Computador escolheu ${escolhaComputador}. Computador venceu!`;
    }

    elScoreHumana.textContent = pontuacaoHumana;
    elScoreComputador.textContent = pontuacaoComputador;
}

function updateUI() {
    elRound.textContent = rodadaAtual;
    elScoreHumana.textContent = pontuacaoHumana;
    elScoreComputador.textContent = pontuacaoComputador;
}

function endGame() {
    jogoAtivo = false;

    if (pontuacaoHumana > pontuacaoComputador) {
        elMessage.textContent = "Parabéns! Você venceu o jogo!";
    } else if (pontuacaoComputador > pontuacaoHumana) {
        elMessage.textContent = "O computador venceu o jogo!";
    } else {
        elMessage.textContent = "O jogo terminou empatado!";
    }
}

function setTurnText(text, isHumana) {
    if (elTurn) {
        elTurn.textContent = text;
        elTurn.style.color = isHumana ? "#45a3ff" : "#2dd4bf";
    }
}

function disableChoices(disabled) {
    buttons.forEach((btn) => {
        btn.disabled = disabled;
        btn.style.opacity = disabled ? "0.55" : "1";
        btn.style.cursor = disabled ? "not-allowed" : "pointer";
    });
}

function handleUserChoice(choice) {
    if (!jogoAtivo) return;
    if (esperandoComputador) return;

    // vez do humano
    turnHumana = true;
    setTurnText(`Sua vez! (${choiceToEmoji[choice] || ""} ${choice})`, true);

    disableChoices(true);
    esperandoComputador = true;

    const computador = escolha_do_computador();

    // “tempo” pra dar sensação de turno do computador
    window.setTimeout(() => {
        playRound(choice, computador);

        // agora computador “termina” a jogada e vamos pra próxima rodada
        esperandoComputador = false;
        turnHumana = true;

        rodadaAtual++;
        if (rodadaAtual > TOTAL_ROUNDS) {
            updateUI();
            endGame();
            disableChoices(true);
            setTurnText("Fim do jogo!", false);
            return;
        }

        updateUI();
        setTurnText("Sua vez! Escolha Pedra/Papel/Tesoura.", true);
        disableChoices(false);
    }, 600);
}


function resetGame() {
    pontuacaoHumana = 0;
    pontuacaoComputador = 0;
    rodadaAtual = 1;
    jogoAtivo = true;
    esperandoComputador = false;
    turnHumana = true;

    if (elMessage) elMessage.textContent = "";
    updateUI();
    setTurnText("Sua vez! Escolha Pedra/Papel/Tesoura.", true);

    disableChoices(false);
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const choice = btn.getAttribute("data-choice");
        if (!isChoiceValid(choice)) return;
        handleUserChoice(choice);
    });
});



if (elReset) {
    elReset.addEventListener("click", () => {
        // garante que interrompe qualquer “turno do computador” em andamento
        esperandoComputador = false;
        jogoAtivo = true;
        resetGame();
    });
}

resetGame();