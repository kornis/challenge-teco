import { WeatherEntity } from "Domain/Entities";

export interface WeatherRepository {
    
    getWeatherByLocation(lat: Number, lon: Number): Promise<any>;

    getWeatherByCity(city: string): Promise<WeatherEntity | null>;

    getCurrentWeather(localIp: string, city?: string): Promise<WeatherEntity | null>

}