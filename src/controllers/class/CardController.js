const Controller = require('./Controller.js');

class CardController extends Controller{
    constructor(service){
        super(service);
    }
    async index(req,res){
        const search = await this.service.search({});
        res.render('cardsIndex',{session:req.session,search:search});
    }
    async search(req,res){
        let results;
        const hasQuery =  Object.keys(req.query).length > 0;
        if(hasQuery){
            results = await this.service.search(req.query);
        }else{
            results = await this.service.search({});
        }
        res.send(results);
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