const Controller = require('./Controller.js');

class HomeController extends Controller{
    constructor(service){
        super(service);
    }
    index(req,res){
        if(!req.session.user){
            res.render('search',{results:[-1]});
        }else{
            res.render('index',{user:req.session.user});
        }
    }
    async search(req,res){
        let results = [];
        console.log(req.body.name);
        if(req.body.name) {
            results = await this.service.query({name:req.body.name});
        }
        res.render('search', {results: results});
    }
}
module.exports = HomeController;