const deck = {
    createNewDeck:()=>{
        return true;
    },
    enableEdit:()=>{
        const quantities = document.getElementsByClassName("card-copies");
        console.log(quantities);
        for(let i = 0; i < quantities.length; i++) {
            const quantity = quantities[i];
            const value = quantity.innerText;
            const id = quantity.id;
            const element = $(`#${id}`);
            element.empty();
            element.append(`<input id="${id}_quantity" type="number" min="0" max="4" value="${value}">`);
        }
        $("#defaultStateButtons").css("display","none");
        $("#editStateButtons").css("display","");
    },
    cancelEdit:()=>{
        const quantities = document.getElementsByClassName("card-copies");
        for(let i = 0; i < quantities.length; i++) {
            const quantity = quantities[i];
            const id = quantity.id;
            const input = $(`#${id}_quantity`);
            const inputVal = input.attr('value');
            const element = $(`#${id}`);
            element.empty();
            quantity.append(inputVal);
        }
        $("#defaultStateButtons").css("display","");
        $("#editStateButtons").css("display","none");
    }
};
$(document).ready(()=>{
    common.setUpModalForm(ELEMENTS.NAVIGATION.MODAL.NEW_DECK,deck.createNewDeck);
    const editBtn = $("#editDeckButton");
    const cancelBtn = $("#cancelEditButton");
    if(editBtn.length > 0) {
        editBtn.on('click', deck.enableEdit);
    }
    if(cancelBtn.length>0){
        cancelBtn.on('click',deck.cancelEdit);
    }
});