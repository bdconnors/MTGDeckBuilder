const Controller = require('./Controller.js');

class UserController extends Controller{
    constructor(service){
        super(service);
    }
    index(req,res){
        res.send('Users Page');
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
module.exports = UserController;