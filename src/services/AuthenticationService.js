const encryption = require('../util/Encryption');
const validation = require('../util/Validation');


class AuthenticationService{
    constructor(repo){
        this.repo = repo;
    }
    getUser(email){
        return this.repo.getByEmail(email);
    }
    async authenticate(email,password){
        email = email.toLowerCase();
        let authentic = validation.validCredentials(email,password);
        if(authentic){
            authentic = this.repo.exists('email',email);
            if (authentic) {
                const user = this.getUser(email);
                const hash = user.getPassword();
                authentic = validation.validLogin(password,hash);
            }
        }
        return authentic;
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
module.exports = AuthenticationService;