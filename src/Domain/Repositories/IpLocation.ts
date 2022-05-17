import { LocationEntity } from "Domain/Entities";

export interface IpLocationRepository {

    getLocationByIp(ipAddress: string): Promise<LocationEntity | null>
    
}