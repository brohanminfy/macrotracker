import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import foodRoutes from './routes/food.js'
import waterRoutes from './routes/water.js'
import weightRoutes from './routes/weight.js'
import dashboardRoutes from './routes/dashboard.js'

dotenv.config()

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/food', foodRoutes)
app.use('/api/water', waterRoutes)
app.use('/api/weight', weightRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Macro Tracker API is running!' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})