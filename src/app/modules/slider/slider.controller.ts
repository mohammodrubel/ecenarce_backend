import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// ✅ Create Slider
const createSlider = catchAsync(async (req, res) => {
  const result = {}; // TODO: replace with prisma/DB call

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Slider created successfully",
    data: result,
  });
});

// ✅ Get All Sliders
const getAllSliders = catchAsync(async (req, res) => {
  const result = []; // TODO: replace with prisma/DB call

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Sliders retrieved successfully",
    data: result,
  });
});

// ✅ Get Single Slider
const getSingleSlider = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = {}; // TODO: replace with prisma/DB call using id

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slider retrieved successfully",
    data: result,
  });
});

// ✅ Update Slider
const updateSlider = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = {}; // TODO: replace with prisma/DB update using id + payload

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slider updated successfully",
    data: result,
  });
});

// ✅ Delete Slider
const deleteSlider = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = {}; // TODO: replace with prisma/DB delete using id

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slider deleted successfully",
    data: result,
  });
});

const SliderController = {
  createSlider,
  getAllSliders,
  getSingleSlider,
  updateSlider,
  deleteSlider,
};

export default SliderController;
