const dotenv = require('dotenv');
dotenv.config();
const Proxy = require('../src/core').Proxy;
const proxy = new Proxy();

it('Gets card named Hero of Precinct One',async ()=>{
    const cardId = "87732718-1067-4e5f-a76d-409539c9ef3f";
    const card = await proxy.get(cardId);
    expect(card.name).toEqual("Hero of Precinct One");
});
it('Get first 175 cards',async ()=>{
    const cards = await proxy.getAll();
    expect(cards.length).toEqual(175);
});



