import { WeatherEntity } from "./WeatherEntity";

export interface ForecastEntity {
    city?: string;
    region?: string;
    country?: string;
    lat: Number;
    lon: Number;
    forecast: ForecastOneDay[]
}

export interface ForecastOneDay {
    date: string;
    temp_min?: Number;
    temp_max?: Number;
    description: string;
    icon?: string;
}