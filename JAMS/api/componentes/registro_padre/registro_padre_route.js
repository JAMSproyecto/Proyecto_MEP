'use strict';
const express = require('express');
const router = express.Router();
const registro_Padre_Api = require('./registro_padre_api');

router.param('correo', function(req,res, next, correo){
    req.body.correo = correo;

    next();
    }

);

router.route('/registrar_Padre')
    .post(
        function (req, res) {
            registro_Padre_Api.registrar_Padre(req, res);
        }
    );

router.route('/listar_Padres')
    .get(
        function (req, res) {
            registro_Padre_Api.listar_Padres(req, res);
        }
    );



    router.route('/buscar_padre/:correo')
    .get(
        function (req, res) {
            registro_Padre_Api.buscar_padre(req, res);
        }
    ); 

    

 /*   router.route('/buscar_informacion_padre/:correo')
    .get(
        function (req, res) {
            registro_Padre_Api.buscar_informacion_padre(req, res);
        }
    ); 
*/

module.exports = router;