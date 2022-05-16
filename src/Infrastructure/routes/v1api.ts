import express from "express";
import asyncHandler from "express-async-handler";
import container from "../../ioc_config/inversify.config";
import IDENTIFIERS from "Utils/inversify_identifiers";
import { IpLocationRepository } from "Domain/Repositories";
import * as response from "Utils/response";

const LocationService = container.get<IpLocationRepository>(IDENTIFIERS.IPLOCATORSERVICE)
export default (app: express.Application): void => {

    //
    // BY LOCATION
    //

    app.use("/v1/location", express.json(), asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        if(req.method === "POST") {
            try {

                const location = req.body.location || req.url;
                const r = await LocationService.getLocationByIp(location);
                if(r){
                    response.ok(res, r);
                } else {
                    response.badRequest(res);
                }

            } catch(err) {
                console.error(err)
                response.statusCode(res, 500, "Internal error")
            }
        }
        else {
            next();
        }
    }));

    
}