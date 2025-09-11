import { NextFunction, Request, Response, Router } from 'express';

import { SpecialOfferController } from './special-offer.controller';
import { upload } from '../../utils/sendImageToCloudinary';
const router = Router();
router
  .route('/')
  .post(
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    SpecialOfferController.createSpecialOffer,
  )
  .get(SpecialOfferController.getAllSpecialOffers);

router
  .route('/:id')
  .get(SpecialOfferController.getSingleSpecialOffer)
  .put(SpecialOfferController.editSpecialOffer)
  .delete(SpecialOfferController.deleteSpecialOffer);

export const SpecialOfferRouter = router;
