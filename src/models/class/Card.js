class Card {
    constructor(id,name,cost = 0,cmc,set,type,colors,rarity,text,images){
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.cmc = cmc;
        this.set = set;
        this.type = type;
        this.colors = colors;
        this.rarity = rarity;
        this.text = text;
        this.images = images;
    }
    hasType(cardType){
        const types = this.getAllTypes();
        const result = types.find((type)=>{
            return type.toLowerCase() === cardType.toLowerCase();
        });
        return result.length > 0;
    }
    getAllTypes(){
        let typeSplit = this.fullType.split("-");
        typeSplit = typeSplit.split(" ");
        return typeSplit;
    }
}
module.exports = Card;