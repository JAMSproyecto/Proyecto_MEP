'use strict';
const model_articulo = require('./articulos.model');

module.exports.registrar = (req,res) => {
    let articulo_nuevo = new  model_articulo(
        {
        nombre : req.body.nombre,
        descripcion : req.body.descripcion
        }
    );


articulo_nuevo.save(
    function(error){
        if (error){
            res.json(
                {
                    success : false,
                    msg : `No se pudo guardar el articulo, ocurrio el siguiente error ${error} `
                }
            )
        } else {
            res.json(
                {
                    success : true,
                    msg :  `se registro el articulo de forma correcta`
                }
            )
        };
    }
);
};

module.exports.listar_todos = (req, res) =>{
    model_articulo.find().then(
        function(articulos){
            if (articulos.length > 0) {
                res.json(
                    {
                        success :  true,
                        articulos : articulos
                    }
                )
            } else {
                res.json(
                    {
                        success : false,
                        articulos : `no se encontraron artilos registrados`
                    }
                )
            }
        }
    )
};