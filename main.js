let inputs = document.querySelectorAll(".input");
let outputs = document.querySelectorAll(".output");
let sortElements = document.querySelectorAll(".sortElements");
let sortTotal = document.querySelectorAll(".sortTotal");

// Esse array armazena a os índices de acerto do jogador, sendo o [0] 6 acertos e [5] 1 acerto.
let arrayAcertos = [0, 0, 0, 0, 0, 0, 0]
let isRunning = false

const playBtn = document.querySelector(".jogar");
const playSeqBtn = document.querySelector(".jogarSeq");
const stopBtn = document.querySelector(".pararSorteio");

let intervals = [];

let playerNums = [];

inputs.forEach(input => {
    input.addEventListener('input', () =>{
        input.value > 60 ? input.value = 60 : null;
        input.value < 1 ? input.value = "" : null;
    })
})

// Sensor de click do botão play
playBtn.addEventListener('click', () =>{
    corretorInputs();
    startSorteio();
})

playSeqBtn.addEventListener('click', () =>{
    corretorInputs()
    interval = [];
    isRunning = true;
    const newInterval = setInterval(() => {
        startSorteio();
    }, 100);
    intervals.push(newInterval)
})

stopBtn.addEventListener('click', () =>{
    
    if(!isRunning){
        arrayAcertos = [0, 0, 0, 0, 0, 0, 0]
        sortElements[5].innerHTML = ("jogos com " + 1 + " acertos: " + 0)
        sortElements[4].innerHTML = ("jogos com " + 2 + " acertos: " + 0)
        sortElements[3].innerHTML = ("jogos com " + 3 + " acertos: " + 0)
        sortElements[2].innerHTML = ("jogos com " + 4 + " acertos: " + 0)
        sortElements[1].innerHTML = ("jogos com " + 5 + " acertos: " + 0)
        sortElements[0].innerHTML = ("jogos com " + 6 + " acertos: " + 0)
        sortTotal[0].innerHTML = ("Sorteios realizados: " + 0);
    }
    intervals.forEach(id => clearInterval(id)); // para todos
    intervals = [];
    isRunning = false;
})

function corretorInputs(){
        // Corrige os inputs do usuário e adiciona o "0" em números abaixo de 10
    inputs.forEach(input =>{
        input.value = "" || input.value < 1 ? input.value = "01" : input.value = input.value;
        input.value.length === 1 ? input.value = "0" + input.value: input.value = input.value;
    })
    
    // Depois de corrigido, adiciona os números no array abaixo
    playerNums = [];
    inputs.forEach(input =>{
        playerNums.push(input.value)
    })

    // Coloca os números em ordem crescente
    playerNums.sort((a, b) => a - b)

    // Corrige a ordem visivelmente nos inputs
    for(let i in playerNums){
        inputs[i].value = playerNums[i];
    }

    console.log(playerNums)
}

// Função que dá inicio ao jogo
const startSorteio = () => {
    let sorteados = [];
    
    // Continua sorteando enquanto o Array não tem os 6 números
    while (sorteados.length < 6) {
        let numSorteado = sorteio(1, 60);

        //Adiciona o "0" antes dos números de 1 a 9
        numSorteado = numSorteado.toString().length === 1 ? "0" + numSorteado : numSorteado.toString();
        
        // Verifica se o número sorteado já existe, se sim, recomeça o escopo
        if (sorteados.includes(numSorteado)) {
            continue
        }
        // Adiciona o número sorteado ao array
        sorteados.push(numSorteado);
    }
    
    // Ordena os números de forma crescente
    sorteados.sort((a, b) => a - b);

    // Modifica a tabela com novos valores
    switch(quantAcertos(sorteados)){
        case 1:{
            arrayAcertos[5]++
            sortElements[5].innerHTML = ("jogos com 1 acertos: " + arrayAcertos[5]);
            break;
        }
        case 2:{
            arrayAcertos[4]++
            sortElements[4].innerHTML = ("jogos com 2 acertos: " + arrayAcertos[4]);
            break;
        }
        case 3:{
            arrayAcertos[3]++
            sortElements[3].innerHTML = ("jogos com 3 acertos: " + arrayAcertos[3]);
            break;
        }
        case 4:{
            arrayAcertos[2]++
            sortElements[2].innerHTML = ("jogos com 4 acertos: " + arrayAcertos[2]);
            break;
        }
        case 5:{
            arrayAcertos[1]++
            sortElements[1].innerHTML = ("jogos com 5 acertos: " + arrayAcertos[1]);
            break;
        }
        case 6:{
            arrayAcertos[0]++
            sortElements[0].innerHTML = ("jogos com 6 acertos: " + arrayAcertos[0]);
            break;
        }
    }

    // Adiciona os números sorteados na tela
    for(let i in sorteados){
        outputs[i].value = sorteados[i]
    }

    arrayAcertos[6]++
    sortTotal[0].innerHTML = ("Sorteios realizados: " + arrayAcertos[6]);
    
    console.log("Sorteado: " + sorteados);
    console.log("Número de acertos:" + quantAcertos(sorteados))
}

// Função para sorteio de números aleatórios
function sorteio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

// Diz a quantidade de acertos do usuário
function quantAcertos(numSorteados) {
    let acertos = 0;

    for (let sorteado of numSorteados) {
        for (let escolhido of playerNums) {
            if (escolhido === sorteado) {
                acertos++;
            }
        }
    }

    return acertos;
}
