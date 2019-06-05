/* Paquetes de node requeridos para la conexión:
   Express: npm install express --save
   MySQL: npm install mysql --save
   BodyParser: npm install body-parser --save

   La bandera --save es para que los paquetes sean
   agregados a las dependencias
*/

// Variables constantes:
const goExpress = require("express");
const goBodyParser = require("body-parser");
const goApp = goExpress();

/* Para conectar los archivos */
const goRoutes = require('./rutas/rutas');

// Parseo de los datos que llegan
goApp.use(goBodyParser.json());
goApp.use(goBodyParser.urlencoded({ extended: false }));
goApp.use('/', goExpress.static('public'));

// Metodo para permitir la comunicación entre local hosts
goApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

goApp.use('/api/posts', goRoutes);

// Exporta los datos del modulo
module.exports = goApp;
