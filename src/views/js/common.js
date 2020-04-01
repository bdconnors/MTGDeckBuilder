function enterKeyPressed(e){
    let pressed = false;
    if(e.key){
        if(e.key === 'Enter'){
            pressed = true;
        }
    }
    return pressed
}
function toggleModal(id,show){
    if(show){
        $(id).modal('show');
    }else{
        $(id).modal('hide');
    }
}
function formErrors(messages,errorContainerId,effectedInputs){
    highlightInputs(effectedInputs,'pink');
    displayMessages(errorContainerId,messages,'16px','red','bold');
}
function clearFormErrors(errorContainerId,inputs){
    $(errorContainerId).empty();
    highlightInputs(inputs,'');
}
function highlightInputs(inputs,color){
    inputs.forEach((input)=>{
        $(input).css('background-color',color);
    });
}
function displayMessages(containerId,messages,textSize,color,weight){
    messages.forEach((message)=>{
        $(containerId).append(
            `<div class="row mx-auto">
                <div class="col my-auto">
                    <p style="font-size:${textSize};color:${color};font-weight:${weight}">
                        ${message}
                    </p>
                </div>
            </div>`
        );
    });
}
async function request(url,method,data = {}){
    return await $.ajax({url:url,method:method,data:data});
}
function setUpModalForm(config,action){
    const modalDiv = $(config.ID);
    const toggleBtn = $(config.TOGGLE_BTN);
    const submitBtn = $(config.SUBMIT_BTN);
    const closeBtn = $(config.CLOSE_BTN);
    modalDiv.modal({backdrop: 'static',show:false});
    submitBtn.on('click',action);
    closeBtn.on('click',()=>{
        resetForm(config.FORM,config.ERROR_DISPLAY,Object.values(config.INPUT));
    });
    toggleBtn.on('click',()=>{
        toggleModal(config.ID,true)
    });
}
function resetForm(id,errorDisplay,inputs){
    clearFormErrors(errorDisplay,inputs);
    $(id)[0].reset();

}
function validEmail(email){
    const crossSiteAttack = !xssFilters.inHTMLData(email);
    email = sanitize(email);
    const empty = validator.isEmpty(email);
    const valid = validator.isEmail(email);
    return !crossSiteAttack && !empty && valid;
}
function validPassword(password){
    const crossSiteAttack = !xssFilters.inHTMLData(password);
    password = sanitize(password);
    const empty = validator.isEmpty(password);
    const valid = validator.isAlphanumeric(password);
    return !crossSiteAttack && !empty && valid;
}
function sanitize(value){
    value = validator.escape(value);
    value = validator.trim(value);
    value = validator.stripLow(value);
    return value;
}
function match(value1,value2){
    return value1 === value2;
}