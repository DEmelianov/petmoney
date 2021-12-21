const config = {
    app: {
        port: 3001,
        jwtSecretKey: 'test',
    },
    db: {
        mongoSrv: 'mongodb+srv://DEmelyanov:2Qqmn82hzzVDphx@cluster0.itzkn.mongodb.net/app?retryWrites=true&w=majority',
    }
}

module.exports = config