const Controller = require('./Controller.js');

class DeckController extends Controller{
    constructor(service){
        super(service);
    }
    index(req,res){
        if(!req.session.user){
            res.redirect('/cards');
        }else{
            res.render('decksIndex',{session:req.session});
        }
    }
    async newDeck(req,res){
        try{
            const result = await this.service.newDeck(req.body.id,req.body.name);
            res.status(200);
            res.send(result);
        }catch (e) {
            res.status(500);
            res.send(`<h1>500 Internal Server Error</h1>`);
        }
    }
    async addCard(req,res){
        try {
            const deckId = req.params.id;
            const cardId = req.body.cardId;
            const copies = req.body.copies;
            const result = await this.service.addToDeck(deckId, cardId, copies);
            res.send(result);
        }catch (e) {
            res.status(500);
            res.send(`<h1>500 Internal Server Error</h1>`);
        }
    }
}
module.exports = DeckController;