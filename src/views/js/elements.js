//wraps values in object to prevent global namespace pollution
const ELEMENTS = {
    SEARCH_BAR:{
        ID:'#cardSearch',
        FORM:'#cardSearchForm',
        VALUE:'#cardSearchValue',
        SUBMIT_BTN:'#cardSearchSubmit'
    },
    MODAL: {
        LOGIN: {
            ID: '#loginModal',
            MSG_DISPLAY: '#loginMsg',
            TOGGLE_BTN: '#loginShow',
            SUBMIT_BTN: '#loginSubmit',
            CLOSE_BTN: '#loginClose',
            FORM: '#loginForm',
            INPUT: {
                EMAIL: '#loginEmail',
                PASSWORD: '#loginPassword'
            }
        },
        SIGN_UP: {
            ID: '#signUpModal',
            MSG_DISPLAY: '#signUpMsg',
            TOGGLE_BTN: '#signUpShow',
            SUBMIT_BTN: '#signUpSubmit',
            CLOSE_BTN: '#signUpClose',
            FORM: '#signUpForm',
            INPUT: {
                EMAIL: '#signUpEmail',
                CONFIRM_EMAIL: '#signUpConfirmEmail',
                PASSWORD: '#signUpPassword',
                CONFIRM_PASSWORD: '#signUpConfirmPassword'
            }
        }
    }
};