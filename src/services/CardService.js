const api = require('../util/ApiProxy');

class CardService{

    constructor(){}

    async search(values){
        return await api.query(values);
    }
    async getCard(id){
        return await api.getCard(id);
    }


}
module.exports = CardService;