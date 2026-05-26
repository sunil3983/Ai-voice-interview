import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

if (env.CLOUDINARY_URL) {
  cloudinary.config({ secure: true });
}

export { cloudinary };
