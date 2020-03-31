const Controller = require('./Controller.js');

class CardController extends Controller{
    constructor(service){
        super(service);
    }
    async index(req,res){
        let results = -1;
        const query = req.query;
        const params = Object.keys(query);
        if(params.length > 0) {
            results = await this.service.search(query);
        }
        res.render('index', {results: results});
    }
    async cardProfile(req,res){
        const id = req.params.id;
        const card = await this.service.getCard(id);
        res.render('card',{card:card});
    }
}
module.exports = CardController;