import { SpecialOffer } from "@prisma/client";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { sendImageCloudinary } from "../../utils/sendImageToCloudinary";
import prisma from "../../utils/prisma";

const createSpecialOffer = async (file: Express.Multer.File, data: SpecialOffer) => {
  if (!file) throw new AppError(httpStatus.CONFLICT, "Image is required");

  const imageName = new Date().toTimeString().replace(/:/g, "-") + "-" + file.originalname;
  const uploadResult = await sendImageCloudinary(file.buffer, imageName);

  const result = await prisma.specialOffer.create({
    data: {
      ...data,
      image: uploadResult.secure_url,
    },
  });

  return result;
};

const getAllSpecialOffers = async () => {
  return await prisma.specialOffer.findMany();
};

const getSingleSpecialOffer = async (id: string) => {
  const result = await prisma.specialOffer.findUnique({ where: { id } });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "This Special offer is not found");
  return result;
};

const editSpecialOffer = async (id: string, data: Partial<SpecialOffer>, file?: Express.Multer.File) => {
  const offer = await prisma.specialOffer.findUnique({ where: { id } });
  if (!offer) throw new AppError(httpStatus.NOT_FOUND, "This Special offer is not found");

  let imageUrl = offer.image;
  if (file) {
    const imageName = new Date().toTimeString().replace(/:/g, "-") + "-" + file.originalname;
    const uploadResult = await sendImageCloudinary(file.buffer, imageName);
    imageUrl = uploadResult.secure_url;
  }

  return await prisma.specialOffer.update({
    where: { id },
    data: {
      ...data,
      image: imageUrl,
    },
  });
};

const deleteSpecialOffer = async (id: string) => {
  const result = await prisma.specialOffer.findUnique({ where: { id } });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "This Special offer is not found");

  return await prisma.specialOffer.delete({ where: { id } });
};

export const SpecialOfferService = {
  createSpecialOffer,
  getAllSpecialOffers,
  getSingleSpecialOffer,
  editSpecialOffer,
  deleteSpecialOffer,
};
