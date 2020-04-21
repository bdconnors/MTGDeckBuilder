//read environment variables
const dotenv = require('dotenv');
dotenv.config();
//import core application components
const core = require('./core');
//instantiate core components
const database = new core.Database();
const proxy = new core.Proxy();
const server = new core.Server(database,proxy);
async function run(){
    await database.connect();
    server.start();
}
module.exports = run();