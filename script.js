const images = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];
let numCards =0;
let cards = [];
let usedCards = [];
const table = document.querySelector('.table');
let isSecondCard = false;
let firstCard;
let secondCard;
let restart;
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
    usedCards = usedCards.sort(shuffleCards);
    for (let i = 0; i < usedCards.length; i++) {
        table.innerHTML += usedCards[i];   
    }
}
function shuffleCards(){
    return Math.random() - 0.5;
}
function flip(card){
    card.classList.add('fliped');
    if(isSecondCard === false){
        isSecondCard = true;
        firstCard = card;
    }
    else{
        isSecondCard = false;
        secondCard = card;
        verifySelectedCards();
        setTimeout(isGameOwned, 500);
    }
}
function verifySelectedCards(){
    if(firstCard.innerHTML === secondCard.innerHTML){
        firstCard.classList.add('correct-card');
        secondCard.classList.add('correct-card');
        firstCard.classList.remove('fliped');
        secondCard.classList.remove('fliped');
    }
    else{
        setTimeout(unflip, 1000);
    }
}
function unflip(){
    firstCard.classList.remove('fliped');
    secondCard.classList.remove('fliped');
}
function isGameOwned(){
    const correctCards = document.querySelectorAll('.correct-card');
    if(correctCards.length == numCards){
        alert('Parabéns, você venceu!!!');
        restart = prompt('Deseja recomeçar o jogo?[s/n]');
        if(restart == 's' || restart == 'S'){
            resetGameVariables();
            game();
        }
    }
}
function resetGameVariables(){
    isSecondCard = false;
    firstCard = '';
    secondCard = '';
    table.innerHTML = '';
    usedCards = [];
    cards = [];
}