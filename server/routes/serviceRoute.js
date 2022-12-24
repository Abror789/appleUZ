const express=require('express')
const router=express.Router()
const Service=require('../models/BroService')
const verify = require("../config/verifyToken");

router
    .route('/')
    .get(verify,async (req,res)=>{
        try {
            const {page=1,limit=12}=req.query
            const services=await Service.find({})
                .limit(limit * 1)
                .skip((page-1)*limit)
            res.status(200).json({
                total:services.length,
                services,
                page
            })
        }catch (e) {
            console.log(e)
            res.status(500).json({
                error:e
            })
        }
    })
    .post(async (req,res)=>{
        const {fullName,phoneNumber,device,desc}=req.body
        const category=new Service({fullName,phoneNumber,device,desc})
        try {
            await category.save()
            res.status(201).json({
                message:"Sizning ma'lumotlaringiz qabul qilindi"
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
        if (!id){
            res.status(500).json({
                message:"service not found"
            })
        }
        try {
            const service=await Service.findById(id)
            res.status(200).json({
                service
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
            const result=await Service.findByIdAndUpdate(id,updates,options)
            res.status(201).json({
                message:"Service is checked",
                result
            })
        }catch (e) {
            res.send(e)
        }
    })
    .delete(verify,async (req,res)=>{
        const {id}=req.params
        try {
            const category=await Service.findByIdAndDelete(id)
            res.status(200).json({
                message:'Service deleted'
            })
        }catch (e) {
            res.status(500).send(e)
        }
    })


module.exports=router
