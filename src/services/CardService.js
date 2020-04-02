const api = require('../util/ApiProxy');

class CardService{

    constructor(){}

    async query(values){
        return await api.query(values);
    }
    async getAllCards(){
        return await api.getAllCards();
    }
    async getCard(id){
        return await api.getCard(id);
    }
}
module.exports = CardService;