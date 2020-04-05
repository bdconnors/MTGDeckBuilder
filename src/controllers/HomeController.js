const Controller = require('./Controller.js');

class HomeController extends Controller{
    constructor(service){
        super(service);
    }
    index(req,res){
        if(!req.session.signedIn) {
            req.session.signedIn = false;
        }
        req.session.searchResults = [-1];
        res.render('index',{session:req.session});
    }
    async search(req,res){
        if(req.body.name) {
            req.session.searchResults = await this.service.query({name:req.body.name});
        }else{
            req.session.searchResults = [];
        }
        res.render('index', {session: req.session});
    }
}
module.exports = HomeController;