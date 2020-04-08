const Service = require('./Service');
class CardService extends Service{

    constructor(repo){
        super(repo);
    }
    async query(values){
        return await this.repo.searchCards(values);
    }
    async getCard(id){
        let card = false;
        const results = await this.repo.getCard(id);
        if(results.length !== 0){
            card = results[0];
        }
        return card;
    }
}
module.exports = CardService;