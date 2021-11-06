const images = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];
let numCards =0;
let cards = [];
let usedCards = [];
const table = document.querySelector('.table');

game();

function game(){
    startGame();
    shuffleAndPlace();
}

function startGame(){
    do{
        numCards = prompt('Digite o número de cartas (entre 4 e 14)');
    }while(numCards<4 || (numCards%2)>0 || numCards>14);
}

function shuffleAndPlace(){
    for (let i = 0; i < images.length; i++) {
        for (let ii = 0; ii < 2; ii++) {
            let cardHTML = `
            <li data-identifier="card" onclick="flip(this)" class="card">
                <div data-identifier="back-face" class="front-face face">
                    <img class="card-image" src="assets/front.png" />
                </div>
                <div data-identifier="front-face" class="back-face face">
                    <img class="card-image" src="assets/${images[i]}" />
                </div>
            </li>`
            cards.push(cardHTML);
        }    
    }
    for (let i = 0; i < numCards; i++) {
        usedCards.push(cards[i]);
    }
    for (let i = 0; i < usedCards.length; i++) {
        table.innerHTML += usedCards[i];
        
    }
}

function shuffleCards(){
    return Math.random() - 0.5;
}

function flip(card){
    card.classList.toggle('fliped');
}