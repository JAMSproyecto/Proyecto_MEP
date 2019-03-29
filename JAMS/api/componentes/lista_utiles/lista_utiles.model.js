'use strict';

const mongoose = require('mongoose');

let schema_utiles = new mongoose.Schema(
    {   //codigo :{type : mongoose.Types.ObjectId, ref: 'centro_educativo_', require : true},
        tipo: {type :String, required : true},
        nombre : {type : String, required : true},
        anno : {type : String, required : false},
        articulos : [
            {
                codigo : {type : String},
                descripcion : {type : String},
                cantidad :{type : Number}
            }
        ]
    }
);

module.exports = mongoose.model('lista_utiles', schema_utiles);