const express = require('express')
const config = require('./config')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))

// connection
mongoose.connection.on('connected', () => {
    console.log('Connected to DB')

    app.listen(config.app.port, '', () => {
        console.log(`Server started and listening port ${config.app.port}`)
    })
})

mongoose.connection.on('error', (e) => {
    console.error('Failed to connect to DB on startup. Error: ', e)
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
} catch (e) {
    console.error('Sever start failed ', e.message);
}
