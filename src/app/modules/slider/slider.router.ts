import { NextFunction, Request, Response, Router } from 'express';

import { upload } from '../../utils/sendImageToCloudinary';
import SliderController from './slider.controller';
const router = Router();
router
  .route('/')
  .post(
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    SliderController.createSlider,
  )
  .get(SliderController.getSingleSlider);

router
  .route('/:id')
  .get(SliderController.getSingleSlider)
  .put(SliderController.updateSlider)
  .delete(SliderController.deleteSlider);

export const SpecialOfferRouter = router;
