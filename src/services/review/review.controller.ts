import type { Request, Response } from "express";
import reviewService from "./review.service.js";

const createReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment, userId, productId } = req.body;

    if (
      rating === undefined ||
      !userId ||
      !productId
    ) {
      return res.status(400).json({
        success: false,
        message: "rating, userId and productId are required",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    const review = await reviewService.createReview({
      rating: numericRating,
      comment,
      userId,
      productId,
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create review";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

const getAllReviews = async (
  _req: Request,
  res: Response
) => {
  try {
    const reviews = await reviewService.getAllReviews();

    return res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve reviews",
    });
  }
};

const getReviewById = async (
  req: Request,
  res: Response
) => {
  try {
    const review = await reviewService.getReviewById(
      String(req.params.id)
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      data: review,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve review",
    });
  }
};

const updateReview = async (
  req: Request,
  res: Response
) => {
  try {
    const { rating, comment } = req.body;

    const data: {
      rating?: number;
      comment?: string;
    } = {};

    if (rating !== undefined) {
      const numericRating = Number(rating);

      if (
        !Number.isInteger(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message: "Rating must be an integer between 1 and 5",
        });
      }

      data.rating = numericRating;
    }

    if (comment !== undefined) {
      data.comment = comment;
    }

    const review = await reviewService.updateReview(
      String(req.params.id),
      data
    );

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update review";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

const deleteReview = async (
  req: Request,
  res: Response
) => {
  try {
    await reviewService.deleteReview(
      String(req.params.id)
    );

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};

export default {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};