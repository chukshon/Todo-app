import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

// db
import connectDB from './db/connect.js'
// routes
import authRoute from './routes/auth.js'

// Middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleWare from './middleware/errorHandling.js'

app.use(express.json())

app.get('/api/v1/', (req, res) => {
  res.send('working')
})

app.use('/api/v1/auth', authRoute)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    console.log('Connected to database')
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
