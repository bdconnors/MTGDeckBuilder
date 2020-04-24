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
    async addCard(req,res){
        try{
            const deckId = req.params.id;
            const cardId = req.body.card;
            const copies = req.body.copies;
            await this.service.addCard(deckId,cardId,copies);
            res.redirect(`/decks/${deckId}`);
        }catch (e) {
            throw new Error(e);
        }
    }
    async newDeck(req,res){
        try{
            const userId = req.session.user.id;
            await this.service.newDeck(userId,req.body.name);
            return res.redirect('/decks');
        }catch (e) {
            res.status(500);
            return res.send(`<h1>500 Internal Server Error</h1>`);
        }
    }
    async deckProfile(req,res){
        try {
            const deckId = req.params.id;
            const deck = await this.service.getDeck(deckId);
            res.render('deckProfile',{session:req.session,deck:deck});
        }catch (e) {
            console.log(e);
            res.status(500);
            res.send(`<h1>500 Internal Server Error</h1>`);
        }
    }
}
module.exports = DeckController;