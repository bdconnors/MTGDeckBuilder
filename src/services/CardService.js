const api = require('../core/Proxy');

class CardService{

    constructor(proxy){
        this.proxy = proxy;
    }
    async query(values){
        return await this.proxy.search(values);
    }
    async getAllCards(){
        return await this.proxy.getAll();
    }
    async getCard(id){
        let card = false;
        const results = await this.proxy.get(id);
        if(results.length !== 0){
            card = results[0];
        }
        return card;
    }
}
module.exports = CardService;