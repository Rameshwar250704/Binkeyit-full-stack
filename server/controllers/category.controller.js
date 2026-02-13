import CategoryModel from '../models/category.model.js'

export const AddCategoryController=async (req,res)=>{
    try {
        const{name,image}=req.body

        if(!name ||!image){
            return res.status(400).json({
                message:"enter required fills",
                error:true,
                success:false
            })
        }

        const addCategory=new CategoryModel({
            name,
            image
        })

        const saveCategory=await addCategory.save()
        if(!saveCategory){
            return res.ststus(500).json({ 
                message:"no categiry cated",
                error:true,
                success:false
            })
        }

        return res.json({
            message:"category add sucessfully",
            data:saveCategory,
            error:false,
            success:true
        })
        
    } catch (error) {
        return res.ststus(500).json({
            message:error.message,
            error:true,
            success:false 
        })
        
    }
}

export const getCategoryController=async(req,res)=>{
    try {
        const data=await CategoryModel.find()
        return res.json({
            data:data,
            error:false,
            success:true
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
        
    }
}
export const updateCategoryController=async(req,res)=>{
    try {
        const {categoryId,name,image}=req.body

        const update=await  CategoryModel.updateOne({
            _id:categoryId
        },{
            name,
            image
        })
        return Response.json({
            message:"updated Category",
            success:true,
            error:false,
            data:update
        })
        
    } catch (error) {
        return res,ststus(500).json({
            message:error.message || error,
            success:false,
            error:true,
        })
        
    }
}