const Repository = require('./Repository.js');
const Deck = require('../../models').Deck;
const DeckSlot = require('../../models').DeckSlot;

class DeckRepository extends Repository{

    constructor(database,cards){
        super('deck',database);
        this.cards = cards;
    }
    async retrieve(values){
        try {
            const deck = await super.retrieve(values);
            return await this.make(deck);
        }catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
    async addDeckSlot(deckId,cardId,copies){
        try{
            const results = await this.database.execute('CREATE','DECK_CARD', {deck:deckId,card:cardId,copies:copies});
            return results[0];
        }catch (e) {
            throw new Error(e);
        }
    }
    async getDeckSlots(id){
        try {
            const results = await this.database.execute('RETRIEVE', 'ALL_DECK_CARD', {deck: id});
            const rows = results[0];
            return await this.makeManyDeckSlots(rows);
        }catch (e) {
            throw new Error(e);
        }
    }
    async getUserDecks(userId){
        try {
            const results = await this.database.execute('RETRIEVE', 'ALL_USER_DECK', {user: userId});
            const decks = results[0];
            console.log(decks);
            return await this.makeMany(decks);
        }catch (e) {
            throw new Error(e);
        }
    }
    async makeManyDeckSlots(data){
        const slots = [];
        for(let i = 0; i < data.length; i++){
            const slot = await this.makeDeckSlot(data[i]);
            slots.push(slot);
        }
        return slots;
    }
    async makeDeckSlot(data){
        const results =  await this.cards.retrieve({id:data.card});
        const copies = data.copies;
        return new DeckSlot(results.results[0],copies);
    }
    async makeMany(data){
        const decks = [];
        for(let i = 0; i < data.length; i++){
            const deck = await this.make(data[i]);
            decks.push(deck);
        }
        return decks;
    }
    async make(data){
        try {
            const cards = await this.getDeckSlots(data.id);
            return new Deck(data.id, data.user, data.name, cards);
        }catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = DeckRepository;