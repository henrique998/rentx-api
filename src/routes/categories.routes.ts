import { Router } from "express";
import multer from "multer"

import { CreateCategoryController } from "../modules/category/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/category/ImportCategory/ImportCategoryController";

const categoryRoute = Router();

const upload = multer({
    dest: "./uploads"
})

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

categoryRoute.post("/", createCategoryController.handle);
categoryRoute.post("/import", upload.single("file"), importCategoryController.handle)

export { categoryRoute as categoriesRoutes };
