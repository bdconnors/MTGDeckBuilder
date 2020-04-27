const Service = require('./Service');
class CardService extends Service{

    constructor(repo){
        super(repo);
    }
    async autoCompleteName(query){
        const suggestions =  await this.repo.suggestNames(query);
        return suggestions;
    }
    async getCardByExactName(name){
        const preparedName = name.split(' ').join('+');
        return await this.repo.retrieveExactNameMatch(preparedName);
    }
    async search(query){
         //returns searchResults object
        return await this.repo.retrieve(query);
    }
}
module.exports = CardService;