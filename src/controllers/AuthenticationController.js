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
            req.session.signedIn = true;
            res.redirect('/');
        }else{
            req.session.signedIn = false;
            res.redirect('/');
        }
    }
    async logout(req,res){
        await req.session.destroy();
        res.redirect('/');
    }
    async verify(req,res){
        const email = req.body.email;
        const password = req.body.password;
        const authenticated = await this.service.authenticate(email,password);
        if(authenticated){
            res.status(200);
        }else{
            res.status(401);
        }
        res.send(authenticated);
    }
}
module.exports = AuthenticationController;