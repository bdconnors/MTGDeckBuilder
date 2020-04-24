class Deck {
    constructor(id,user,name,cards = []){
        this.id = id;
        this.user = user;
        this.name = name;
        this.cards = cards;
    }
    getSorceries(){
        return this.getByType("sorcery");
    }
    getInstants(){
        return this.getByType("instant");
    }
    getPlaneswalkers(){
        return this.getByType("planeswalker");
    }
    getLands(){
        return this.getByType("land");
    }
    getCreatures(){
        return this.getByType("creature");
    }
    getEnchantments(){
        return this.getByType("enchantment");
    }
    getArtifacts(){
        return this.getByType("artifact");
    }
    getNonCreatureEnchantments(){
        const enchantments = this.getEnchantments();
        return enchantments.filter((enchantment)=>{
            return !enchantment.hasType("creature");
        });
    }
    getNonCreatureArtifacts(){
        const artifacts = this.getArtifacts();
        return artifacts.filter((artifact)=>{
            return !artifact.hasType("creature");
        });
    }
    containsType(type){
        const results = this.getByType(type);
        return results.length > 0;
    }
    getByType(type){
        return this.cards.filter((cardSlot)=>{
            return cardSlot.card.hasType(type);
        });
    }
    getCardTotal(){
        let count = 0;
        this.cards.forEach((slot)=>{
            count += slot.copies;
        });
        return count;
    }
    getSortedCards(){
        let sorted = {};
        if(this.containsType("creature")){
            sorted["Creatures"] = this.getCreatures();
        }
        if(this.containsType("planeswalker")){
            sorted["Planeswalker"] = this.getPlaneswalkers();
        }
        if(this.containsType("artifact")){
            const nonCreature = this.getNonCreatureArtifacts();
            if(nonCreature.length > 0) {
                sorted["Artifact"] = nonCreature;
            }
        }
        if(this.containsType("enchantment")){
            const nonCreature = this.getNonCreatureEnchantments();
            if(nonCreature.length > 0) {
                sorted["Enchantment"] = nonCreature;
            }
        }
        if(this.containsType("instant")){
            sorted["Instant"] = this.getInstants();
        }
        if(this.containsType("sorcery")){
            sorted["Sorcery"] = this.getSorceries();
        }
        if(this.containsType("land")){
            sorted["Land"] = this.getLands();
        }
        return sorted;
    }

}

module.exports = Deck;
