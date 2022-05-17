import { WeatherEntity } from "Domain/Entities";

export class ForecastMapper {

    public static OpenAPItoApplication(raw: any): WeatherEntity {
        return {
            city: raw.name,
            country: raw.country,
            lat: raw.lat,
            lon: raw.lon,
            description: raw[0]?.description,
            icon: raw[0]?.icon,
            temp: raw.main.temp,
            feels_like: raw.main.feels_like,
            temp_min: raw.main.temp_min,
            temp_max: raw.main.temp_max,
            pressure: raw.main.pressure,
            humidity: raw.main.humidity,
            visibility: raw.visibility
        }
    }

    public static WeatherAPItoApplication(raw: any): WeatherEntity {
        return {
            city: raw.location.city,
            region: raw.location.region,
            country: raw.location.country,
            lat: raw.location.lat,
            lon: raw.location.lon,
            description: raw.current.condition.text,
            icon: raw.current.condition.icon,
            temp: raw.current.temp_c,
            feels_like: raw.current.feelslike_c,
            pressure: raw.current.presure_mb,
            humidity: raw.current.humidity,
            visibility: raw.current.vis_km
        }
    }
}