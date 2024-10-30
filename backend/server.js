import express from "express"
import cors from "cors"
import "dotenv/config"
import connectdb from "./config/Mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/user.router.js"
import productRouter from "./routes/product.router.js"
import UserCart from "./routes/userCart.router.js"
import OrderRouter from "./routes/order.router.js"


//App config
const app = express()
const PORT = process.env.PORT || 5000

connectdb();
connectCloudinary();


//middleware
app.use(express.json())
app.use(cors())

//Api end_Point
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',UserCart);
app.use('/api/order',OrderRouter)

app.get("/",(req,res)=>{
    res.send("Second backend for e-commerce website")
})

app.listen(PORT,()=>{
    console.log(`App running on port http://localhost:${PORT}`)
})