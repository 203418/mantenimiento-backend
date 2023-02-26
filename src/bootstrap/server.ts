import { Application } from "express";
import path from "path";
import { paths } from "../declarations";
import database from "./database";
import cors from 'cors';
import express from "express";
import fileUpload from 'express-fileupload';
import http from 'http';
import RollController from "../modules/roles/roles.controller";
import rollRouter from "../modules/roles/roles.router";
import userRouter from "../modules/users/user.router";
import processRouter from "../modules/process/process.router";
import phaseRouter from "../modules/phases/phases.router";

export default class Server {
    private readonly app: Application;
    private port: string | number;
    private paths: paths;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.paths = {
            rolls: '/rolls',
            users: '/users',
            process: '/process',
            phases: '/phases'
        };
        this.dataBaseConnection();
        this.middlewares();
        this.routes();
    }

    async dataBaseConnection(): Promise<void> {
        database.initialize()
            .then(() => {console.log('DataBase connected')})
            .catch(console.error);
    }
    middlewares(){
        const publicPath = path.resolve(__dirname, '../../uploads');
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/files', express.static(publicPath));        
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }
    routes() {
        this.app.use(this.paths.rolls, rollRouter);
        this.app.use(this.paths.users, userRouter);
        this.app.use(this.paths.process, processRouter);
        this.app.use(this.paths.phases, phaseRouter);
    }
    initialize() {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            server
                .listen(this.port || 8000)
                .on("listening", () => {
                    resolve(true);
                    console.log("Server started in port: " + this.port);
                })
                .on("error", (error: Error) => {
                    reject(true);
                    console.log("Server failed to start: ", error);
                });
        });
    }
}