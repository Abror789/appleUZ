const express=require('express')
const router=express.Router()
const jwt = require('jsonwebtoken');


router
    .route('/')
    .post(async (req,res)=>{
        const {login,password}=req.body
        if (login !== process.env.LOGIN || password !==process.env.PASSWORD){
            res.status(500).json({
                message:"Login or Password is wrong"
            })
        }else {
            const user={
                login:process.env.LOGIN,
                password:process.env.PASSWORD
            }
            jwt.sign({user},'secret',{expiresIn: '24h'},(err,token)=>{
                res.json({
                    token
                })
            })
        }

    })
router
    .route('/verify')
    .post(async (req,res)=>{
        const {token}=req.body
        try {
            const verify=await jwt.verify(token,'secret')
            res.status(201).json({
                message:"user is login",
                verify
            })
        }catch (e) {
            res.status(403).json({
                message:"please login"
            })
        }
    })


module.exports=router

