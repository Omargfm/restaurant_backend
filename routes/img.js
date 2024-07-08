
import {Router} from "express";

import {uploadFile, getFile} from "../controllers/img.js";

const router = Router();

router.post('/', uploadFile);

router.get('/:id', getFile);

export default router