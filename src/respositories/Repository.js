const queryBuilder = require('../util/QueryBuilder');
class Repository {

    constructor(table,database){
        this.table = table;
        this.database = database;
        this.entities = [];
    }
    all(){
        return this.entities;
    }
    filter(prop,value){
        return this.entities.filter((entity)=>{
            return entity[prop] === value
        });
    }
    async load(){
        const query = queryBuilder.retrieve(this.table);
        const results = await this.database.execute(query,[]);
        for(let i = 0; i < results.length; i++){
            const row = results[i];
            const entity = this.make(row);
            this.entities.push(entity);
        }
    }
    async create(values){
        try {
            const query = queryBuilder.storedProcedure('CREATE',this.table, values);
            const params = queryBuilder.getParams(values);
            values.id = await this.database.execute(query, params)[0];
            const entity = this.make(values);
            this.entities.push(entity);
            return entity;
        }catch (e) {
            console.log(e);
        }
    }
    retrieve(id){
        return this.entities.find((entity)=>{
            return entity.id === id
        });
    }
    async update(id,values){
        try{
            const query = queryBuilder.updateOne(this.table,id,'id',values);
            const params = queryBuilder.getParams(values);
            await this.database.execute(query,params);
            const entity = this.retrieve(id);
            const keys = Object.keys(values);
            keys.forEach((key)=>{
                entity[key] = values[key];
            });
            return entity
        }catch (e) {
            console.log(e);
        }
    }
    async delete(id){
        try {
            const query = queryBuilder.delete(this.table,'id');
            await this.database.execute(query, [id]);
            for (let i = 0; i < this.entities.length; i++) {
                if (this.entities[i] === id) {
                    return this.entities.splice(i, 1);
                }
            }
        }catch (e) {
            console.log(e);
        }
    }
    exists(prop,value){
        let exists = false;
        const results = this.filter(prop,value);
        console.log(results);
        if(results.length !== 0){
            exists = true;
        }
        return exists;
    }
    make(data){
        throw new Error('Please override make function from parent class Repository');
    }

}
module.exports = Repository;