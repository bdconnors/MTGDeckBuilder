const Controller = require('./Controller.js');

class HomeController extends Controller{
    constructor(){
        super();
    }
    index(req,res){
        res.redirect('/cards');
    }
}
module.exports = HomeController;