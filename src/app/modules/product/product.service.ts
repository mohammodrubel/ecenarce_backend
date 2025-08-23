// productService.ts

import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import prisma from "../../utils/prisma";

// Dummy async functions for CRUD operations

export const createProduct = async (
  data: any,
  files?: Express.Multer.File[],
) => {
  if (!files || files.length === 0) {
    throw new AppError(httpStatus.CONFLICT, 'At least one image is required');
  }

  if (files.length > 3) {
    throw new AppError(httpStatus.CONFLICT, 'Maximum 3 images are allowed');
  }

  // Upload images to Cloudinary
  const imageUrls: string[] = [];
  for (const file of files) {
    const imageName =
      new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;
    const uploadResult: any = await sendImageToCloudinary(file, imageName);
    imageUrls.push(uploadResult.secure_url);
  }

  // Save product with image URLs
  const result = await prisma.product.create({
    data: {
      ...data,
      images: imageUrls, 
    },
  });

  return result;
};
const getProduct = async (id: string) => {
  // Fetch product by id from database
  return { message: 'Product fetched', id };
};

const getAllProducts = async () => {
  // Fetch all products from database
  return { message: 'All products fetched' };
};

const updateProduct = async (id: string, data: any) => {
  // Update product by id in database
  return { message: 'Product updated', id, data };
};

const deleteProduct = async (id: string) => {
  // Delete product by id from database
  return { message: 'Product deleted', id };
};

export const ProductService = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
