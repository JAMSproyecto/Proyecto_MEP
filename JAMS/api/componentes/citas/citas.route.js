'uset strict';
const express = require('express');
const router = express.Router();
const citas_api = require('./citas.api');


router.route('/registrar_cita')
    .post(
        function (req, res) {
            citas_api.registrar(req, res);
        }
    );


router.route('/listar_citas')
    .get(
        function(req, res){
           citas_api.listar_todos(req, res);
        }
    )

module.exports = router;