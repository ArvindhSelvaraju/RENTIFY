require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const houseRoutes = require('./routes/houses')
const userRoutes = require('./routes/user')

// express app
const app = express()

// Use CORS middleware
app.use(cors({
    origin: 'https://rentify-frontend-otfe.onrender.com', // Replace with your actual frontend domain
    optionsSuccessStatus: 200
}))
  
// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/houses', houseRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    // listen for requests
    app.listen(process.env.PORT || 8000, () => {
        console.log("conected to db & listening on port "+process.env.PORT)
    })
})
.catch((err) => {
    console.log(err)
})