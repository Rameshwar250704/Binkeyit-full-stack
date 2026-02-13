import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"

import connectDB from "./config/connectDB.js"
import userRouter from "./route/users.rout.js"
import categoryRouter from "./route/category.rout.js"
import uploadRouter from "./route/upload.rout.js"
import subCategoryRouter from "./route/subCategory.rout.js"
import productRouter from "./route/product.rout.js"
import cartRouter from "./route/cart.route.js"
import addressRouter from "./route/address.route.js"

const app=express()
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))




app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:false
}))

const PORT=8080 || process.env.PORT

app.get("/",(req,res)=>{
    res.json({
        message:"server is runing "
    })
})

app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)



connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("server is running on port 8080",PORT);
})

})

