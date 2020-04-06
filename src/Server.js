const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

class Server {
    constructor(config){
        this.config = config;
        this.instance = express();
        this.router = express.Router();
    }
    /**
     * @controller an implementation of the Controller class
     * @routes an array of the routes associated with the controller
     *
     * sets the routes for the application
     *
     * **/
    register(controller,routes){
        for(let i = 0; i < routes.length; i++){
            let route = routes[i];
            this.router[route.method](route.path,controller[route.endpoint].bind(controller));
        }
    }
    /**
     * Starts the server, listening on the host and port specified in the config file
     * **/
    start(){
        this.instance.use(cookieParser());
        this.instance.use(session(this.config.SESSION));
        this.instance.use(express.urlencoded({extended: false}));
        this.instance.use(bodyParser.json());
        this.instance.use(this.router);
        this.instance.use(express.static(path.join(__dirname, this.config.VIEW.DIR)));
        this.instance.set('view engine', this.config.VIEW.ENGINE);
        this.instance.listen(this.config.PORT,()=>{
            console.log(`Server started on port ${this.config.PORT}.`);
            console.log(`Navigate to http://${this.config.HOST}:${this.config.PORT}`);
        });
    }

}
module.exports = Server;