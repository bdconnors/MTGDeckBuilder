const dotenv = require('dotenv');
dotenv.config();
const Database = require('../src/core').Database;
const database = new Database();

it('Connects to database without issues',async ()=>{
    expect(async ()=>{await database.connect()}).not.toThrow();
});
it('Gets admin user by ID',async ()=>{
    const adminId = 17;
    const result = await database.execute("RETRIEVE","USER",{id:adminId});
    expect(result[0][0].email).toEqual("admin@mtgdeckbuilder.com");
});

