import { ForecastEntity, ForecastOneDay, WeatherEntity } from "Domain/Entities";

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
            city: raw.location.name,
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
            visibility: raw.current.vis_km,
            localtime: raw.location.localtime
        }
    }

    public static WeatherAPIForecastToApplication(raw: any): ForecastEntity {
        
        let forecast: ForecastOneDay[] = [];
        
        if(Array.isArray(raw.forecast?.forecastday)){
            forecast = raw.forecast.forecastday.map((day: Record<string, any>) => {
               return {
                   date: day.date,
                   temp_min: day.day.mintemp_c,
                   temp_max: day.day.maxtemp_c,
                   description: day.day.condition.text,
                   icon: day.day.condition.icon
               }
           });
        }
        
        return {
            city: raw.location.name,
            region: raw.location.region,
            country: raw.location.country,
            lat: raw.location.lat,
            lon: raw.location.lon,
            forecast: forecast
        }
    }
}