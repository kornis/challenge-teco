import { ForecastEntity, WeatherEntity } from "Domain/Entities";
import { IpLocationRepository, WeatherRepository } from "Domain/Repositories";
import { injectable, inject, named } from "inversify";
import IDENTIFIERS from "Utils/inversify_identifiers";
import { Result } from "Utils/Result";

@injectable()
export class WeatherService implements WeatherRepository {

    private repository: WeatherRepository;
    constructor(@inject(IDENTIFIERS.WEATHERAPI) @named(process.env.WEATHER_SERVICE as string) repository: WeatherRepository){
        this.repository = repository;
    }

    async getWeatherByLocation(lat: Number, lon: Number): Promise<Result<WeatherEntity>> {
        try {

            return await this.repository.getWeatherByLocation(lat, lon);

        } catch(err) {

            throw { error: err, message: "" }
        }
    }


    async getWeatherByCity(city: string): Promise<Result<WeatherEntity>> {
        try {

            return await this.repository.getWeatherByCity(city);

        } catch(err) {

            throw { error: err, message: "Error trying to get weather by city" };
        }
    }

    async getThreeDaysForecast(city: string): Promise<Result<ForecastEntity>> {
        try {

            return await this.repository.getThreeDaysForecast(city);

        } catch(err) {

            throw { error: err, message: "Error trying to get 4-day-weather" }
        }
    }
}