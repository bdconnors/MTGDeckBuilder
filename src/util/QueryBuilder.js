const retrieve = (table,columns) => {
    let query = `SELECT `;
    if(columns){
        addColumns(query,columns);
    }else{
        query += `*`;
    }
    query += ` FROM ${table}`;
    return query;
};
const orderBy = (query,condition) =>{
    query += ` ORDER BY ${condition}`;
    return query;
};
const where = (query,column) =>{
    query += ` WHERE ${column} = ?`;
    return query;
};
const and = (query,column) =>{
    query += ` AND ${column} = ?`;
    return query;
};
const or = (query,column) =>{
    query += ` OR ${column} = ?`;
    return query;
};
const updateOne = (table,id,condition,values) => {
    let query = `UPDATE ${table} SET `;
    const columns = getColumns(values);
    for(let i = 0; i < columns.length; i++){
        const column = columns[i];
        const lastColumn = i === keys.length - 1;
        query += `${column} = ?`;
        if(!lastColumn){
            query += `,`
        }
    }
    query +=` WHERE ${condition} = ?;`;
    return query;
};
const dlt = (table,condition) => {
    return `DELETE FROM ${table} WHERE ${condition} = ?;`;
};
const storedProcedure = (method,name,values) => {
    let columnCount = this.getColumns(values).length;
    let query = `CALL ${method}_${name}(`;
    for(let i = 0; i < columnCount; i++) {
        const lastColumn = i === columnCount -1;
        query += `?`;
        if(!lastColumn){
            query +=`,`;
        }
    }
    query += `)`;
    return query;
};
const getParams = (values) => {
    const params = [];
    const keys = Object.keys(values);
    for(let i = 0; i < keys.length; i++){
        params.push(values[keys[i]]);
    }
    return params;
};
const getColumns = (values) => {
    return Object.keys(values);
};
const addColumns = (query,columns) =>{
    for(let i = 0; i < columns.length; i++){
        const lastColumn = i === columns.length - 1;
        query += columns[i];
        if(!lastColumn){
            query += `,`;
        }
    }
};
module.exports.storedProcedure = storedProcedure;
module.exports.retrieve = retrieve;
module.exports.updateOne = updateOne;
module.exports.delete = dlt;
module.exports.orderBy = orderBy;
module.exports.and = and;
module.exports.or = or;
module.exports.where = where;
module.exports.getParams = getParams;
module.exports.getColumns = getColumns;
