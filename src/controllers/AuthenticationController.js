const Controller = require('./Controller.js');

class AuthenticationController extends Controller{
    constructor(service){
        super(service);
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
            res.redirect('/');
        }
    }
    async verify(req,res){
        const email = req.body.email;
        const password = req.body.password;
        const authenticated = await this.service.authenticate(email,password);
        res.send(authenticated);
    }
}
module.exports = AuthenticationController;