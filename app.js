import dontenv from 'dotenv';
import server from "./models/server.js";

dontenv.config();

const serverApp = new server();

serverApp.start();

