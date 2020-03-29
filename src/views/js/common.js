function enterKeyPressed(e){
    let pressed = false;
    if(e.key){
        if(e.key === 'Enter'){
            pressed = true;
        }
    }
    return pressed
}
function hasValue(value){
    return value !== '';
}
function toggleModal(id,show){
    if(show){
        $(`#${id}`).modal('show');
    }else{
        $(`#${id}`).modal('hide');
    }
}
async function request(url,method,data = {}){
    return await $.ajax({url:url,method:method,data:data});
}