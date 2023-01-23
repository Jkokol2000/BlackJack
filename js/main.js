const SUITICONS = {
    'spades':'s',
    'hearts' : 'h',
    'diamonds' : 'd',
    'clubs' : 'c'
}


let deck
let winner;
let inDebt;
let playerHand;
let dealerHand;
let currentBet = 0;
let currentWinnings = 1000;
let playerScore;
let dealerScore;

let playerCard1 = document.querySelector('.player-card-1')
let playerCard2 = document.querySelector('.player-card-2')
let dealerCard1= document.querySelector('.dealer-card-1')
let dealerCard2 = document.querySelector('.dealer-card-2')
let dealbutton = document.querySelector('.deal')
let plusTenButton = document.querySelector('.increase-bet-button')
let minusTenButton = document.querySelector('.decrease-bet-button')
let currentBetEl = document.querySelector('.bet-amount')
let currentWinningsEl = document.querySelector('.winnings')
let messageEl = document.querySelector('.message')
let standButton = document.querySelector('.stand-button');

dealbutton.addEventListener("click", deal)
//Card class that defines how the cards will be setup in the deck
class Card {
    constructor(rank, suit){
        this.rank = rank
        this.suit = suit
    }
}
plusTenButton.addEventListener("click", function(){
    if (currentBet < currentWinnings) {
    currentBet += 10;
    currentBetEl.innerHTML = `Current Bet: ${currentBet}$`
    } else {
        return;
    }
})
minusTenButton.addEventListener("click", function(){
    if (currentBet !== 0) {
    currentBet -= 10;
    currentBetEl.innerHTML = `Current Bet: ${currentBet}$`
    } else {
        return
    }
})
standButton.addEventListener("click", calcPlayerWins);
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
winner = null;
dealerScore = 10;
playerScore = 0;
renderMessage("Place a bet!")
plusTenButton.disabled = false;
minusTenButton.disabled = false;
}




function deal() {
    playerHand = deck.dealCard(2)
    dealerHand = deck.dealCard(2)
    playerCard1.innerHTML = `${SUITICONS[playerHand[0].suit]}${playerHand[0].rank}`
    playerCard2.innerHTML = `${SUITICONS[playerHand[1].suit]}${playerHand[1].rank}`
    dealerCard2.innerHTML = `${SUITICONS[dealerHand[0].suit]}${dealerHand[0].rank}`
    dealerCard1.innerHTML = `Facedown`
    plusTenButton.disabled = true;
    minusTenButton.disabled = true;
    messageEl.innerHTML = "";
}

function calcPlayerWins() {
    console.log("Stand button clicked");
    for (i = 0; i < playerHand.length; i++){
        playerScore += calcScore(playerHand[i].rank)
    }
    if (playerScore <= 21) {
        revealFacedown();
        if (playerScore === dealerScore) {
            winner = 'T'
        } else if (playerScore > dealerScore) {
            winner = 'P'
            currentWinnings += currentBet * 2
        } else {
            winner = 'D'
            currentWinnings -= currentBet
        }
    } else {
        winner = 'D'
        currentWinnings -= currentBet
    }
    init();
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
    messageEl.innerHTML = message;
    currentBetEl.innerHTML = `Current Bet: ${currentBet}$`;
    currentWinningsEl.innerHTML = `Current Winnings: ${currentWinnings}$`;
  }

function revealFacedown(){
    dealerCard2.innerHTML = `${SUITICONS[dealerHand[1].suit]}${dealerHand[1].rank}`
}