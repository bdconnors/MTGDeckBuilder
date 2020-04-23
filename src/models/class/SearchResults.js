class SearchResults{
    constructor(total,results = []) {
        this.total = total;
        this.results = results;
    }
    getPageCount(){
        let total;
        const pageSize = process.env.SEARCH_PAGE_SIZE;
        const remainder = this.total % process.env.SEARCH_PAGE_SIZE;
        total = this.total/pageSize;
        if(remainder){
            total = Math.ceil(total);
        }
        return total;
    }
}
module.exports = SearchResults;