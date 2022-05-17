import express from "express";
import asyncHandler from "express-async-handler";
import container from "../../ioc_config/inversify.config";
import IDENTIFIERS from "Utils/inversify_identifiers";
import { IpLocationRepository, WeatherRepository } from "Domain/Repositories";
import * as response from "Utils/response";

const LocationService = container.get<IpLocationRepository>(IDENTIFIERS.IPLOCATORSERVICE);
const WeatherService = container.get<WeatherRepository>(IDENTIFIERS.WEATHERSERVICE);
export default (app: express.Application): void => {

    //
    // BY LOCATION
    //

    app.use("/v1/location", express.json(), asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        if(req.method === "GET") {
            try {

                const ipToGetLocation = req.url;
                const r = await LocationService.getLocationByIp(ipToGetLocation);
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


    //
    // CURRENT /city (optional)
    //

    app.use("/v1/current/:city", asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        if(req.method === "GET") {
            try {

                const ipToGetLocation = req.url;
                const city = req.params?.city;

                if(city){
                    const weatherResponse = await WeatherService.getWeatherByCity(req.params.city);
                    const weather = weatherResponse.getValue();

                    response.ok(res, weather);

                } else {
                    const locationResponse = await LocationService.getLocationByIp(ipToGetLocation);
                    const location = locationResponse.getValue();
                    
                    const weatherResponse = await WeatherService.getWeatherByLocation(location.lat, location.lon);
                    const weather = weatherResponse.getValue();

                    response.ok(res, weather);
                }

            } catch(err) {
                console.error(err);
                response.statusCode(res, 500, "Internal error");
            }
        } else {
            next();
        }
    }));
}