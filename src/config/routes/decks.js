module.exports = [
    {method:'get',path:'/decks',endpoint:'index'},
    {method:'post',path:'/decks/create',endpoint:'newDeck'},
    {method:'post',path:'/decks/:id',endpoint:'addCard'}
];