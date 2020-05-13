const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const userRoutes = require('./routes/user')
const subjectRoutes = require('./routes/subject')
const eventsRoutes = require('./routes/event')

app.use('/user', userRoutes)
app.use('/subjects', subjectRoutes)
app.use('/events', eventsRoutes)

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-xbxsg.mongodb.net/student-integrator?retryWrites=true&w=majority`, {useNewUrlParser: true}, () => {
    console.log('Connected to db')
})

app.listen(3000)
