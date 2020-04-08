const Repository = require('./Repository');
const Card = require('../models/Card');
const DeckCard = require('../models/DeckCard');

class CardRepository extends Repository{
    constructor(database,proxy){
        super('deck_card',database);
        this.proxy = proxy;
    }
    async searchCards(query){
        const results = await this.proxy.search(query);
        return this.makeManyCards(results);
    }
    async getCard(id){
        const result = await this.proxy.get(id);
        return this.makeCard(result);
    }
    async getDeckCards(deckId){
        try {
            const results = await this.database.execute('RETRIEVE', 'ALL_DECK_CARD', {deck: deckId});
            const rows = results[0];
            return await this.makeMany(rows);
        }catch (e) {
            throw new Error(e);
        }
    }
    makeManyCards(data){
        const cards = [];
        for(let i = 0; i < data.length; i++){
            const rawCard = data[i];
            const card = this.makeCard(rawCard);
            cards.push(card);
        }
        return cards;
    }
    makeCard(data){
        return new Card(data.multiverseid,
            data.name,
            data.manaCost,
            data.cmc,
            data.setName,
            data.types,
            data.supertypes,
            data.subtypes,
            data.colors,
            data.rarity,
            data.text,
            data.imageUrl);
    }
    async make(data){
        const cardData = await this.proxy.get(data.card);
        const card = this.makeCard(cardData);
        return new DeckCard(data.deck,card,data.copies);
    }
}
module.exports = CardRepository;