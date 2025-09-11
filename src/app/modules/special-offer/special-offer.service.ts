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
  if (!data.title || !data.categoryId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Title and categoryId are required',
    );
  }

  // Check if category exists
  const category = await prisma.category.findUnique({
    where: { id: data.categoryId, isDeleted: false },
  });
  if (!category) throw new AppError(httpStatus.NOT_FOUND, 'Category not found');

  // Upload image to Cloudinary
  const imageName =
    new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;
  const uploadResult = await sendImageCloudinary(file.buffer, imageName);

  // Prepare date & time
  const now = new Date();
  const offerDate = data.date
    ? new Date(`${data.date}T${data.time || '00:00'}:00`)
    : now; // fallback to current date & time
  const offerTime = data.time || now.toTimeString().split(' ')[0]; // HH:mm:ss

  // Create SpecialOffer
  const result = await prisma.specialOffer.create({
    data: {
      title: data.title,
      description: data.description || null,
      categoryId: data.categoryId,
      image: uploadResult.secure_url,
      date: offerDate,
      time: offerTime,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          icon: true,
        },
      },
    },
  });

  return result;
};

// ✅ Get All
const getAllSpecialOffers = async () => {
  return await prisma.specialOffer.findMany({
    where: {
      category: { isDeleted: false },
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          icon: true,
        },
      },
    },
    // orderBy: { createdAt: 'desc' },
  });
};

// ✅ Get Single
const getSingleSpecialOffer = async (id: string) => {
  const result = await prisma.specialOffer.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          icon: true,
        },
      },
    },
  });

  if (!result)
    throw new AppError(httpStatus.NOT_FOUND, 'Special offer not found');

  return result;
};

// ✅ Edit
const editSpecialOffer = async (
  id: string,
  data: Partial<SpecialOffer>,
  file?: Express.Multer.File,
) => {
  const offer = await prisma.specialOffer.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!offer)
    throw new AppError(httpStatus.NOT_FOUND, 'Special offer not found');

  // Validate category if updated
  if (data.categoryId && data.categoryId !== offer.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId, isDeleted: false },
    });
    if (!category)
      throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  let imageUrl = offer.image;
  if (file) {
    const imageName =
      new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;
    const uploadResult = await sendImageCloudinary(file.buffer, imageName);
    imageUrl = uploadResult.secure_url;
  }

  return await prisma.specialOffer.update({
    where: { id },
    data: {
      ...data,
      image: imageUrl,
      date: data.date || offer.date, // keep old if not updated
      time: data.time || offer.time, // keep old if not updated
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          icon: true,
        },
      },
    },
  });
};

// ✅ Delete
const deleteSpecialOffer = async (id: string) => {
  const result = await prisma.specialOffer.findUnique({ where: { id } });
  if (!result)
    throw new AppError(httpStatus.NOT_FOUND, 'Special offer not found');

  return await prisma.specialOffer.delete({
    where: { id },
    include: {
      category: {
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
