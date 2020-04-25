const bcrypt = require('bcrypt');
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
        const saltRounds = Number(process.env.ENCRYPTION_SALT);
        console.log(saltRounds);
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