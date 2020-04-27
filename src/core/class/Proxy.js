const axios = require('axios');
/* handles calls to the api */
class Proxy{
    constructor(){
        this.symbols = [];
    }
    async search(query) {
        try{
            const manaSymbolsLoaded = this.symbols.length > 0;
            if(!manaSymbolsLoaded){await this.loadSymbols();}
            let url = this.buildURL(query);
            const response = await this.api(url);
            console.log(this.symbols);
            return this.process(query,response);

        } catch(e){
            console.log(e);
            return {total:0,page:1,data:[]};
        }
    }
    process(query,response){
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
        const result = {total:total,page:page,data:data};
        return result;
    }
    buildURL(query){
        console.log(query);
        console.log(process.env.PROXY_BASE);
        let url = process.env.PROXY_BASE; //link to the api
        console.log(url);
        if(query.id){
            console.log('has id');
            url+= query.id; //adds an id the end of the query
        }else{
            console.log('no id');
            let page = 1;
            if(query.page){page = query.page;}
            url += process.env.PROXY_SEARCH_BASE + page;
            url += process.env.PROXY_QUERY_BASE;
            if (query.name) {
                url += process.env.PROXY_QUERY_PARAM_NAME + query.name;
            }
        }
        console.log(url);
        //console.log(url); //checking what is sent to the db
        return url;
    }
    async api(url){
        console.log(url);
        return await axios.get(url).then((response)=>{
          return response;
        }).catch((e)=>{
            throw new Error(e);
        });
    }
    async loadSymbols(){
        const response =  await this.api(process.env.PROXY_SYMBOLS);
        response.data.data.forEach((symbol)=>{
            if(symbol.appears_in_mana_costs){
                this.symbols.push({symbol:symbol.symbol,svg_uri:symbol.svg_uri});
            }
        });
    }
    getManaSymbols(manaCost){
        let symbols = [];
        this.symbols.forEach((symbol)=>{
            if(symbol) {
                const occurrenceCount = manaCost.split(symbol.symbol).length - 1;
                if (occurrenceCount > 0) {
                    for (let i = 0; i < occurrenceCount; i++) {
                        symbols.push(symbol);
                    }
                }
            }
        });
        return symbols
    }
}


module.exports = Proxy;