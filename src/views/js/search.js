const search = {
    submit: (e) => {
        //const isSubmitBtn = e.target === ELEMENTS.SEARCH_BAR.SUBMIT_BTN;
        //const isEnterKey = common.enterKeyPressed(e);

        //if(isEnterKey || isSubmitBtn) {
            const searchBar = $(ELEMENTS.SEARCH_BAR.ID);
            const value = searchBar.val();
            const empty = validator.isEmpty(value,{ignore_whitespace:true});
            return !empty;
            //if(!empty ) {

            //}
        //}
    }
};
