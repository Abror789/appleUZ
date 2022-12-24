const express=require('express')
const router=express.Router()
const User=require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth=require('../config/auth')
const multer=require('multer')
const path=require('path')
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
    storage: storage
});

router
    .route('/')
    .get(verify,async (req,res)=>{
        try {
            const {page=1,limit=12}=req.query
            const users=await User.find({})
                .limit(limit * 1)
                .skip((page-1)*limit)
            res.status(200).json({
                total:users.length,
                users,
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
    .route('/signup')
    .post(async (req,res)=>{
        const {phone,password,fullName}=req.body
        try {
            const userExist=await User.findOne({phone})
            if (userExist){
                return res.status(400).json({
                    message:"Siz ro'yhatdan o'tgansiz"
                })
            }

            const user=new User({phone,password,fullName})
            const salt=await bcrypt.genSalt(10)
            user.password=await bcrypt.hash(password,salt)
            await user.save()

            const payload={
                user:{
                    id:user._id
                }
            }

            jwt.sign(
                payload,
                'secret',
                {expiresIn:'7 days'},
                (err,token)=>{
                    if (err) throw err
                    res.json({token,user:{
                                fullName,
                                phone
                        }})
                }
            )

        }catch (e) {
            console.log(e)
            res.status(500).send('Server error');
        }
    })

router
    .route('/signin')
    .post(async (req,res)=>{
        const {phone,password}=req.body
        console.log(phone)

        try {
            if(typeof(phone) !=='number') return res.status(500).json({msg:"Error"})
            const user =await User.findOne({phone})
            if (!user){
                return res.status(400).json({
                    message:"Siz hali ro'yhatdan o'tmagansiz"
                })
            }
            const isMatch=await bcrypt.compare(password,user.password)
            if (!isMatch){
                return res.status(400).json({
                    message:"Email or password incorrect"
                })
            }
            const payload={
                user:{
                    id:user._id
                }
            }

            jwt.sign(
                payload,
                'secret',
                {expiresIn:'30 days'},
                (err,token)=>{
                    if (err) throw  err;
                    res.json({token,user:{
                            phone,
                            fullName:user.fullName
                        }})
                }
            )


        }catch (e) {
            console.log(e)
            res.status(500).send('Server error');
        }
    })

router
    .route('/me')
    .get(auth,async (req,res)=>{

        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const verify=await jwt.verify(bearerToken,'secret')


        try {
            const user=await User.findById(verify.user.id)
            res.status(200).json({user})
        }catch (error) {
            res.status(500).json(error);
        }
    })

router
    .route('/:id')
    .get(verify,async (req,res)=>{
        const {id}=req.params
        if (!id) return res.status(500).json({message:"user not found"})

        try {
            const user=await User.findById(id)
            res.status(200).json({
                user
            })
        }catch (err) {
            res.status(500).json({
                message:err
            })
        }
    })
    .patch(auth,upload.single('image'),async (req,res)=>{
        const {id}=req.params
        const image=req?.file?.filename
        const updates={...req.body,image};
        const options={new:true}
        try {
            const result=await User.findByIdAndUpdate(id,updates,options)
            res.status(201).json({
                message:"User edited",
                result
            })
        } catch (error) {
            res.status(500).json({
                message:error
            })
        }
    })
    .delete(verify,async (req,res)=>{
        const {id}=req.params
        try {
            const user=await User.findByIdAndDelete(id)
            res.status(200).json({
                message:'User deleted'
            })
        }catch (e) {
            res.status(500).send(e)
        }
    })



module.exports=router
