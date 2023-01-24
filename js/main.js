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
let currentBet
let currentWinnings
let playerScore;
let dealerScore;
let numberOfGames = 0;

let playerCard = {
    '1' : document.querySelector('.player-card-1'),
    '2' : document.querySelector('.player-card-2'),
    '3' : document.querySelector('.player-card-3'),
    '4' : document.querySelector('.player-card-4'),
    '5' : document.querySelector('.player-card-5'),
    '6' : document.querySelector('.player-card-6'),
    '7' : document.querySelector('.player-card-7'),
    '8' : document.querySelector('.player-card-8')
}
let dealerCard = {
    '1' : document.querySelector('.dealer-card-1'),
    '2' : document.querySelector('.dealer-card-2'),
    '3' : document.querySelector('.dealer-card-3'),
    '4' : document.querySelector('.dealer-card-4'),
    '5' : document.querySelector('.dealer-card-5'),
    '6' : document.querySelector('.dealer-card-6'),
    '7' : document.querySelector('.dealer-card-7'),
    '8' : document.querySelector('.dealer-card-8'),
}
let dealbutton = document.querySelector('.deal');
let plusTenButton = document.querySelector('.increase-bet-button');
let minusTenButton = document.querySelector('.decrease-bet-button');
let currentBetEl = document.querySelector('.bet-amount');
let currentWinningsEl = document.querySelector('.winnings');
let messageEl = document.querySelector('.message');
let standButton = document.querySelector('.stand-button');
let hitButton = document.querySelector('.hit-button');
let nextHand = document.querySelector('.new-hand');
let playerScoreEl = document.querySelector('.player-score');

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
hitButton.addEventListener("click", hit);
nextHand.addEventListener("click", function() {
    numberOfGames++;
    init();
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
currentBet = 0;
deck = new Deck();
deck.populateDeck();
deck.shuffle();
playerHand = [];
dealerHand = [];
winner = null;
dealerScore = 0;
playerScore = 0;
plusTenButton.disabled = false;
minusTenButton.disabled = false;
renderScore(playerScore);
if (numberOfGames !== 0) {
    render("Place a bet.")
} else {
    currentWinnings = 1000;
    render("Welcome to BlackJack! <br> Place a bet.")
}
}




function deal() {
    if (currentBet === 0) {
        renderMessage("You must bet more than 0 dollars")
    } else {
    currentWinnings -= currentBet;
    playerHand = deck.dealCard(2)
    dealerHand = deck.dealCard(2)
    playerCard[1].innerHTML = `${SUITICONS[playerHand[0].suit]}${playerHand[0].rank}`
    playerCard[2].innerHTML = `${SUITICONS[playerHand[1].suit]}${playerHand[1].rank}`
    dealerCard[2].innerHTML = `${SUITICONS[dealerHand[0].suit]}${dealerHand[0].rank}`
    dealerCard[1].innerHTML = `Facedown`
    plusTenButton.disabled = true;
    minusTenButton.disabled = true;
    renderMessage("");
    calcCurrentScore("P")
    renderScore(playerScore)
    if (playerScore >= 21) {
        calcPlayerWins()
    } else {
        return;
    }
}
}

function calcPlayerWins() {
    revealFacedown();
    calcCurrentScore("P");
    renderScore(playerScore)
    if (playerScore <= 21) {
        dealerDeals(dealerScore);
        if (playerScore === dealerScore) {
            winner = 'T'
            renderMessage("Push! Here's your money back.")
        } else if (playerScore > dealerScore || dealerScore > 21) {
            winner = 'P'
            currentWinnings += currentBet * 2
            renderMessage(`You win! You gained ${currentBet * 2}$`)
        } else {
            winner = 'D'
            currentWinnings -= currentBet
            renderMessage(`Dealer Wins! You lost ${currentBet}$`)
        }
    } else {
        winner = 'D'
        currentWinnings -= currentBet
        renderMessage(`You Bust! You lost ${currentBet}$`)
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
    messageEl.innerHTML = message;
    currentBetEl.innerHTML = `Current Bet: ${currentBet}$`;
    currentWinningsEl.innerHTML = `Current Winnings: ${currentWinnings}$`;
  }

function revealFacedown(){
    dealerCard[1].innerHTML = `${SUITICONS[dealerHand[1].suit]}${dealerHand[1].rank}`
}
function hit() {
   
    cardToHit = deck.dealCard(1)
    playerHand.push(cardToHit[0])
    calcCurrentScore("P");
    renderScore(playerScore)
    playerCard[playerHand.length].innerHTML = `${SUITICONS[playerHand[playerHand.length - 1].suit]}${playerHand[playerHand.length - 1].rank}`
    if (playerScore >= 21) {
        calcPlayerWins();
    }
}

function render(message){
    renderMessage(message);
    resetBoard;

}

function resetBoard(){
    for (element in playerCard) {
        playerCard[element].innerHTML = ""
    }
    for (element in dealerCard) {
        dealerCard[element].innerHTML = ""
    }

}

function calcCurrentScore(PorD) {
    if (PorD === "D") {
        dealerScore = 0
    for (i = 0; i < dealerHand.length; i++){
        dealerScore += calcScore(dealerHand[i].rank)
    } 
} else if (PorD === "P") {
    playerScore = 0
    for (i = 0; i < playerHand.length; i++){
        playerScore += calcScore(playerHand[i].rank)
    }
} else {
    return console.log("Neither Player nor Dealer given")
}
}
function dealerDeals(){
    calcCurrentScore("D");
    for (i = 0; i < 8; i++){
    if (dealerScore < 17) {
        cardToHit = deck.dealCard(1)
        dealerHand.push(cardToHit[0]);
        dealerCard[dealerHand.length].innerHTML = `${SUITICONS[dealerHand[dealerHand.length - 1].suit]}${dealerHand[dealerHand.length - 1].rank}`
        calcCurrentScore("D");
    } else {
        break;
    }
}
}

function renderScore(int){
   return playerScoreEl.innerHTML = `Current Score:<br> ${int}`; 
};