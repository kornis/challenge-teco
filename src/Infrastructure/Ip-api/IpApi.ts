import { LocationMapper } from "Domain/Mappers";
import { LocationEntity } from "Domain/Entities";
import { IpLocationRepository } from "Domain/Repositories";
import { injectable } from "inversify";
import { Requester } from "Utils/requester";

@injectable()
export class IpApi implements IpLocationRepository {

    private baseUrl: string = "http://ip-api.com/json/";
    private requester: Requester;
    constructor(){
        this.requester = new Requester();
    }

    async getLocationByIp(ipAddress: string): Promise<LocationEntity | null> {
        try {
            const fullUrl = this.baseUrl + ipAddress;
            const response = await this.requester.post<LocationEntity>(fullUrl);
            
            if(response.data)
            return LocationMapper.toApplication(response.data);

            return null;
        } catch(err) {
            
            throw err;
        }
    }
}