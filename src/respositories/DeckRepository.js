const Repository = require('./Repository.js');
const Deck = require('../models/Deck');

class DeckRepository extends Repository{

    constructor(database,cards){
        super('deck',database);
        this.cards = cards;
    }
    async retrieve(values){
        try {
            const deck = await super.retrieve(values);
            deck.cards = await this.getCards(deck.id);
            return await this.make(deck);
        }catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
    async getCards(id){
        try {
            return await this.cards.getDeckCards(id);
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
    async addCard(deckId,cardId,copies){
        try{
            await this.cards.create({deck:deckId,card:cardId,copies:copies});
            return await this.retrieve({id:deckId});
        }catch (e) {
            throw new Error(e);
        }
    }
    async make(data){
        try {
            const cards = await this.getCards(data.id);
            return new Deck(data.id, data.user, data.name, cards);
        }catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = DeckRepository;