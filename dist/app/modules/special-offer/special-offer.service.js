"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialOfferService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
// Create Special Offer
const createSpecialOffer = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Image is required');
    }
    const imageName = new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;
    const uploadResult = yield (0, sendImageToCloudinary_1.sendImageCloudinary)(file.buffer, imageName);
    const result = yield prisma_1.default.specialOffer.create({
        data: Object.assign(Object.assign({}, data), { image: uploadResult.secure_url }),
    });
    return result;
});
// Get All Special Offers
const getSpecialOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.specialOffer.findMany({});
    return result;
});
// Get Single Special Offer by ID
const getSpecialOffer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findOffer = yield prisma_1.default.specialOffer.findUnique({ where: { id } });
    if (!findOffer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Special Offer not found');
    }
    return findOffer;
});
// Update Special Offer
const updateSpecialOffer = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const findOffer = yield prisma_1.default.specialOffer.findUnique({ where: { id } });
    if (!findOffer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Special Offer not found');
    }
    const result = yield prisma_1.default.specialOffer.update({
        where: { id },
        data: Object.assign({}, updateData),
    });
    return result;
});
exports.SpecialOfferService = {
    createSpecialOffer,
    getSpecialOffers,
    getSpecialOffer,
    updateSpecialOffer,
};
