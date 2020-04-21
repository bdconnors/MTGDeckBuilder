const Repository = require('./Repository.js');
const User = require('../../models').User;

class UserRepository extends Repository{

    constructor(database){
        super('user',database);
    }
    async getByEmail(email) {
   
            const result = await this.database.execute('RETRIEVE', 'USER_BY_EMAIL', {email: email});
            if(result[0][0]){
                const data = result[0][0];
                return this.make(data);
            }else{
                return false
            }

    }
    async make(data){
        return new User(data.id,data.email,data.password);
    }

}
module.exports = UserRepository;