const bcrypt = require('bcrypt');
const uuid = require('uuid');
/**
 *
 * @data a string of data
 *
 * accepts a string and returns a hash,
 * encrypted based on rounds set in the configuration file
 *
 * **/
module.exports.hash = async (data) => {
    return new Promise((res,rej)=>{
        const saltRounds = CONFIG.ENCRYPTION.SALT;
        bcrypt.hash(data,saltRounds,(err,hash)=>{
            if(err){rej(err)}
            res(hash);
        });
    });
};
module.exports.compare = async (data,hash)=>{
    return new Promise((res,rej)=>{
        bcrypt.compare(data,hash,(err,result)=>{
            if(err){rej(err)}
            res(result);
        });
    });
};
module.exports.uuid = () =>{
    return uuid.v4();
};