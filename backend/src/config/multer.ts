import crypto from 'crypto';
import { extname, resolve } from 'path';
import multer from 'multer';

export default {
    upload(folder: string){
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, cb) => {
                    const fileHash = crypto.randomBytes(10).toString('hex');
                    const fileName = `${fileHash}${extname(file.originalname)}`;
                    return cb(null, fileName);
                }
            })
        }
    }
};
