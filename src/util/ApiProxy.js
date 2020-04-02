const mtg = require('mtgsdk');
const Card = require('../models/Card');
/**
 * @query a plain object specifying criteria ex: {id:123}
 *
 * queries the MTG.io api based on criteria provided in the query object
 *
 * **/
const query = async(query)=>{
    query.gameFormat = CONFIG.PROXY.GAME_FORMAT;
    const results = [];
    const totalResults = await mtg.card.where(query);
    totalResults.forEach((queryResult)=>{
        if(!alreadyExists(queryResult.name,results)) {
            if (hasMultipleVersions(queryResult.name, totalResults)) {
                const imageVersion = getVersionWithImage(queryResult.name, totalResults);
                results.push(imageVersion);
            } else {
                results.push(queryResult);
            }
        }

    });
    return process(results);
};
const getAllCards = async() =>{
    return await query({});
};
/**
 * @id an id string of the requested card
 *
 * retrieves a card from the MTG.io api based on the id provided
 *
 * **/
const getCard = async(id)=>{
    const result = await query({multiverseid:id});
    return result[0];
};
/**
 *
 * @values the card object provided by MTG.io api
 *
 * converts the MTG.io api card object into a simplified version for our use
 *
 * **/
const make = (values) =>{
    return new Card(values.multiverseid,
        values.name,
        values.manaCost,
        values.cmc,
        values.setName,
        values.types,
        values.supertypes,
        values.subtypes,
        values.colors,
        values.rarity,
        values.text,
        values.imageUrl);
};
/**
 * @results an array of MTG.io card results
 *
 * processes results from MTG.io query and returns an array of our Card model
 *
 * **/
const getVersionWithImage = (name,totalResults)=>{
    let first = false;
    const versions = getAllVersions(name,totalResults);
    if(versions.length > 0){
        for(let i = 0; i < versions.length; i++){
            const version = versions[i];
            if(hasImage(version)){
               first = version;
            }
        }
    }
    return first;
};
const hasMultipleVersions = (name,results) =>{
    let hasMultiple = false;
    const versions = getAllVersions(name,results);
    if(versions.length > 1){
        hasMultiple = true;
    }
    return hasMultiple;
};
const hasImage =(version)=> {
    let imageExists = false;
    if(version.imageUrl){
        imageExists = true;
    }
    return imageExists;
};
const alreadyExists = (name,results) => {
    let exists = false;
    const resultExists = results.find((result)=>{
        return result.name === name;
    });
    if(resultExists){
        exists = true;
    }
    return exists;
};
const getAllVersions = (name,results) =>{
    return results.filter((version)=> {
        return version.name === name;
    });
};
const process = (results) =>{
    const cards = [];
    for(let i = 0; i < results.length; i++){
        const rawCard = results[i];
        const card = make(rawCard);
        cards.push(card);
    }
    return cards;
};
module.exports.query = query;
module.exports.getAllCards = getAllCards;
module.exports.getCard = getCard;
module.exports.process = process;
module.exports.make = make;