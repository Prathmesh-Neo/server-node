const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to database')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { ConnectDB }