'use strict';

const Model_PreguntaFrecuente = require('./preguntas_frecuentes.model');

/**
 * Método para agregar pregunta frecuente para centro educativo
 * @param req{
 *              Pregunta,
 *              Respuesta,
 *              Numero de pregunta,
 *              ID Centro Educativo
 *          }
 * @returns res {
 *          exito,
 *          (Opcional)msg,
 *          
 *      }
 */
module.exports.registrar_PreguntaFrecuente_CentroEducativo = (req, res) =>{

    let preguntaFrecuente = new Model_PreguntaFrecuente({
        pregunta: req.body.pregunta,
        respuesta: req.body.respuesta,
        idCentroEducativo: req.body.idCentroEducativo
    });

    preguntaFrecuente.save( (error)=>{
        if(error){
            console.log(`Fracaso al registrar pregunta frecuente ${error}`);

            res.json({
                exito: false,
                msg: 'Fracaso al registrar pregunta frecuente'
            });
        }
        else{
            console.log(`Exito al registrar pregunta frecuente ${error}`);

            res.json({
                exito: true,
                msg: 'Éxito al registrar pregunta frecuente'
            });
        }
    });

    
} 

module.exports.obtener_PreguntaFrecuente_CentroEducativo = (req ,res) =>{
    Model_PreguntaFrecuente.find().then(
        function(preguntasFrecuentes){
            if(preguntasFrecuentes.length > 0){
                res.json(
                    {
                        exito: true,
                        preguntasFrecuentes: preguntasFrecuentes
                    }
                )
            }else{
                res.json(
                    {
                        exito: false,
                        comentarios: 'No se encontraron preguntas frecuentes'
                    }
                )
            }
        }

    )
};