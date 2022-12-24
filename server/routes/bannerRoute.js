const express=require('express')
const router=express.Router()
const Banner=require('../models/Banner')
const multer = require("multer");
const path = require("path");
const verify=require('../config/verifyToken');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(process.cwd(), "images"));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

router
    .route("/")
    .get(async (req,res)=>{
        try {
            const banners=await Banner.find({isShow:true})
            res.status(200).json({
                total:banners.length,
                banners
            })
        }catch (e) {
            console.log(e)
            res.status(500).json({
                error:e
            })
        }
    })
    .post(verify,upload.single('source'),async (req,res)=>{
        const {title,desc}=req.body
        const source=req.file.filename
        console.log(title,desc,source)
        const banner=new Banner({title,source,desc})
        try {
            await banner.save()
            res.status(201).json({
                message:"Banner add success"
            })
        }catch (error) {
            console.log(error)
            res.status(500).json({
                message:error
            })
        }
    })

router
    .route("/all")
    .get(verify,async (req,res)=>{
        try {
            const banners=await Banner.find({})
            res.status(200).json({
                total:banners.length,
                banners
            })
        }catch (e) {
            console.log(e)
            res.status(500).json({
                error:e
            })
        }
    })

router
    .route('/:id')
    .get(verify,async (req,res)=>{
        const {id}=req.params
        if (!id) return res.status(500).json({message:"banner not found"})

        try {
            const banner=await Banner.findById(id)
            res.status(200).json({
                banner
            })
        }catch (err) {
            console.log(err)
            res.status(500).json({
                message:err
            })
        }
    })
    .patch(verify,upload.single('source'),async (req,res)=>{
        const {id}=req.params
        const source=req?.file?.filename
        const updates= {...req.body,source}
        const options={new:true}
        try {
            const result=await Banner.findByIdAndUpdate(id,updates,options)
            res.status(201).json({
                message:"Banner edited",
                result
            })
        }catch (e) {
            res.send(e)
        }
    })
    .delete(verify,async (req,res)=>{
        const {id}=req.params
        try {
            const banner=await Banner.findByIdAndDelete(id)
            res.status(200).json({
                message:'Banner deleted'
            })
        }catch (e) {
            res.status(500).send(e)
        }
    })




module.exports=router
