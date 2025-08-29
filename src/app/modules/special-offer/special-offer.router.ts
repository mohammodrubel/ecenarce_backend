import { NextFunction, Request, Response, Router } from 'express';
import { upload } from '../../utils/sendImageToCloudinary';
import { CategoryController } from '../category/category.controller';
const router = Router();
router
  .route('/')
  .post(
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    CategoryController.createCategory,
  )
  .get(CategoryController.getCategories);

router
  .route('/:id')
  .get(CategoryController.getCategory)
  .put(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

export const categoryRouter = router;
