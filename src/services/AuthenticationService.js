const encryption = require('../util/Encryption');

class AuthenticationService{
    constructor(repo){
        this.repo = repo;
    }
    getUser(email){
        return this.repo.getByEmail(email);
    }
    async authenticate(email,password){
        email = email.toLowerCase();
        return await this.validate(email,password);
    }
    async validate(email,password){
        let valid;
        valid = this.validateEmail(email);
        if(valid){
            valid = await this.validatePassword(email,password);
        }
        return valid;
    }
    async validatePassword(email,password){
        const user = this.getUser(email);
        const hash = user.getPassword();
        return await encryption.compare(password,hash);
    }
    validateEmail(email){
        return this.repo.exists('email',email);
    }
}
module.exports = AuthenticationService;