class DeckService{

    constructor(repo){
        this.repo = repo;
    }

    async newDeck(user,name){
        try {
            return await this.repo.create({user: user, name: name});
        }catch (e) {
            console.log(e);
        }
    }
    async addToDeck(deckId,cardId,copies){
        return await this.repo.createDeckCard(deckId,cardId,copies);
    }
    async getDeck(id){

    }
}
module.exports = DeckService;