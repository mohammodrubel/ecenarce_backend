import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SpecialOfferService } from './special-offer.service';
import AppError from '../../errors/AppError';

const crateSpecialOffer = catchAsync(async (req, res, next) => {
   const file = req.file;
   if (!file) {
     throw new AppError(httpStatus.CONFLICT, 'special-offer image is required');
   }

  const result = SpecialOfferService.crateSpecialOffer(file, req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Special offer created successfully',
    data: result,
  });
});

const getAllSpecialOffers = catchAsync(async (req, res, next) => {
  const result = SpecialOfferService.getAllSpecialOffers()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Special offers retrieved successfully',
    data: result,
  });
});

const getSingleSpecialOffer = catchAsync(async (req, res, next) => {
  const result = SpecialOfferService.getAllSpecialOffers()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Special offer retrieved successfully',
    data: result,
  });
});

const editSpecialOffer = catchAsync(async (req, res, next) => {
  const result = SpecialOfferService.editSpecialOffer(req.params.id,req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Special offer updated successfully',
    data: result,
  });
});

const deleteSpecialOffer = catchAsync(async (req, res, next) => {
  const result = SpecialOfferService.deleteSpecialOffer(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Special offer deleted successfully',
    data: result,
  });
});

export const SpecialOfferController = {
  crateSpecialOffer,
  getAllSpecialOffers,
  getSingleSpecialOffer,
  editSpecialOffer,
  deleteSpecialOffer,
};
