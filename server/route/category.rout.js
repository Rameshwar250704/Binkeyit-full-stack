import { Router } from "express";
import auth from "../middelware/auth.js";
import { AddCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controller.js";
const categoryRouter=Router()
categoryRouter.post("/add_category",auth,AddCategoryController)

categoryRouter.get("/get",getCategoryController)
categoryRouter.put("/update",auth,updateCategoryController)
export default categoryRouter

