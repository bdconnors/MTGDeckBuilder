class User {
    #password;
    constructor(id,email,password,decks = []){
        this.id = id;
        this.email = email;
        this.#password = password;
        this.decks = decks;
    }
    getPassword(){
        return this.#password;
    }
}
module.exports = User;