import { Slider } from '@prisma/client';
import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const crateSlider = async (payload: Slider) => {
  const isExistProduct = await prisma.product.findUnique({
    where: {
      id: payload.productId,
    },
  });

  if (!isExistProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const result = await prisma.slider.create({
    data: payload,
  });
  return result;
};

const GetAllSlider = async () => {
  const result = await prisma.slider.findMany({});
  return result;
};

const GetSingleSlider = async (id: string) => {
  const isExist = await prisma.slider.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slider not found');
  }

  return isExist;
};

const updateSlider = async (id: string, payload: Partial<Slider>) => {
  const isExist = await prisma.slider.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slider not found');
  }

  const result = await prisma.slider.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const DeleteSlider = async (id: string) => {
  const isExist = await prisma.slider.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slider not found');
  }

  const result = await prisma.slider.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const SliderService = {
  crateSlider,
  GetAllSlider,
  GetSingleSlider,
  updateSlider,
  DeleteSlider,
};
