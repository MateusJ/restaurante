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
        let a = await bebida.updateOne({_id: 'coca'}, {$set:{image: 'item_coca.png'}});
        let c = await bebida.updateOne({_id:'suco'}, {$set:{image: 'item_suco.jpg'}});
        let d = await comida.updateOne({_id:'ISCAS DE FRANGO AO MOLHO SUGO'}, {$set:{image:'item_frango.png'}});
        let i = await comida.updateOne({_id:'CARNE DE PANELA'}, {$set:{image: 'item_carne.jpg'}});
        let f = await porcao.updateOne({_id:'batata frita'},{$set:{image: 'item_batata.jpg'}});
        let g = await porcao.updateOne({_id:'tabua'},{$set:{image: 'item_tabua.jpg'}});
        let h = await porcao.updateOne({_id:'aipim frito'}, {$set:{image: 'item_aipim.jpg'}});
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
    detalheItem = await todosItens.findOne({_id:item}, {projection: {_id: 0,composicao:1, image: 1}});
    return detalheItem;

}


module.exports = {init, consulta, detalhes};