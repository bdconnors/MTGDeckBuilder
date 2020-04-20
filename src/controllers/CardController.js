const Controller = require('./Controller.js');

class CardController extends Controller{
    constructor(service){
        super(service);
    }
    async index(req,res){
        const cards = await this.service.getAllCards();
        res.render('cardsIndex',{session:req.session,cards:cards});
    }
    async profile(req,res){
        const id = req.params.id;
        const result = await this.service.getCard(id);
        if(result !== -1) {
            res.render('cardProfile', {session: req.session, card: result});
        }else{
            res.send('card not found');
        }
    }
}
module.exports = CardController;