import axios from "axios";
import { injectable } from "inversify";
import { WeatherRepository } from "Domain/Repositories";

@injectable()
export class WeatherApiService implements WeatherRepository {

    constructor() {

    }

    async getWeatherByLocation(location: string): Promise<any> {
        
    }
}