import {Router} from 'express'
import { loginController, logoutController, registerUserController, updateUserDetails, uploadAvatar, userDetails, verifyEmailController } from '../controllers/user.controller.js'
import auth from '../middelware/auth.js' 
import upload from '../middelware/multer.js'

const userRouter=Router()

userRouter.post('/register',registerUserController)
userRouter.post('/login',loginController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/logout',auth,logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
userRouter.put('/update-user',auth,updateUserDetails)
userRouter.get('/userDetails',auth,userDetails)
export default userRouter