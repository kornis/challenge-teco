import { LocationEntity } from "Domain/Entities";

export class LocationMapper {

    public static toApplication(raw: any): LocationEntity {
        return {
            country: raw.country,
            countryCode: raw.countryCode,
            region: raw.region,
            regionName: raw.regionName,
            city: raw.city,
            zip: raw.zip,
            lat: raw.lat,
            lon: raw.lon,
            timezone: raw.timezone
        }
    }

    public static toWeatherService(raw: any): IWeatherCoords{
        return {
            lon: raw.coord.lon,
            lat: raw.coord.lat
        }
    }
}

interface IWeatherCoords {
    lon: Number;
    lat: Number;
}