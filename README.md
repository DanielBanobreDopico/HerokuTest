# HerokuTest

## Notas

### API/package.json
Imprescindible añadir la linea `"start": "node index.js"` en el objeto `"scripts"` para indicar a Heroku cómo iniciar el proyecto. Ojo con el uso de las comas. Es JSON.

### API/mongoClient.js
Fichero para personalizar la conexión a MongoAtlas con el *usuario* y *contraseña* creadas para acceder a la base de datos en el servicio.

### API/index.js
Imprescindible definir la variable para el puerto de Express en el formato `const PORT = process.env.PORT || 3000;` para permitir a Heroku asignar un puerto dinámico a la aplicación sin perder la posibilidad de depurar la aplicación localmente.

La linea `app.use(express.static(__dirname + '/public'));` permite servir los ficheros contenidos en el directorio `public` como ficheros estáticos. Puedes almacenar aquí imágenes cualquier tipo de ficheros o sitios web completos.

### Svelte/App.svelte
La variable `APIURL` se contruye dependiendo de si estamos ejecutando el proyecto en nuestro ordenador o en Internet.

### Svelte/package.json
La linea `"build": "rollup -c; rm -rf ../API/public; cp -a ./public/ ../API/",` se encarga de copiar en la carpeta *API/public* nuestra app de Svelt cada vez que ejecutamos `npm run build`. De este modo la aplicación es servida por Express cuando desplegamos la API en Heroku.

## Despliegue en Heroku
Para desplegar la aplicación en Heroku, crearemos un repositorio en GitHub específico y copiaremos en él el contenido de la carpeta *API*.