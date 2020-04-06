const Controller = require('./Controller.js');

class CardController extends Controller{
    constructor(service){
        super(service);
    }
    async index(req,res){
        const params = Object.keys(req.query);
        if(params.length > 0) {
            const results = await this.service.query(req.query);
            res.render('cardsIndex', {session:req.session,cards:results});
        }else{
            res.render('cardsIndex', {session:req.session,cards:false});
        }
    }
    async profile(req,res){
        const id = req.params.id;
        const result = await this.service.getCard(id);
        if(result) {
            res.render('cardProfile', {session: req.session, card: result});
        }else{
            res.send('card not found');
        }
    }
}
module.exports = CardController;