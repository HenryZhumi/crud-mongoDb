const mongoose = require('mongoose')
const coneccion = require('./coneccionBD')

const CategoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


const Categorias = new mongoose.model('categorias', CategoriesSchema)

module.exports = { Categorias }