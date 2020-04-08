const decks = {
    createNewDeck:()=>{

        return true;
    }
};
$(document).ready(()=>{
    common.setUpModalForm(ELEMENTS.NAVIGATION.MODAL.NEW_DECK,decks.createNewDeck);
});