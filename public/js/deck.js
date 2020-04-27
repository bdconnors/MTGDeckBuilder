let autoComplete;
let modifications;
let deckCards;

$(document).ready(()=>{
    const modifyDeckControls = $("#modifyDeckControls");
    if($(ELEMENTS.NAVIGATION.MODAL.NEW_DECK).length > 0) {
        common.setUpModalForm(ELEMENTS.NAVIGATION.MODAL.NEW_DECK, deck.createNewDeck);
    }
    if(modifyDeckControls.length > 0){
        $.get('/all-cards.json',(data)=>{
            const allCards = data;
            const allCardNames = data.map((card)=> {
                return card.name;
            });

            const editBtn = $("#modifyDeckEditBtn");
            const saveBtn = $("#modifyDeckSaveBtn");
            const cancelBtn = $("#modifyDeckResetBtn");
            const deckContents = $("#originalDeckContents");
            const searchBar = document.getElementById("addCardSearch");
            const submitBtn = document.getElementById("addCardSearchSubmit");

            deckCards = JSON.parse(deckContents.val());
            autoComplete = new AutoComplete(searchBar,allCardNames);
            searchBar.addEventListener('input',autoComplete.complete.bind(autoComplete));
            searchBar.addEventListener('keydown',autoComplete.keyDownListener.bind(autoComplete));

            modifications = new DeckModification(deckCards,allCards,autoComplete);
            submitBtn.addEventListener('click',modifications.add.bind(modifications));
            editBtn.on('click',modifications.enable.bind(modifications));
            cancelBtn.on('click',modifications.cancel.bind(modifications));
            saveBtn.on('click',modifications.submitChanges.bind(modifications));
        });
    }
});

const deck = {
    createNewDeck:()=>{
        return true;
    }
};