//Crear una constante para utilizar el paquete mongoose
const mongoose = require('mongoose')
//Crear la ruta de la base de datos, si no existe la bd se crea automaticamente
const DB_URI = 'mongodb://localhost:27017/app_youtube_blog'

//CREAR INDICES PARA PODER CONTROLAR QUE NO SE REPITA ALGUN DATO EN LA BD
//mongoose.set('useCreateIndex', true)

//CONEXION  A LA BD MONGO
const conexion = mongoose.connect(DB_URI,
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true
        //, useCreateIndex:true
    }, (err) => {
        if(err){
            console.log('*************ERROR DE CONEXION***********')
        }else{
            console.log('*************CONEXION CORRECTA***********')
        }
    }
    );

module.exports = {conexion}