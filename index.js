const perguntas = [
    {
        imagem: "9.jpg",
        pergunta: "Qual o nome do presidente do Brasil que ficou conhecido como Jango?",
        respostaCerta: "João Goulart",
        respostas: [
            "Jacinto Anjos",
            "Getúlio Vargas",
            "João Figueiredo",
            "João Goulart"
        ]
    },
    {
        imagem: "10.jpg",
        pergunta: "Quais o menor e o maior país do mundo?",
        respostaCerta: "Vaticano e Rússia",
        respostas: [
            "Vaticano e Rússia",
            "Nauru e China",
            "Mônaco e Canadá",
            "São Marino e Índia"
        ]
    },
    {
        imagem: "11.jpg",
        pergunta: "De quem é a famosa frase “Penso, logo existo”?",
        respostaCerta: "Descartes",
        respostas: [
            "Platão",
            "Galileu Galilei",
            "Descartes",
            "Sócrates"
        ]
    },
    {
        imagem: "12.jpg",
        pergunta: "De onde é a invenção do chuveiro elétrico?",
        respostaCerta: "Brasil",
        respostas: [
            "França",
            "Inglaterra",
            "Brasil",
            "Itália",
        ]
    },
    {
        imagem: "13.jpg",
        pergunta: "Quantas casas decimais tem o número pi?",
        respostaCerta: "Infinitas",
        respostas: [
            "Centenas",
            "Infinitas",
            "Vinte",
            "Milhares"
        ]
    },

];


const formularioQuiz = document.querySelector("#formulario-quiz");
const spanNumeroDaPergunta = document.querySelector("#numero-da-pergunta");
const areaTextoPergunta = document.querySelector("#texto-pergunta");
let pontos = 0;
let labels = [];
let inputRespostas = [];

for (let i = 1; i <= 4; i++) {
    labels.push(document.querySelector(`#label${i}`));
    inputRespostas.push(document.querySelector(`#resposta${i}`));
}
// Quando iniciar
let linhaCronometro = null;
let tamanhoAtualDaLinha = 100;
const totalDePerguntas = perguntas.length;

function iniciarJogo() {

    iniciarContador();

    formularioQuiz.addEventListener("submit", (e) => {
        e.preventDefault();
        const resposta = e.target.resposta.value;

        const numeroDaPergunta = parseInt(spanNumeroDaPergunta.innerHTML);
        const posicaoAtual = numeroDaPergunta + 1;

        // Verifica se acertou a pergunta
        if (perguntas[numeroDaPergunta].respostaCerta === resposta) {
            pontos++;

            // Verifica se a posicao atual chegou na ultima resposta
            if (posicaoAtual < totalDePerguntas) {
                this.mudarPergunta(numeroDaPergunta, posicaoAtual);
            } else {
                finalizarJogo(pontos);
            }

        } else {
            // Verifica se a posicao atual chegou na ultima resposta
            if (posicaoAtual < totalDePerguntas) {
                this.mudarPergunta(numeroDaPergunta, posicaoAtual);
            } else {
                finalizarJogo(pontos);
            }
            // mudarPergunta(numeroDaPergunta, posicaoAtual)
        }

    });
}

function iniciarContador() {



    linhaCronometro = setInterval(() => {
        const linha = document.querySelector("#linha-tempo");
        tamanhoAtualDaLinha = tamanhoAtualDaLinha - 10;

        if (tamanhoAtualDaLinha > 0) {
            linha.style.width = `${tamanhoAtualDaLinha}%`;
        } else {
            const numeroDaPergunta = parseInt(document.querySelector("#numero-da-pergunta").innerHTML);
            if (numeroDaPergunta + 1 === totalDePerguntas) {
                this.finalizarJogo(pontos);
            } else {
                this.mudarPergunta(numeroDaPergunta, (numeroDaPergunta + 1));
            }
        }

    }, 1000);




}


function mudarPergunta(numeroDaPergunta, posicaoAtual) {

    // Resetando os dados da linha
    const linha = document.querySelector("#linha-tempo");
    linha.style.width = `100%`;
    tamanhoAtualDaLinha = 100;
    clearInterval(linhaCronometro);

    // Mudando a pergunta
    const imagem = document.querySelector("#imagem-quiz");
    imagem.src = `./fotos/${perguntas[posicaoAtual].imagem}`;

    spanNumeroDaPergunta.innerHTML = numeroDaPergunta + 1;
    areaTextoPergunta.innerHTML = perguntas[(numeroDaPergunta + 1)].pergunta;

    for (let i = 0; i <= 3; i++) {
        labels[i].innerHTML = perguntas[posicaoAtual].respostas[i];
        inputRespostas[i].value = perguntas[posicaoAtual].respostas[i];
    }

    // Inicia contador
    this.iniciarContador();
}


function finalizarJogo(pontuacao) {
    let gabarito = [];
    perguntas.forEach(pergunta => {
        console.log(pergunta.respostaCerta);
        gabarito.push(pergunta.respostaCerta);
    });

    window.localStorage.setItem("pontuacao", pontuacao);
    window.localStorage.setItem("gabarito", gabarito);
    window.location.href = "gameover.html";
}


this.iniciarJogo();

