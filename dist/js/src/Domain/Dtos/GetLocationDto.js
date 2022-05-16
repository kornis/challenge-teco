"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLocationDto = void 0;
var GetLocationDto = /** @class */ (function () {
    function GetLocationDto(location) {
        this.country = location.country;
        this.countryCode = location.countryCode;
        this.region = location.region;
        this.regionName = location.regionName;
        this.city = location.city;
        this.zip = location.zip;
        this.lat = location.lat;
        this.lon = location.lon;
        this.timezone = location.timezone;
    }
    return GetLocationDto;
}());
exports.GetLocationDto = GetLocationDto;
