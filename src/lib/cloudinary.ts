'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const UPLOAD_FOLDER = 'fishkido';

export const getSignature = async (publicId?: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: UPLOAD_FOLDER,
      ...(publicId && { public_id: publicId }),
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  };
};

export const getCloudinaryId = async (url: string) => {
  const splitUrl = url.split('/');
  const publicId = splitUrl[splitUrl.length - 1].split('.')[0];
  return UPLOAD_FOLDER + '/' + publicId;
};

export const deleteMedia = async (url: string) => {
  try {
    const publicId = await getCloudinaryId(url);
    const response = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });

    return response;
  } catch (error) {
    console.error('Error deleting media:', error);
    throw new Error((error as Error).message);
  }
};
