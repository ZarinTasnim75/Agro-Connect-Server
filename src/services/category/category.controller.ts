import type { Request, Response } from "express";
import categoryService from "./category.service.js";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await categoryService.createCategory(
      name,
      description
    );

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create category";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

const getAllCategories = async (
  _req: Request,
  res: Response
) => {
  try {
    const categories =
      await categoryService.getAllCategories();

    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
    });
  }
};

const getCategoryById = async (
  req: Request,
  res: Response
) => {
  try {
    const category =
  await categoryService.getCategoryById(
    String(req.params.id)
  );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve category",
    });
  }
};

const updateCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category =
      await categoryService.updateCategory(
        String(req.params.id),
        name,
        description
      );

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {
    await categoryService.deleteCategory(
  String(req.params.id)
);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};