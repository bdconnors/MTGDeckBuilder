const Controller = require('./Controller.js');
const fs = require('fs');

class HomeController extends Controller{
    constructor(){
        super();
    }
    index(req,res){
        res.render('index',{results:-1});
    }
}
module.exports = HomeController;