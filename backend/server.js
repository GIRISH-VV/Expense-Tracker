import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from 

app.use(cors())
dotenv.config()
await connectDB()

const app = express()

const PORT = 5000  || process.env.PORT

app.listen( PORT , (req,res) => {
    console.log(`Server is running on http://localhost:${PORT}`)
})