import response from 'express';
import fileUpload from "../helpers/fileUpload.js";
import * as fs from "node:fs";
import * as path from "node:path";

const __dirname = path.resolve();

const uploadFile = async (req, res = response) => {

    const nameFile = await fileUpload(req.files, undefined, 'imgs');

    res.json({nameFile})

}

const getFile = async (req, res = response) => {

    const {id} = req.params;

    const pathImg = path.join(__dirname, '/uploads/imgs', id + '.jpg');
    if(fs.existsSync(pathImg)){
        return res.sendFile(pathImg);
    }

    res.status(404).json({msg: 'Image not found'})

}

export {
    uploadFile,
    getFile
}