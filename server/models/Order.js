const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema({
    products:[
        {
            productId:{
                type:String,
                required:true,
            },
            quantity:{
                type:Number,
                required: true,
            },
        }
    ],
    receptionType:{
        type:Number,
        default:0
    },
    paymentType:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:0
    },
    comment:{
       type:String
    },
    phone:{
        type:Number,
        required:true
    },
    fullName:{
       type:String,
       required:true
    },
    allSum:{
        type:Number,
        required:true,
    },
    locus:{
       type:String
    },
    userId:{
        type:String,
        required:true
    }
},{ timestamps: true })

const Order=mongoose.model('order',OrderSchema)
module.exports=Order
