import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import dbConnection from "../database/config.js";

import products from "../routes/products.js";
import img from "../routes/img.js";


//PATHS
const PATH_PRODUCTS = '/api/products';
const PATH_IMG = '/api/img';

class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.dbConnection()

        this.middlewares();

        this.routes();
    }

    async dbConnection() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(fileUpload({useTempFiles : true, tempFileDir : '/tmp/', createParentPath : true}));
    }

    routes() {
        this.app.use(PATH_PRODUCTS, products);
        this.app.use(PATH_IMG, img);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}!`);
        });
    }
}

export default Server;