export interface WeatherEntity {
    city?: string;
    region?: string;
    country?: string;
    lat: Number;
    lon: Number;
    description: string;
    icon?: string;
    temp: Number;
    feels_like?: Number;
    temp_min?: Number;
    temp_max?: Number;
    pressure?: Number;
    humidity?: Number;
    visibility?: Number | string;
    windSpeed?: Number;
    localtime?: string;
}