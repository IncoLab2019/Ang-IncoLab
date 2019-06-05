/* Se llama la conexion de la base de datos */
const gConDB = require('../conexionBD/conexionBD');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// MOSTRAR DATOS EN LA TABLA  /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.mostrarTabla = (req, res) => {

  gConDB.query('CALL SpMostrarTabla()', (err, result) => {
    if (err) {
      console.log("Error en el SELECT talap: " + err);
    }

    /* Se crea una constante que va a almacenar el array con los objetos */
    /* Se parsea a JSON para que no hayan problemas con los tipos de array que se obtienen desde la BD */
    const tabla = JSON.parse(JSON.stringify(result[0]));
    /* En la respuesta se envia toda la tabla para mostrarla en su respectivo componente */
    res.status(200).json({
      message: 'Solicitud exitosa!!',
      tabla: tabla
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// MOSTRAR DATOS INACTIVOS EN LA TABLA  ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.mostrarTablaProductosInactivos = (req, res) => {

  gConDB.query('CALL SpMostrarProductosDesactivados()', (err, result) => {
    if (err) {
      console.log("Error en el SELECT pdesacti: " + err);
    }

    /* Se crea una constante que va a almacenar el array con los objetos */
    /* Se parsea a JSON para que no hayan problemas con los tipos de array que se obtienen desde la BD */
    const tabla = JSON.parse(JSON.stringify(result[0]));

    /* En la respuesta se envia toda la tabla para mostrarla en su respectivo componente */
    res.status(200).json({
      message: 'Solicitud exitosa!!',
      tabla: tabla
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// MOSTRAR PROVEEDORES INACTIVOS EN LA TABLA  ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.mostrarTablaProveedoresInactivos = (req, res) => {

  gConDB.query('CALL SpMostrarProveedoresDesactivados()', (err, result) => {
    if (err) {
      console.log("Error en el SELECT desactivados: " + err);
    }

    /* Se crea una constante que va a almacenar el array con los objetos */
    /* Se parsea a JSON para que no hayan problemas con los tipos de array que se obtienen desde la BD */
    const tabla = JSON.parse(JSON.stringify(result[0]));

    /* En la respuesta se envia toda la tabla para mostrarla en su respectivo componente */
    res.status(200).json({
      message: 'Solicitud exitosa!!',
      tabla: tabla
    });
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// MODIFICACION DE PRODUCTOS (DESDE LA TABLA) //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Modifica los datos especificos en la tabla */
exports.modificarTabla = (req, res) => {

  const oDatos = req.body;

  gConDB.query('CALL SpModificarTabla(?,?,?,?,?,?)',
  [ oDatos.COD_PRODUCTO,
    oDatos.NOMBRE_PRODUCTO,
    oDatos.COSTO_TOTAL_PRODUCTO,
    oDatos.STOCK,
    oDatos.ENUSO,
    oDatos.UNIDADES
  ], (err) => {
    if (err) {
      console.log("Fallo al modificar los datos, error: " + err);
    } else {
      res.status(201).json({
        message: 'Datos modificados exitosamente!!'
      });
    }
  });
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// MOSTRAR USUARIOS INACTIVOS EN LA TABLA  ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.mostrarTablaUsuariosInactivos = (req, res) => {

  gConDB.query('CALL SpMostrarUsuariosDesactivados()', (err, result) => {
    if (err) {
      console.log("Error en el SELECT desactivar: " + err);
    }

    /* Se crea una constante que va a almacenar el array con los objetos */
    /* Se parsea a JSON para que no hayan problemas con los tipos de array que se obtienen desde la BD */
    const tabla = JSON.parse(JSON.stringify(result[0]));

    /* En la respuesta se envia toda la tabla para mostrarla en su respectivo componente */
    res.status(200).json({
      message: 'Solicitud exitosa!!',
      tabla: tabla
    });
  });
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// MOSTRAR SUCURSALES INACTIVAS EN LA TABLA  //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.mostrarTablaSucursalesInactivas = (req, res) => {

  gConDB.query('CALL SpMostrarSucursalesDesactivadas()', (err, result) => {
    if (err) {
      console.log("Error en el SELECT sudes: " + err);
    }

    /* Se crea una constante que va a almacenar el array con los objetos */
    /* Se parsea a JSON para que no hayan problemas con los tipos de array que se obtienen desde la BD */
    const tabla = JSON.parse(JSON.stringify(result[0]));

    /* En la respuesta se envia toda la tabla para mostrarla en su respectivo componente */
    res.status(200).json({
      message: 'Solicitud exitosa!!',
      tabla: tabla
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// MOSTRAR PRODUCTOS POR VENCER  //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// PROBLEMA
exports.mostrarTablaProductosVencer = (req, res) => {

  gConDB.query('CALL SpListarProductosPorVencer()', (err, result) => {
    if (err) {
      console.log("Error en el SELECT vencerp: " + err);

    }

    /* Se crea una constante que va a almacenar el array con los objetos */
    /* Se parsea a JSON para que no hayan problemas con los tipos de array que se obtienen desde la BD */
    const tabla = JSON.parse(JSON.stringify(result[0]));

    /* En la respuesta se envia toda la tabla para mostrarla en su respectivo componente */
    res.status(200).json({
      message: 'Solicitud exitosa!!',
      tabla: tabla
    });
  });
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// MOSTRAR PRODUCTOS POR ACABAR  //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.mostrarTablaProductosAcabar = (req, res) => {

  gConDB.query('CALL SpListarProductosPorAcabar()', (err, result) => {
    if (err) {
      console.log("Error en el SELECT acabarp: " + err);
    }

    /* Se crea una constante que va a almacenar el array con los objetos */
    /* Se parsea a JSON para que no hayan problemas con los tipos de array que se obtienen desde la BD */
    const tabla = JSON.parse(JSON.stringify(result[0]));

    /* En la respuesta se envia toda la tabla para mostrarla en su respectivo componente */
    res.status(200).json({
      message: 'Solicitud exitosa!!',
      tabla: tabla
    });
  });
};
