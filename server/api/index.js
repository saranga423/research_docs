const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB error:', err.message)
    process.exit(1)
  }
}

const documentRoutes     = require('../routes/documents')
const presentationRoutes = require('../routes/presentations')

app.use('/api/documents',     documentRoutes)
app.use('/api/presentations', presentationRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

module.exports = async (req, res) => {
  await connectDB()
  return app(req, res)
}

if (require.main === module) {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
  })
}