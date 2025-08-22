import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';

// Cloudinary config
cloudinary.config({
  cloud_name: 'de2ysphks',
  api_key: '426748166613985',
  api_secret: '7gqc9Xwit13V0MP58NqqOqRLKNs',
});

// Upload image to Cloudinary
export const sendImageToCloudinary = (
  file: Express.Multer.File,
  imageName: string,
) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) return reject(new Error('No file buffer found'));

    cloudinary.uploader
      .upload_stream({ public_id: imageName }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(file.buffer);
  });
};
// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.cwd() + '/uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage });
