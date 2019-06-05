/*
   El archivo servidor.js permite conectar node js con angular
   Para correr el servidor se usa el comando: npm run start:server
*/

// Variables constantes:
const goApp = require('./Control-BackEnd/conexiones');
const goDebug = require('debug')('node-angular');
const goHttp = require('http');

// Normalización del puerto
const goNorPort = val => {
  var oPort = parseInt(val, 10);
  // Nombre conexion
  if (isNaN(oPort)) {
    return val;
  }
  // Numero de puerto
  if (oPort >= 0) {
    return oPort;
  }
  return false;
};

// Manejo de errores de la conexión
const goMaErrores = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const oBind = typeof goPort === 'string' ? 'pipe ' + goPort : 'port ' + goPort;
  switch (error.code) {
    case 'EACCES':
      console.error(oBind + ' requiere privilegios!');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(oBind + ' en uso!');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Establecimiento de conexión
const goEscuchando = () => {
  // const addr = server.address();
  const oBind = typeof goPort === "string" ? "pipe " + goPort : "port " + goPort;
  goDebug("Listening on " + oBind);
};

const goPort = goNorPort(process.env.PORT || '3000');
goApp.set("port", goPort);

const server = goHttp.createServer(goApp);
server.on("error", goMaErrores);
server.on("listening", goEscuchando);
server.listen(goPort);

console.log(goPort);
