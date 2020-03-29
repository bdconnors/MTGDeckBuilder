async function getCards(name){
    const results = await request(`/api/cards?name=${name}`,"GET");
    const cards = [];
    results.forEach((card)=>{
        cards.push(new Card(
            card.id,
            card.name,
            card.cost,
            card.cmc,
            card.set,
            card.types,
            card.superTypes,
            card.subTypes,
            card.colors,
            card.rarity,
            card.text,
            card.img));
    });
    return cards;
}
async function request(url,method){
    return await $.ajax({
        method: method,
        url: url
    });
}