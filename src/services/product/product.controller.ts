import type { Request, Response } from "express";
import productService from "./product.service.js";

const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      unit,
      image,
      farmerId,
      categoryId,
    } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      quantity === undefined ||
      !unit ||
      !farmerId ||
      !categoryId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, description, price, quantity, unit, farmerId and categoryId are required",
      });
    }

    const product = await productService.createProduct({
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      unit,
      image,
      farmerId,
      categoryId,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create product";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(
      String(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      unit,
      image,
      categoryId,
    } = req.body;

    const product = await productService.updateProduct(
      String(req.params.id),
      {
        name,
        description,
        price:
          price !== undefined ? Number(price) : undefined,
        quantity:
          quantity !== undefined
            ? Number(quantity)
            : undefined,
        unit,
        image,
        categoryId,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update product";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(
      String(req.params.id)
    );

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};