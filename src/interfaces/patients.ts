export interface Patient{
    id:string;
    mnr: number,
    firstName: string,
    lastName: string,
    DOB: string,
    countryCodeForContact:any,
    contactNo:any,
    countryCodeForEmerContact:any,
    emergencyContactNo:any,
    // contactInformation:
    // {
        // countryCodeForContact:any,
        // contactNo:any,
        // countryCodeForEmerContact:any,
        // emergencyContact:any,

    // }
    // countryCode:any,
    // contact: any,
    gender: string,
    street: string,
    area: string,
    city:string,
    state:string,
    country:string,
    zipcode: string,
    email: string,
    onlyReadable:boolean
}