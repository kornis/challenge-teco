import { WeatherEntity } from "Domain/Entities";
import { Result } from "Utils/Result";

export interface WeatherRepository {
    
    getWeatherByLocation(lat: Number, lon: Number): Promise<Result<WeatherEntity>>;

    getWeatherByCity(city: string): Promise<Result<WeatherEntity>>;

    getFiveDaysForecast(city: string): Promise<Result<WeatherEntity>>;
}