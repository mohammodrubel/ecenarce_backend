import { SpecialOffer } from "@prisma/client";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { sendImageCloudinary } from "../../utils/sendImageToCloudinary";
import prisma from "../../utils/prisma";

const crateSpecialOffer = async (file: Express.Multer.File,  data:SpecialOffer) => {
    if (!file) throw new AppError(httpStatus.CONFLICT, 'Image is required');
    const imageName = new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;

    const uploadResult: any = await sendImageCloudinary(file.buffer, imageName);

    
    const result = await prisma.specialOffer.create({
      data: {
        ...data,
        image: uploadResult.secure_url,
      },
    });

    return result;
};

const getAllSpecialOffers = async () => {};

const getSingleSpecialOffer = async (id: string) => {};

const editSpecialOffer = async (id: string) => {};

const deleteSpecialOffer = async (id: string) => {};

export const SpecialOfferService = {
  crateSpecialOffer,
  getAllSpecialOffers,
  getSingleSpecialOffer,
  editSpecialOffer,
  deleteSpecialOffer,
};
