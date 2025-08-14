const express = require('express')
const ProductRouter = require("./routes/products")
const cors = require('cors')
const app = express()

//user defined routes 
const authorization = require('./routes/authorization')
const userRouter = require('./routes/user')

app.use(cors())
app.use(express.json())
app.use(authorization.authorization)

app.use('/user' , userRouter)
app.use("/uploads" , express.static("uploads"));
app.use("/products" , ProductRouter);


app.listen(4000 ,'localhost', ()=>{
    console.log("server started on port 4000")
})