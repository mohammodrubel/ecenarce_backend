import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const crateSpecialOffer = catchAsync(async (req, res, next) => {
  const result = ''; // service logic will go here
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Special offer created successfully',
    data: result,
  });
});

const getAllSpecialOffers = catchAsync(async (req, res, next) => {
  const result = ''; // service logic will go here
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Special offers retrieved successfully',
    data: result,
  });
});

const getSingleSpecialOffer = catchAsync(async (req, res, next) => {
  const result = ''; // service logic will go here
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Special offer retrieved successfully',
    data: result,
  });
});

const editSpecialOffer = catchAsync(async (req, res, next) => {
  const result = ''; // service logic will go here
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Special offer updated successfully',
    data: result,
  });
});

const deleteSpecialOffer = catchAsync(async (req, res, next) => {
  const result = ''; // service logic will go here
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
