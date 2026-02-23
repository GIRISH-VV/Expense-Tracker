import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import authRoute from './src/routes/auth.routes.js'
import userRoute from './src/routes/user.routes.js'
import expenseRoute from './src/routes/expense.route.js'

dotenv.config()
await connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/expense', expenseRoute)


const PORT = process.env.PORT || 5000

app.listen( PORT , (req,res) => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
