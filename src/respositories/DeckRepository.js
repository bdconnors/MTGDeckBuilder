const Repository = require('./Repository.js');
const Deck = require('../models/Deck');
const DeckCard = require('../models/DeckCard');
const queryBuilder = require('../util/QueryBuilder');
const api = require('../util/ApiProxy');

class DeckRepository extends Repository{

    constructor(database){
        super('deck',database);
    }
    async load(){
        await super.load();
        const query = queryBuilder.storedProcedure('RETRIEVE','ALL_DECK_CARD',[]);
        const results = await this.database.execute(query,[]);
        const cardResults = results[0];
        for(let i = 0; i < this.entities.length; i++){
            const deck = this.entities[i];
            const cards = cardResults.filter((card)=>{return card.deck === deck.id});
            await this.loadDeck(deck,cards);
        }
    }
    async createDeckCard(id,cardId,copies){
        const query = queryBuilder.storedProcedure('deck_card',{deck:id,card:id});
        await this.database.execute(query,[id,cardId]);
        const deck = this.retrieve(id)[0];
        const card = await api.getCard(id);
        deck.addCard(card,copies);
        return deck;
    }
    async loadDeck(deck,rows){
        for(let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const id = row.id;
            const card = await api.getCard(id);
            deck.addCard(card,row.copies);
        }
    }
    make(data){
        return new Deck(data.id,data.name);
    }
}
module.exports = DeckRepository;