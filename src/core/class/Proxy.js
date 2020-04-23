const axios = require('axios');
/* handles calls to the api */
class Proxy{
    constructor(){}
    async search(query) {
        try{
            return await this.api(query);
        } catch(e){
            return {total:0,page:1,data:[]};
        }
    }
    buildURL(query){
        let url = process.env.PROXY_BASE; //link to the api
        if(query.id){
            url+= query.id; //adds an id the end of the query
        }else{
            let page = 1;
            if(query.page){page = query.page;}
            url += process.env.PROXY_SEARCH_BASE + page;
            url += process.env.PROXY_QUERY_BASE;
            if (query.name) {
                url += process.env.PROXY_QUERY_PARAM_NAME + query.name;
            }
        }
        //console.log(url); //checking what is sent to the db
        return url;
    }
    async api(query){
        let url = this.buildURL(query);
        return await axios.get(url).then((response)=>{
            let page;
            let total;
            let data;
            if(response.data.object === 'card'){
                total = 1;
                page = 1;
                //console.log(response.data);
                data = [response.data];
            }else if(response.data.object === 'list'){
                page = 1;
                //console.log(response.data);
                if(query.page){
                    page = query.page;
                }
                total = response.data.total_cards; //number of cards from the list of search results
                data = response.data.data; //the actual card data
            }
            return {total:total,page:page,data:data};
        }).catch((e)=>{
            throw new Error(e);
        });
    }
}


module.exports = Proxy;
/**module.exports = ApiProxy;
const apiRequest = async (query) =>{
    const url = buildURL(query);
    const response = await got(url);
    const body = JSON.parse(response.body);
    return {headers:response.headers,body:body};
};
const buildURL = (query) =>{
    let url = CONFIG.PROXY.BASE_URL;
    Object.keys(query).map((key)=>{
        const value = query[key];
        const param = "&"+key+"="+value;
        url+=param;
    });
    return url;
};
const searchCards = async(query)=>{
    const response = await apiRequest(query);
    const pages = processHeaders(response.headers);
    const total = response.headers['total-count'];
    const cards = processBody(response.body);
    return makeSearchResults(pages,total,cards);
};
const processHeaders = (headers) =>{
    const links = parseLinkHeader(headers.link);
    const next = links.next.page;
    const last = links.last.page;
    let prev = last;
    if(links.prev){prev = links.prev.page;}
    return makePages(prev,next,last);
};
const processBody = (body) =>{
    const data = [];
    const results = body.cards;
    results.forEach((queryResult)=>{
        if(!alreadyExists(queryResult.name,data)) {
            if (hasMultipleVersions(queryResult.name, results)) {
                const imageVersion = getVersionWithImage(queryResult.name, results);
                data.push(imageVersion);
            } else {
                data.push(queryResult);
            }
        }
    });
    return makeCards(data);
};
const getAllCards = async() =>{
    return await searchCards({});
};
const getCard = async(id)=>{
    let card = false;
    const response = await apiRequest({multiverseid:id});
    const cards = response.body.cards;
    if(cards.length > 0){
        card = makeCard(cards[0]);
    }
    return card;
};

const makeCard = (values) =>{
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
const makePages = (prev,next,last) =>{
    return new Pages(prev,next,last);
};
const makeSearchResults = (pages,total,cards)=>{
    return new SearchResults(pages,total,cards);
};
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
const makeCards = (data) =>{
    const cards = [];
    for(let i = 0; i < data.length; i++){
        const rawCard = data[i];
        const card = makeCard(rawCard);
        cards.push(card);
    }
    return cards;
};
module.exports.searchCards = searchCards;
module.exports.getAllCards = getAllCards;
module.exports.getCard = getCard;
module.exports.makeCards = makeCards;
module.exports.makeCard = makeCard;**/