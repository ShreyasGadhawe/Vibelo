const express = require('express')
const cors = require('cors')
const app = express()

//user defined routes 
const userRouter = require('./routes/user')

app.use(cors())
app.use(express.json())

app.use('/user' , userRouter)

app.listen(4000 ,'localhost', ()=>{
    console.log("server started on port 4000")
})