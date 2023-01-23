const SUITICONS = {
    'spades':'s',
    'hearts' : 'h',
    'diamonds' : 'd',
    'clubs' : 'c'
}


let deck;
let winner;
let inDebt;
let playerHand;
let dealerHand;
let currentBet;
let currentWinnings;
let playerScore;
let dealerScore;

let playerLeft = document.querySelector('.player-card-left')
let playerRight = document.querySelector('.player-card-right')
let dealerLeft = document.querySelector('.dealer-card-left')
let dealerRight = document.querySelector('.dealer-card-right')
let dealbutton = document.querySelector('.deal')
let plusTenButton = document.querySelector('.increase-bet-button')
let minusTenButton = document.querySelector('.decrease-bet-button')
let currentBetEl = document.querySelector('.bet-amount')
let currentWinningsEl = document.querySelector('.winnings')
let messageEl = document.querySelector('.message')

dealbutton.addEventListener("click", deal)
//Card class that defines how the cards will be setup in the deck
class Card {
    constructor(rank, suit){
        this.rank = rank
        this.suit = suit
    }
}
plusTenButton.addEventListener("click", function(){
    currentBet += 10;
    currentBetEl.innerHTML = `Current Bet: ${currentBet}$`
})
minusTenButton.addEventListener("click", function(){
    if (currentBet !== 0) {
    currentBet -= 10;
    currentBetEl.innerHTML = `Current Bet: ${currentBet}$`
    } else {
        return
    }
})
// Deck class that allows me to create a deck, shuffle it, and deal the cards
class Deck {
    constructor(){
        this.deck = [];
        this.populateDeck  = function(){
            const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
            const suits = ["hearts", "diamonds", "clubs", "spades"];
            for(let i=0; i < suits.length; i++){
                for(let j = 0; j < ranks.length; j++){
                    this.deck.push(new Card(ranks[j], suits[i]));
                }
            }
        }
        this.shuffle = function(){
            for (let i = this.deck.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * i);
                let temp = this.deck[i];
                this.deck[i] = this.deck[j];
                this.deck[j] = temp;
            }
        this.dealCard = function(int){
        return this.deck.splice(0,int);
        }
    }
}
}
init();
function init() {
deck = new Deck();
deck.populateDeck();
deck.shuffle();
playerHand = [];
dealerHand = [];
currentBet = 0;
winner = null;
currentWinnings = 0;
dealerScore = 10;
playerScore = 0;
renderMessage("Place a bet");
}

function deal() {
    playerHand = deck.dealCard(2)
    dealerHand = deck.dealCard(2)
    playerLeft.innerHTML = `${SUITICONS[playerHand[0].suit]}${playerHand[0].rank}`
    playerRight.innerHTML = `${SUITICONS[playerHand[1].suit]}${playerHand[1].rank}`
    dealerLeft.innerHTML = `${SUITICONS[dealerHand[0].suit]}${dealerHand[0].rank}`
    dealerRight.innerHTML = `Facedown`
    plusTenButton.disabled = true;
    minusTenButton.disabled = true;
    messageEl.innerHTML = "";
}

function calcPlayerWins() {
    for (i = 0; i < playerHand.length; i++){
        playerScore += calcScore(playerHand[i].rank)
    }
    if (playerScore <= 21) {
        if (playerScore === dealerScore) {
            winner = 'T'
        } else if (playerScore > dealerScore) {
            winner = 'P'
            currentWinnings += currentBet * 2
            currentWinningsEl.innerHTML = `Current Winnings: $${currentWinnings}`
        } else {
            winner = 'D'
        }
    } else {
        winner = 'D'
    }
}

function calcScore(rank) {
    score = 0
    switch (rank) {
        case 'A':
            score += 1
            break;
        case '02':
            score += 2
            break;
        case '03':
            score += 3
            break;
        case '04':
            score += 4
            break;
        case '05':
            score += 5
            break;
        case '06':
            score += 6
            break;
        case '07':
            score += 7
            break;
        case '08':
            score += 8
            break;
        case '09':
            score += 9
            break;
        case '10':
            score += 10
            break;
        case 'J':
            score += 11
            break;
        case 'Q':
            score += 12
            break;
        case 'K':
            score += 13
            break;
    }
return score
}

function renderMessage(message) {
    messageEl.innerHTML = message
}