const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

fs.writeFile(process.env.GCP_CRED_FILE, process.env.GCP_CRED, (err) => {});