const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const userRoutes = require('./routes/user')

app.use('/user', userRoutes)

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-xbxsg.mongodb.net/student-integrator?retryWrites=true&w=majority`, {useNewUrlParser: true}, () => {
    console.log('Connected to db')
})

app.listen(3000)