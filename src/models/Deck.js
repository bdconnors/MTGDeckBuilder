const DeckCard = require('./DeckCard');
class Deck {
    constructor(id,user,name,cards = []){
        this.id = id;
        this.user = user;
        this.name = name;
        this.cards = cards;
    }
    addCard(card,copies){
        this.cards.push(new DeckCard(this.id,card,copies));
    }
    getCard(id){
        return this.cards.find((card)=>{
            return card.card.id === id;
        });
    }
    size(){
        let size = 0;
        for(let i = 0; i < this.cards.length; i++){
            const card = this.cards[i];
            size += card.copies;
        }
        return size;
    }


}
module.exports = Deck;
