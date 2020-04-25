let modifyDeckControls;
let editBtn;
let cancelBtn;

let modifications;

$(document).ready(()=>{
    modifyDeckControls= $("#modifyDeckControls");
    editBtn = $("#modifyDeckEditBtn");
    cancelBtn = $("#modifyDeckResetBtn");
    common.setUpModalForm(ELEMENTS.NAVIGATION.MODAL.NEW_DECK,deck.createNewDeck);
    if(modifyDeckControls.length > 0){
        modifications = new DeckEdits();
        editBtn.on('click',modifications.enable.bind(modifications));
        cancelBtn.on('click',modifications.cancel.bind(modifications));
    }
});

const deck = {
    createNewDeck:()=>{
        return true;
    }
};
class DeckEdits{
    constructor(edits = []){
        this.edits = edits;
    }
    modify(e){
        let action;
        const quantity = Number(e.target.value);
        const cardId = e.target.id;
        console.log(quantity);
        console.log(quantity === 0);
        if(quantity === 0){
            action = "delete";
        }else{
            action = "update";
        }
        const previousEdit = this.edits.find((edit)=>{
            return edit.card === cardId;
        });
        if(previousEdit){
            previousEdit.action = action;
            previousEdit.quantity = quantity;
        }else {
            this.edits.push({card:cardId,action:action,quantity:quantity});
        }
        console.log(this.edits);
    }
    enable(){
        const quantities = document.getElementsByClassName("card-copies");
        for(let i = 0; i < quantities.length; i++) {
            const quantity = quantities[i];
            const value = quantity.innerText;
            const containerId = quantity.id;
            const cardId = containerId.split("_")[0];
            const element = $(`#${containerId}`);
            console.log(element.length);
            element.empty();
            element.append(`<input id="${cardId}" type="number" min="0" max="4" value="${value}">`);
            $(`#${cardId}`).bind('keyup mouseup',this.modify.bind(this));
        }
        $("#modifyDeckControls").removeClass("hide-container");
        $("#modifyDeckShow").addClass("hide-container");
    }
    cancel(){
        const quantities = document.getElementsByClassName("card-copies");
        for(let i = 0; i < quantities.length; i++) {
            const quantity = quantities[i];
            const containerId = quantity.id;
            const cardId = containerId.split("_")[0];
            const input = $(`#${cardId}`);
            const inputVal = input.attr('value');
            const element = $(`#${cardId}_value_container`);
            element.empty();
            quantity.append(inputVal);
        }
        $("#modifyDeckControls").addClass("hide-container");
        $("#modifyDeckShow").removeClass("hide-container");
        this.edits = [];
    }
    submitChanges(){
        return false;
    }
}