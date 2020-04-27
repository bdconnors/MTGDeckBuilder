const Controller = require('./Controller.js');

class CardController extends Controller{
    constructor(service){
        super(service);
    }
    async index(req,res){
        const search = await this.service.search({});
        res.render('cardsIndex',{session:req.session,search:search});
    }
    async autoComplete(req,res){
        const suggestions = await this.service.autoCompleteName(req.query);
        res.send({options:suggestions});
    }
    async exactName(req,res){
        const name = req.query.name;
        const result = await this.service.getCardByExactName(name);
        res.send(result);
    }
    async profile(req,res){
        const search = await this.service.search(req.params);
        if(search.total === 0) {
            res.send('card not found');
        }else{
            const card = search.results[0];
            res.render('cardProfile', {session: req.session, card: card});
        }
    }
}
module.exports = CardController;