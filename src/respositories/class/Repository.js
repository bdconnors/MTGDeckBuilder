class Repository {

    constructor(table,database){
        this.table = table;
        this.database = database;
    }
    async all(){
        try {
            const procedureName = 'ALL_' + this.table;
            const result = await this.database('RETRIEVE', procedureName, {});
            const data = result[0];
            return await this.makeMany(data);
        }catch (e) {
            throw new Error(e)
        }
    }
    async create(values){
        try {
            const result = await this.database.execute('CREATE',this.table,values);
            console.log(result);
            values.id = result[0][0].id;

            return await this.make(values);
        }catch (e) {
            console.log(e);
            throw new Error(e)
        }
    }
    async retrieve(values){
        try {
            const result = await this.database.execute('RETRIEVE',this.table,values);
            const data = result[0][0];
            return await this.make(data);
        }catch (e) {
           throw new Error(e);
        }
    }
    async update(values){
        try{
            let success = false;
            const result = await this.database.execute('UPDATE',this.table,values);
            const effected = result[0][0];
            if(effected > 1){
                success = await this.retrieve(id);
            }
            return success;

        }catch (e) {
            throw new Error(e);
        }
    }
    async delete(values){
        try {
            const result = await this.database.execute('DELETE',this.table,values);
            return result.affectedRows;
        }catch (e) {
            throw new Error(e);
        }
    }
    makeMany(data){
        const results = [];
        for(let i = 0; i < data.length; i++){
            const entity = this.make(data[i]);
            results.push(entity);
        }
        return results;
    }
    make(data){
        throw new Error('Please override make function from parent class Repository');
    }

}
module.exports = Repository;