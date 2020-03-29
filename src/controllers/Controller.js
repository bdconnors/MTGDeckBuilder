class Controller {

    constructor(service){
        this.service = service;
    }

    index(req,res){
        throw new Error('Please override index function from parent class Controller');
    }
}
module.exports = Controller;