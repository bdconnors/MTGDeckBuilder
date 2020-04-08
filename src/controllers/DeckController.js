const Controller = require('./Controller.js');

class DeckController extends Controller{
    constructor(service){
        super(service);
    }
    async index(req,res){
        if(!req.session.user){
            return res.redirect('/cards');
        }else{
            const userId = req.session.user.id;
            console.log(req.session.user);
            console.log(req.session.user.id);
            const decks = await this.service.getUserDecks(userId);
            return res.render('decksIndex',{session:req.session,decks:decks});
        }
    }
    async newDeck(req,res){
        try{
            const userId = req.session.user.id;
            const result = await this.service.newDeck(userId,req.body.name);
            console.log(this.service.repo.entities);
            return res.redirect('/decks');
        }catch (e) {
            res.status(500);
            return res.send(`<h1>500 Internal Server Error</h1>`);
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