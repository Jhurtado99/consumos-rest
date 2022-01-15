const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin123@cluster0.to4er.mongodb.net/rest')
        console.log('base de datos conectada')
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    dbConnection
}