"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: 'dcijrliws',
    api_key: '381723299955348',
    api_secret: 'UpYvwvLZH2xthek7Me9-Xuh7Jqk'
});
const sendImageToCloudinary = (path, imageName) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, {
            public_id: imageName
        }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
            fs_1.default.unlink(path, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    console.log('file is deleted');
                }
            });
        });
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
// multer 
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
