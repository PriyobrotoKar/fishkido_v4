import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getCloudinaryId, getSignature } from './cloudinary';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadMedia(file: File, prevUrl?: string) {
  const publicId = prevUrl && (await getCloudinaryId(prevUrl)).split('/')[1];
  const signResponse = await getSignature(publicId);

  const url = `https://api.cloudinary.com/v1_1/${signResponse.cloudName}/upload`;
  const formData = new FormData();

  formData.append('file', file);
  formData.append('api_key', signResponse.apiKey);
  formData.append('timestamp', `${signResponse.timestamp}`);
  formData.append('signature', signResponse.signature);
  formData.append('folder', 'fishkido');
  if (publicId) {
    formData.append('public_id', publicId);
  }

  try {
    const resonse = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    console.log('Uploaded image');
    return await resonse.json();
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
}
