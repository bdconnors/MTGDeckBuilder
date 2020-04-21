const Controller = require('./Controller.js');

class AuthenticationController extends Controller{
    constructor(service){
        super(service);
    }
    //POST
    async login(req,res){
        try {
            const email = req.body.email;
            const password = req.body.password;
            await this.service.authenticate(email, password);
            req.session.user = await this.service.getUser(email);
            console.log(req.session.user);
            res.redirect('/decks');
        }catch (e) {
            console.log(e);
            res.redirect('/');
        }
    }
    async logout(req,res){
        await req.session.destroy();
        res.redirect('/');
    }
    async verify(req,res){
        try {
            const email = req.body.email;
            const password = req.body.password;
            await this.service.authenticate(email, password);
            res.status(200);
            res.send();
        }catch (e) {
            res.status(401);
            res.send();
        }
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