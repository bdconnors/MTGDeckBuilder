const encryption = require('../util/Encryption');
const validation = require('../util/Validation');

class UserService{
    constructor(repo){
        this.repo = repo;
    }
    async register(email,password){
        let registered = false;
        email = email.toLowerCase();
        const valid = validation.validCredentials(email,password);
        if(valid) {
            email = validation.sanitize(email);
            password = validation.sanitize(password);
            password = await encryption.hash(password);
            registered = await this.repo.create({email: email, password: password});
        }
        return registered;
    }
}
module.exports = UserService;