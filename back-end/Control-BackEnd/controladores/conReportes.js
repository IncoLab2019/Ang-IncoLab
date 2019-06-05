const gConDB = require('../conexionBD/conexionBD');

exports.obtenerGraficos = (req, res) =>{

  //conexión a la DB
  gConDB.query(
      'CALL SpConsultaHistorial()', (err, result) => {
        if (err) {
            console.log("Fallo al obtener datos! Error: " + err);
          }

        const graficaInfo = JSON.parse(JSON.stringify(result[0]));
        console.log(graficaInfo);

        res.status(200).json({
          message: 'Solicitud exitosa!!',
          grafico: graficaInfo
        });
  });
};

// Obtener datos para el gráfico de precio general
exports.obtGraPreGeneral = (req, res) => {
  const oDatos = req.params.id;
  gConDB.query('CALL SpConsultaPrecioGeneral(?)', [oDatos],
    (error, result) => {
      if (error){
        return res.status(404);
      } else {
        
        const datos = JSON.parse(JSON.stringify(result[0]));
        return res.status(200).json({
          datos: datos
        });
      }
    });
};

// Obtener datos para el gráfico de precio Filtrado
exports.obtGraPreFiltrado = (req, res) => {

  const oDatos = req.params;
  gConDB.query('CALL SpConsultaPrecioFiltrado(?,?,?,?,?)',
  [
    oDatos.primerMes,
    oDatos.primerAnio,
    oDatos.segundoMes,
    oDatos.segundoAnio,
    oDatos.id,
  ],
    (error, result) => {
      if (error){
        return res.status(404);
      } else {
        
        const datos = JSON.parse(JSON.stringify(result[0]));
        return res.status(200).json({
          datos: datos
        });
      }
    });
};


// Obtener datos para el gráfico de uso general
exports.obtGraUsoGeneral = (req, res) => {

  const oDatos = req.params.id;
  gConDB.query('CALL SpConsultaUsoGeneral(?)', [oDatos],
    (error, result) => {
      if (error){
        return res.status(404);
      } else {
        const datos = JSON.parse(JSON.stringify(result[0]));
        return res.status(200).json({
          datos: datos
        });
      }
    });
};

// Obtener datos para el gráfico de uso Filtrado
exports.obtGraUsoFiltrado = (req, res) => {

  const oDatos = req.params;
  console.log(oDatos);
  gConDB.query('CALL SpConsultaUsoFiltrado(?,?,?,?,?)',
  [
    oDatos.primerMes,
    oDatos.primerAnio,
    oDatos.segundoMes,
    oDatos.segundoAnio,
    oDatos.id,
  ],
    (error, result) => {
      if (error){
        return res.status(404);
      } else {
        const datos = JSON.parse(JSON.stringify(result[0]));
        return res.status(200).json({
          datos: datos
        });
      }
    });
};

exports.obtenerDatosReporte = (req, res) =>{
  const script = "CALL SpDatosReportes();"

  gConDB.query(script, (err,result)=>{
      if(err){
          console.log("Error en obtener datos: " + err);
      }

      const reporte = JSON.parse(JSON.stringify(result[0]));
      res.status(201).json({
          message: 'Datos obtenidos exitosamente!!',
          reporte: reporte
      });
  });
};