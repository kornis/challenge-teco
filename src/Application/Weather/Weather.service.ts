import { WeatherEntity } from "Domain/Entities";
import { IpLocationRepository, WeatherRepository } from "Domain/Repositories";
import { injectable, inject, named } from "inversify";
import IDENTIFIERS from "Utils/inversify_identifiers";

@injectable()
export class WeatherService implements WeatherRepository {

    private repository: WeatherRepository;
    private locationRepository: IpLocationRepository;
    constructor( 
        @inject(IDENTIFIERS.WEATHER) @named(process.env.WEATHER_SERVICE as string) repository: WeatherRepository,
        @inject(IDENTIFIERS.IPLOCATOR) @named(process.env.IP_LOCATOR_NAME as string) locationRepository: IpLocationRepository
        ){
        this.repository = repository;
        this.locationRepository = locationRepository;
    }

    async getWeatherByLocation(lat: Number, lon: Number): Promise<any> {
        try {

            await this.repository.getWeatherByLocation(lat, lon);

        } catch(err) {

            return { error: err, message: "" }
        }
    }

    async getCurrentWeather(localIp: string, city?: string): Promise<WeatherEntity | null> {

        try {
            let response: WeatherEntity | null;
            if(city){
                response = await this.getWeatherByCity(city);
            } else {
                const location = await this.locationRepository.getLocationByIp(localIp);
                response = location && await this.repository.getWeatherByLocation(location?.lat, location?.lon);
            }

            return response;

        } catch(err) {

            throw { error: err, message: "Error trying to get current weather" };
        } 
    }

    async getWeatherByCity(city: string): Promise<WeatherEntity | null> {
        try {

            return await this.repository.getWeatherByCity(city);

        } catch(err) {

            throw { error: err, message: "Error trying to get weather by city" };
        }
    }
}