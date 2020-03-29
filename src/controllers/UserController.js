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
        const result = await this.service.register(email,password);
        res.send(result);
    }
}
module.exports = UserController;