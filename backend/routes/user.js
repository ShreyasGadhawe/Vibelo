const express = require('express')
const pool = require('../db/db')
const jwt = require('jsonwebtoken')
const cryptoJs = require('crypto-js')
const result = require('../utils/result')
const secret = require('../utils/config')
const router = express.Router()

router.post("/register" , (request,response)=>{
    const {name , phoneNo , email , password , age , gender} = request.body
    const encryptedPassword = String(cryptoJs.SHA256(password))
    const sql = `insert into users(name , phone_number , email , password , age , gender_id) values(?,?,?,?,?,?)`
    pool.query(sql , [name , phoneNo , email , encryptedPassword , age , gender],(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

module.exports = router