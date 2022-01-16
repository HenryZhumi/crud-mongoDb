//Crear una constante para utilizar el paquete mongoose
const mongoose = require('mongoose');
// Crear las constantes con los objetos que vamos a utilizar

const {Usuarios} = require('./modeloUsuarios')
const {Publicaciones} = require('./modeloPublicaciones')
const {Categorias} = require('./modeloCategorias')

const crearUsuarios = () => {
    Usuarios.create(
        {
            name: 'Dayana4',
            email: 'dayana4@jmail.com',
            numberPhone: '2233567'
        }
    );
}




/**
 * El valor "611884a7a787f04138604751" es el id del documento 
 * Henry de la tabla Usuarios, sirve para relacionar los dos tablas
 * 
 */

/**
 * Para ingresar varios registros a la ves se utiliza el insertMany al cual
 * se le envia como paramentro un array con los resgistros que se 
 * quieran agregar
 */
 const ListaPost = [
    {
        title:'Mi post',
        descripcion:'Mi primer post',
        author: mongoose.Types.ObjectId("611884a7a787f04138604751")
    },
    {
        title:'Mi segundo post',
        descripcion:'Segundo  post',
        author: mongoose.Types.ObjectId("611884a7a787f04138604751")
    }
]

const crearPublicaciones = () => {
    

    Publicaciones.insertMany(ListaPost)
}

const buscarUsuariosPorId = async (id) => {
    const user = await Usuarios.findById(id)
    console.log('El usuarios es ====>', user)
}
/*
const buscarUsuariosPorId = async () => {
    const user = await Usuarios.findById(id)
    console.log('El usuarios es ====>', user)
}
buscarUsuariosPorId()*/

const buscarPublicacionesPorConcidencia = async () => {
    const post = await Publicaciones.findOne({
        title:'Mi post'
    });

    console.log('Resultado ====> ', post)
}


//Buscar un valor y si no lo encuentra, crea uno nuevo con ese valor
const buscarOCrear = async () => {
    const port = await Publicaciones.findOneAndUpdate(
        {
            title: '50 sombras de gray'
        },
        {
            descripcion:'Se creo automaticamente',
            author: mongoose.Types.ObjectId("611884a7a787f04138604751")
        },
        {
            new: true,
            upsert:true
        }
    );
    console.log('Se ha ejecutado la funcion biscarOCrear =========>', port)
}


const editar = async () => {
    const post = await Publicaciones.updateOne(
        {
            _id: mongoose.Types.ObjectId('618be1685b2e7cbd409114cf')
        }, 
        {
            categories: ['Tecnologia','Salud','Accion']
        }
    )

    console.log('Se ha ejecutado editar =========>', post)
}

const editarUsuarios = async (nameUser) => {
    const post = await Usuarios.updateOne(
        {
            name: nameUser
        }, 
        {
            tag: ['edition','Creacion']
        }
    )

    console.log('Se ha ejecutado editar =========>', post)
}

const borrarPost = async () => {
    const post = await Publicaciones.deleteOne(
        {
            id: mongoose.Types.ObjectId('6186b173a21663f6f70ac44f')
        }
    )
    console.log('Eliminado el elemento =======>', post)
}


const publicacionconUsuario = async () => {

    /**$lookup es un metodo que tiene mongo para realizar join
     * entre tablas diferentes atraves de un campo y contiene 
     * lo siguiente:
     * 
     * Nota: el modelo padre es Publicaciones
     * 
     * le decimos que vea (from) en "usuarios", donde el campo author 
     * de las publicaciones (localField) coincida con el campo "_id"
     * de la tabla usuarios (foreignField)
     * 
     * $unwind sirve para dar formato al resultado, no es nesesario.
     * $match sirve para filtrar los registros de acuerdo a un parametro
     */
    const resultado = await Publicaciones.aggregate([
        {
            $lookup:
            {
                from:"usuarios",
                localField: "author",
                foreignField: "_id",
                as:"usuarioAuthor"
            }
        },
        {
            $unwind: "$usuarioAuthor"
        },
        {
            $match: { title: "Mi post"}
        }
    ])

    console.log('----------------- RESULTADO----------------', resultado)
}

////CREANDO CATEGORIAS
const CrearCategorias = (nombreCategoria) => {
    const categ = Categorias.create(
        {
            name: nombreCategoria
        }
    )
    console.log('Resultado -------------', categ)
}


const listaCategoriesConPublicaciones = async () => {

    const resultado = await Categorias.aggregate( // (1) Padre --- (Categories)
        [
            {
                $lookup:
                {
                    from: "publicaciones", // (2) Hijo --- (publicaciones)
                    let: {
                        aliasNombreCategoria: "$name"// (1) Nombre de la categoria "Tech" (string)
                    },
                    pipeline: [ // (2) publicaciones
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$aliasNombreCategoria", "$categories"] // [Salud]
                                }
                            }
                        }
                    ],
                    as: 'listDePublicacionesEncontradasPorCategoria'
                }
            }
        ]
    )

    console.log('*********** RESULTADOS ***********', JSON.stringify(resultado));
}

const listaPublicacionesConCategorias = async () => {

    const resultado = await Publicaciones.aggregate( // (1) Padre --- (Publicaciones)
        [
            {
                $lookup:
                {
                    from: "categorias", // (2) Hijo --- (categorias)
                    let: {
                        aliasNombreCategoria: "$categories"
                    },
                    pipeline: [ // (2) categorias
                        {
                            $match: {
                                $expr: {
                                    $in: ["$name", "$$aliasNombreCategoria"] 
                                }
                            }
                        }
                    ],
                    as: 'listDeCategorias'
                }
            }
        ]
    )

    console.log('*********** RESULTADOS ***********', JSON.stringify(resultado));
}

//crearUsuarios()
//crearPublicaciones()
//buscarUsuariosPorId('611884a7a787f04138604751')
//buscarPublicacionesPorConcidencia()
//buscarOCrear()
//editar()
//borrarPost()
//publicacionconUsuario()
//CrearCategorias('Accion')
//listaCategoriesConPublicaciones()
//listaPublicacionesConCategorias()
editarUsuarios('Henry2')
editarUsuarios('Dianita')
editarUsuarios('Ariana')
editarUsuarios('Daniela')
editarUsuarios('Gabriela')
editarUsuarios('Sarita')
editarUsuarios('Dayana')
editarUsuarios('Dayana2')
editarUsuarios('Dayana3')
editarUsuarios('Dayana4')