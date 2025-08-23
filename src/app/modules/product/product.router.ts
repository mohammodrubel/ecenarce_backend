import { NextFunction, Request, Response, Router } from 'express';
import { upload } from '../../utils/handelFile';
import { ProductController } from './product.controller';
const router = Router();
router
  .route('/')
  .post(
    upload.array('files', 3),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    ProductController.createProduct,
  )
  .get(ProductController.getAllProducts);

router
  .route('/:id')
  .get(ProductController.getProduct)
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

export const productRouter = router;
