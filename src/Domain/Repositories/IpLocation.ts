export interface IpLocationRepository {

    getLocationByIp(ipAddress: string): Promise<any>
    
}