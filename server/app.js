const express = require('express')
const config = require('./config')
const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {
    console.log('Connected to DB')

    const app = express()
    app.listen(config.app.port, '', () => {
        console.log(`Server started and listening port ${config.app.port}`)
    })
})

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to DB on startup. Error: ', err)
})

mongoose.connection.on('disconnected', () => {
    console.log('DB connection disconnected')
})

const onServerStop = () => {
    mongoose.connection.close(() => {
        console.log('DB connection closed through app termination')
        process.exit(0)
    })
}

process.on('SIGNINT', onServerStop).on('SIGNTERM', onServerStop)

try {
    mongoose.connect(config.db.mongoSrv)
    console.log('Trying to connect to DB')
} catch (err) {
    console.error('Sever start failed ', err.message);
}
