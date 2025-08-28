import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import multer from 'multer';

// Cloudinary config
cloudinary.config({
  cloud_name: 'de2ysphks',
  api_key: '426748166613985',
  api_secret: '7gqc9Xwit13V0MP58NqqOqRLKNs',
});

// Upload buffer directly to Cloudinary
export const sendImageCloudinary = async (
  buffer: Buffer,
  publicId?: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { public_id: publicId || new Date().toISOString() },
      (error, result) => {
        if (error) return reject(error);
        if (result) return resolve(result);
      },
    );

    stream.end(buffer); // send buffer to Cloudinary
  });
};

// Multer config (memory storage → keeps files in RAM, no disk writes)
const storage = multer.memoryStorage();
export const upload = multer({ storage });
