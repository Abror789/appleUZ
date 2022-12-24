const express=require('express')
const router=express.Router()
const Product=require('../models/Product')
const multer=require('multer')
const path=require('path')
const verify = require("../config/verifyToken");



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(process.cwd(), "images"));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});


const upload = multer({
    storage: storage
});

router
    .route("/")
    .get(async (req,res)=>{
        try {
            const {page=1,limit=40,category,sortType='createdAt',sortValue=-1,min=0,max=28043000}=req.query
            const sortObject = {};
            sortObject[sortType] = sortValue;

            const products = await Product
                    .find({
                        category,
                        price: {$gte: min, $lte: max}
                    })
                    .sort(sortObject)
                    .limit(limit * 1)
                    .skip((page - 1) * limit)


                res.status(200).json({
                    total:products.length,
                    products,
                    page
                })

        }catch (e){
            console.log(e)
            res.status(500).json({
                error:e
            })
        }
    })
    .post(upload.array('images',5),async (req,res)=>{
        const {title,price,characters,category}=req.body
        const original=req.files
        const newArr=original.map((e)=>e.filename)

        const product=new Product({title,price:Number(price),images:newArr,characters:JSON.parse(characters),category})
        try {
            await product.save()
            res.status(201).json({
                message:"Product add success"
            })
        }catch (error) {
            console.log(error)
            res.status(500).json({
                message:error
            })
        }
    })



router
    .route('/news')
    .get(async (req,res)=>{
        try {
           const products = await Product.find({}).sort({createdAt:-1}).limit(8)
            res.status(200).json({
                products
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
    .get(async (req,res)=>{
        const {id}=req.params
        if (!id) return res.status(500).json({message:"category not found"})

        try {
            const product=await Product.findById(id)
            res.status(200).json({
                product
            })
        }catch (err) {
            console.log(err)
            res.status(500).json({
                message:err
            })
        }
    })
    .patch(verify,upload.array('images',5),async (req,res)=>{
        const {id}=req.params
        const {characters}=req.body
        const original=req?.files
        const newArr=original?.map((e)=>e.filename)

        const updates= {
            ...req.body,
            ...(newArr?.length>=1 && { newArr }),
            ...(characters?.length>=1 && { characters: JSON.parse(characters) }),
        //     price must be number
        }

        const options={new:true}
        try {
            const result=await Product.findByIdAndUpdate(id,updates,options)
            res.status(201).json({
                message:"Product edited",
                result
            })
        }
        catch (e) {
            res.send(e)
        }
    })
    .delete(verify,async (req,res)=>{
        const {id}=req.params
        try {
            const product=await Product.findByIdAndDelete(id)
            res.status(200).json({
                message:'Product deleted'
            })
        }catch (e) {
            res.status(500).send(e)
        }
    })

router
    .route("/filter/items")
    .get(async (req,res)=>{
        const {text}=req.query
        console.log(text)
        try {
            const product=await Product.find({
                title: { $regex: text, $options: "i" }
            })
            res.status(200).json({
                total:product.length,
                product
            })
        }catch (err) {
            console.log(err)
            res.status(500).json({
                message:err
            })
        }
    })

router
    .route("/ids")
    .post(async (req,res)=>{
        try {
            const {ids}=req.body

            const products=await Product.find({})
                .where('_id')
                .in(ids)
            res.status(200).json({
                total:products.length,
                products,
            })
        }catch (e) {
            console.log(e)
            res.status(500).json({
                error:e
            })
        }
    })




















module.exports=router
