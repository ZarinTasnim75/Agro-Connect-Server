import { Router } from "express";
import reviewController from "../services/review/review.controller.js";

const router = Router();

router.post("/", reviewController.createReview);

router.get("/", reviewController.getAllReviews);

router.get("/:id", reviewController.getReviewById);

router.patch("/:id", reviewController.updateReview);

router.delete("/:id", reviewController.deleteReview);

export default router;