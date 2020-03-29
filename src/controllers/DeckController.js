const Controller = require('./Controller.js');

class DeckController extends Controller{
    constructor(service){
        super(service);
    }
    index(req,res){
        res.send('Decks Page');
    }
    async newDeck(req,res){
        try{
            const result = await this.service.newDeck(req.body.id,req.body.name);
            res.send(result);
        }catch (e) {
            res.send(e);
        }
    }
    async addCard(req,res){
        const deckId = req.params.id;
        const cardId = req.body.cardId;
        const copies = req.body.copies;
        const result = await this.service.addToDeck(deckId,cardId,copies);
        res.send(result);
    }
}
module.exports = DeckController;