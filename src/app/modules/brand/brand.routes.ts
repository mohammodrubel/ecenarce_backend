import router from '../../routes';
import { CategoryController } from './category.controller';

// Create a new category
router
  .route('/')
  .post(CategoryController.createCategory)
  .get(CategoryController.getCategories); // Get all categories

// Get, Update, Delete a single category by ID
router
  .route('/:id')
  .get(CategoryController.getCategory)
  .put(CategoryController.updateCategory) // Update category
  .delete(CategoryController.deleteCategory); // Delete category

export const categoryRouter = router;
