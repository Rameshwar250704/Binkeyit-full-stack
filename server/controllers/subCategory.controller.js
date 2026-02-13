import subCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController=async (request,response)=>{
    try {
        const {name,image,category}=request.body
        if(!name &&!image && !category[0]){
            return response.status(400).json({
                message:"provide name image and category",
                success:false,
                error:true
            })
        }

        const payload={
            name,
            image,
            category
        }

        const createSubCategory=new subCategoryModel(payload)
        const save=await createSubCategory.save()

        return response.json({
            message:"sub category was created",
            success:true,
            error:false,
            data:save
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
        
    }
}

export const getSubCategoryController = async (request, response) => {
  try {
    const data = await subCategoryModel
      .find()
      .populate("category", "name")   // ✅ IMPORTANT FIX
      .sort({ createdAt: -1 })

    return response.json({
      message: "sub category data",
      data: data,
      error: false,
      success: true
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}


//he pahila ahe yata chat cgp karun varcha ghetla ahe 
// export const getSubCategoryController=async(request,response)=>{
//     try {
//         const data=await subCategoryModel.find().sort({createdAt:-1})
//         return response.json({
//             message:"sub category data",
//             data:data,
//             error:false,
//             success:true
//         })
//     } catch (error) {
//         return response.status(500).json({
//             message:error.message||error,
//             error:true,
//             success:false
//         })
        
//     }
// }