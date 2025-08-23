import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { brandService } from './brand.service';

const createBrand = catchAsync(async (req, res) => {
  const result = await brandService.createBrand(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Brand created successfully',
    data: result,
  });
});


const getAllBrand = catchAsync(async (req, res) => {
  const result = await brandService.getAllBrand();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brands fetched successfully',
    data: result,
  });
});


const getBrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await brandService.getBrand(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand fetched successfully',
    data: result,
  });
});


const updateBrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await brandService.updateBrand(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand updated successfully',
    data: result,
  });
});


const deleteBrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await brandService.deleteBrand(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand deleted successfully',
    data: result,
  });
});

export const BrandController = {
  createBrand,
  getAllBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};
