import { injectable } from "inversify";
import { WeatherRepository } from "Domain/Repositories";
import { Requester } from "Utils/requester";
import { ForecastMapper } from "Domain/Mappers";
import { WeatherEntity } from "Domain/Entities";
import { Result } from "Utils/Result";

@injectable()
export class OpenWeather implements WeatherRepository {

    private baseUrl = "https://api.openweathermap.org/";
    private urlByCity = this.baseUrl + "/geo/1.0/direct";
    private urlByLatLon = this.baseUrl + "data/2.5/weather";

    private apikey = process.env.OW_API_KEY;
    private requester: Requester;
    constructor() {
        this.requester = new Requester();
    }

    async getWeatherByLocation(lat: Number, lon: Number): Promise<Result<WeatherEntity>> {
        try {

            const url = this.urlByLatLon + `?lat=${lat}&lon=${lon}&appid=${this.apikey}`;

            const response = await this.requester.get(url);
            
            if(response.data)
            return Result.ok(ForecastMapper.OpenAPItoApplication(response.data));

            return Result.fail("Error trying to get weather by location")

        } catch(err) {

            throw err;
        }
    }

    async getWeatherByCity(city: string): Promise<Result<WeatherEntity>> {
        try {

            const url = this.urlByCity + `q=${city}&apiid=${this.apikey}`;

            const response = await this.requester.get(url);

            if(response.data)
            return Result.ok(ForecastMapper.OpenAPItoApplication(response.data));
            
            return Result.fail("Error trying to get weather by city name");

        } catch(err) {

            throw err;
        }
    }

    async getFiveDaysForecast(city: string): Promise<Result<WeatherEntity>> {
        
        try {

            const url = this.urlByCity + `q=${city}&apiid=${this.apikey}`;

            const response = await this.requester.get(url);

            if(response.data)
            return Result.ok(ForecastMapper.OpenAPItoApplication(response.data));

            return Result.fail("Error trying to get 4-day-weather");

        } catch(err) {

            throw err;
        }
    }

}