$(document).ready(()=>{
    $('#cardSearch').on('keyup',search);
});
function search(e){
    const searchBar = document.getElementById('cardSearch');
    if(searchSubmitted(e) && hasValue(searchBar.value)) {
        const value = searchBar.value;
        const submission = document.getElementById('cardSearchValue');
        const form = document.getElementById('cardSearchForm');
        submission.value = value;
        form.submit();
    }
}
function searchSubmitted(e){
    const isEnterKey = enterKeyPressed(e);
    const isSearchBtn = e.target.id === 'cardSearchBtn';
    return isEnterKey || isSearchBtn;
}