const express=require('express')
const router=express.Router()
const Category=require('../models/Category')
const verify=require('../config/verifyToken');


router
    .route('/')
    .get(async (req,res)=>{
        try {
            const categories=await Category.find({})
            res.status(200).json({
                categories
            })
        }catch (e) {
            console.log(e)
            res.status(500).json({
                error:e
            })
        }
    })
    .post(verify,async (req,res)=>{
        const {title}=req.body
        const category=new Category({title})
        try {
            await category.save()
            res.status(201).json({
                message:"Category add success"
            })
        }catch (error) {
            console.log(error)
            res.status(500).json({
                message:error
            })
        }

    })

router
    .route('/:id')
    .get(verify,async (req,res)=>{
        const {id}=req.params
        if (!id) return res.status(500).json({message:"category not found"})

        try {
            const category=await Category.findById(id)
            res.status(200).json({
                category
            })
        }catch (err) {
            console.log(err)
            res.status(500).json({
                message:err
            })
        }
    })
    .patch(verify,async (req,res)=>{
        const {id}=req.params
        const updates=req.body;
        const options={new:true}
        try {
            const result=await Category.findByIdAndUpdate(id,updates,options)
            res.status(201).json({
                message:"Category edited",
                result
            })
        }catch (e) {
            res.send(e)
        }
    })
    .delete(verify,async (req,res)=>{
        const {id}=req.params
        try {
           const category=await Category.findByIdAndDelete(id)
            res.status(200).json({
                message:'Category deleted'
            })
        }catch (e) {
            res.status(500).send(e)
        }
    })


module.exports=router
