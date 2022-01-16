const mongoose = require('mongoose')
const {conexion} = require('./coneccionBD')

// ESQUEMAS

const Publicaciones_Schema = new mongoose.Schema(
    {
        title: {
            type :String
        },
        descripcion:{
            type: String
        },
        author: {
            //objectId = id incrementable
            type: mongoose.Types.ObjectId
        },
        categories: {
            type: Array,
            default: []
        }
    },
    // Esta opcion se agrega para que en cada modelo(tabla en sql)
    //se agregue la fecha de creacion y fecha de actualizacion

    //la version se pone falso para que no nos aparesca
    {
        timestamps:true,
        versionKey: false
    }
)


// MODELO

const Publicaciones = new mongoose.model('publicaciones', Publicaciones_Schema)

//Exportar Modelo

module.exports = {Publicaciones}