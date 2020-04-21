const dotenv = require('dotenv');
dotenv.config();
const Proxy = require('../src/core').Proxy;
const proxy = new Proxy();
const Database = require('../src/core').Database;
const database = new Database();
const Server = require('../src/core').Server;
const server = new Server(database,proxy);

it('Server starts without issues',async ()=>{
    expect(async()=>{
        await database.connect();
        server.start();
    }).not.toThrow();
});
it('Server registers controllers',async ()=>{
    expect(async()=>{
        const hasControllers = server.ctrl.length > 0;
        expect(hasControllers).toEqual(true);
    }).not.toThrow();
});
it('Server registers services',async ()=>{
    expect(async()=>{
        const hasServices = server.svc.length > 0;
        expect(hasServices).toEqual(true);
    }).not.toThrow();
});
it('Server registers repositories',async ()=>{
    expect(async()=>{
        const hasRepositories = server.repo.length > 0;
        expect(hasRepositories).toEqual(true);
    }).not.toThrow();
});
