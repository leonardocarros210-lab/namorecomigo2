
// /* =========================================
//    PERGUNTAS ROMÂNTICAS
// ========================================= */

// let respostas = 0;

// for (let i = 1; i <= 5; i++) {
//     let ama = confirm(
//         `Pergunta ${i}/5:\nVocê ama seu namorado? ❤️`
//     );

//     if (ama) {
//         respostas++;
//     } else {
//         alert("Resposta interrompida. 😅");
//         break;
//     }
// }

// if (respostas === 5) {
//     alert("Você respondeu 'Sim' 5 vezes! ❤️");
// }


/* =========================================
   BOTÃO INTERATIVO
========================================= */

const botao = document.getElementById("botao");
const resposta = document.getElementById("resposta");

botao.addEventListener("click", function () {
    botao.textContent = "Tudo ❤️";
    resposta.style.display = "block";
});


/* =========================================
   PRIMEIRO CARROSSEL
========================================= */

const imagensfernanda = [
    "assets/img/fer1.jpg",
    "assets/img/fer2.jpg",
    "assets/img/fer3.jpg",
    "assets/img/fer4.jpg",
    "assets/img/fer5.jpg",
    "assets/img/fer6.jpg",
    "assets/img/fer7.jpg",
    "assets/img/fer8.jpg",
    "assets/img/fer9.jpg",
    "assets/img/fer10.png",
    "assets/img/fer11.png",
    "assets/img/fer21.jpg",
    "assets/img/fer22.jpg",
    "assets/img/fer32.jpg",
    "assets/img/fefeabelha.jpg"
];


/* =========================================
   SEGUNDO CARROSSEL
========================================= */

const imagens = [
    "assets/img/dormindo.jpg",
    "assets/img/folhanda1.png",
    "assets/img/fotodahora.jpg",
    "assets/img/foto3.jpg",
    "assets/img/foto1.jpg",
    "assets/img/foto2.jpg",
    "assets/img/foto10.jpg",
    "assets/img/a _genteee.jpg",
    "assets/img/a_gente2.jpg",
    "assets/img/a_gente3.jpg",
    "assets/img/a_gente4.jpg",
    "assets/img/a_gente5.jpg",
    "assets/img/a_gente6.jpg",
    "assets/img/a_gente7.jpg",
    "assets/img/a_gente8.jpg",
    "assets/img/a_gente9.jpg",
    "assets/img/a_gente10.jpg"
];


/* =========================================
   PRÉ-CARREGAMENTO DAS IMAGENS
========================================= */

function carregarImagens(lista) {
    lista.forEach(function (caminho) {
        const imagem = new Image();
        imagem.src = caminho;
    });
}

carregarImagens(imagensfernanda);
carregarImagens(imagens);


/* =========================================
   FUNÇÃO DE TRANSIÇÃO SUAVE
========================================= */

function iniciarCarrossel(id, lista, intervalo) {

    const imagem = document.getElementById(id);

    if (!imagem || lista.length === 0) {
        return;
    }

    let indice = 0;
    const duracao = 700;

    setInterval(function () {

        // Desaparece suavemente
        imagem.style.opacity = "0";
        imagem.style.filter = "blur(5px)";

        setTimeout(function () {

            // Próxima imagem
            indice = (indice + 1) % lista.length;

            imagem.src = lista[indice];

            // Espera a imagem carregar
            if (imagem.complete && imagem.naturalWidth > 0) {
                imagem.style.opacity = "1";
                imagem.style.filter = "blur(0)";
            } else {
                imagem.onload = function () {
                    imagem.style.opacity = "1";
                    imagem.style.filter = "blur(0)";
                };
            }

        }, duracao);

    }, intervalo);
}


/* =========================================
   INICIAR OS CARROSSÉIS
========================================= */

// Primeiro carrossel: troca a cada 3 segundos
iniciarCarrossel("imagem1", imagensfernanda, 3000);

// Segundo carrossel: troca a cada 4 segundos
iniciarCarrossel("imagem", imagens, 4000);


/* =========================================
   CARROSSEL DOS ANIMAIS
========================================= */

const fotosAnimais = [
    "assets/img/animal1.jpg",
    "assets/img/animal2.jpg",
    "assets/img/animal3.jpg",
    "assets/img/animal4.jpg",
    "assets/img/animal5.jpg"
];

const imagemAnimal = document.getElementById("imagemAnimal");
const contadorAnimal = document.getElementById("contadorAnimal");

const animalAnterior = document.getElementById("animalAnterior");
const animalProximo = document.getElementById("animalProximo");

let indiceAnimal = 0;
let intervaloAnimal;
let trocandoAnimal = false;

/* Pré-carregar as imagens */

fotosAnimais.forEach(function (caminho) {
    const foto = new Image();
    foto.src = caminho;
});

/* Atualizar a foto */

function mudarAnimal(direcao) {

    if (trocandoAnimal) {
        return;
    }

    trocandoAnimal = true;

    imagemAnimal.classList.add("trocando-animal");

    setTimeout(function () {

        indiceAnimal =
            (indiceAnimal + direcao + fotosAnimais.length)
            % fotosAnimais.length;

        imagemAnimal.src = fotosAnimais[indiceAnimal];

        contadorAnimal.textContent =
            `${indiceAnimal + 1} / ${fotosAnimais.length}`;

        function mostrarAnimal() {
            imagemAnimal.classList.remove("trocando-animal");
            trocandoAnimal = false;
        }

        if (imagemAnimal.complete && imagemAnimal.naturalWidth > 0) {
            mostrarAnimal();
        } else {
            imagemAnimal.onload = mostrarAnimal;
            imagemAnimal.onerror = mostrarAnimal;
        }

    }, 600);
}

/* Trocar automaticamente */

function iniciarAnimais() {
    clearInterval(intervaloAnimal);

    intervaloAnimal = setInterval(function () {
        mudarAnimal(1);
    }, 4000);
}

/* Botão próximo */

animalProximo.addEventListener("click", function () {
    mudarAnimal(1);
    iniciarAnimais();
});

/* Botão anterior */

animalAnterior.addEventListener("click", function () {
    mudarAnimal(-1);
    iniciarAnimais();
});

/* Iniciar */

contadorAnimal.textContent = `1 / ${fotosAnimais.length}`;
iniciarAnimais();



const momentos = document.querySelectorAll(".momento");

if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(
        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visivel");

                    observador.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.1
        }
    );

    momentos.forEach(function (momento) {
        observador.observe(momento);
    });

} else {

    // Exibe os cartões em navegadores antigos
    momentos.forEach(function (momento) {
        momento.classList.add("visivel");
    });

}


/* ===== QUIZ DO NOSSO AMOR ===== */

const perguntasQuiz = [
    {
        pergunta: "Quem se apaixonou primeiro? 💘",
        alternativas: [
            "Os dois ao mesmo tempo😎",
            "Você🥰",
            "Eu ❤️",
            "É segredo 🤫"
        ],
        resposta: 2
    },
    {
        pergunta: "O que eu mais gosto em você? 💗",
        alternativas: [
            "Sua habilidade de fazer comida boa 😁",
            "Sua personalidade esquisitinha 🥹",
            "Seu cabelinho 🫶",
            "os tete 💖"
        ],
        resposta: 3
    },
    {
        pergunta: " o que mais a gente faz quando estamos em call 🌹",
        alternativas: [
            "almoçar",
            "mexer no ttk",
            "ver reels no insta",
            "jogar roblox ❤️"
        ],
        resposta: 3
    },
    {
        pergunta: "Como eu me sinto quando estou com você? 🥰",
        alternativas: [
            "com tesão e feliz 💕",
            "Com sono porque eu tenho preguiça de sair da sua cama 😴",
            "Com fome porque você me faz gastar energia de bike 🍕",
            "Querendo ir embora porque você ta me incomodando 😂"
        ],
        resposta: 0
    },
    {
        pergunta: "Qual dessas é minha comida favorita? 💞",
        alternativas: [
            "panqueca ❤️",
            "lasanha 🥹",
            "lingua de boi🌙",
            "carne de porco 💗"
        ],
        resposta: 3
    }
];

let perguntaAtual = 0;
let pontosQuiz = 0;
let respondeu = false;

const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoNumero = document.getElementById("numeroPergunta");
const elementoPontuacao = document.getElementById("pontuacao");
const elementoFeedback = document.getElementById("feedback");
const botaoProxima = document.getElementById("proximaPergunta");
const elementoQuiz = document.getElementById("quiz");
const elementoResultado = document.getElementById("resultadoQuiz");

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntasQuiz[perguntaAtual];

    elementoPergunta.textContent = atual.pergunta;
    elementoNumero.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntasQuiz.length}`;

    elementoPontuacao.textContent = `❤️ ${pontosQuiz} pontos`;
    elementoFeedback.textContent = "";
    elementoAlternativas.innerHTML = "";
    botaoProxima.hidden = true;

    atual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.className = "alternativa";
        botao.textContent = alternativa;

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        elementoAlternativas.appendChild(botao);
    });
}

function verificarResposta(indice, botaoEscolhido) {
    if (respondeu) return;

    respondeu = true;

    const atual = perguntasQuiz[perguntaAtual];
    const botoes = elementoAlternativas.querySelectorAll(".alternativa");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indice === atual.resposta) {
        pontosQuiz++;

        botaoEscolhido.classList.add("correta");
        elementoFeedback.textContent = "Acertou, meu amor! ❤️🥰";
    } else {
        botaoEscolhido.classList.add("errada");
        botoes[atual.resposta].classList.add("correta");

        elementoFeedback.textContent =
            "Quase, meu amor! Olha a alternativa verdinha 💗";
    }

    elementoPontuacao.textContent = `❤️ ${pontosQuiz} pontos`;

    botaoProxima.hidden = false;

    if (perguntaAtual === perguntasQuiz.length - 1) {
        botaoProxima.textContent = "Ver resultado 💕";
    } else {
        botaoProxima.textContent = "Próxima pergunta ❤️";
    }
}

botaoProxima.addEventListener("click", () => {
    if (!respondeu) return;

    perguntaAtual++;

    if (perguntaAtual < perguntasQuiz.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {
    elementoQuiz.hidden = true;
    elementoResultado.hidden = false;

    document.getElementById("tituloResultado").textContent =
        `Você fez ${pontosQuiz} de ${perguntasQuiz.length} pontos! 💗`;

    let mensagem = "";

    if (pontosQuiz === perguntasQuiz.length) {
        document.getElementById("presentesQuiz").hidden = false;
        mensagem =
            "PERFEITA! 😍 Você acertou tudo!\n\n" +
            "Mas a maior certeza que eu tenho é que " +
            "sou muito feliz por ter você na minha vida. " +
            "Eu te amo infinitamente, meu amor! ❤️";
    } else if (pontosQuiz >= 3) {
        mensagem =
            "Mandou muito bem, meu amor! 🥰\n\n" +
            "Cada momento com você é especial para mim. " +
            "Quero continuar criando milhares de lembranças " +
            "ao seu lado. Eu te amo! 💕";
    } else {
        mensagem =
            "Tudo bem, meu amor! 😂❤️\n\n" +
            "O importante não é acertar todas as perguntas, " +
            "mas saber que a nossa história é especial. " +
            "Quero viver muitos outros momentos com você! 💗";
    }

    document.getElementById("mensagemResultado").textContent = mensagem;
}

document.getElementById("reiniciarQuiz").addEventListener("click", () => {
    perguntaAtual = 0;
    pontosQuiz = 0;

    elementoQuiz.hidden = false;
    elementoResultado.hidden = true;

    botaoProxima.textContent = "Próxima pergunta ❤️";

    mostrarPergunta();
});

mostrarPergunta();
