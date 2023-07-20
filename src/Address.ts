import {MasterZipCodes} from "./MasterZipCodes";

export class Address {
    private readonly zipCode: number;
    private readonly addressLine1: string;
    private readonly addressLine2: string;
    private readonly city: string;
    private readonly state: string;
    private readonly country: string;
    private flag: boolean;

    constructor(zipCode: number, addressLine1: string, addressLine2: string, city: string, state: string, country: string, flag: boolean) {
        this.zipCode = zipCode;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.flag = flag;
    }

    validate(masterZipCodes: MasterZipCodes): boolean {
        let listOfZipCodes = masterZipCodes.getZipCodes();

        if (listOfZipCodes.length === 0) {
            return false;
        }
        console.log('before flag', this.flag)
        this.flag = !listOfZipCodes.includes(this.zipCode);
        console.log('after flag', this.flag)
        return this.flag;
    }
}