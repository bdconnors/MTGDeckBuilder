class SearchResults{
    constructor(total,results = [],currentPage = 1) {
        this.total = total;
        this.results = results;
        this.currentPage = currentPage;
    }
    hasNext() {
        const pageCount = this.getPageCount();
        return this.currentPage + 1 < pageCount;
    }
    hasPrev(){
        return this.currentPage - 1 >= 1;
    }
    getNextPage(){
        return this.currentPage + 1;
    }
    getPrevPage(){
        return this.currentPage - 1;
    }
    getPageCount(){
        let total;
        const pageSize = process.env.SEARCH_PAGE_SIZE;
        const hasOrphan = this.total % process.env.SEARCH_PAGE_SIZE !== 0;
        total = this.total/pageSize;
        if(hasOrphan){total = Math.ceil(total);}
        return total;
    }
}
module.exports = SearchResults;