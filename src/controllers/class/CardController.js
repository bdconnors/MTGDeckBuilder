const Controller = require('./Controller.js');

class CardController extends Controller{
    constructor(service){
        super(service);
    }
    async index(req,res){
        const search = await this.service.search(req.query);
        console.log('Card controller method(index) called');
        res.render('cardsIndex',{session:req.session,search:search});
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