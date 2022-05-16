import { LocationEntity } from "Domain/Entities";
import { IpLocationRepository } from "Domain/Repositories";
import { injectable, inject, named } from "inversify";
import IDENTIFIERS from "Utils/inversify_identifiers";

@injectable()
export class IpLocationService implements IpLocationRepository {

    repository: IpLocationRepository;

    constructor(@inject(IDENTIFIERS.IPLOCATOR) @named(process.env.IP_LOCATOR_NAME as string) repository: IpLocationRepository){
        this.repository = repository;
    }

    async getLocationByIp(ipAddress: string): Promise<LocationEntity> {
        
        try {

            return await this.repository.getLocationByIp(ipAddress);
            
        } catch(err) {
            throw err;
        }
    }
}