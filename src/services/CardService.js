const Service = require('./Service');
class CardService extends Service{

    constructor(repo){
        super(repo);
    }
    async getAllCards(){
        return await this.repo.getAllCards();
    }
    async search(name){
        return await this.repo.searchCards(name);
    }
    async getCard(id){
        return await this.repo.getCard(id);
    }
}
module.exports = CardService;