import { LocationEntity } from "Domain/Entities";
import { IpLocationRepository } from "Domain/Repositories";
import { injectable, inject, named } from "inversify";
import IDENTIFIERS from "Utils/inversify_identifiers";
import { Result } from "Utils/Result";

@injectable()
export class IpLocationService implements IpLocationRepository {

    repository: IpLocationRepository;

    constructor(@inject(IDENTIFIERS.IPLOCATOR) @named(process.env.IP_LOCATOR_NAME as string) repository: IpLocationRepository){
        this.repository = repository;
    }

    async getLocationByIp(ipAddress: string): Promise<Result<LocationEntity>> {
        try {

            return await this.repository.getLocationByIp(ipAddress);
            
        } catch(err) {
            
            throw { error: err, message: "Error trying to get location by IP" };
        }
    }
}