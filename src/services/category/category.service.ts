import prisma from "../../lib/prisma.js";

const createCategory = async (
  name: string,
  description?: string
) => {
  return prisma.category.create({
    data: {
      name,
      description,
    },
  });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getCategoryById = async (id: string) => {
  return prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });
};

const updateCategory = async (
  id: string,
  name: string,
  description?: string
) => {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  });
};

const deleteCategory = async (id: string) => {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};