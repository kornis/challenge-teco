import * as fs from "fs";
import * as file from "./utils/file";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
class Server {
    public app: express.Application;
    server: any;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set("port", process.env.PORT || 3000);
    }

    routes() {
        try {

            fs.readdirSync(file.absolute("Infrastructure/routes")).forEach((fileName)=> {
                require(file.absolute(`Infrastructure/routes/${fileName}`)).default(this.app);
            });

        } catch(err: any) {

            if(err.error === "ENOENT"){
                console.warn("server.js (start): [API] no existen rutas adicionales definidas");
            } else {
                console.error(`server.js (start): (${err.stack})`);
            }
        }
    }

    start() {
        this.server = this.app.listen(this.app.get("port"), () => console.log("Server listening to port " + this.app.get("port")));
    }

    getApp() {
        return this.app;
    }

    close() {
        this.server.close()
    }
}

export const server = new Server();
server.start();