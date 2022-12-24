const express=require('express')
const router=express.Router()
const Order=require('../models/Order')
const auth=require('../config/auth');
const jwt = require("jsonwebtoken");

router
    .route('/')
    .get(async (req,res)=>{
        try {
            const {page=1,limit=12}=req.query
            // const orders=await Order.find({userId:ID})
            const orders=await Order.find({})
                .limit(limit * 1)
                .skip((page-1)*limit)
            res.status(200).json({
                total:orders?.length,
                orders,
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
        const {products,receptionType,paymentType,comment,allSum,phone,fullName}=req.body

        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        const verify=await jwt.verify(bearerToken,'secret')
        const userId=verify.user.id

        const order=new Order({products,comment,allSum,receptionType,paymentType,phone,fullName,userId})


        try {
            await order.save()
            res.status(201).json({
                message:"Your order has been accepted"
            })
        }catch (error) {
            console.log(error)
            res.status(500).json({
                message:error
            })
        }
    })

router
    .route('/mine')
    .get(auth,async (req,res)=>{
        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        const verify=await jwt.verify(bearerToken,'secret')
        const userId=verify.user.id
        try {
            const {page=1,limit=12}=req.query
            const orders=await Order.find({userId})
                .limit(limit * 1)
                .skip((page-1)*limit)
            res.status(200).json({
                total:orders?.length,
                orders,
                page
            })
        }catch (e) {
            console.log(e)
            res.status(500).json({
                error:e
            })
        }
    })

router
    .route('/mine/:id')
    .get(auth,async (req,res)=>{
        const {id}=req.params
        if (!id) return res.status(500).json({message:"order not found"})

        try {
            const order=await Order.findById(id)
            res.status(200).json({
                order
            })
        }catch (err) {
            console.log(err)
            res.status(500).json({
                message:err
            })
        }
    })


module.exports=router
