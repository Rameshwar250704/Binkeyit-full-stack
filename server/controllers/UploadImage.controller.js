
import uploadimageCloudinary from "../utils/uploadimageCloudinary.js"

const UploadImageController=async(req,res)=>{
    try {
        const file=req.file
        const uploadImage=await uploadimageCloudinary(file)//
        return res.json({
            message:"upload done",
            error:false,
            success:true,
            data:uploadImage
        })
        
    } catch (error) { 
        return res.json({
            message:error.message||error,
            error:true,
            success:false
        })
        
    }
}

export default UploadImageController