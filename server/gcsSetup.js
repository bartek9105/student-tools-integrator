const fs = require('fs')

fs.writeFile(process.env.GCP_CRED_FILE, process.env.GCP_CRED, (err) => {})