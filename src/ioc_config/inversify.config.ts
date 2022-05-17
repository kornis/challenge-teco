import "reflect-metadata";
import { Container } from "inversify";
import IDENTIFIERS from "Utils/inversify_identifiers";
import { IpLocationService, WeatherService } from "Application";
import { IpLocationRepository, WeatherRepository } from "Domain/Repositories";
import { IpApi } from "Infrastructure/Ip-api/IpApi";
import { WeatherApi } from "Infrastructure/ForecastService/Weather.service";

const container = new Container();

// Infrastructure
container.bind<IpLocationRepository>(IDENTIFIERS.IPLOCATOR).to(IpApi).whenTargetNamed("ip-api");
container.bind<WeatherRepository>(IDENTIFIERS.WEATHER).to(WeatherApi).whenTargetNamed("OpenWeather");

// Application
container.bind<IpLocationRepository>(IDENTIFIERS.IPLOCATORSERVICE).to(IpLocationService)
container.bind<WeatherRepository>(IDENTIFIERS.WEATHERSERVICE).to(WeatherService);



export default container;