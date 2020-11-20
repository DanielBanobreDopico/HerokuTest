# HerokuTest

## Notas

### package.json
Imprescindible añadir la linea `"start": "node index.js"` en el objeto `"scripts"` para indicar a Heroku cómo iniciar el proyecto. Ojo con el uso de las comas. Es JSON.

### mongoClient.js
Fichero para personalizar la conexión a MongoAtlas con el *usuario* y *contraseña* creadas para acceder a la base de datos en el servicio.

### index.js
Imprescindible definir la variable para el puerto de Express en el formato `const PORT = process.env.PORT || 3000;` para permitir a Heroku asignar un puerto dinámico a la aplicación sin perder la posibilidad de depurar la aplicación localmente.

La linea `app.use(express.static(__dirname + '/public'));` permite servir los ficheros contenidos en el directorio `public` como ficheros estáticos. Puedes almacenar aquí imágenes cualquier tipo de ficheros o sitios web completos.
