class DeckService{

    constructor(repo){
        this.repo = repo;
    }

    async newDeck(userId,deckName){
        try {
            const valid = this.validateNew(userId,deckName);
            if(valid) {
                return await this.repo.create({user: userId, name: deckName});
            }else{
                return false;
            }
        }catch (e) {
            console.log(e);
        }
    }
    async addToDeck(deckId,cardId,copies){
        const valid = this.validateAdd(deckId,cardId,copies);
        if(valid) {
            return await this.repo.createDeckCard(deckId, cardId, copies);
        }else{
            return false;
        }
    }
    async getDeck(id){

    }

    validateAdd(deckId,cardId,copies){
        const validDeckId = validation.isInt(deckId);
        const validCardId = validation.isInt(cardId);
        const validCopies = validation.isInt(copies);
        return validDeckId && validCardId && validCopies;
    }
    validateNew(userId,deckName){
        const validUserId = validation.isInt(userId);
        const validDeckName = validation.isAlphanumeric(deckName);
        return validUserId && validDeckName;
    }
}
module.exports = DeckService;