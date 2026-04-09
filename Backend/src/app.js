import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'
import publicRoutes from './routes/publicRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_request, response) => {
  response.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/public', publicRoutes)

app.use((error, _request, response, _next) => {
  if (error.name === 'ZodError') {
    response.status(400).json({ message: error.issues[0]?.message || 'Invalid request payload.' })
    return
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    response.status(400).json({ message: 'PDF must be 5 MB or smaller.' })
    return
  }

  const statusCode = error.statusCode || 500
  response.status(statusCode).json({
    message: error.message || 'Internal Server Error',
  })
})

export default app
