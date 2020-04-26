module.exports ={
        HOME:[
            {method:'get',path:'/',endpoint:'index'}
        ],
        AUTH:[
            {method:'post',path:'/login',endpoint:'login'},
            {method:'post',path:'/logout',endpoint:'logout'},
            {method:'post',path:'/register',endpoint:'register'},
            {method:'post',path:'/verify',endpoint:'verify'}
        ],
        CARDS:[
            {method:'get',path:'/cards',endpoint:'index'},
            {method:'get',path:'/api/search',endpoint:'search'},
            {method:'get',path:'/cards/:id',endpoint:'profile'},
        ],
        DECKS:[
            {method:'get',path:'/decks',endpoint:'index'},
            {method:'get',path:'/decks/:id',endpoint:'deckProfile'},
            {method:'post',path:'/decks/:id/edit',endpoint:'editDeck'},
            {method:'post',path:'/decks/:id/delete',endpoint:'deleteDeck'},
            {method:'post',path:'/decks',endpoint:'newDeck'}
        ]

};
