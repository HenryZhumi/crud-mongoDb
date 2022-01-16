const mongoose = require('mongoose')
const {conexion} = require('./coneccionBD')

// ESQUEMA
const Usuarios_Schema = new mongoose.Schema(
    {
        name: {
            type :String,
            require: true
        },
        email:{
            type: String,
            unique: true   
        },
        numberPhone: {
            type: Number,
            default: '123234'
        },
        tag: {
            type: Array,
            default: []
        }
    },
    // Esta opcion se agrega para que en cada modelo(tabla en sql)
    //se agregue la fecha de creacion y fecha de actualizacion
    {
        timestamps:true,
        versionKey: false
    }
)

/**
 * 
 * CREACION DE MODELOS
 */

 const Usuarios = new mongoose.model('usuarios', Usuarios_Schema)

 //  Exportar de este modulo el objeto usuarios.

 module.exports = {Usuarios}