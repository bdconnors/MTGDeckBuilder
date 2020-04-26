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
    async editDeck(req,res){
        try{
            const deckId = req.params.id;
            const edits = JSON.parse(req.body.changes);
            console.log(edits);
            await this.service.updateDeck(deckId,edits);
            res.redirect(`/decks/${deckId}`);
        }catch (e) {
            res.status(500);
            res.send("error editing deck");
        }
    }
    async deleteDeck(req,res){
        try{
            const deckId = req.params.id;
            await this.service.deleteDeck(deckId);
            res.redirect('/decks');
        }catch (e) {
            console.log(e);
            res.status(500);
            res.send("error deleting deck");
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