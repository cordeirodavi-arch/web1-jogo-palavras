// Lista com 12 palavras e dicas (Desafio extra: array de objetos)
const palavras = [
    { palavra: "javascript", dica: "Linguagem que dá comportamento às páginas web" },
    { palavra: "html", dica: "Linguagem de marcação que estrutura a página" },
    { palavra: "css", dica: "Responsável pelo estilo e visual do site" },
    { palavra: "internet", dica: "Rede mundial de computadores" },
    { palavra: "navegador", dica: "Programa usado para acessar sites (Chrome, Firefox...)" },
    { palavra: "programacao", dica: "Ato de escrever instruções para o computador" },
    { palavra: "computador", dica: "Máquina eletrônica que processa dados" },
    { palavra: "algoritmo", dica: "Sequência finita de passos para resolver um problema" },
    { palavra: "variavel", dica: "Espaço na memória para guardar um valor" },
    { palavra: "github", dica: "Plataforma usada para hospedar repositórios de código" },
    { palavra: "servidor", dica: "Computador que fornece recursos ou páginas na rede" },
    { palavra: "teclado", dica: "Periférico de entrada usado para digitar" }
];

// Variáveis de estado do jogo
let palavraSecreta = "";
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoAtivo = true;
let vitorias = 0;
let derrotas = 0;

// Elementos do DOM
const elementoPalavra = document.getElementById("palavra");
const elementoDica = document.getElementById("dica");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");
const elementoVitorias = document.getElementById("vitorias");
const elementoDerrotas = document.getElementById("derrotas");

function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);
    palavraSecreta = palavras[indice].palavra;
    elementoDica.textContent = "Dica: " + palavras[indice].dica;

    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoAtivo = true;

    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "Nenhuma";
    mensagem.textContent = "Digite uma letra para começar!";
    mensagem.className = "";

    inputLetra.disabled = false;
    botaoTentar.disabled = false;
    inputLetra.value = "";
    inputLetra.focus();

    atualizarPalavra();
}

function atualizarPalavra() {
    let exibicao = "";
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];
        if (letrasCorretas.includes(letra)) {
            exibicao += letra.toUpperCase() + " ";
        } else {
            exibicao += "_ ";
        }
    }
    elementoPalavra.textContent = exibicao.trim();
}

function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];
        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }
    return true;
}

function finalizarJogo(ganhou) {
    jogoAtivo = false;
    inputLetra.disabled = true;
    botaoTentar.disabled = true;

    if (ganhou) {
        vitorias++;
        elementoVitorias.textContent = vitorias;
        mensagem.textContent = "Parabéns! Você venceu!";
        mensagem.className = "acerto";
    } else {
        derrotas++;
        elementoDerrotas.textContent = derrotas;
        mensagem.textContent = "Você perdeu! A palavra era: " + palavraSecreta.toUpperCase();
        mensagem.className = "erro";
    }
}

function verificarLetra() {
    if (!jogoAtivo) return;

    const letra = inputLetra.value.toLowerCase().trim();
    inputLetra.value = "";
    inputLetra.focus();

    // Valida se digitou uma letra válida de A a Z
    if (letra === "" || !/^[a-z]$/.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra válida (A-Z).";
        mensagem.className = "aviso";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Letra já utilizada!";
        mensagem.className = "aviso";
        return;
    }

    letrasUsadas.push(letra);
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ").toUpperCase();

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou!";
        mensagem.className = "acerto";
    } else {
        tentativas--;
        elementoTentativas.textContent = tentativas;
        mensagem.textContent = "Você errou!";
        mensagem.className = "erro";
    }

    atualizarPalavra();

    if (venceu()) {
        finalizarJogo(true);
    } else if (tentativas === 0) {
        finalizarJogo(false);
    }
}

// Eventos
botaoTentar.addEventListener("click", verificarLetra);
botaoReiniciar.addEventListener("click", iniciarJogo);

// Desafio extra: enviar com a tecla Enter
inputLetra.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        verificarLetra();
    }
});

// Inicia a primeira partida
iniciarJogo();