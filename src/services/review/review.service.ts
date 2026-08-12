import prisma from "../../lib/prisma.js";

const createReview = async (data: {
  rating: number;
  comment?: string;
  userId: string;
  productId: string;
}) => {
  return prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      userId: data.userId,
      productId: data.productId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const getAllReviews = async () => {
  return prisma.review.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getReviewById = async (id: string) => {
  return prisma.review.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const updateReview = async (
  id: string,
  data: {
    rating?: number;
    comment?: string;
  }
) => {
  return prisma.review.update({
    where: {
      id,
    },
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const deleteReview = async (id: string) => {
  return prisma.review.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
};

export default {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};