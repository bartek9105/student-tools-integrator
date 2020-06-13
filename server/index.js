const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const Multer = require('multer')
const path = require('path')
const serviceKey = path.join(__dirname, './gcs-key.json')
const Cloud = require('@google-cloud/storage')
const {format} = require('util')
const uuid = require('uuid')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/files', express.static(path.join(__dirname, 'files')))

const { Storage } = Cloud

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'citric-adviser-280109',
})

const bucket = storage.bucket('student-tools-integrator-bucket')

const multer = Multer({
  storage: Multer.memoryStorage()
})

const userRoutes = require('./routes/user')
const subjectRoutes = require('./routes/subject')
const eventsRoutes = require('./routes/event')
const projectRoutes = require('./routes/project')
const taskRoutes = require('./routes/task')
const examRoutes = require('./routes/exam')
const offerRoutes = require('./routes/offer')

app.use((req, res, next) => {
  res.append('Access-Control-Expose-Headers', 'Content-Disposition')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
});

app.use('/api/user', userRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/exams', examRoutes)
app.use('/api/offers', offerRoutes)

app.post('/api/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(uuid.v1() + '/' + req.file.originalname)
  const metadata = {
    metadata: {
      userId: req.body.userId,
      subjectId: req.body.subjectId
    }
  }
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', async () => {
    bucket.file(blob.name).setMetadata(metadata)
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

app.get('/api/files/:userId/:subjectId', async (req, res) => {
  try {
    const files = await bucket.getFiles()
    const arr = []
    files.forEach(el => {
      el.forEach(x => arr.push(x.metadata))
    })
    res.send(arr.filter(el => Object.values(el.metadata)[1] == req.params.subjectId))
  } catch (error) {
    console.log(error)
  }
})

app.delete('/api/file/:uuid/:filename', async (req, res) => {
  try {
    await bucket.file(`${req.params.uuid}/${req.params.filename}`).delete()
    res.send('File deleted')
  } catch (error) {
    console.log(error)
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public'))

  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
  })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-xbxsg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true })

mongoose.connection.on('connected', () => {
  console.log('connected')
})

const port = process.env.PORT || 3000

app.listen(port)
