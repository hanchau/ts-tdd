export class MasterZipCodes {
    private zipCodes: number[];
    constructor(params:{ zipCodes: number[] }) {
        this.zipCodes = params.zipCodes;
    }
    getZipCodes() {
        return this.zipCodes;
    }

}