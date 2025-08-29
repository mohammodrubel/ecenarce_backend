import { SpecialOffer } from '@prisma/client';
import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { sendImageCloudinary } from '../../utils/sendImageToCloudinary';

// Create Special Offer
const createSpecialOffer = async (
  file: Express.Multer.File | undefined,
  data: any,
) => {
  if (!file) {
    throw new AppError(httpStatus.CONFLICT, 'Image is required');
  }

  const imageName =
    new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;
  const uploadResult: any = await sendImageCloudinary(file.buffer, imageName);

  const result = await prisma.specialOffer.create({
    data: {
      ...data,
      image: uploadResult.secure_url,
    },
  });

  return result;
};

// Get All Special Offers
const getSpecialOffers = async () => {
  const result = await prisma.specialOffer.findMany({});
  return result;
};

// Get Single Special Offer by ID
const getSpecialOffer = async (id: string) => {
  const findOffer = await prisma.specialOffer.findUnique({ where: { id } });
  if (!findOffer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Special Offer not found');
  }
  return findOffer;
};

// Update Special Offer
const updateSpecialOffer = async (
  id: string,
  updateData: Partial<SpecialOffer>,
) => {
  const findOffer = await prisma.specialOffer.findUnique({ where: { id } });
  if (!findOffer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Special Offer not found');
  }

  const result = await prisma.specialOffer.update({
    where: { id },
    data: {
      ...updateData,
    },
  });

  return result;
};



export const SpecialOfferService = {
  createSpecialOffer,
  getSpecialOffers,
  getSpecialOffer,
  updateSpecialOffer,
};
