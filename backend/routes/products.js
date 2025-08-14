const fs = require('fs')
const multer = require('multer');
const path = require('path');
const pool = require('../db/db');
const result = require('../utils/result');



const express = require('express');

const router = express.Router();

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "products");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const upload = multer({dest : UPLOAD_DIR});

router.post('/',upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.send("file is required");
    }

    const newFileName = `${req.file.filename}.jpg`;
    const tempPath = req.file.path;
    const finalPath = path.join(req.file.destination,newFileName);

    fs.rename(tempPath,finalPath,(err)=>{
        if(err){
            fs.unlink(tempPath,()=>{});
            return res.send(result.createResult(err,null))
        }
    })

    const {
        name ,
        price , 
        description , 
        category_id , 
        gender_id , 
        size_large_quantity, 
        size_small_quantity, 
        size_medium_quantity} = req.body;

    if(!name || !price || !description || !category_id || !gender_id ){
        fs.unlink(finalPath,()=>{});
        return res.send(result.createResult("missing required fields"));
    }


    const sql = `INSERT INTO products
    (name,price,description,image_url,category_id,gender_id,size_large_quantity,size_small_quantity,size_medium_quantity) 
    VALUES(?,?,?,?,?,?,?,?,?)`;

    const params =[
        name,
        price,
        description || null,
        newFileName,
        category_id,
        gender_id,
        size_large_quantity||null,
        size_small_quantity||null,
        size_medium_quantity||null
    ];

    pool.query(sql, params,(error,data)=>{
        if(error){
            fs.unlink(finalPath,()=>{});
            return res.send(result.createResult(error,null))
        }
        res.send(result.createResult(null,data))
    })

}) 

module.exports=router;