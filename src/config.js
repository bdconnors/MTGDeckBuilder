const uuid = require('uuid');

global.CONFIG = {
    SERVER:{
        HOST:'localhost',
        PORT:'3000',
        VIEW:{
            ENGINE:'ejs',
            DIR:'views'
        },
        SESSION:{
            genid: (req)=>{
                return uuid.v4();
            },
            secret:'eb1d1a6a-cd33-45cc-9843-7fa31eae7269',
            resave:false,
            saveUninitialized: true,
            name: 'session',
            rolling: true,
            cookie: { secure:true,maxAge: 3600000 }
        }
    },
    DB:{
        host:'localhost',
        user:'root',
        password:'Rubix123',
        database:'mtg'
    },
    ENCRYPTION: {
        SALT: 10
    },
    PROXY:{
        GAME_FORMAT:'standard'
    },
    ROUTES:{
        HOME:[
            {method:'get',path:'/',endpoint:'index'},
            {method:'post',path:'/',endpoint:'search'}
        ],
        USERS:[
            {method:'get',path:'/users',endpoint:'index'},
            {method:'post',path:'/register',endpoint:'register'}
        ],
        AUTH:[
            {method:'post',path:'/login',endpoint:'login'},
            {method:'post',path:'/verify',endpoint:'verify'}
        ],
        CARDS:[
            {method:'get',path:'/cards',endpoint:'index'},
            {method:'post',path:'/cards',endpoint:'query'},
            {method:'get',path:'/cards/:id',endpoint:'cardProfile'}
        ],
        DECKS:[
            {method:'get',path:'/decks',endpoint:'index'},
            {method:'post',path:'/decks/create',endpoint:'newDeck'},
            {method:'post',path:'/decks/:id',endpoint:'addCard'}
        ]
    }

};
