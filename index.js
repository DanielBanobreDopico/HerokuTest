/**
 * Importando módulos.
 */
const express = require('express');

/**
 * Inicializando variables.
 */
const PORT = process.env.PORT || 3000;

/**
 * Accediendo a MongoDB y apuntando a una colección.
 */
var mongoDB
const mongoClient = require('./mongoClient.js');
mongoClient.connect()
    .then(
        client=>{
            mongoDB = client.db();
            console.log('mongoClient:', client);
            console.log('mongoDB:', mongoDB);
        }
    ).catch(
        err=>{
            console.error(err);
        }
    );
const testingCollection = mongoDB.collection('tests');

/**
 * Configurando Express.
 */
const app = express();

app.use(express.static(__dirname + '/public'));

/**
 * End points.
 */

//Añadir un get y un post

/**
 * Puesta en marcha del servicio.
 */
app.listen( PORT , ()=>{
    console.log(`Listo!: servicio preparado para recibir peticiones.`);
});