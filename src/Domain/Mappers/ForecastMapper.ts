import { WeatherEntity } from "Domain/Entities";

export class ForecastMapper {

    public static toApplication(raw: any): WeatherEntity {
        return {
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
}