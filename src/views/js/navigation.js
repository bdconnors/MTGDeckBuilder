$(document).ready(()=>{
    setUpModalForm(MODAL.LOGIN,login);
    setUpModalForm(MODAL.SIGN_UP,signUp);
});
function signUp(){

    const signUp = signUpValues();
    const valid = validSignUp(signUp);
    const errorDisplay = MODAL.SIGN_UP.ERROR_DISPLAY;

    clearFormErrors(errorDisplay,Object.values(MODAL.SIGN_UP.INPUT));
    console.log('valid sign up?: '+valid);
    if(!valid){
        formErrors(signUp.errorMsgs,errorDisplay,signUp.errorInputs);
    }
}
async function login(){

    const login = loginValues();
    const valid = validLogin(login);
    clearFormErrors(MODAL.LOGIN.ERROR_DISPLAY,Object.values(MODAL.LOGIN.INPUT));
    console.log('valid login: '+valid);
    if(valid){
        const authenticated = await request(
            '/verify',
            'POST',
            {email:login.email,password:login.password}
        );
        console.log('Authenticated: '+authenticated);
        if (authenticated) {
            const form = $(MODAL.LOGIN.FORM);
            form.submit();
        } else {
            const effectedInputs = Object.values(MODAL.LOGIN.INPUT);
            formErrors(['*Incorrect e-mail or password'],MODAL.LOGIN.ERROR_DISPLAY,effectedInputs);
        }
    }else{
        formErrors(login.errorMsgs,MODAL.LOGIN.ERROR_DISPLAY,login.errorInputs);
    }
}
function validLogin(login){
    if(!validPassword(login.password) || !validEmail(login.email)){
        login.errors = true;
        login.errorMsgs.push('*Invalid e-mail or password');
        login.errorInputs.push(MODAL.LOGIN.INPUT.EMAIL);
        login.errorInputs.push(MODAL.LOGIN.INPUT.PASSWORD);
    }
    console.log(login);
    return !login.errors;
}
function validSignUp(signUp){
    const validEmail = validateSignUpEmail(signUp);
    const validPassword = validateSignUpPassword(signUp);
    return validEmail && validPassword;
}
function validateSignUpEmail(signUp){
    if(!validEmail(signUp.email)){
        signUp.errors = true;
        signUp.errorMsgs.push('*Invalid e-mail');
        signUp.errorInputs.push(MODAL.SIGN_UP.INPUT.EMAIL);
    }else {
        if (!match(signUp.email,signUp.confirmEmail)) {
            signUp.errors = true;
            signUp.errorMsgs.push('*E-mails do not match');
            signUp.errorInputs.push(MODAL.SIGN_UP.INPUT.CONFIRM_EMAIL);
        }
    }
    return !signUp.errors;
}
function validateSignUpPassword(signUp){
    if(!validPassword(signUp.password)){
        signUp.errors = true;
        signUp.errorMsgs.push('*Invalid password');
        signUp.errorInputs.push(MODAL.SIGN_UP.INPUT.PASSWORD);
    }else {
        if (!match(signUp.password,signUp.confirmPass)) {
            signUp.errors = true;
            signUp.errorMsgs.push('*Passwords do not match');
            signUp.errorInputs.push(MODAL.SIGN_UP.INPUT.CONFIRM_PASSWORD);
        }
    }
    return !signUp.errors;
}
function loginValues(){
    const input = MODAL.LOGIN.INPUT;
    return {
        email:$(input.EMAIL).val(),
        password:$(input.PASSWORD).val(),
        errors:false,
        errorMsgs:[],
        errorInputs:[]
    }
}
function signUpValues(){
    const input = MODAL.SIGN_UP.INPUT;
    return {
        email: $(input.EMAIL).val(),
        confirmEmail: $(input.CONFIRM_EMAIL).val(),
        password: $(input.PASSWORD).val(),
        confirmPass: $(input.CONFIRM_PASSWORD).val(),
        errors:false,
        errorMsgs:[],
        errorInputs:[]
    };
}