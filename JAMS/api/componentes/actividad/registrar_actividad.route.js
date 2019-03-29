'use strict';
const express = require('express');
const router =  express.Router();
const registrar_actividad_api = require('./registrar_actividad.api');

router.route('/registrar_actividad')
    .post(
        function(req, res){
            registrar_actividad_api.registrar_actividad(req, res);
        }
    );

router.route('/listar_todas_actividades')
        .get(
            function(req, res){
                registrar_actividad_api.listar_todas_actividades(req, res);
            }
        )

module.exports = router;