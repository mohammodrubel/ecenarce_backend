// productService.ts

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { sendImageCloudinary } from '../../utils/sendImageToCloudinary';
import { Prisma, Product } from '@prisma/client';
import { productSearchFields } from './productContains';
import calculatePagination from '../../utils/pagination';
import { ApiResponse } from './product.interface';

export const createProduct = async (
  data: Product,
  files?: Express.Multer.File[],
) => {
  // Validate images
  if (!files || files.length === 0) {
    throw new AppError(httpStatus.CONFLICT, 'At least one image is required');
  }

  if (files.length > 3) {
    throw new AppError(httpStatus.CONFLICT, 'Maximum 3 images are allowed');
  }

  // Validate category
  const isCategoryExist = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });

  if (!isCategoryExist) {
    throw new AppError(httpStatus.CONFLICT, 'Invalid category Id');
  }

  // Validate brand
  const isBrandExist = await prisma.brand.findUnique({
    where: { id: data.brandId },
  });

  if (!isBrandExist) {
    throw new AppError(httpStatus.CONFLICT, 'Invalid Brand Id');
  }

  // Upload images to Cloudinary
  const imageUrls: string[] = [];
  for (const file of files) {
    const imageName = `${new Date().toTimeString().replace(/:/g, '-')}-${file.originalname}`;
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
  const reuslt = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return reuslt;
};

// const getAllProducts = async (query: any, options: any) => {
//   const { limit, page, order, sort } = calculatePagination(options);
//   const { searchTerm, ...filterData } = query;

//   const andConditions: Prisma.ProductWhereInput[] = [];

//   // SearchTerm condition
//   if (searchTerm) {
//     andConditions.push({
//       OR: productSearchFields.map((field) => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   // Exact match filters
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => ({
//         [key]: {
//           equals: filterData[key],
//         },
//       })),
//     });
//   }

//   const whereCondition: Prisma.ProductWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.product.findMany({
//     where: whereCondition,
//     skip: (Number(page) - 1) * Number(limit),
//     take: Number(limit),
//     orderBy:
//       options.sort && options.order
//         ? {
//             [options.order]: sort || 'createdAt',
//           }
//         : { createdAt: 'desc' },
//     include: {
//       category: true,
//       brand: true,
//     },
//   });
//   const total = await prisma.product.count({
//     where: whereCondition,
//   });
// console.log(total) // i got vlaue 
//  return {
//    meta: {
//      page: Number(page),
//      limit: Number(limit),
//      total, // i dindet get vlue
//    },
//    data: result,
//  };
// };
const getAllProducts = async (query: any, options: any) => {
  const { limit, page, order, sort } = calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, ...filterData } = query; // Added minPrice, maxPrice

  const andConditions: Prisma.ProductWhereInput[] = [];

  // SearchTerm condition
  if (searchTerm) {
    andConditions.push({
      OR: productSearchFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Price range filter - ONLY ADDITION
  if (minPrice || maxPrice) {
    const priceFilter: any = {};
    if (minPrice) priceFilter.gte = Number(minPrice);
    if (maxPrice) priceFilter.lte = Number(maxPrice);
    andConditions.push({
      price: priceFilter,
    });
  }

  // Exact match filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    where: whereCondition,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy:
      options.sort && options.order
        ? {
            [options.order]: sort || 'createdAt',
          }
        : { createdAt: 'desc' },
    include: {
      category: true,
      brand: true,
    },
  });
  const total = await prisma.product.count({
    where: whereCondition,
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total, // i dindet get vlue
    },
    data: result,
  };
};
const updateProduct = async (id: string, data: any) => {
  // Update product by id in database
  return { message: 'Product updated', id, data };
};

const deleteProduct = async (id: string) => {
  const isExistProduct = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      isDeleted: true,
    },
  });
  if (!isExistProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'this product is not found');
  }
};

export const ProductService = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
