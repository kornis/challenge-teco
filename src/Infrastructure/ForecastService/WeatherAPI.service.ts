import { injectable } from "inversify";
import { WeatherRepository } from "Domain/Repositories";
import { Requester } from "Utils/requester";
import { ForecastMapper } from "Domain/Mappers";
import { WeatherEntity } from "Domain/Entities";
import { Result } from "Utils/Result";

@injectable()
export class WeatherAPI implements WeatherRepository {

    private baseUrl = "http://api.weatherapi.com/v1/";
    private urlCurrent = this.baseUrl + "current.json";
    private urlForecast = this.baseUrl + "forecast.json";

    private apikey = process.env.OW_API_KEY;
    private requester: Requester;
    constructor() {
        this.requester = new Requester();
    }

    async getWeatherByLocation(lat: Number, lon: Number): Promise<Result<WeatherEntity>> {
        try {

            const url = this.urlCurrent + `?q=${lat},${lon}&key=${this.apikey}`;

            const response = await this.requester.get(url);
            
            if(response.data)
            return Result.ok(ForecastMapper.WeatherAPItoApplication(response.data));

            return Result.fail("Error trying to get weather by location")

        } catch(err) {

            throw err;
        }
    }

    async getWeatherByCity(city: string): Promise<Result<WeatherEntity>> {
        try {

            const url = this.urlCurrent + `q=${city}&key=${this.apikey}`;

            const response = await this.requester.get(url);

            if(response.data)
            return Result.ok(ForecastMapper.WeatherAPItoApplication(response.data));
            
            return Result.fail("Error trying to get weather by city name");

        } catch(err) {

            throw err;
        }
    }

    async getFiveDaysForecast(city: string): Promise<Result<WeatherEntity>> {
        
        try {

            const url = this.urlForecast + `q=${city}&days=5&key=${this.apikey}`;

            const response = await this.requester.get(url);

            if(response.data)
            return Result.ok(ForecastMapper.WeatherAPItoApplication(response.data));

            return Result.fail("Error trying to get 5-day-weather");

        } catch(err) {

            throw err;
        }
    }

}