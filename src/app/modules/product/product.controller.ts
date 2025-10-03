import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';
import pick from '../../utils/PickFunction';

// Create a new product
const createProduct = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[] | undefined;
  const result = await ProductService.createProduct(req.body, files);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'New product created successfully',
    data: result,
  });
});

// Get a product by ID
const getProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getProduct(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product fetched successfully',
    data: result,
  });
});

// Get all products
const getAllProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'subcategory', 'searchTerm']);
  const result = await ProductService.getAllProducts(filter);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All products fetched successfully',
    data: result,
  });
});

// Update a product by ID
const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductService.updateProduct(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

// Delete a product by ID
const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProduct(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
