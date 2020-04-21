const validation = require('validator');
const xssFilters = require('xss-filters');
const encryption = require('./Encryption');

const validAddCard = (deckId,cardId,copies) =>{
    return validInt(deckId) && validInt(cardId) && validInt(copies);
};
const validAddDeck = (userId,deckName) =>{
    return validInt(userId) && validAlphaNumeric(deckName);
};
const validCredentials = (email,password) =>{
    return validEmail(email) && validAlphaNumeric(password);
};
const validLogin = async (password,hash) =>{
    return await encryption.compare(password,hash);
};
const validEmail = (value) =>{
    const crossSiteAttack = !xssFilters.inHTMLData(value);
    value = sanitize(value);
    const validEmail = validation.isEmail(value);
    return !crossSiteAttack && validEmail;
};
const validInt = (value) =>{
    const crossSiteAttack = !xssFilters.inHTMLData(value);
    value = sanitize(value);
    const validInt = validation.isInt(value);
    return !crossSiteAttack && validInt;
};
const validAlphaNumeric = (value) =>{
    const crossSiteAttack = !xssFilters.inHTMLData(value);
    value = sanitize(value);
    const validAlphaNum = validation.isAlphanumeric(value);
    return !crossSiteAttack && validAlphaNum;
};
const validDate = (value) =>{
    const crossSiteAttack = !xssFilters.inHTMLData(value);
    value = sanitize(value);
    value = validation.toDate(value);
    return value !== null && !crossSiteAttack;
};
const sanitize = (value) =>{
    value = validation.escape(value);
    value = validation.trim(value);
    value = validation.stripLow(value);
    return value;
};
module.exports.validAddCard = validAddCard;
module.exports.validAddDeck = validAddDeck;
module.exports.validCredentials = validCredentials;
module.exports.validLogin = validLogin;
module.exports.sanitize = sanitize;