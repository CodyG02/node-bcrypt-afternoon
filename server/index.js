const express = require('express')
const session = require('express-session')
const massive = require('massive')
require('dotenv').config()
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')

const app = express()

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET

}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)

massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB Connected')
    app.listen(SERVER_PORT, () => console.log(`listening to port ${SERVER_PORT}`))
})
