const mtg = require('mtgsdk');
const Card = require('../models/Card');
/**
 * @query a plain object specifying criteria ex: {id:123}
 *
 * queries the MTG.io api based on criteria provided in the query object
 *
 * **/
const query = async(query)=>{
    query.gameFormat = CONFIG.GAME_FORMAT;
    const totalResults = await mtg.card.where(query);
    const currentResults = [];
    totalResults.forEach((queryResult)=>{
        if(!alreadyExists(queryResult.name,currentResults)) {
            if (hasMultipleVersions(queryResult.name, totalResults)) {
                const imageVersion = getVersionWithImage(queryResult.name, totalResults);
                currentResults.push(imageVersion);
            } else {
                currentResults.push(queryResult);
            }
        }

    });
    return process(currentResults);
};
/**
 * @id an id string of the requested card
 *
 * retrieves a card from the MTG.io api based on the id provided
 *
 * **/
const getCard = async(id)=>{
    const result = await query({id:id});
    console.log('in api proxy');
    console.log(result);
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
    return new Card(values.id,
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
const hasMultipleVersions = (name,totalResults) =>{
    let hasMultiple = false;
    const versions = getAllVersions(name,totalResults);
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
const alreadyExists = (name,currentResults) => {
    let exists = false;
    const resultExists = currentResults.find((result)=>{
        return result.name === name;
    });
    if(resultExists){
        exists = true;
    }
    return exists;
};
const getAllVersions = (name,totalResults) =>{
    return totalResults.filter((version)=> {
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
module.exports.getCard = getCard;
module.exports.process = process;
module.exports.make = make;