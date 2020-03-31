$(document).ready(()=>{
    setUpModalForm(MODAL.LOGIN,login);
    setUpModalForm(MODAL.SIGN_UP,signUp);
});
function signUp(){

    const signUp = signUpValues();
    const errorDisplay = MODAL.SIGN_UP.ERROR_DISPLAY;

    clearFormErrors(errorDisplay,Object.values(MODAL.SIGN_UP.INPUT));
    checkSignUpEmail(signUp);
    checkSignUpPassword(signUp);

    if(signUp.errors){
        formErrors(signUp.errorMsgs,errorDisplay,signUp.errorInputs);
    }
}
async function login(){

    const login = loginValues();

    clearFormErrors(MODAL.LOGIN.ERROR_DISPLAY,Object.values(MODAL.LOGIN.INPUT));
    checkLoginEmail(login);
    checkLoginPassword(login);

    if(login.errors){
        formErrors(login.errorMsgs,MODAL.LOGIN.ERROR_DISPLAY,login.errorInputs);
    }else{
        const authenticated = await request(
            '/verify',
            'POST',
            {email:login.email,password:login.password}
        );
        if (authenticated) {
            const form = $(MODAL.LOGIN.FORM);
            form.submit();
        } else {
            const effectedInputs = Object.values(MODAL.LOGIN.INPUT);
            formErrors(['*Incorrect e-mail or password'],MODAL.LOGIN.ERROR_DISPLAY,effectedInputs);
        }
    }
}
function checkLoginEmail(login){
    if(!hasValue(login.email)){
        login.errors = true;
        login.errorMsgs.push('*Enter your e-mail');
        login.errorInputs.push(MODAL.LOGIN.INPUT.EMAIL);
    }
}
function checkLoginPassword(login){
    if(!hasValue(login.password)){
        login.errors = true;
        login.errorMsgs.push('*Enter your password');
        login.errorInputs.push(MODAL.LOGIN.INPUT.PASSWORD);
    }
}
function checkSignUpEmail(signUp){
    const empty = !hasValue(signUp.email);
    if(empty){
        signUp.errors = true;
        signUp.errorMsgs.push('*Enter your e-mail');
        signUp.errorInputs.push(MODAL.SIGN_UP.INPUT.EMAIL);
    }else {
        const match = signUp.confirmEmail === signUp.email;
        if (!match) {
            signUp.errors = true;
            signUp.errorMsgs.push('*E-mails do not match');
            signUp.errorInputs.push(MODAL.SIGN_UP.INPUT.CONFIRM_EMAIL);
        }
    }
}
function checkSignUpPassword(signUp){
    const empty = !hasValue(signUp.password);
    if(empty){
        signUp.errors = true;
        signUp.errorMsgs.push('*Enter a password');
        signUp.errorInputs.push(MODAL.SIGN_UP.INPUT.PASSWORD);
    }else {
        const match = signUp.confirmPass === signUp.password;
        if (!match) {
            signUp.errors = true;
            signUp.errorMsgs.push('*Passwords do not match');
            signUp.errorInputs.push(MODAL.SIGN_UP.INPUT.CONFIRM_PASSWORD);
        }
    }
}
function loginValues(){
    const input = MODAL.LOGIN.INPUT;
    return {
        email:$(input.EMAIL).val(),
        password:$(input.PASSWORD).val(),
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