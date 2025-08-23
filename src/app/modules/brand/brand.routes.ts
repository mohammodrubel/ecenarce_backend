import { Router } from 'express';
import { BrandController } from './brand.controller';

const router = Router();

router
  .route('/')
  .post(BrandController.createBrand)
  .get(BrandController.getAllBrand);

router
  .route('/:id')
  .get(BrandController.getBrand)
  .put(BrandController.updateBrand)
  .delete(BrandController.deleteBrand);

export const brandRouter = router;
