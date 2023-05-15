import express from 'express';

import cors from 'cors';
import { products, shoppingCart, users, session } from '../routes/index.js';
import dbConnection from '../database/config.js';
import sessionMiddleware from '../middlewares/session.js';
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = null;
        this.connectDB();
        this.middlewares();
        this.routes();

        if (Server.instance) return Server.instance;

        Server.instance = this;
    }

    async connectDB() {
        await dbConnection.connect();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(sessionMiddleware);
    }

    routes() {
        this.app.use('/api/products', products);
        this.app.use('/api/carts', shoppingCart);
        this.app.use('/api/signup', users);
        this.app.use('/api/session', session);
    }

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

    close() {
        this.server.close();
    }

}

export default Server;