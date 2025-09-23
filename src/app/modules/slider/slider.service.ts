import { Slider } from '@prisma/client';
import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// Create slider
const createSlider = async (
  payload: Omit<Slider, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  if (!payload.productId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product ID is required');
  }

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: payload.productId },
  });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // Check if slider for this product already exists
  const existingSlider = await prisma.slider.findUnique({
    where: { productId: payload.productId },
  });

  if (existingSlider) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Slider for this product already exists',
    );
  }

  // Create slider
  return prisma.slider.create({ data: payload });
};

// Get all sliders (include product details)
const getAllSliders = async () => {
  return prisma.slider.findMany({
    include: { product: true },
  });
};

// Get single slider by id
const getSingleSlider = async (id: string) => {
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slider ID is required');
  }

  const slider = await prisma.slider.findUnique({
    where: { id },
    include: { product: true },
  });

  if (!slider) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slider not found');
  }

  return slider;
};

// Update slider
const updateSlider = async (id: string, payload: Partial<Slider>) => {
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slider ID is required');
  }

  const slider = await prisma.slider.findUnique({ where: { id } });
  if (!slider) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slider not found');
  }

  return prisma.slider.update({ where: { id }, data: payload });
};

// Delete slider
const deleteSlider = async (id: string) => {
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slider ID is required');
  }

  const slider = await prisma.slider.findUnique({ where: { id } });
  if (!slider) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slider not found');
  }

  return prisma.slider.delete({ where: { id } });
};

export const SliderService = {
  createSlider,
  getAllSliders,
  getSingleSlider,
  updateSlider,
  deleteSlider,
};
