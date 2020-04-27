class DeckModification{
    constructor(originalContents,allCards,autoComplete,edits = []){
        this.originalContents = originalContents;
        this.allCards = allCards;
        this.autoComplete = autoComplete;
        this.edits = edits;
    }
    add(e){
        const notFoundErr = $("#cardNotFoundErr");
        notFoundErr.addClass("hide-container");
        let value = $("#addCardSearch").val();
        const card = this.getCard(value);
        if(card) {
            const existingCard = this.existsInDeck(card.id);
            const previousModification = this.getModification(card.id);
            if (existingCard && !previousModification) {
                const quantity = existingCard.copies + 1;
                this.addModification(card.id, "update", quantity);
            } else if (existingCard && previousModification) {
                if (previousModification.action === "update") {
                    const quantity = previousModification.quantity + 1;
                    if (existingCard.copies === quantity) {
                        this.removeModification(card.id);
                    } else {
                        previousModification.quantity = quantity;
                    }
                } else if (previousModification.action === "delete") {
                    previousModification.action = "update";
                    previousModification.quantity = 1;
                }
            } else {
                this.addModification(card.id, "create", 1);
                this.addToView(card);
                $("#addCardSearch").val("");
            }
        }else{
            notFoundErr.removeClass("hide-container");
        }

    }
    hideFromView(cardId){
        const row = $(`#${cardId}_row`);
        row.addClass("hide-container");
    }
    removeFromView(cardId){
        const container = $(`#${cardId}_row`);
        container.remove();
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
        return this.allCards.find((card)=>{
            return card.name === name;
        });
    }
    existsInDeck(cardId){
        for(let i = 0; i <this.originalContents.length; i++){
            const card = this.originalContents[i];
            if(card.card.id === cardId){
                return card;
            }
        }
    }
    getModification(cardId){
        for(let i = 0; i < this.edits.length; i++){
            if(this.edits[i] !== null){
                if(this.edits[i].card === cardId) {
                    return this.edits[i];
                }
            }
        }
    }
    modify(e){

        const cardId = e.target.id;
        const quantity = Number(e.target.value);
        const existingCard = this.existsInDeck(cardId);
        const previousModification = this.getModification(cardId);

        if(!previousModification) {
            if (existingCard) {
                if(quantity <= 0) {
                    this.addModification(cardId, "delete");
                    this.hideFromView(cardId);
                }else{
                    this.addModification(cardId,"update",quantity);
                }
            }
        }else{
            if(existingCard){
                if(quantity <= 0){
                    previousModification.action = "delete";
                    if(previousModification.quantity){
                        delete previousModification.quantity;
                    }
                }else{
                    previousModification.action = "update";
                    previousModification.quantity = quantity;
                }
            }else if(previousModification.action === "create"){
                if(quantity <= 0) {
                    this.removeModification(cardId);
                    this.removeFromView(cardId);
                }else{
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
        }else{
            $("#addCardSearch").val("");
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
            container.on('mouseup',this.modify.bind(this));
            container.on('keyup',(e)=>{
                e.preventDefault();
            });
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
            if(this.edits[i] !== null) {
                if (this.edits[i].action === "create") {
                    const cardRow = $(`#${cardId}_row`);
                    cardRow.remove();
                }
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