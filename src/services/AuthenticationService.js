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
}
module.exports = AuthenticationService;