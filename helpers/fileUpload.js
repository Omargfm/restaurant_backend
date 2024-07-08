import * as path from "node:path";
import {v4 as uuidv4} from 'uuid';

const __dirname = path.resolve();

const fileUpload = ( files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {

        const {file} = files;
        const nameSplit = file.name.split('.');
        const extension = nameSplit[nameSplit.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject('File format not valid, only: ' + validExtensions.join(', '));
        }

        const uuidv = uuidv4();
        const fileName = `${uuidv}.${extension}`;
        const uploadPath = path.join(__dirname, 'uploads', folder, fileName);

        file.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                return reject('Error uploading file');
            }

           resolve(uuidv);
        });
    });

}

export default fileUpload