/*jshint esversion: 6 */

/* Constants */
const SUITICONS = {
    'spades': 's',
    'hearts': 'h',
    'diamonds': 'd',
    'clubs': 'c'
};

/* State Variables */
let deck;
let winner;
let playerHand;
let dealerHand;
let currentBet;
let currentWinnings;
let currentChips;
let playerScore;
let dealerScore;
let numberOfGames = 0;

/* Cached Elements */
let playerCard = {
    '1': document.querySelector('.card-image-1'),
    '2': document.querySelector('.card-image-2'),
    '3': document.querySelector('.card-image-3'),
    '4': document.querySelector('.card-image-4'),
    '5': document.querySelector('.card-image-5'),
    '6': document.querySelector('.card-image-6'),
    '7': document.querySelector('.card-image-7'),
    '8': document.querySelector('.card-image-8')
};
let dealerCard = {
    '1': document.querySelector('.dcard-image-1'),
    '2': document.querySelector('.dcard-image-2'),
    '3': document.querySelector('.dcard-image-3'),
    '4': document.querySelector('.dcard-image-4'),
    '5': document.querySelector('.dcard-image-5'),
    '6': document.querySelector('.dcard-image-6'),
    '7': document.querySelector('.dcard-image-7'),
    '8': document.querySelector('.dcard-image-8'),
};
let dealButton = document.querySelector('.deal-button');
let currentWinningsEl = document.querySelector('.winnings');
let messageEl = document.querySelector('.message');
let standButton = document.querySelector('.stand-button');
let hitButton = document.querySelector('.hit-button');
let nextHand = document.querySelector('.new-hand');
let playerScoreEl = document.querySelector('.player-score');
let currentChipsEl = document.querySelector('.chips');
let loanButton = document.querySelector('.loan-button');

/* Event Listeners: */
dealButton.addEventListener("click", function () {
    currentBet = parseInt(document.querySelector(".bet-number").value);
    deal();
});
standButton.addEventListener("click", calcPlayerWins);
hitButton.addEventListener("click", hit);
nextHand.addEventListener("click", function () {
    numberOfGames++;
    init();
});
loanButton.addEventListener("click", function () {
    currentChips += 1000;
    currentWinnings -= 1000;
    switchButtonVisability(loanButton, "hidden");
    init();
});

/* Functions and Classes */
//Card class that defines how the cards will be setup in the deck
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}
// Deck class that allows me to create a deck, shuffle it, and deal the cards
class Deck {
    constructor() {
        this.deck = [];
    }
    populateDeck() {
        const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
        const suits = ["hearts", "diamonds", "clubs", "spades"];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.deck.push(new Card(ranks[j], suits[i]));
            }
        }
    }
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
    dealCard(int) {
        return this.deck.splice(0, int);
    }
}

init();
switchButtonVisability(hitButton, "hidden");
switchButtonVisability(standButton, "hidden");
switchButtonVisability(loanButton, "hidden");
function init() {
    currentBet = 0;
    deck = new Deck();
    deck.populateDeck();
    deck.shuffle();
    playerHand = [];
    dealerHand = [];
    winner = null;
    dealerScore = 0;
    playerScore = 0;
    switchButtonVisability(nextHand, "hidden");
    renderScore(playerScore);
    if (numberOfGames !== 0 && currentChips > 0) {
        render("Place a bet.");
        switchButtonVisability(dealButton, "visible");
    } else if (currentChips === 0) {
        render("You are out of chips! Want a loan?");
        switchButtonVisability(loanButton, "visible");
    } else {
        currentWinnings = 0;
        console.log("Jimmoih")
        currentChips = 1000;
        render("Welcome to BlackJack! <br> Place a bet.");
    }
}




function deal() {
    switchButtonVisability(hitButton, "visible");
    switchButtonVisability(standButton, "visible");
    switchButtonVisability(dealButton, "hidden");
    if (currentBet == 0) {
        renderMessage("You must bet more than 0 dollars!");
        switchButtonVisability(hitButton, "hidden");
        switchButtonVisability(standButton, "hidden");
        switchButtonVisability(dealButton, "visible");
    } else if (currentBet > currentChips) {
        renderMessage("You cannot bet more than what you have!");
        switchButtonVisability(hitButton, "hidden");
        switchButtonVisability(standButton, "hidden");
        switchButtonVisability(dealButton, "visible");
    } else {
        currentWinnings -= currentBet;
        currentChips -= currentBet;
        playerHand = deck.dealCard(2);
        dealerHand = deck.dealCard(2);
        playerCard[1].classList.add(`card`, `${SUITICONS[playerHand[0].suit]}${playerHand[0].rank}`);
        playerCard[2].classList.add(`card`, `${SUITICONS[playerHand[1].suit]}${playerHand[1].rank}`);
        dealerCard[2].classList.add(`card`, `${SUITICONS[dealerHand[1].suit]}${dealerHand[1].rank}`);
        dealerCard[1].classList.add(`card`, `back`);
        renderMessage("");
        calcCurrentScore("P");
        renderScore(playerScore);
        if (playerScore >= 21 ) {
            calcPlayerWins();
        } else {
            return;
        }
    }
}

function calcPlayerWins() {
    revealFacedown();
    if (playerScore <= 21) {
        dealerDeals(dealerScore);
        if (playerScore === dealerScore) {
            winner = 'T';
            currentWinnings += currentBet;
            currentChips += currentBet;
            renderMessage("Push! Here's your money back.");
        } else if (playerScore > dealerScore || dealerScore > 21 || (playerScore === 21 && dealerScore !== 21)) {
            winner = 'P';
            currentWinnings += currentBet * 2;
            currentChips += currentBet * 2;
            renderMessage(`You win! You won ${currentBet * 2}$`);
        } else {
            winner = 'D';
            renderMessage(`Dealer Wins! You lost ${currentBet}$`);
        }
    } else {
        winner = 'D';
        renderMessage(`You Bust! You lost ${currentBet}$`);
    }
    switchButtonVisability(hitButton, "hidden");
    switchButtonVisability(standButton, "hidden");
    switchButtonVisability(nextHand, "visible");
}


function calcScore(rank) {
    let score = 0;
    switch (rank) {
        case 'A':
            score += 1;
            break;
        case '02':
            score += 2;
            break;
        case '03':
            score += 3;
            break;
        case '04':
            score += 4;
            break;
        case '05':
            score += 5;
            break;
        case '06':
            score += 6;
            break;
        case '07':
            score += 7;
            break;
        case '08':
            score += 8;
            break;
        case '09':
            score += 9;
            break;
        case '10':
            score += 10;
            break;
        case 'J':
            score += 11;
            break;
        case 'Q':
            score += 12;
            break;
        case 'K':
            score += 13;
            break;
    }
    return score;
}

function renderMessage(message) {
    messageEl.innerHTML = message;
    currentWinningsEl.innerHTML = `Current Winnings: ${currentWinnings}$`;
    currentChipsEl.innerHTML = `Current Chips: ${currentChips}$`;
}

function revealFacedown() {
    dealerCard[1].classList.remove('back');
    dealerCard[1].classList.add(`card`, `${SUITICONS[dealerHand[0].suit]}${dealerHand[0].rank}`);
}
function hit() {
    let cardToHit = deck.dealCard(1);
    playerHand.push(cardToHit[0]);
    calcCurrentScore("P");
    renderScore(playerScore);
    playerCard[playerHand.length].classList.add(`card`, `${SUITICONS[playerHand[playerHand.length - 1].suit]}${playerHand[playerHand.length - 1].rank}`);
    if (playerScore >= 21) {
        calcPlayerWins();
    }
}

function render(message) {
    renderMessage(message);
    resetBoard();

}

function resetBoard() {
    for (let element in playerCard) {
        playerCard[element].className = '';
        playerCard[element].classList.add(`card-image-${element}`);
    }
    for (let delement in dealerCard) {
        dealerCard[delement].className = '';
        dealerCard[delement].classList.add(`dcard-image-${delement}`);
    }

}

function calcCurrentScore(PorD) {
    if (PorD === "D") {
        dealerScore = 0;
        for (let i = 0; i < dealerHand.length; i++) {
            dealerScore += calcScore(dealerHand[i].rank);
        }
    } else if (PorD === "P") {
        playerScore = 0;
        for (let i = 0; i < playerHand.length; i++) {
            playerScore += calcScore(playerHand[i].rank);
        }
}
}
function dealerDeals() {
    calcCurrentScore("D");
    for (let i = 0; i < 8; i++) {
        if (dealerScore < 17) {
            let cardToHit = deck.dealCard(1);
            dealerHand.push(cardToHit[0]);
            dealerCard[dealerHand.length].classList.add(`card`, `${SUITICONS[dealerHand[dealerHand.length - 1].suit]}${dealerHand[dealerHand.length - 1].rank}`);
            calcCurrentScore("D");
        } else {
            break;
        }
    }
}

function renderScore(int) {
    return playerScoreEl.innerHTML = `Current Score:<br> ${int}`;
}

function switchButtonVisability(button, visability) {
    if (visability === "visible") {
        button.style.visibility = "visible";
        button.style.pointerEvents = "auto";
    } else if (visability === "hidden") {
        button.style.visibility = "hidden";
        button.style.pointerEvents = "none";
    } else {
        return;
    }
}
