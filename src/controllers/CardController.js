const Controller = require('./Controller.js');

class CardController extends Controller{
    constructor(service){
        super(service);
    }
    index(req,res){
        res.send('Cards Page');
    }
    async search(req,res) {
        const results = await this.service.search(req.query);
        console.log(results);
        res.render('index', {results: results});

    }
    async cardProfile(req,res){
        const id = req.params.id;
        const card = await this.service.getCard(id);
        console.log(card);
        res.render('card',{card:card});
    }
}
module.exports = CardController;