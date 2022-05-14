export interface WeatherRepository {
    
    getWeatherByLocation(location: string): Promise<any>;

}