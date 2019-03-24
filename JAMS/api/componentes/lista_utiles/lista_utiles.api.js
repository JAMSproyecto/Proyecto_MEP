'use strict';
const model_utiles = require('./lista_utiles.model');

module.exports.registrar = (req, res) =>{
    let lista_utiles_nuevo = new model_utiles(
        {
            tipo : req.body.tipo,
            nombre : req.body.nombre,
            anno : req.body.anno,
            
        }
    );

lista_utiles_nuevo.save(
    function(error){
        if (error) {
            res.json(
                {
                    success : false,
                    msg : `No se pudo guardar la lista de utiles, ocurrio el siguiente error ${error}`
                }
            )
        } else {
            res.json(
                {
                    success : true,
                    msg : `se registro la lista de utiles de forma correcta`
                }
            )
        }
    }
);
};

module.exports.obtener_todos = (req, res) =>{
    model_utiles.find().then(
        function (utiles){
            if (utiles.length > 0) {
                res.json(
                    {
                        success : true,
                        coleccion_utiles : utiles
                    }
                )
            } else {
                res.json(
                    {
                        success : false,
                        coleccion_utiles : `no se encontraron lista de útiles registrados`
                    }
                )
            }
        }
        
    )
};

module.exports.agregar_articulos = (req, res) =>{

    model_utiles.update(
        { _id : req.body.id_lista},

        {
            $push:
            {
                'articulos':
                {
                  codigo_articulo: req.body.codigo,
            
                }
            }

        },
        function(error){
            if (error) {
                res.json(
                    {
                        success : false,
                        msg : `No se pudo guardar el articulo, ocurrio el siguiente error ${error}`
                    }
                )
            } else {
                res.json(
                    {
                        success : true,
                        msg : `Se registro el articulo con exito `
                    }
                )
            }
        }

    );
};
