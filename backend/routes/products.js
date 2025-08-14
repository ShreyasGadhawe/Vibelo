const fs = require('fs')
const multer = require('multer');
const path = require('path');
const pool = require('../db/db');
const result = require('../utils/result');
const cloudinary = require('cloudinary').v2;

const express = require('express');

const router = express.Router();

// const UPLOAD_DIR = path.join(process.cwd(), "uploads", "products");
// fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// const upload = multer({dest : UPLOAD_DIR});

const upload = multer({dest : 'temp/'})

 cloudinary.config({ 
        cloud_name: 'dflgiiyrh', 
        api_key: '269713279898691', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });


// add a product
router.post('/',upload.single('image'),async(req,res)=>{
    
    try{
    if(!req.file){
        return res.send("file is required");
    }

    // const newFileName = `${req.file.filename}.jpg`;
    // const tempPath = req.file.path;
    // const finalPath = path.join(req.file.destination,newFileName);

    // fs.rename(tempPath,finalPath,(err)=>{
    //     if(err){
    //         fs.unlink(tempPath,()=>{});
    //         return res.send(result.createResult(err,null))
    //     }
    // })

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

        console.log("before cloudinary");
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'products', // Folder in Cloudinary
      resource_type: 'image'
    });
        console.log("after cloudinary");
    fs.unlink(req.file.path, () => {});

    const sql = `INSERT INTO products
    (name,price,description,image_url,image_public_id,category_id,gender_id,size_large_quantity,size_small_quantity,size_medium_quantity) 
    VALUES(?,?,?,?,?,?,?,?,?,?)`;

    const params =[
        name,
        price,
        description || null,
        uploadResult.secure_url,
        uploadResult.public_id,
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
    }catch(e){
        res.send(result.createErrorResult("error occured"));
    }

}) 


// get all products
router.get("/",(req,res)=>{
    const sql = `select id , name , price , description , image_url from products`;
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data));
    })
})

module.exports=router;