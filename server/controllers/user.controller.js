import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from "bcryptjs"
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js' // if you have this
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'
import { response } from 'express'
import uploadimageCloudinary from '../utils/uploadimageCloudinary.js'

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide name, email, and password",
        error: true,
        success: false
      })
    }

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return res.json({
        message: "Email already exists",
        error: true,
        success: false
      })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)

    const newUser = new UserModel({
      name,
      email,
      password: hashPassword
    })

    const savedUser = await newUser.save()

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`

    await sendEmail({
      sendTo: email,
      subject: "Verify your email - Blinkit Clone",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl
      })
    })

    return res.status(201).json({
      message: "User registered successfully! Please verify your email.",
      error: false,
      success: true,
      data: savedUser
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
//verify email

export async function verifyEmailController(req,res){
   try {
    const {code}=req.body

    const user=await UserModel.findOne({_id:code})
    if(!user){
      return res.status(400).json({
        message:"invalid code",
        error:true,
        success:false
      })
    }

    const updateUser=await UserModel.updateOne({_id:code},{
      verify_email:true
    })

    return res.message 
    
   } catch (error) {
    return response.status(500).json({
      message:error.message||error,
      error:true,
      success:true,
    })
    
   }
}

//login 
export async function loginController(req,res){
  try {
    const{email,password}=req.body
    if(!email ||!password){
      return res.status(400).json({
        message:"provide email or password"
      })
    }

    const user=await UserModel.findOne({email})

    if(!user){
      return res.status(400).json({
        message:"user not regisered",
        error:true,
        success:false
      })

    }
    if(user.status!=="active"){
      return res.status(400).json({
        message:"contact to admin ",
        error:true,
        success:false
      })
    }
    
const checkPassword=await bcryptjs.compare(password,user.password)
if(!checkPassword){
  return res.status(400).json({
    message:"check your password",
    error:true,
    success:false
  })
}

const accesstoken=await generateAccessToken(user._id)
const refreshtoken=await generateRefreshToken(user._id)

const updateUser=await UserModel.findByIdAndUpdate(user?._id,{
  last_login_date:new Date()
})



const cookiesOption={
  httponly:true,
  secure:true,
  sameSite:"none"
}
res.cookie('accessToken',accesstoken,cookiesOption)
res.cookie('refreshToken',refreshtoken,cookiesOption)

return res.json({
  message:"login success",
    error:false,
    success:true,
    data:{
      refreshtoken,
      accesstoken
    }

})
    
  } catch (error) {
    return res.status(500).json({
      message:error.message || errpr,
      error:true,
      success:false

    })
    
  }
}
//logout functio  
export async function logoutController(req,res){
  try {
    const userid=req.userId
    const cookiesOption={
  httponly:true,
  secure:true,
  sameSite:"none"
}
    res.clearCookie("accessToken",cookiesOption)
    res.clearCookie("refreshToken",cookiesOption)

    const removeRefreshToken=await UserModel.findByIdAndUpdate(userid,{
      refresh_token:""
    })
    
    return res.json({
      message:"logout success",
      error:false,
      success:true,
    })

  } catch (error) {
    return res.status(500).json({
      message:error.message||error,
      error:true,
      success:false,
    })
    
  }
}
//upload user avtar 
export async function uploadAvatar(req,res){
  try {
    const userId=req.userId//auth middel

    const image=req.file// muler tun yet ahe 

    const upload=await uploadimageCloudinary(image)

    const updateUser=await UserModel.findByIdAndUpdate(userId,{
      avatar:upload.url
    })
    return res.json({
      message:"upload profile",
      success:"true",
      error:"false",
      data:{
        _id:userId,
        avatar:upload.url
      }
    })
    

    
  } catch (error) {
    return res.status(500).json({
      message:error.message||error,
      error:true,
      success:false
    })
    
  }
}
//update user details

export async function updateUserDetails(req,res){
  try {
    const userId=req.userId//auth middleware
    const {name,email,mobile,password}=req.body

    let hashPassword=""

    if(password){
      const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)

    }


    const updateUser=await UserModel.updateOne({_id:userId},{
      ...(name&&{name:name}),
      ...(email&&{email:email}),
      ...(mobile&&{mobile:mobile}),
      ...(password&&{password:hashPassword})
    })

    return res.json({
      message:"update successfully",
      success:true,
      data:updateUser
    })
    
  } catch (error) {
    return res.status(500).json({
      message:error.message||error,
      error:true,
      success:false
    })
    
  }
}

//forgot pass // nanter karu forgot passs cha 
// export async function forgotPasswordController(req,res){
//   try {
//     const {email}=req.body
//     const user=await UserModel.findOne({email})
//     if(!user){
//       return res.json({
//         message:"user not found "
//       })
//     }
    


//   } catch (error) {
//    return res.status(500).json({
//       message:error.message||error,
//       error:true,
//       success:false
    
//   })
// }
// }

//get login user deatil
export async function userDetails(req,res){
  try {
    const userId=req.userId

    const user=await UserModel.findById(userId).select('-password -refresh_token')

    return res.json({
      message:"user details",
      data:user,
      error:false,
      success:true
    })
    
  } catch (error) {
    return res.status(500).json({
      message:"something went wrong ",
      error:true,
      success:false
    })
    
  }
}