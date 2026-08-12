import prisma from "../../lib/prisma.js";

const createProduct = async (data: {
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  image?: string;
  farmerId: string;
  categoryId: string;
}) => {
  return prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      unit: data.unit,
      image: data.image,
      farmerId: data.farmerId,
      categoryId: data.categoryId,
    },
    include: {
      farmer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: true,
    },
  });
};

const getAllProducts = async () => {
  return prisma.product.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      farmer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getProductById = async (id: string) => {
  return prisma.product.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      farmer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: true,
    },
  });
};

const updateProduct = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    unit?: string;
    image?: string;
    categoryId?: string;
  }
) => {
  return prisma.product.update({
    where: {
      id,
    },
    data,
    include: {
      farmer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: true,
    },
  });
};

const deleteProduct = async (id: string) => {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};