import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './config/key.js'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

//const CONNECTION_URL = config.mongoURI
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)

app.get('/', (req, res) => {
  res.send('welcome to my memories :)')
})

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error.message)
  })

mongoose.set('useFindAndModify', false)
