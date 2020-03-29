const encryption = require('../../util/Encryption');
module.exports = {
    genid: (req)=>{
        return encryption.uuid();
    },
    secret:'eb1d1a6a-cd33-45cc-9843-7fa31eae7269',
    resave:false,
    saveUninitialized: true,
    name: 'session',
    rolling: true,
    cookie: { secure:true,maxAge: 3600000 }
};