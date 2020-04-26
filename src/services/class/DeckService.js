const validation = require('../../util').Validation;
const Service = require('./Service');
class DeckService extends Service{

    constructor(repo,cardRepo){
        super(repo);
        this.cards = cardRepo;
    }
    async getDeck(deckId){
        try{
            return await this.repo.retrieve({id:deckId});
        }catch (e) {
            throw new Error('deck not found');
        }
    }
    async editDeck(deckId,modifications){
        try{
            await this.repo.updateCards(deckId,modifications);
        }catch (e) {
            throw new Error(e);
        }
    }
    async deleteDeck(deckId){
        try{
            await this.repo.delete({deck:deckId});
        }catch (e) {
            throw new Error(e);
        }
    }
    async newDeck(userId,deckName) {
        try {
            const id = userId.toString();
            this.validateNewDeck(id, deckName);
            return await this.repo.create({user: id, name: deckName});

        } catch (e) {
            throw new Error(e);
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

}
module.exports = DeckService;