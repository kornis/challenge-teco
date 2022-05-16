import { Container } from "inversify";
import IDENTIFIERS from "Utils/inversify_identifiers";
import { IpLocationService } from "Application";
import { IpLocationRepository } from "Domain/Repositories";
import { IpApi } from "Infrastructure/Ip-api/IpApi";

const container = new Container();

// Infrastructure
container.bind<IpLocationRepository>(IDENTIFIERS.IPLOCATOR).to(IpApi).whenTargetNamed("ip-api");

// Application
container.bind<IpLocationRepository>(IDENTIFIERS.IPLOCATORSERVICE).to(IpLocationService)



export default container;