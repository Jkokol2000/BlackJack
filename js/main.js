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

let playerLeft = document.querySelector('.player-card-left')
let playerRight = document.querySelector('.player-card-right')
let dealerLeft = document.querySelector('.dealer-card-left')
let dealerRight = document.querySelector('.dealer-card-right')
let dealbutton = document.querySelector('.deal')
let plusTenButton = document.querySelector('.increase-bet-button')
let minusTenButton = document.querySelector('.decrease-bet-button')
let currentBetEl = document.querySelector('.bet-amount')

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
currentWinnings = 0;
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
}