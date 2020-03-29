const mysql = require('mysql2');
class Database {

    constructor(config){
        this.config = config;
        this.conn = null;
    }
    connect(){
        this.conn = mysql.createConnection(this.config);
    }
    /**
     * @statement prepared statement or stored procedure call string
     * @params the values to be prepared with the statement
     *
     * queries the database connection returning the results
     * in an array
     * **/
    async execute(statement,params){
        return new Promise((resolve,reject)=>{
            this.conn.execute(statement,params,(err,res,fields)=>{
                if(err){reject(err);}
                resolve(res);
            });
        });
    }
}
module.exports = Database;