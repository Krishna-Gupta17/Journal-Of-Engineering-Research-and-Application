import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export function uploadPdfBuffer(buffer, fileName) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'jera/papers',
        public_id: fileName.replace(/\.[^/.]+$/, ''),
      },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }

        resolve(result)
      },
    )

    uploadStream.end(buffer)
  })
}

export function deletePdfByPublicId(publicId) {
  if (!publicId) {
    return Promise.resolve(null)
  }

  return cloudinary.uploader.destroy(publicId, { resource_type: 'raw' })
}
