import "reflect-metadata";
import { Container } from "inversify";
import IDENTIFIERS from "Utils/inversify_identifiers";
import { IpLocationService, WeatherService } from "Application";
import { IpLocationRepository, WeatherRepository } from "Domain/Repositories";
import { IpApi } from "Infrastructure/Ip-api/IpApi";
import { OpenWeather } from "Infrastructure/ForecastService/OpenWeather.service";
import { WeatherAPI } from "Infrastructure/ForecastService/WeatherAPI.service";

const container = new Container();

// Infrastructure
container.bind<IpLocationRepository>(IDENTIFIERS.IPLOCATOR).to(IpApi).whenTargetNamed("ip-api");
container.bind<WeatherRepository>(IDENTIFIERS.OPENWEATHER).to(OpenWeather).whenTargetNamed("OpenWeather");
container.bind<WeatherRepository>(IDENTIFIERS.WEATHERAPI).to(WeatherAPI).whenTargetNamed("WeatherAPI");

// Application
container.bind<IpLocationRepository>(IDENTIFIERS.IPLOCATORSERVICE).to(IpLocationService)
container.bind<WeatherRepository>(IDENTIFIERS.OPENWEATHERSERVICE).to(WeatherService);
container.bind<WeatherRepository>(IDENTIFIERS.WEATHERAPISERVICE).to(WeatherService);



export default container;