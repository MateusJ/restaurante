const {
    MongoClient
} = require('mongodb');

async function conecta()
{
    var client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = await client.db("RESTAURANTE");
    bebida = await db.collection("bebida");
    comida = await db.collection("comida");
    porcao = await db.collection("porcao");
}
async function inserte()
{
    try {
        let a = await bebida.insertOne({_id:'coca', ml:350, imagem:'f', composicao:'Refrigerante'});
        let c = await bebida.insertOne({_id:'suco', ml:360, imagem:'f', composicao:'agua e tang'});
        let d = await comida.insertOne({_id:'ISCAS DE FRANGO AO MOLHO SUGO', para_pessoa:2, imagem:'f', composicao:'FILÉ DE PEITO DE FRANGO, MOLHO DE TOMTE NATURAL E TEMPEROS NATURAIS;ARROZ;FEIJÃO'});
        let i = await comida.insertOne({_id:'CARNE DE PANELA', para_pessoa:2, imagem:'f', composicao:'CARNE BOVINA E TEMPEROS NATURAIS;ARROZ;FEIJÃO'});
        let f = await porcao.insertOne({_id:'batata frita', para_pessoa:4, imagem:'f', composicao:'batata e sal'});
        let g = await porcao.insertOne({_id:'tabua', para_pessoa:4, imagem:'f', composicao:'batata frita, calabresa, coração e polenta'});
        let h = await porcao.insertOne({_id:'aipim frito', para_pessoa:4, imagem:'f', composicao:'aipim'});
        } catch (e) {
        console.log (e);
    }
}
async function remove()
{
    try {
        let a = await locais.deleteOne({_id:'ANA'});
        console.log(a);
    } catch (e) {
        console.log (e);
    }
}
async function consulta (categoria)
{
    var client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = await client.db("RESTAURANTE");
    a = await db.collection(categoria);
    let b = await a.find( {} ).toArray();
    console.log(b);
    b = b.map(c => c._id)
    return b;
}
async function init()
{
    await conecta();
    // console.log("Insere um registro");

    await inserte();
    // console.log("Consulta para ver se foi inserido");
    // await consulta();
    var categorias = await db.listCollections().toArray();
    categorias = categorias.map(cat => cat.name);

    return categorias;
}
async function detalhes(categoria, item){

    var client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = await client.db("RESTAURANTE");
    todosItens = await db.collection(categoria);
    detalheItem = await todosItens.findOne({_id:item}, {projection: {_id: 0,composicao:1}});
    return detalheItem.composicao;

}


module.exports = {init, consulta, detalhes};