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
    render(container){
        container.append(`<tr>
            <th colspan="2">${this.name}</th>
        </tr>
        <tr>
            <td class="border px-4 py-2"><a href="/cards/${this.id}"><img src="${this.img}" alt="${this.name}"></a></td>
        </tr>`);
    }
}
