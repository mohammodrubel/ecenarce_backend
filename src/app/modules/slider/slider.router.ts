import { NextFunction, Request, Response, Router } from 'express';

import { upload } from '../../utils/sendImageToCloudinary';
import SliderController from './slider.controller';
const router = Router();
router
  .route('/')
  .post(SliderController.createSlider)
  .get(SliderController.getSingleSlider);

router
  .route('/:id')
  .get(SliderController.getSingleSlider)
  .put(SliderController.updateSlider)
  .delete(SliderController.deleteSlider);

export const SliderRouter = router;
