const Service = require('./Service');
class CardService extends Service{

    constructor(repo){
        super(repo);
    }
    async search(query){
        const result = await this.repo.retrieve(query);
        console.log('service');
        return result;
    }
}
module.exports = CardService;