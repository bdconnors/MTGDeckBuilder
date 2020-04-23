const Service = require('./Service');
class CardService extends Service{

    constructor(repo){
        super(repo);
    }
    async search(query){
        const result = await this.repo.retrieve(query); //returns searchResults object
        console.log('search() from card service done');
        return result;
    }
}
module.exports = CardService;