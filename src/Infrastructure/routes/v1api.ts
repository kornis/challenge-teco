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
                const locationResponse = await LocationService.getLocationByIp(ipToGetLocation);
                
                locationResponse.isSuccess && response.ok(res, locationResponse.getValue());
                
                locationResponse.isFailure && response.statusCode(res, locationResponse.getStatusCode());

            } catch(err: any) {
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

    app.use("/v1/current/:city?", asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        if(req.method === "GET") {
            try {

                const ipToGetLocation = req.url;
                const city = req.params?.city;

                if(city){
                    const weatherResponse = await WeatherService.getWeatherByCity(city);
                    
                    weatherResponse.isSuccess && response.ok(res, weatherResponse.getValue());
                        
                    weatherResponse.isFailure && response.statusCode(res, weatherResponse.getStatusCode());

                } else {
                    const locationResponse = await LocationService.getLocationByIp(ipToGetLocation);

                    if(locationResponse.isSuccess){
                        const location = locationResponse.getValue();
                        
                        const weatherResponse = await WeatherService.getWeatherByLocation(location.lat, location.lon);

                        weatherResponse.isSuccess && response.ok(res, weatherResponse.getValue());
        
                        weatherResponse.isFailure && response.statusCode(res, weatherResponse.getStatusCode());    
                            
                    } else {

                        response.statusCode(res, locationResponse.getStatusCode())
                    }
                }

            } catch(err) {
                console.error(err);
                response.statusCode(res, 500, "Internal error");
            }
        } else {
            next();
        }
    }));


    //
    // FORECAST
    //

    app.use("/v1/forecast/:city?", asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        if(req.method === "GET") {
            try {
                const city = req.params?.city;
                const ipToGetLocation = req.url;
                if(city){
                    const forecastResponse = await WeatherService.getThreeDaysForecast(city);

                    forecastResponse.isSuccess && response.ok(res, forecastResponse.getValue());

                    forecastResponse.isFailure && response.statusCode(res, forecastResponse.getStatusCode());
                    
                } else {
                    const locationResponse = await LocationService.getLocationByIp(ipToGetLocation);
                    
                    if(locationResponse.isSuccess){
                        const location = locationResponse.getValue();
                        const forecastResponse = await WeatherService.getThreeDaysForecast(location.city);

                        forecastResponse.isSuccess && response.ok(res, forecastResponse.getValue());
    
                        forecastResponse.isFailure && response.statusCode(res, forecastResponse.getStatusCode());
                    }

                    response.statusCode(res, locationResponse.getStatusCode());
                }
            } catch(err) {
                console.error(err);
                response.statusCode(res, 500, "Internal error");
            }

        } else {
            next();
        }
    }))
}