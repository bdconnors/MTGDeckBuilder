class Card {
    constructor(id,name,cost = 0,cmc,set,types,colors,rarity,text,images){
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.cmc = cmc;
        this.set = set;
        this.types = types;
        this.colors = colors;
        this.rarity = rarity;
        this.text = text;
        this.images = images;
    }
}
module.exports = Card;