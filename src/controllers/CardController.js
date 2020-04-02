const Controller = require('./Controller.js');

class CardController extends Controller{
    constructor(service){
        super(service);
    }
    async index(req,res){
        const cards = await this.service.getAllCards();
        res.render('allCards', {cards: cards});
    }
    async query(req,res){
        let results = [];
        const params = Object.keys(req.query);
        if(params.length > 0) {
            results = await this.service.query(req.query);
        }
        res.send(results);
    }
    async cardProfile(req,res){
        const id = req.params.id;
        const card = await this.service.getCard(id);
        res.render('cardProfile',{card:card});
    }
}
module.exports = CardController;