//Route configuration
const routes = require('../../config/routes');
//3rd party dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const uuid = require('uuid');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//local dependencies
const repo = require('../../respositories');
const svc = require('../../services');
const ctrl = require('../../controllers');

class Server {
    constructor(database,proxy){
        this.database = database;
        this.proxy = proxy;
        this.instance = express();
        this.router = express.Router();
        this.repo = [];
        this.svc = [];
        this.ctrl = [];
    }
    /**
     * Starts the server, listening on the host and port specified in the config file
     * **/
    start(){
        this.applyMiddleWare();
        this.init();
        this.instance.listen(process.env.SERVER_PORT,()=>{
            console.log(`Server started on port ${process.env.SERVER_HOST}.`);
            console.log(`Navigate to http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
        });
    }
    init(){
        this.initRepositories();
        this.initServices();
        this.initControllers();
    }
    initRepositories(){
        const userRepo = new repo.UserRepository(this.database);
        this.register("repo","USERS",userRepo);
        const cardRepo = new repo.CardRepository(this.database,this.proxy);
        this.register("repo","CARDS",cardRepo);
        const deckRepo = new repo.DeckRepository(this.database,cardRepo);
        this.register("repo","DECKS",deckRepo);
    }
    initServices(){
        const authService = new svc.AuthenticationService(this.repo["USERS"]);
        this.register("svc","AUTH",authService);
        const cardService = new svc.CardService(this.repo["CARDS"]);
        this.register("svc","CARDS",cardService);
        const deckService = new svc.DeckService(this.repo["DECKS"]);
        this.register("svc","DECKS",deckService);
    }
    initControllers(){
        const authController = new ctrl.AuthenticationController(this.svc["AUTH"]);
        this.register("ctrl","AUTH",authController);
        const deckController = new ctrl.DeckController(this.svc["DECKS"]);
        this.register("ctrl","DECKS",deckController);
        const cardController = new ctrl.CardController(this.svc["CARDS"]);
        this.register("ctrl","CARDS",cardController);
        const homeController = new ctrl.HomeController(this.svc["CARDS"]);
        this.register("ctrl","HOME",homeController);
    }
    register(type,label,component) {
        if(type === "ctrl"){
            this.setRoutes(component,routes[label]);
        }
        this[type][label] = component;
    }
    setRoutes(controller,routes){
        routes.forEach((route)=>{
            this.router[route.method](route.path,controller[route.endpoint].bind(controller));
        });
    }
    applyMiddleWare(){
        console.log(process.env.SESSION_SAVE_UNITIALIZED);
        this.instance.use( session({
            genid: (req) => {
                return uuid.v4();
            },
            secret: process.env.SESSION_SECRET,
            resave: process.env.SESSION_RESAVE,
            saveUninitialized: process.env.SESSION_SAVE_UNITIALIZED,
            name: process.env.SESSION_NAME,
            secure: process.env.SESSSION_SECURE,
            rolling: process.env.SESSION_ROLLING,
            cookie: {maxAge: Number(process.env.SESSION_COOKIE_AGE)}
        }));
        console.log(process.env.SESSION_COOKIE_AGE);
        this.instance.use(cookieParser());
        this.instance.use(express.urlencoded({extended: false}));
        this.instance.use(bodyParser.json());
        this.instance.use(this.router);
        console.log(path.join(__dirname, '../../views'));
        this.instance.use(express.static(path.join(__dirname, '../../views')));
        this.instance.set('view engine', process.env.VIEW_ENGINE);
    }

}
module.exports = Server;