//use application configuration
require('./config/config');
//import base application components
const Database = require('./Database');
const Server = require('./Server');
//import controllers
const HomeController = require('./controllers/HomeController');
const AuthenticationController = require('./controllers/AuthenticationController');
const DeckController = require('./controllers/DeckController');
const UserController = require('./controllers/UserController');
const CardController = require('./controllers/CardController');
//import services
const CardService = require('./services/CardService');
const AuthenticationService = require('./services/AuthenticationService');
const UserService = require('./services/UserService');
const DeckService = require('./services/DeckService');
//import repositories
const UserRepository = require('./respositories/UserRepository');
const DeckRepository = require('./respositories/DeckRepository');
//instantiate database
const database = new Database(CONFIG.DB);
//instantiate repositories
const userRepo = new UserRepository(database);
const deckRepo = new DeckRepository(database);
//instantiate services
const cardService = new CardService();
const authService = new AuthenticationService(userRepo);
const userService = new UserService(userRepo);
const deckService = new DeckService(deckRepo);
//instantiate controllers
const home = new HomeController();
const auth = new AuthenticationController(authService);
const decks = new DeckController(deckService);
const cards = new CardController(cardService);
const users = new UserController(userService);
//instantiate server
const server = new Server(CONFIG.SERVER);
//register controller routes
server.register(home,CONFIG.ROUTES.HOME);
server.register(auth,CONFIG.ROUTES.AUTH);
server.register(users ,CONFIG.ROUTES.USERS);
server.register(cards,CONFIG.ROUTES.CARDS);
server.register(decks,CONFIG.ROUTES.DECKS);
/**
 * Gets the records from the database
 * creates models storing them in arrays
 * **/
async function load() {
    await userRepo.load();
    await deckRepo.load();
    console.log(deckRepo.retrieve(10).cards);
    console.log(userRepo.all());
}
/**
 * Starts the server
 * opens connection to database
 * loads the records into the repositories
 * **/
async function start(){
    await database.connect();
    await load();
    server.start();
}
//executes start() running node index.js in command line
module.exports = start();

