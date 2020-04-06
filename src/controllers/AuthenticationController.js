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
            res.redirect('/decks');
        }else{
            res.redirect('/cards');
        }
    }
    async logout(req,res){
        await req.session.destroy();
        res.redirect('/cards');
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
    async register(req,res){
        const email = req.body.email;
        const password = req.body.password;
        const success = await this.service.register(email,password);
        if(success){
            res.status(200);
        }else{
            res.status(500)
        }
        res.send(success);
    }
}
module.exports = AuthenticationController;