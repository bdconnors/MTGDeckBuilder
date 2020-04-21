class User {
    #password;
    constructor(id,email,password){
        this.id = id;
        this.email = email;
        this.#password = password;
    }
    getPassword(){
        return this.#password;
    }
}
module.exports = User;