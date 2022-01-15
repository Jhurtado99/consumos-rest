const express = require('express')
const { Usuarios } = require('./data/usuarios')
const { dbConnection } = require('./database/config')
const { findByIdAndUpdate } = require('./models/Usuario')
const Usuario = require('./models/Usuario')

const app = express()

dbConnection()

app.use(express.json())

app.get('/api/usuarios', async (req, res) => {

    try {

        const lstUsuarios = await Usuario.find()

        res.json({
            ok: true,
            msg: "listar todos los usuarios",
            value: lstUsuarios
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "error al listar usuarios"
        })
    }

    // res.json({
    //     ok: true,
    //     msg: "listar todos los usuarios",
    //     value: Usuarios
    // })
})  

app.get('/api/usuarios/:id', async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.params.id)

        res.json({
            ok: true,
            msg: "listar usuario por id",
            value: usuario
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "error al encontrar al usuario"
        })
    }

    // const usuario = Usuarios.find(u => u._id === parseInt(req.params.id))

    // res.json({
    //     ok: true,
    //     msg: "listar usuario por id",
    //     value: usuario
    // })
})  

app.post('/api/usuarios', async (req, res) => {

    const usuario = new Usuario(req.body)

    try {
        const nuevoUsuario = await usuario.save()
        res.status(201).json({
            ok: true,
            msg: "crear usuario",
            value: nuevoUsuario
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "error al crear usuario",
        })
    }

    // req.body._id = Usuarios.length
    // Usuarios.push(req.body)

    // res.json({
    //     ok: true,
    //     msg: "crear usuario",
    //     value: Usuarios
    // })
}) 

app.put('/api/usuarios/:id', async (req, res) => {

    const usuario = await Usuario.findById(req.params.id)

    if (!usuario){
        res.status(404).json({
            ok: false,
            msg: "usuario no encontrado",

        })
    }

    const usrActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.json({
        ok: true,
        msg: "modificar usuario por id",
        value: usrActualizado
    })

    // Usuarios.map(u => {
    //     if (u._id === parseInt(req.params.id)){
    //         u.nombre = req.body.nombre
    //         u.apellido = req.body.apellido
    //         u.edad = req.body.edad
    //     }
    // })

    // res.json({
    //     ok: true,
    //     msg: "modificar usuario por id",
    //     value: Usuarios
    // })
}) 

app.delete('/api/usuarios/:id', async (req, res) => {

    const usuario = await Usuario.findById(req.params.id)

    if (!usuario){
        res.status(404).json({
            ok: false,
            msg: "usuario no encontrado",
        })
    }

    await Usuario.findByIdAndDelete(req.params.id)

    res.json({
        ok: true,
        msg: "eliminar usuario por id",
    })

    // let lstUsuarios = Usuarios.filter(u => u._id !== parseInt(req.params.id))

    // res.json({
    //     ok: true,
    //     msg: "eliminar usuario por id",
    //     value: lstUsuarios
    // })
}) 


app.listen(process.env.PORT || 4000, () => {
    console.log(`servidor corriendo por el puerto ${process.env.PORT || 4000}`)
})