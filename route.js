var express = require('express');
var app = express();
const path = require('path');
var mongo = require("./mongodb");

var categorias;
mongo.init().then(cats => categorias = cats)

app.use(express.static(__dirname + '/public'));

//  var alunos=[{nome:'Joao', idade:21, CPF:'1235322', cidade:'Araranguá'},{nome:'Maria',idade:23,CPF:'234236533',cidade:'Florianópolis'},{nome:'Pedro',idade:26,CPF:'6535677',cidade:'São José'}];

app.get('/categorias', function(req, resp) {
        resp.send(categorias);
        resp.end();
});

app.get('/itensCategoria/:categoria', async function(req, resp) {
    var categoria = req.params.categoria;
    var itens = await mongo.consulta(categoria);
    resp.send(itens);
    resp.end();
 });

 app.get('/itensCategoria/:categoria/:item', async function(req, resp) {
    var categoria = req.params.categoria;
    var item = req.params.item;
    var detalhes = await mongo.detalhes(categoria, item);
    resp.send(detalhes);
    resp.end();
 });



app.get(/^(.+)$/, function(req, res) {
    try {
        res.write("A pagina que vc busca nao existe")
        res.end();
    } catch (e) {
        res.end();
    }
})

app.listen(3000, function() {
    console.log("servidor no ar");
});