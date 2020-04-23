const deck = {
    createNewDeck:()=>{

        return true;
    }
};
$(document).ready(()=>{
    common.setUpModalForm(ELEMENTS.NAVIGATION.MODAL.NEW_DECK,deck.createNewDeck);
});