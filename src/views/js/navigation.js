function toggleLoginModal(show){
    let action;
    if(show){
        action = 'show';
    }else{
        action = 'hide';
    }
    $('#loginModal').modal(action);
}
function toggleSignUpModal(show){
    let action;
    if(show){
        action = 'show';
    }else{
        action = 'hide';
    }
    $('#signUpModal').modal(action);
}