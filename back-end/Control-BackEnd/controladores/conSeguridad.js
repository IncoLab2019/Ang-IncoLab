const gConDB = require('../conexionBD/conexionBD');
const jwt = require('jsonwebtoken');

// The login will not redirect unless it gets a respond

exports.prueba = (req, res) => {
  const oDatos = req.body;

  const user = oDatos.email;

  gConDB.query('call incolab.SpConsultarUsuarios(?, ?)',[
    oDatos.email,
    oDatos.password
  ], (err, result) => {
    if(err){
      return res.status(404); // error en lectura sql
    } else if(result[0] == "") { // si viene vacio
        return res.status(404).send({message: result});
    } else {// si existe el usuario
      const roles = JSON.parse(JSON.stringify(result[0]));
      console.log(roles);
      /// creacion de token para proteger las rutas
      jwt.sign({ role: roles[0].rol}, 'secretkey', (err, token) => {
        res.json({
          token
        });
      });
    }
  });
}


exports.verifyToken = (req, res, next) => {
  // get auth header value
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefineed
  if(typeof bearerHeader !== 'undefined'){
    // split at the space
    const bearer = bearerHeader.split(' ');
    // get the token
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken;
    // next middleware
    next();
  }else{
    console.log('Acceso denegado!');
    res.json({ message: 'Prohibido' });
  }
};
