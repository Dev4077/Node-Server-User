const express = require('express')
const app = express()
const cors = require('cors');
const router = require('./router/router')
const port = 3003
const db = require('./model')
app.use(cors());
app.use(express.json())
app.use('/api', router)
db.mongoose.connect(db.mongodb, {}).then(() => {
    console.log('Database connected!!!')
}).catch((err) => {
    console.log("Database not connected! ", err)
})
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})