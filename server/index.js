const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

let gfs

const userRoutes = require('./routes/user')
const subjectRoutes = require('./routes/subject')

app.use('/user', userRoutes)
app.use('/subjects', subjectRoutes)

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-xbxsg.mongodb.net/student-integrator?retryWrites=true&w=majority`, {useNewUrlParser: true})

const db = mongoose.connection

db.once('open', () => {
    console.log('works')
    gfs = Grid(db, mongoose.mongo)
    gfs.collection('uploads')
})

const storage = new GridFsStorage({
    url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-xbxsg.mongodb.net/student-integrator?retryWrites=true&w=majority`,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const upload = multer({ storage })

  app.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        file: req.file
    })
  })

app.listen(3000)
