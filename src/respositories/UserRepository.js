const Repository = require('./Repository.js');
const User = require('../models/User');

class UserRepository extends Repository{

    constructor(database){
        super('user',database);
    }
    getByEmail(email){
        let result = false;
        if(this.exists('email',email)) {
            result = this.filter('email', email)[0];
        }
        return result;
    }
    make(data){
        return new User(data.id,data.email,data.password);
    }

}
module.exports = UserRepository;