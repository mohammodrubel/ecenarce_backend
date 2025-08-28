// productService.ts

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { sendImageCloudinary } from '../../utils/sendImageToCloudinary';

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

    // ✅ send buffer, not file object
    const uploadResult: any = await sendImageCloudinary(file.buffer, imageName);

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
  const result = await prisma.product.findMany({
    include: {
      category: true,
      brand: true,
    },
  });
  return result;
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
