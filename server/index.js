const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const assert = require('assert')
const fs = require('fs')
const mongodb = require('mongodb')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/files', express.static(path.join(__dirname, 'files')))

const userRoutes = require('./routes/user')
const subjectRoutes = require('./routes/subject')

app.use((req, res, next) => {
  res.append('Access-Control-Expose-Headers', 'Content-Disposition')
  next();
});

app.use('/user', userRoutes)
app.use('/subjects', subjectRoutes)

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: fileStorage })

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  fs.createReadStream(req.file.path).
    pipe(bucket.openUploadStream(req.file.filename)).
    on('error', function(error) {
      assert.ifError(error);
    }).
    on('finish', function() {
      console.log('done!');
    });
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-xbxsg.mongodb.net/student-integrator?retryWrites=true&w=majority`

let bucket

mongoose.connect(uri, { useNewUrlParser: true })

mongoose.connection.on('connected', () => {
  console.log('connected')
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db)
})

app.get('/files', async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('fs.files').find().toArray()
    res.send(result)    
  } catch (error) {
    console.log(error)
  }
})
// show file contents if is downloaded
app.get('/files/:name', async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('fs.files').findOne({ filename: req.params.name })
    res.send(result)    
  } catch (error) {
    console.log(error)
  }
})
// download file
app.get('/file/:name', async (req, res) => {
  bucket.openDownloadStreamByName(req.params.name).
  pipe(fs.createWriteStream(`files/${req.params.name}`)).
  on('error', function(error) {
    assert.ifError(error);
  }).
  on('finish', function() {
    console.log('done!');
  });
})

app.listen(3000)
