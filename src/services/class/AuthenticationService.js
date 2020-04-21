const encryption = require('../../util').Encryption;
const validation = require('../../util').Validation;
const Service = require('./Service');

class AuthenticationService extends Service{
    constructor(repo){
        super(repo);
    }
    async getUser(email){
        try {
            return await this.repo.getByEmail(email);
        }catch(e){
            throw new Error('account not found');
        }
    }
    async authenticate(email,password){
        email = email.toLowerCase();
        try {
            this.validateValues(email,password);
            const user = await this.getUser(email);
            const hash = user.getPassword();
            this.validateLogin(password,hash);
            return user;
        }catch (e) {
            throw new Error('Bad E-mail or Password');
        }
    }
    validateValues(email,password){
        const validCredentials = validation.validCredentials(email,password);
        if(!validCredentials){
            throw new Error('Invalid Credentials');
        }
    }
    validateLogin(password,hash){
        const validPass = validation.validLogin(password, hash);
        if(!validPass){
            throw new Error('Bad Password');
        }
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