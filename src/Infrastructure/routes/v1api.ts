import express from "express";
import asyncHandler from "express-async-handler";


export default (app: express.Application): void => {

    app.use("/v1/location", asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        if(req.method === "POST") {
            try {

                const location = req.body.location;
                res.send("hola")

            } catch(err) {

            }
        }
        else {
            next();
        }
    }));
}