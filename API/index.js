/**
 * Importando módulos.
 */
const {Storage} = require('@google-cloud/storage'); //Driver de Google Cloud para acceso a Firebase Storage
//const serviceAccount = require('./test-f624c-firebase-adminsdk-zwi4k-ee2aaaaab6.json'); //Credenciales para Firebase Admin. Obtenidas en "Cuentas de servicio" en la configuración del proyecto de Firebase.
const express = require('express');
const multer  = require('multer');
const cors = require('cors');
const tmp = require('tmp');

/**
 * Inicializando variables.
 */
const PORT = process.env.PORT || 3000;
const tmpDir = tmp.dirSync().name; //Creamos un directorio temporal único para la app.
const mimeParser = multer( { dest: tmpDir } ); //Especificamos directorio temporal para subir ficheros.

/**
 * Inicializando acceso a Firebase Storage.
 * Firebase Storage nos permite almacenar ficheros en la nube de Google.
 */

const storage = new Storage({
    projectId: 'test-f624c',
    keyFilename: './test-f624c-firebase-adminsdk-zwi4k-ee2aaaaab6.json',
  });
const storageRoot = storage.bucket('test-f624c.appspot.com'); // El "bucket" corresponder con la ruta del Storage de nuestro proyecto en Firebase.

/**
 * Accediendo a MongoDB y apuntando a una colección.
 * MongoDB es una base de datos NoSQL orientada a documentos en la que podemos almacenar y recuperar objetos con sus atributos -sin métodos-.
 */
var mongoDB
var testingCollection
const mongoClient = require('./mongoClient.js');
mongoClient.connect()
    .then(
        client=>{
            mongoDB = client.db();
            testingCollection = mongoDB.collection('tests');
            console.log('Conected to Mongo Atlas');
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

app.post('/quote/', mimeParser.single('image'), async (req,res)=>{
    try {
        const image = req.file;
        const upload = await storageRoot.upload(image.path); // Se inicia la subida del fichero a Firebase Storage.
        const file = upload[0]; //El elemento 0 del array es el fichero en la nube.
        await file.makePublic() //Concedemos acceso anónimo al fichero desde Internet.
        const meta = await file.getMetadata(); //Obtenemos la información sobre el fichero.
        const imgURL = meta[0].mediaLink; //Obtenemos el enlace para el acceso público al fichero.

        const quoteDocument = {
            quote: req.body.quote,
            author: req.body.author,
            image, //Incluimos en la base de datos toda la información sobre el fichero para poder recuperarlo en el futuro.
            imgURL,
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

/**
 * Pruebas con Storage
 */

async function getMetadata() {
    await storageRoot.file('uploads/images.jpeg').makePublic();
    const [metadata] = await storageRoot.file('uploads/images.jpeg').getMetadata();
    console.log('URL:', metadata.mediaLink);
}

//getMetadata();