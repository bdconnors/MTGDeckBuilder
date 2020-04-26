let modifyDeckControls;
let saveBtn;
let editBtn;
let cancelBtn;
let addBtn;
let addSearchForm;
let addCardInput;
let addCardSubmit;
let addCardQuantity;
let autoComplete;
let deckContents;

let modifications;

$(document).ready(()=>{
    modifyDeckControls= $("#modifyDeckControls");
    console.log(modifyDeckControls);
    if($(ELEMENTS.NAVIGATION.MODAL.NEW_DECK).length > 0) {
        common.setUpModalForm(ELEMENTS.NAVIGATION.MODAL.NEW_DECK, deck.createNewDeck);
    }
    if(modifyDeckControls.length > 0){
        editBtn = $("#modifyDeckEditBtn");
        saveBtn = $("#modifyDeckSaveBtn");
        cancelBtn = $("#modifyDeckResetBtn");
        addBtn = $("#modifyDeckAddCardBtn");
        addSearchForm = $("#addCardSearchForm");
        addCardSubmit = $("#addCardSearchSubmit");
        addCardInput = $("#addCardSearch");
        addCardQuantity = $("#addCardQuantity");
        deckContents = $("#originalDeckContents");
        const cards = JSON.parse(deckContents.val());
        modifications = new DeckEdits(cards);
        editBtn.on('click',modifications.enable.bind(modifications));
        cancelBtn.on('click',modifications.cancel.bind(modifications));
        saveBtn.on('click',modifications.submitChanges.bind(modifications));
    }
});

const deck = {
    createNewDeck:()=>{
        return true;
    }
};

class DeckEdits{
    constructor(originalContents,edits = []){
        this.originalContents = originalContents;
        console.log(this.originalContents);
        this.edits = edits;
    }
    add(e){
        const notLegalErr = $("#cardNotLegalErr");
        notLegalErr.addClass("hide-container");
        let value = addCardInput.val();
        this.getCard(value).then((response)=>{
            if(response.results.length === 0){
                notLegalErr.removeClass("hide-container");
            }else {
                let cardId = response.results[0].id;
                const existingCard = this.existsInDeck(cardId);
                const previousModification = this.getModification(cardId);
                if(existingCard && !previousModification){
                    const quantity = existingCard.copies + 1;
                    this.addModification(cardId,"update",quantity);
                }else if(existingCard && previousModification){
                    if(previousModification.action === "update"){
                        const quantity = previousModification.quantity + 1;
                        if(existingCard.copies === quantity) {
                            this.removeModification(cardId);
                        }else{
                            previousModification.quantity = quantity;
                        }
                    }else if(previousModification.action === "delete"){
                        previousModification.action = "update";
                        previousModification.quantity = 1;
                    }
                }else{
                    this.addModification(cardId,"create",1);
                    this.addToView(response.results[0]);
                }
            }
        });
        console.log(this.edits);
    }
    removeFromView(cardId){
        const row = $(`#${cardId}_row`);
        row.addClass("hide-container");
    }
    addToView(card){
        const deckContentsTable = $("#deckContentsTable");
        let html = `<tr id="${card.id}_row">
                        <td id="${card.id}_value_container" class="border px-4 py-2 card-copies">
                            <input id="${card.id}" type="number" min="0" max="4" value="1">
                        </td>
                        <td class="border px-4 py-2">
                            <a class="deck-card-name" id="deck-card-name-${card.id}" href="/cards/${card.id}">${card.name}</a>
                        </td>
                        <td class="border px-4 py-2">`;
                            for(let i = 0; i < card.cost.length; i++){
                                const manaSymbol = card.cost[i];
                                html+=`<img class="mana-symbol-sprite float-left" src="${manaSymbol.svg_uri}"/>`;
                            }
                        html+=`</td>
                    </tr>`;
        deckContentsTable.append(html);
        $(`#${card.id}`).on('keyup mouseup',this.modify.bind(this));
    }
    getCard(name){
        return new Promise((res,rej)=>{
            const url = "/api/search?name="+name;
            $.ajax({
                url:url,
                method:'GET'
            }).done((response)=>{res(response)});
        });
    }
    existsInDeck(cardId){
        let result = false;
        for(let i = 0; i <this.originalContents.length; i++){
            const card = this.originalContents[i];
            if(card.card.id === cardId){
                result = card;
            }
        }
        return result;
    }
    getModification(cardId){
        console.log(cardId);
        let result = false;
        for(let i = 0; i < this.edits.length; i++){
            if(this.edits[i] !== null){
                if(this.edits[i].card === cardId) {
                    result = this.edits[i];
                }
            }
        }
        return result;
    }
    modify(e){

        let action;

        const cardId = e.target.id;
        const quantity = Number(e.target.value);
        const existingCard = this.existsInDeck(cardId);
        console.log(existingCard);
        const previousModification = this.getModification(cardId);
        console.log(previousModification);

        if(!previousModification) {
            if (existingCard && quantity === 0) {
                action = "delete";
                this.addModification(cardId, action, quantity);
                this.removeFromView(cardId);
            } else if (existingCard && quantity !== existingCard.copies) {
                action = "update";
                this.addModification(cardId, action, quantity);
            }
        }else{
            if(previousModification && existingCard && quantity === existingCard.copies){
                this.removeModification(cardId);
            }else if(previousModification && existingCard && quantity === 0){
                previousModification.action = "delete";
                delete previousModification.quantity;
                this.removeFromView(cardId);
            }else if(previousModification && existingCard && quantity !== previousModification.quantity){
                previousModification.action = "update";
                previousModification.quantity = quantity;
            }else if(previousModification && !existingCard && previousModification.action === "create"){
                if(quantity === 0){
                    this.removeModification(cardId);
                    this.removeFromView(cardId);
                }else if(quantity !== previousModification.quantity){
                    previousModification.quantity = quantity;
                }
            }
        }
        console.log(this.edits);
    }
    addModification(card,action,quantity){
        const modification = {card:card,action:action};
        if(quantity){
            modification.quantity = quantity;
        }
        const nullIndexId = this.edits.indexOf(null);
        console.log(nullIndexId);
        if(nullIndexId !== -1){
            this.edits[nullIndexId] = modification;
        }else{
            this.edits.push(modification);
        }
    }
    removeModification(cardId){
        for(let i = 0; i < this.edits.length; i++){
            if(this.edits[i] !== null){
                if(this.edits[i].card === cardId) {
                    this.edits[i] = null;
                }
            }
        }
    }
    enable(){
        const staticValues = this.originalContents;
        const inputs = this.createCardInputs(staticValues);
        this.enableInput(inputs);
        this.toggleControls(true);
    }
    cancel(){
        this.removeAddedCards();
        this.resetInput();
        this.toggleControls(false);
    }
    toggleControls(active){
        const controls = document.getElementsByClassName("modify-deck-control");
        console.log(controls);
        for(let i = 0; i < controls.length; i++){
            const control = controls[i];
            if(active) {
                control.classList.remove("hide-container");
            }else{
                control.classList.add("hide-container");
            }
        }
        if(active){
            $("#modifyDeckShow").addClass("hide-container");
            const searchBar = document.getElementById("addCardSearch");
            const submitBtn = document.getElementById("addCardSearchSubmit");
            autoComplete = new AutoComplete(searchBar);
            submitBtn.addEventListener('click',this.add.bind(this));
        }else{
            $("#modifyDeckShow").removeClass("hide-container");
        }
    }
    resetInput(){
        const inputValues = this.originalContents;
        for(let i = 0; i < inputValues.length; i++) {
            const values = inputValues[i];
            const containerId =`#${values.card.id}_row`;
            const container = $(containerId);
            container.removeClass("hide-container");
            const copiesContainer = $(`#${values.card.id}_value_container`);
            console.log(container);
            copiesContainer.empty();
            copiesContainer.append(values.copies);
        }
    }
    enableInput(inputs){
        for(let i = 0; i < inputs.length; i++){
            const input = inputs[i];
            const container = $(input.container);
            container.empty();
            container.append(input.html);
            container.on('keyup mouseup',this.modify.bind(this));
        }
    }
    createCardInputs(currentCards){
        const inputs = [];
        for(let i = 0; i < currentCards.length; i++) {
            const card = currentCards[i];
            const containerId = `#${card.card.id}_value_container`;
            const html = `<input id="${card.card.id}" type="number" min="0" max="4" value="${card.copies}">`;
            inputs.push({container:containerId,html:html});
        }
        return inputs;
    }
    removeAddedCards(){
        for(let i = 0; i < this.edits.length; i++) {
            const cardId = this.edits[i].card;
            if(this.edits[i].action === "create") {
                const cardRow = $(`#${cardId}_row`);
                cardRow.remove();
            }
        }
    }
    async submitChanges(){
        const values = JSON.stringify(this.edits);
        const hiddenForm = $("#editValuesForm");
        const hiddenValueInput = $("#editValuesInput");
        hiddenValueInput.val(values);
        hiddenForm.submit();
    }

}
class AutoComplete{
    constructor(input){
        this.currentFocus = -1;
        this.values = [];
        this.input = input;
        this.selected = -1;
        this.input.addEventListener('input',this.complete.bind(this));
        this.input.addEventListener('keydown',this.keyDownListener.bind(this));
    }
    callApi(value){
        return new Promise((res,rej)=>{
            $.ajax({
                url:`https://api.scryfall.com/cards/autocomplete?q=${value}`,
                method:'GET'
            }).done((response)=>{
                res(response.data);
            }).fail(()=>{
                console.log(`error calling autocomplete for ${value}`);
                rej(`error calling autocomplete for ${value}`);
            });
        });
    }
    complete(e){
        const input = e.target;
        let a, b, i, val = input.value;
        this.callApi(val).then((list)=>{
            this.values = list;
            /*close any already open lists of autocompleted values*/
            this.closeAllLists();
            if (!val) { return false;}
            this.currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", input.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            e.target.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < this.values.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (this.values[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = this.values[i].substr(0, val.length);
                    b.innerHTML += this.values[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + this.values[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener('click',this.clickListener.bind(this));
                    a.appendChild(b);
                }
            }
        });
    }
    keyDownListener(e){
        let x = document.getElementById(e.target.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            this.currentFocus++;
            /*and and make the current item more visible:*/
            this.addActive(x);
        } else if (e.keyCode === 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            this.currentFocus--;
            /*and and make the current item more visible:*/
            this.addActive(x);
        } else if (e.keyCode === 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (this.currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[this.currentFocus].click();
                this.selected = this.input.value;
            }
        }
    }
    clickListener(e){
        /*insert the value for the autocomplete text field:*/
        this.input.value = e.target.getElementsByTagName("input")[0].value;
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        this.selected = this.input.value;
        this.closeAllLists();
    }
    addActive(autoCompleteItems){
        console.log(autoCompleteItems);
        /*a function to classify an item as "active":*/
        if (!autoCompleteItems) return false;
        /*start by removing the "active" class on all items:*/
        this.removeActive(autoCompleteItems);
        if (this.currentFocus >= autoCompleteItems.length) this.currentFocus = 0;
        if (this.currentFocus < 0) this.currentFocus = (autoCompleteItems.length - 1);
        /*add class "autocomplete-active":*/
        autoCompleteItems[this.currentFocus].classList.add("autocomplete-active");
    }
    removeActive(autoCompleteItems){
        /*a function to remove the "active" class from all autocomplete items:*/
        for (let i = 0; i < autoCompleteItems.length; i++) {
            autoCompleteItems[i].classList.remove("autocomplete-active");
        }
    }
    closeAllLists(element) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let autoCompleteItems = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < autoCompleteItems.length; i++) {
            if (element !== autoCompleteItems[i] && element !== this.input) {
                autoCompleteItems[i].parentNode.removeChild(autoCompleteItems[i]);
            }
        }
    }
}