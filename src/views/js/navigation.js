$(document).ready(()=>{
    $('#loginModal').modal({backdrop: 'static', keyboard: false,show:false});
    $('#signUpModal').modal({backdrop: 'static', keyboard: false,show:false});
    $('#loginFormBtn').on('click',authenticate);
    $('#loginPassword').on('keyup',authenticate);
});
async function authenticate(e){
    if(loginRequest(e)){
        clearErrors();
        let verified = true;
        const credentials = {
            email:getLoginEmail(),
            password:getLoginPassword()
        };
        const authenticated = await request('/verify','POST',credentials);
        console.log(authenticated);
        if(!authenticated){verified = false;}
        login(verified);
    }
}
function login(verified){
    if(verified){
        const form = $('#loginForm');
        form.submit();
    }else{
        displayError('login',['email','password']);
    }
}
function displayError(type,effected){
    console.log(type,effected);
    highlightEffectedInputs(effected);
    displayErrorText(type);
}
function displayErrorText(type){
    const errId = type+'Err';
    console.log(errId);
    $('.err').filter((i)=>{
        const cur = $('.err')[i];
        const isErr = cur.id === errId;
        if(isErr){
            const id = '#'+cur.id;
            const err = $(id);
            console.log(err);
            err.css('display','block');
        }
    });
}
function highlightEffectedInputs(effected){
    $('.throwsErr').filter((i)=>{
        const cur = $('.throwsErr')[i];
        const name = cur.name;
        const isEffected = effected.includes(name);
        if(isEffected){
            const id = '#'+cur.id;
            const input = $(id);
            input.css('background-color','pink');
        }
    });
}
function clearErrors(){
    clearAllErrorText();
    clearHighlightedInputs();
}
function clearAllErrorText(){
    $('.throwsErr').filter((i)=>{
        const cur = $('.err')[i].id;
        const id = '#'+cur;
        const err = $(id);
        err.css('display','none');
    });
}
function clearHighlightedInputs(){
    $('.throwsErr').filter((i)=>{
        const cur =  $('.throwsErr')[i];
        const id = '#' + cur.id;
        const input = $(id);
        input.css('background-color', 'white');
    });
}
function loginRequest(e){
    const isLoginBtn = e.target.id === 'loginFormBtn';
    let isEnterKey = false;
    if(e.key){
        if(e.key === 'Enter'){
            isEnterKey = true;
        }
    }
    return isEnterKey || isLoginBtn;
}
function getLoginPasswordInput(){
    return $('#loginPassword');
}
function getLoginEmailInput(){
    return  $('#loginEmail');
}
function getLoginEmail(){
    return getLoginEmailInput().val();
}
function getLoginPassword(){
    return getLoginPasswordInput().val();
}
