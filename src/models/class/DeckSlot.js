class DeckSlot{
    constructor(card,copies = 1){
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
module.exports = DeckSlot;