require('dotenv').config()
require('express-async-errors')
const express = require('express')


const connectDB = require('./db/db_connection')
const app = express()
const port = 3000
const errorHandler = require('./midware/mid.js')
const pageNotFound = require('./midware/mid.js')
const auth = require('./route/auth.js')
const message = require('./route/mess.js')

app.use(express.json())
app.use(auth)
app.use(message)

app.use(pageNotFound)
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening in port: ${port}.... `)
        })
    } catch (err) {
        console.log(`Error in connecting mongodb....`)
    }
}

start()