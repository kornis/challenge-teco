import { LocationEntity } from "Domain/Entities";
import { Result } from "Utils/Result";

export interface IpLocationRepository {

    getLocationByIp(ipAddress: string): Promise<Result<LocationEntity>>
    
}