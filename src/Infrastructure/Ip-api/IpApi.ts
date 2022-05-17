import { LocationMapper } from "Domain/Mappers";
import { LocationEntity } from "Domain/Entities";
import { IpLocationRepository } from "Domain/Repositories";
import { injectable } from "inversify";
import { Requester } from "Utils/requester";
import { Result } from "Utils/Result";

@injectable()
export class IpApi implements IpLocationRepository {

    private baseUrl: string = "http://ip-api.com/json/";
    private requester: Requester;
    constructor(){
        this.requester = new Requester();
    }

    async getLocationByIp(ipAddress: string): Promise<Result<LocationEntity>> {
        try {

            const fullUrl = this.baseUrl + ipAddress;
            const response = await this.requester.get<LocationEntity>(fullUrl);
            
            if(response.data)
            return Result.ok(LocationMapper.toApplication(response.data));

            return Result.fail("Error trying to get location");

        } catch(err) {
            
            throw err;
        }
    }
}