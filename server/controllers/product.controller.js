// import ProductModel from "../models/product.model.js"
// export const createProductController=async(request,response)=>{
 
//     try {
//         const {name,
//     image,
//     category,
//     subCategory,
//     unit,
//     stock,
//     price,
//     discount,
//     description,
//     more_details,}=request.body

//     if(!name  ||!image ||!category[0]||!subCategory[0]||!unit||!price||!description){
//         return response.status(400).json({
//             message:"enter required fields",
//             error:true,
//             success:false
//         })
//     }

//     const product =new ProductModel({
//     name,
//     image,
//     category,
//     subCategory,
//      unit: Number(unit),
//       stock: Number(stock),
//       price: Number(price),
//       discount: Number(discount),
//     description,
//     more_details

//     })
//     const saveProduct=await ProductModel.save()

//     return response.json({
//         message:"product created succesfully",
//         error:false,
//         success:true
//     })
        
//     } catch (error) {
//         return response.status(500).json({
//             message:error.message || error,
//             success:false,
//             error:true

//         })
        
//     }

// }
import ProductModel from "../models/product.model.js"

export const createProductController = async (request, response) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = request.body

    // ✅ Proper validation
    if (
      !name ||
      !image?.length ||
      !category?.length ||
      !subCategory?.length ||
      !unit ||
      !price ||
      !description
    ) {
      return response.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      })
    }

    const product = new ProductModel({
      name,
      image,
      category,        // must be array of ObjectIds
      subCategory,     // must be array of ObjectIds
      unit,
      stock: Number(stock),
      price: Number(price),
      discount: Number(discount),
      description,
      more_details,
    })

    // ✅ Correct save
    const savedProduct = await product.save()

    return response.status(201).json({
      message: "Product created successfully",
      data: savedProduct,
      error: false,
      success: true,
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    })
  }
}


export const getProductController=async(request,response)=>{
  try {
    let {page,limit,search}=request.body

    //product
    //total number of product 
    if(!page){
      page=1
    }
    if(!limit){
      limit=10
    }
    const query=search?{

      $text:{
        $search:search
      }
    }:{}
    const skip=(page-1)*limit
    const [data,totalCount]=await Promise.all([
      ProductModel.find(query).sort({createdAt:-1}).skip(skip).limit(limit),
      ProductModel.countDocuments(query)
    ])

    return response.json({
      message:"product data",
      error:false,
      success:true,
      totalCount:totalCount,
      totalNoPage:Math.ceil(totalCount/limit),
      data:data

    })
    
  } catch (error) {
    return response.status(500).json({
      message:error.message || error,
      error:true,
      success:false
    })
    
  }
}
export const getProductByCategory = async (request, response) => {
  try {
    const { id } = request.query   // ✅ FIX

    if (!id) {
      return response.status(400).json({
        message: "provide category id",
        error: true,
        success: false
      })
    }

    const product = await ProductModel.find({
      category: { $in: [id] }      // ✅ must be array
    }).limit(20)

    return response.json({
      message: "category product list",
      data: product,
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

export const getProductByCategoryAndSubCategory =async (request,response)=>{
  try {
    const {categoryId,subCategoryId,page=1,limit=10}=request.body
    if(!categoryId || !subCategoryId){
       return response.status(400).json({
      message:"provide categoryId and subCategoryId",
      error: true,
      success: false
    })

    }
    
    const query={
      category:{$in:[categoryId]},
      subCategory:{$in:[subCategoryId]}
    }
    const skip=(page-1)*limit

    const [data,dataCount]= await Promise.all([

      ProductModel.find(query).sort({createdAt:-1}).skip(skip).limit(limit),
      ProductModel.countDocuments(query)
    ])
    return response.json({
      message:"product list",
      data:data,
      totalCount:dataCount,
      page:page,
      limit:limit,
      success:true,
      error:false

    })
    
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })

    
  }
}

export const getProductDetails=async (request,response)=>{

  try {
    const {productId}=request.body
    const product =await ProductModel.findOne({_id:productId})

    return response.json({
      message:"product details",
      data:product,
      error:false,
      success:true
    })
    
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
    
  }
}
  
export const searchProduct=async(request,response)=>{
  try {
     let {search, page, limit}=request.body
     if(!page){
      page=1

     }
     if(!limit){
      limit=12

     }

     const query=search ? {
      $text:{
      $search:search
      }

     }:{}

     const skip=(page-1)*limit
     const [data,dataCount]=await Promise.all([
       ProductModel.find(query).sort({createdAt:-1}).skip(skip).limit(limit).populate("category subCategory"),
      ProductModel.countDocuments(query)
     ])

     return response.json({
      message:"product data",
      success:true,
      error:false,
      data:data,
      totalCount:dataCount,
      totalPage:Math.ceil(dataCount/limit),
      page:page,
      limit:limit
     })
     


    
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}