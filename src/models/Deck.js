const DeckCard = require('./DeckCard');
class Deck {
    constructor(id,name,cards = []){
        this.id = id;
        this.name = name;
        this.cards = cards;
    }
    addCard(card,copies){
        this.cards.push(new DeckCard(this.id,card,copies));
    }


}
module.exports = Deck;
