const validation = require('../util/validation');
const Service = require('./Service');
class DeckService extends Service{

    constructor(repo){
        super(repo);
    }

    async getDeck(deckId){
        try{
            return await this.repo.retrieve({id:deckId});
        }catch (e) {
            throw new Error('deck not found');
        }
    }
    async newDeck(userId,deckName){
        try {
            const id = userId.toString();
            this.validateNewDeck(id,deckName);
            return await this.repo.create({user: id, name: deckName});

        }catch (e) {
            throw new Error(e);
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
    async getUserDecks(userId){
        return await this.repo.getUserDecks(userId);
    }
    validateNewDeck(id,name){
        const valid = validation.validAddDeck(id,name);
        if(!valid){
            throw new Error('invalid user id or deck name');
        }
    }
    validateAdd(deckId,cardId,copies){
        const validDeckId = validation.isInt(deckId);
        const validCardId = validation.isInt(cardId);
        const validCopies = validation.isInt(copies);
        return validDeckId && validCardId && validCopies;
    }

}
module.exports = DeckService;