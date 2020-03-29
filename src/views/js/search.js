$(document).ready(()=>{
    $('#cardSearch').on('keyup',search);
});
function search(e){
    if(searchSubmitted(e) && searchHasValue()) {
        const value = document.getElementById('cardSearch').value;
        const submission = document.getElementById('cardSearchValue');
        const form = document.getElementById('cardSearchForm');
        submission.value = value;
        form.submit();
    }
}
function searchSubmitted(e){
    const isEnterKey = searchEnterKey(e);
    const isSearchBtn = searchBtnClicked(e);
    return isEnterKey || isSearchBtn;
}
function searchEnterKey(e){
    let pressed = false;
    if(e.key){
        if(e.key === 'Enter'){
            pressed = true;
        }
    }
    return pressed
}
function searchBtnClicked(e){
    return e.target.id === 'cardSearchBtn';
}
function searchHasValue(value){
    return value !== '';
}