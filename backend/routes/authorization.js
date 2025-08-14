const { secret } = require("../utils/config");
const { createErrorResult } = require("../utils/result");
const jwt = require('jsonwebtoken');

function authorization(req , res , next){
     if (req.url == '/user/register' || req.url == '/user/login') next()
     else{
        const token = req.headers.token;
        if(token){
            try{
                const payload = jwt.verify(token,secret);
                req.header.userId = payload.userId;
                req.userId = payload.userId;
                next();
            }catch(e){
                res.send(createErrorResult("Invalid Token"));
            }
        }else{
            res.send(createErrorResult("Token is missing"));
        }
    }
}

module.exports = {
    authorization : authorization
}