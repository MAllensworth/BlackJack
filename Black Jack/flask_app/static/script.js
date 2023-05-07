
document.addEventListener('DOMContentLoaded', () => {

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        for (let suit of ['Spades', 'Clubs', 'Diamonds', 'Hearts']) {
            for (let value of ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']) {
                this.cards.push(new Card(suit, value));
            }
        }
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop();
    }
}

function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    } else if (card.value === 'A') {
        return 11;
    } else {
        return parseInt(card.value, 10);
    }
}

function getCardCount(card) {
    if (['2', '3', '4', '5', '6'].includes(card.value)) {
        return 1;
    } else if (['7', '8', '9'].includes(card.value)) {
        return 0;
    } else {
        return -1;
    }
}

function updateGameOutcome(playerHand, dealerHand) {
    const playerValue = playerHand.reduce((total, card) => total + getCardValue(card), 0);
    const dealerValue = dealerHand.reduce((total, card) => total + getCardValue(card), 0);
    const outcomeElem = document.getElementById('outcome');
    
    if (playerValue > 21 || (dealerValue <= 21 && dealerValue > playerValue)) {
        outcomeElem.textContent = 'You lost!';
    } else if (dealerValue > 21 || playerValue > dealerValue) {
        outcomeElem.textContent = 'You won!';
    } else {
        outcomeElem.textContent = 'It\'s a draw!';
    }
}


const dealBtn = document.getElementById('deal-btn');
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
const playerHandElem = document.getElementById('player-hand');
const dealerHandElem = document.getElementById('dealer-hand');
const runningCountElem = document.getElementById('running-count');
const trueCountElem = document.getElementById('true-count');
const playerValueElem = document.getElementById('player-value');
const dealerValueElem = document.getElementById('dealer-value');

dealBtn.addEventListener('click', () => {
    const deck = new Deck();
    const playerHand = [deck.draw(), deck.draw()];
    const dealerHand = [deck.draw(), deck.draw()];

    playerHandElem.innerHTML = playerHand.map(card => `<div class="card">${card.value} of ${card.suit}</div>`).join('');
    dealerHandElem.innerHTML = dealerHand.map(card => `<div class="card">${card.value} of ${card.suit}</div>`).join('');

    let runningCount = playerHand.concat(dealerHand).reduce((count, card) => count + getCardCount(card), 0);
    let trueCount = runningCount / (deck.cards.length / 52);

    runningCountElem.textContent = runningCount;
    trueCountElem.textContent = trueCount.toFixed(2);
});

hitBtn.addEventListener('click', () => {
    const card = deck.draw();
    playerHand.push(card);
    playerHandElem.innerHTML += `<div class="card">${card.value} of ${card.suit}</div>`;
    runningCountElem.textContent = parseInt(runningCountElem.textContent) + getCardCount(card);
    trueCountElem.textContent = (parseInt(runningCountElem.textContent) / (deck.cards.length / 52)).toFixed(2);

    playerValueElem.textContent = playerHand.reduce((total, card) => total + getCardValue(card), 0);
});

standBtn.addEventListener('click', () => {
    while (dealerHand.reduce((total, card) => total + getCardValue(card), 0) < 17) {
        const card = deck.draw();
        dealerHand.push(card);
        dealerHandElem.innerHTML += `<div class="card">${card.value} of ${card.suit}</div>`;
        runningCountElem.textContent = parseInt(runningCountElem.textContent) + getCardCount(card);
        trueCountElem.textContent = (parseInt(runningCountElem.textContent) / (deck.cards.length / 52)).toFixed(2);
    }

    dealerValueElem.textContent = dealerHand.reduce((total, card) => total + getCardValue(card), 0);
    updateGameOutcome(playerHand, dealerHand);
});


// ... (other code) ...

// Update the hand value display in the deal button event listener
playerValueElem.textContent = playerHand.reduce((total, card) => total + getCardValue(card), 0);
dealerValueElem.textContent = dealerHand.reduce((total, card) => total + getCardValue(card), 0);

// ... (other code) ...

// Update the hand value display in the hit button event listener
playerValueElem.textContent = playerHand.reduce((total, card) => total + getCardValue(card), 0);

// ... (other code) ...

// Update the hand value display in the stand button event listener
dealerValueElem.textContent = dealerHand.reduce((total, card) => total + getCardValue(card), 0);


}); // Close the event listener

