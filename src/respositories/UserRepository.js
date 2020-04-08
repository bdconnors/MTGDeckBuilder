const Repository = require('./Repository.js');
const User = require('../models/User');

class UserRepository extends Repository{

    constructor(database){
        super('user',database);
    }
    async getByEmail(email) {
        try {
            const result = await this.database.execute('RETRIEVE', 'USER_BY_EMAIL', {email: email});
            const data = result[0][0];
            return this.make(data);
        }catch (e) {
            throw new Error(e);
        }
    }
    async make(data){
        return new User(data.id,data.email,data.password);
    }

}
module.exports = UserRepository;