import { Router } from "express";
import auth from "../middelware/auth.js";
import UploadImageController from "../controllers/UploadImage.controller.js";
import upload from "../middelware/multer.js";
const uploadRouter=Router()

uploadRouter.post("/upload",auth,upload.single("image"),UploadImageController)


export default uploadRouter