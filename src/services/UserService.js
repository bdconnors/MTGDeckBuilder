const encryption = require('../util/Encryption');

class UserService{
    constructor(repo){
        this.repo = repo;
    }
    async register(email,password){
       const hash = await encryption.hash(password);
       const lowerCaseEmail = email.toLowerCase();
       return await this.repo.create({email:lowerCaseEmail,password:hash});
    }
}
module.exports = UserService;