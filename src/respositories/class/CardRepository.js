const Repository = require('./Repository');
const Card = require('../../models').Card;
const SearchResults = require('../../models').SearchResults;

class CardRepository extends Repository{
    constructor(database,proxy){
        super('deck_card',database);
        this.proxy = proxy;
    }
    async suggestNames(query){
        return await this.proxy.getSuggestedNames(query);
    }
    async retrieveExactNameMatch(name){
        const response = await this.proxy.getCardByNameExact(name);
        if(response.data.object === "list"){
            return this.make(response.data.data[0]);
        }else{
            return false;
        }
    }
    async retrieve(query){
        const response = await this.proxy.search(query); //gets the card data returned from the api
        return await this.makeSearchResults(response);
    }
    async makeSearchResults(response){
        const searchResults = new SearchResults(response.total);
        searchResults.results = await this.makeMany(response.data);
        searchResults.currentPage = response.page;
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