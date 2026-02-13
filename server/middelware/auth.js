import jwt from "jsonwebtoken"
const auth=async (req,res,next)=>{
    try {
        const token=req.cookies.accessToken || req?.header?.authorization?.split(" ")[1] /// ["Bearer" ,"token"]
       
        if(!token){
            return res.status(401).json({
                message:"you are not login"
            })
        }
        const decode= await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return res.status(401).json({
                message:"unotherize access",
                error:true,
                success:false
            })
        }
        req.userId=decode.id
        next()
        console.log("decode",decode)
    } catch (error) {
        return res.status(500).json({
            message:"you are not login",
            error:true,
            success:false
        })
        
    }

}
export default auth 