import { LocationEntity } from "Domain/Entities";

export class GetLocationDto {

    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: Number;
    lon: Number;
    timezone: string;
    statusCode: Number;

    constructor(statusCode: Number, location: LocationEntity) {
        this.country = location.country;
        this.countryCode = location.countryCode;
        this.region = location.region;
        this.regionName = location.regionName;
        this.city = location.city;
        this.zip = location.zip;
        this.lat = location.lat;
        this.lon = location.lon;
        this.timezone = location.timezone;
        this.statusCode = statusCode;
    }
}