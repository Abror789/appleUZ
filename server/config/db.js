const mongoose =require('mongoose')

const connectDB=async () =>{
    try{
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true
        })
        // const conn=await mongoose.connect(process.env.MONGO_URI,{
        //     useNewUrlParser:true
        // })
        // console.log('Mongodb connected')
    }catch (e) {
        console.log(e)
    }
}
module.exports=connectDB
