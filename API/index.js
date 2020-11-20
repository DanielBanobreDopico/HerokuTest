/**
 * Importando módulos.
 */
const express = require('express');
const multer  = require('multer');
const cors = require('cors');

/**
 * Inicializando variables.
 */
const PORT = process.env.PORT || 3000;
const mimeParser = multer();

/**
 * Accediendo a MongoDB y apuntando a una colección.
 */
var mongoDB
var testingCollection
const mongoClient = require('./mongoClient.js');
mongoClient.connect()
    .then(
        client=>{
            mongoDB = client.db();
            testingCollection = mongoDB.collection('tests');
            console.log('mongoClient:', client);
            console.log('mongoDB:', mongoDB);
        }
    ).catch(
        err=>{
            console.error(err);
        }
    );

/**
 * Configurando Express.
 */
const app = express();

app.use(cors());
app.use(express.static(__dirname + '/public'));

/**
 * End points.
 */

app.post('/quote/', mimeParser.none(), async (req,res)=>{
    try {
        const quoteDocument = {
            quote: req.body.quote,
            author: req.body.author,
        };
        testingCollection.insertOne(quoteDocument);
        console.log('-> New quote')
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

app.get('/quote/', async (req,res)=>{
    try {
        const lastQuotes = await testingCollection.find({},{limit: 10}).toArray();
        const json = JSON.stringify(lastQuotes);
        res.status(200).send(json);
    } catch (err) {
        consoleerror(err);
        res.status(500).send();
    }
})

/**
 * Puesta en marcha del servicio.
 */
app.listen( PORT , ()=>{
    console.log(`Listo!: servicio preparado para recibir peticiones.`);
});