import { Slider } from '@prisma/client';

const crateSlider = async (payload: Slider) => {};
const GetAllSlider = async () => {};
const GetSingleSlider = async (id: string) => {};
const updateSlider = async (id: string, payload: Partial<Slider>) => {};
const DeleteSlider = async (id: string) => {};

export const SliderService = {
  crateSlider,
  GetAllSlider,
  GetSingleSlider,
  updateSlider,
  DeleteSlider,
};
