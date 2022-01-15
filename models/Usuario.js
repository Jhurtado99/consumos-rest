const { Schema, model } = require('mongoose')

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    }
})

module.exports = model('Usuario', usuarioSchema)