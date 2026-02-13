import {Router} from "express"
import auth from "../middelware/auth.js"
import { createProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct } from "../controllers/product.controller.js"

const productRouter=Router()

productRouter.post("/create",auth,createProductController)
productRouter.post("/get",getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post("/get-product-by-category-and-subcategory",getProductByCategoryAndSubCategory)
productRouter.post("/get-product-details",getProductDetails)
//seaech 
productRouter.post("/search-product",searchProduct)
export default productRouter