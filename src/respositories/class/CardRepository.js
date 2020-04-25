const Repository = require('./Repository');
const Card = require('../../models').Card;
const SearchResults = require('../../models').SearchResults;

class CardRepository extends Repository{
    constructor(database,proxy){
        super('deck_card',database);
        this.proxy = proxy;
    }
    async retrieve(query){
        const response = await this.proxy.search(query); //gets the card data returned from the api
        return await this.makeSearchResults(response);
    }
    async makeSearchResults(response){
        console.log("Number of cards received: " + response.total);
        const searchResults = new SearchResults(response.total);
        searchResults.results = await this.makeMany(response.data);
        searchResults.currentPage = response.page;
        console.log('card repo makeSearchResults() done');
        return searchResults;
    }
    async makeMany(data){
        let cards = [];
        for(let i = 0; i < data.length; i++){
            const card = await this.make(data[i]);
            cards.push(card);
        }
        return cards;
    }
    async make(data){
        const cardSymbols = await this.proxy.getManaSymbols(data.mana_cost);
        return new Card(data.id,
            data.name,
            cardSymbols,
            data.cmc,
            data.set_name,
            data.type_line,
            data.colors,
            data.rarity,
            data.oracle_text,
            data.image_uris);
    }
}
module.exports = CardRepository;