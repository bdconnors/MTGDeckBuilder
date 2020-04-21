class Card{
    constructor(deck,card,copies = 1){
        this.deck = deck;
        this.card = card;
        this.copies = copies;
    }
    add(amount){
        this.copies+=amount;
    }
    remove(amount){
        this.copies-=amount;
    }
}
module.exports = Card;