import express, {Express} from "express";
import {userRouter} from "./users/users";
import {Server} from 'http'

export class App {
    private app: Express;
    private server: Server;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 8000;
    }

    public useRoutes() {
        this.app.use('/users', userRouter);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
        })
        console.log(`Сервер запущен: на порту ${this.port}`);
    }
}