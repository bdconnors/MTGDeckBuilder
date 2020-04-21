const mysql = require('mysql2');
class Database {

    constructor(){
        this.conn = null;
    }
    async connect(){
        try {
            this.conn = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_SCHEMA
            });
        }catch (e) {
            throw new Error(e);
        }
    }
    async execute(method, name, values){
        console.log(method,name,values);
        return new Promise((resolve,reject)=>{
            const procedure = this.getProcedure(method,name,values);
            const params = this.getParams(values);
            console.log(params);
            this.conn.execute(procedure,params,(err,res,fields)=>{
                if(err){reject(err);}
                resolve(res);
            });
        });
    }
    getProcedure(method, name, values){
        let columnCount = this.getColumns(values).length;
        let query = `CALL ${method}_${name}(`;
        for (let i = 0; i < columnCount; i++) {
            const lastColumn = i === columnCount - 1;
            query += `?`;
            if (!lastColumn) {
                query += `,`;
            }
        }
        query += `)`;
        return query;
    }
    getParams(values){
        const params = [];
        const keys = Object.keys(values);
        for (let i = 0; i < keys.length; i++) {
            params.push(values[keys[i]]);
        }
        return params;
    };
    getColumns(values){
        return Object.keys(values);
    };
}
module.exports = Database;