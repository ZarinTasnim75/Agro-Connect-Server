import { Router } from "express";
import categoryController from "../services/category/category.controller.js";

const router = Router();

router.post("/", categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategoryById);

router.patch("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

export default router;