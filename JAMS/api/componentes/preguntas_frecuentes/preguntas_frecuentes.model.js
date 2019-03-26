'use strict';

const Mongoose = require('mongoose');

let preguntaFrecuente =  new Mongoose.Schema({
    idCentroEducativo: {type: Number},
    pregunta : { type: String, required: true},
    respuesta : { type: String, required: true}
});


module.exports = Mongoose.model('Pregunta_Frecuente', preguntaFrecuente);