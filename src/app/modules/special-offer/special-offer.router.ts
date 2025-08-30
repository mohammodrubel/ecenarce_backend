import { NextFunction, Request, Response, Router } from 'express';

import { SpecialOfferController } from './special-offer.controller';
const router = Router();
router
  .route('/')
  .post(SpecialOfferController.crateSpecialOffer)
  .get(SpecialOfferController.getAllSpecialOffers);

router
  .route('/:id')
  .get(SpecialOfferController.getSingleSpecialOffer)
  .put(SpecialOfferController.editSpecialOffer)
  .delete(SpecialOfferController.deleteSpecialOffer);

export const SpecialOfferRouter = router;
