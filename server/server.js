const express=require('express')
const connectDB=require('./config/db')
const cors =require('cors')
const bodyParser = require('body-parser')
const morgan=require('morgan')
const path=require('path')

const product=require('./routes/productRoute')
const category=require('./routes/categoryRoute')
const service=require('./routes/serviceRoute')
const user=require('./routes/userRoute')
const banner=require('./routes/bannerRoute')
const login =require('./routes/loginRoute')
const order=require('./routes/orderRoute')


require('dotenv').config()
connectDB().then(()=>{
    console.log('Mongodb connected')
})


const app =express()


app.use(express.json())
app.use(cors())
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, "images")));

app.use('/api/products',product)
app.use('/api/orders',order)
app.use('/api/category',category)
app.use('/api/service',service)
app.use('/api/user',user)
app.use('/api/banners',banner)
app.use('/api/login',login)

app.get('/',(req,res)=>{
    res.send("hello")
})

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server run ${PORT}`)
})
