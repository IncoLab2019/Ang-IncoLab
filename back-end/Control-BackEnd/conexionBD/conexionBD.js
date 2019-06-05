const goMysql = require('mysql');

/* Conexión a la base de datos */
const gConDB = goMysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password:'root',
  database:'incolab',
  port: 3306,
  multipleStatements: true  //permite generar multiples sentencias en un mismo procedimiento
});

/* Manejo de error de la concexión a la base de datos */
gConDB.connect(function(err){
  if(err)
    console.log('Error en la conexion!', err)
  else
    console.log('Conexión exitosa!')
});

module.exports = gConDB;
