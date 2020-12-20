/* eslint-disable @typescript-eslint/camelcase */
const cloudinary = require('cloudinary').v2
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'torre-test',
    // @ts-ignore Has to do this because the package doesnt recognize it. Already set the issue
    resource_type: 'video',
  },
})

export const upload = multer({ storage: storage })
