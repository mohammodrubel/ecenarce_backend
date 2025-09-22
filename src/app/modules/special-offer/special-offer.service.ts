import { SpecialOffer } from '@prisma/client';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { sendImageCloudinary } from '../../utils/sendImageToCloudinary';
import prisma from '../../utils/prisma';

// ✅ Create Special Offer
const createSpecialOffer = async (
  file: Express.Multer.File,
  data: Partial<SpecialOffer>,
) => {
  if (!file) throw new AppError(httpStatus.CONFLICT, 'Image is required');

  // Validate required fields
  if (!data.title || !data.productId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Title and ProductID are required',
    );
  }

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: data.productId, isDeleted: false },
  });
  if (!product) throw new AppError(httpStatus.NOT_FOUND, 'Product not found');

  // Upload image to Cloudinary
  const imageName =file.originalname;
  const uploadResult = await sendImageCloudinary(file.buffer, imageName);

  // Prepare dates
  const validFrom = data.validFrom ? new Date(data.validFrom) : new Date();
  const validUntil = data.validUntil ? new Date(data.validUntil) : null;

  // Create SpecialOffer
  const result = await prisma.specialOffer.create({
    data: {
      title: data.title,
      description: data.description || null,
      productId: data.productId,
      image: uploadResult.secure_url,
      validFrom,
      validUntil,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          images: true,
        },
      },
    },
  });

  return result;
};

// ✅ Get All Special Offers
const getAllSpecialOffers = async () => {
  return await prisma.specialOffer.findMany({
    include: {
      product: {
        select: {
          id: true,
          name: true,
          images: true,
          stock: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

// ✅ Get Single Special Offer
const getSingleSpecialOffer = async (id: string) => {
  const result = await prisma.specialOffer.findUnique({
    where: { id },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          images: true,
          stock:true,
        },
      },
    },
  });

  if (!result)
    throw new AppError(httpStatus.NOT_FOUND, 'Special offer not found');

  return result;
};

// ✅ Edit Special Offer
const editSpecialOffer = async (
  id: string,
  data: Partial<SpecialOffer>,
  file?: Express.Multer.File,
) => {
  const offer = await prisma.specialOffer.findUnique({
    where: { id },
    include: { product: true },
  });

  if (!offer)
    throw new AppError(httpStatus.NOT_FOUND, 'Special offer not found');

  // Validate product if updated
  if (data.productId && data.productId !== offer.productId) {
    const product = await prisma.product.findUnique({
      where: { id: data.productId, isDeleted: false },
    });
    if (!product) throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // Upload new image if provided
  let imageUrl = offer.image;
  if (file) {
    const imageName =
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
    const uploadResult = await sendImageCloudinary(file.buffer, imageName);
    imageUrl = uploadResult.secure_url;
  }

  // Update SpecialOffer
  const updatedOffer = await prisma.specialOffer.update({
    where: { id },
    data: {
      ...data,
      image: imageUrl,
      validFrom: data.validFrom ? new Date(data.validFrom) : offer.validFrom,
      validUntil: data.validUntil
        ? new Date(data.validUntil)
        : offer.validUntil,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          images: true,
        },
      },
    },
  });

  return updatedOffer;
};

// ✅ Delete Special Offer
const deleteSpecialOffer = async (id: string) => {
  const offer = await prisma.specialOffer.findUnique({ where: { id } });
  if (!offer)
    throw new AppError(httpStatus.NOT_FOUND, 'Special offer not found');

  return await prisma.specialOffer.delete({
    where: { id },
    include: {
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const SpecialOfferService = {
  createSpecialOffer,
  getAllSpecialOffers,
  getSingleSpecialOffer,
  editSpecialOffer,
  deleteSpecialOffer,
};
