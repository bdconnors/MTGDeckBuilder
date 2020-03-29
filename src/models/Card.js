class Card {
    constructor(id,name,cost,cmc,set,types,superTypes,subTypes,colors,rarity,text,img){
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.cmc = cmc;
        this.set = set;
        this.types = types;
        this.supertypes = superTypes;
        this.subtypes = subTypes;
        this.colors = colors;
        this.rarity = rarity;
        this.text = text;
        this.img = img;
    }
}
module.exports = Card;