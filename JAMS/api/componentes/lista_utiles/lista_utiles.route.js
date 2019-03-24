'use strict';

const express = require('express');
const router= express.Router();
const lista_utiles_api = require('./lista_utiles.api');


router.route('/registrar_lista_utiles')
    .post(
        function(req, res){
            lista_utiles_api.registrar(req, res);
        }
    );

router.route('/listar_lista_utiles')
        .get(
            function(req, res)
            {
            lista_utiles_api.obtener_todos(req, res);
            }
        );

router.route('/agregar_articulo')
        .post(
            function(req, res)
            {
             lista_utiles_api.agregar_articulos(req, res);
            }
        );

module.exports = router;