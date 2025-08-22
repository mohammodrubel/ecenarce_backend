import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs'


cloudinary.config({
    cloud_name: 'dcijrliws',
    api_key: '381723299955348',
    api_secret: 'UpYvwvLZH2xthek7Me9-Xuh7Jqk'
});



export const sendImageToCloudinary = (path: string, imageName: string) => {

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            {
                public_id: imageName
            },
            function (error, result) {
                if (error) {
                    reject(error)
                }
                resolve(result)
                fs.unlink(path, (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        console.log('file is deleted')
                    }
                })
            }
        )

    })

}


// multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })
