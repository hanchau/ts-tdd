import {Address} from "../src/Address";
import {MasterZipCodes} from "../src/MasterZipCodes";

describe('Address ZipCode Validation', () => {
    let zipCode:number;
    let addressLine1:string;
    let addressLine2:string;
    let city:string;
    let state:string;
    let country:string;
    let flag: boolean;

    beforeEach(() => {
        zipCode = 31334;
        addressLine1 = "Vasant Vihar";
        addressLine2 = "New Delhi";
        city = "Delhi";
        state = "Delhi";
        country = "India";
        flag = false;
    });

    test('should not change defualt false flag if the Master Zip Codes are empty', () => {
        const address:Address = new Address(zipCode, addressLine1, addressLine2, city, state, country, flag);
        const masterZipCodes:MasterZipCodes = new MasterZipCodes({zipCodes:[]});

        let expectedFlag:boolean = false;

        expect(address.validate(masterZipCodes)).toBe(expectedFlag);

    });


    it('should update the flag to true when the address zip code is not present in the master zip codes', () => {
        zipCode = 31334;
        const address:Address = new Address(zipCode, addressLine1, addressLine2, city, state, country, flag);
        let listOfZipCodes:number[] = [1, 2, 3, 4];
        const masterZipCodes:MasterZipCodes = new MasterZipCodes({zipCodes:listOfZipCodes});

        let expectedFlag:boolean = true;

        expect(address.validate(masterZipCodes)).toBe(expectedFlag);

    });


    it('should update the flag when zipcode is present in the master zip codes', () => {
        zipCode = 31334;
        const address:Address = new Address(zipCode, addressLine1, addressLine2, city, state, country, flag);
        let listOfZipCodes:number[] = [1, 2, 3, 31334];
        const masterZipCodes:MasterZipCodes = new MasterZipCodes({zipCodes:listOfZipCodes});

    });

});