const Controller = require('./Controller.js');

class AuthenticationController extends Controller{
    constructor(service){
        super(service);
    }
    //GET
    index(req,res){
        res.render('login',{err:''});
    }
    //POST
    async login(req,res){
        const email = req.body.email;
        const password = req.body.password;
        const authenticated = await this.service.authenticate(email,password);
        if(authenticated){
            req.session.user = this.service.getUser(email);
            res.send(req.session.user);
        }else{
            res.render('login',{err:'Incorrect e-mail or password'});
        }
    }
}
module.exports = AuthenticationController;