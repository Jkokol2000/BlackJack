//Card class that defines how the cards will be setup in the deck
class Card {
    constructor(rank, suit){
        this.rank = rank
        this.suit = suit
    }
}
// Deck class that allows me to create a deck, shuffle it, and deal the cards
class Deck {
    constructor(){
        this.deck = [];
        this.populateDeck  = function(){
            const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
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
        }
    }
}
//The value where the dealer will continuously hit until they bust (17)
//How much the player will win in terms of chips
///Define Important Variables:
//The Player’s and the Dealer’s Hand
//The Player’s or Dealer’s Bust status (true or false)
//The Cards currently in deck (Deck will likely be a object with two lists representing suits and card values)
//The player’s Wager and current Balance
///Initialize the board and define the game rules:
//Create a board with the deck in the middle, then allow the player to bet
//The deck is shuffled, then the dealer Deals the cards to player, then dealer, then player, then dealer
//Show the player’s cards, and one of the dealer’s cards
//The player will be able to choose between hitting or staying
//If the player busts, they immediately lose
//If the player stays, the dealer reveals their other card, then takes cards until their hand equals 17 or more
//If the dealer busts or has a hand worse than the player’s, the player wins
//If the dealer has a better hand or blackjack, the dealer wins
//If the hand’s values are equal, a “push” happens (essentially a tie)
//The cards are then retrieved, the deck is shuffled, and the player is able to choose to bet again to start a new game. 
//If their balance is 0, they are able to click a “loan” button, giving them more chips but reducing their “winnings” by a considerable amount
let deck = new Deck();
deck.populateDeck();
console.log(deck);
deck.shuffle();
console.log(deck);
