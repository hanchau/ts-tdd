import { Patient } from "../src/Patient";

describe("Patient", () => {
  let currentDate: Date;
  let name: string;

    beforeEach(() => {
        currentDate = new Date();
        name = "Anuj"
    });


    it("1. Should throw an exception when DOB is not with the Patient.", () => {
        let patient = new Patient("Anuj");
        expect(() => patient.getAge()).toThrowError('DOB Not Present.');
    });


    it("2. Should return `{name} is <1 Hours Old` if ``CurrentDate-DOB`` is less than an hour.", () => {
        let milliSecondsInFiftyMins: number = 50 * 60 * 1000;
        const lessThanOneHourDOB: Date = new Date(currentDate.getTime() - milliSecondsInFiftyMins);
        let patient: Patient = new Patient(name, lessThanOneHourDOB);
        let ageLessThanAnHour: string = name + ' is <1 Hours Old'
        expect(patient.getAge()).toBe(ageLessThanAnHour);
    });

    it("2.1 Should return `{name} is 1 Hours Old` if ``CurrentDate-DOB`` is equal to 1 hour.", () => {
        let milliSecondsInFiftyMins: number = 60 * 60 * 1000;
        const lessThanOneHourDOB: Date = new Date(currentDate.getTime() - milliSecondsInFiftyMins);
        let patient: Patient = new Patient(name, lessThanOneHourDOB);
        let ageEqualToOneHour: string = name + ' is 1 Hours Old'
        expect(patient.getAge()).toBe(ageEqualToOneHour);
    });


    it("3. Should return `{name} is #Hours Old` if ``CurrentDate-DOB`` is less than a day.", () => {
        let hoursOld: number = 23;
        let milliSecondsInXHours: number = hoursOld * 60 * 60 * 1000;
        const lessThanADayDOB: Date = new Date(currentDate.getTime() - milliSecondsInXHours);

        let patient: Patient = new Patient(name, lessThanADayDOB);

        let ageLessThanADay: string = name + ' is ' + hoursOld + ' Hours Old'
        expect(patient.getAge()).toBe(ageLessThanADay);

    });

    it("4 Should return `{name} is #Days Old` if ``CurrentDate-DOB`` is less than a Month.", () => {
        let daysOld: number = 28;
        let milliSecondsInXDays: number = daysOld * 24 * 60 * 60 * 1000;
        const lessThanAMonthDOB: Date = new Date(currentDate.getTime() - milliSecondsInXDays);

        let patient: Patient = new Patient(name, lessThanAMonthDOB);

        let ageLessThanAMonth: string = name + ' is ' + daysOld + ' Days Old'
        expect(patient.getAge()).toBe(ageLessThanAMonth);

    });

    it("5. Should return `{name} is X Months Old` if ``CurrentDate-DOB`` is less than X+1 Month and greater than equal to 30 days.", () => {
        let daysOld: number = 59;
        let milliSecondsInXDays: number = daysOld * 24 * 60 * 60 * 1000;
        const equalToAMonthDOB: Date = new Date(currentDate.getTime() - milliSecondsInXDays);

        let patient: Patient = new Patient(name, equalToAMonthDOB);

        let ageEqualToAMonth: string = name + ' is 1 Months Old'
        expect(patient.getAge()).toBe(ageEqualToAMonth);

    });
    it("6. Should return `{name} is X Years Old` if ``CurrentDate-DOB`` is less than X+1 Years.", () => {
        let yearsOld: number = 11;
        let milliSecondsInXDays: number = yearsOld * 12 * 30 * 24 * 60 * 60 * 1000;
        const equalToXYearsDOB: Date = new Date(currentDate.getTime() - milliSecondsInXDays);

        let patient: Patient = new Patient(name, equalToXYearsDOB);

        let ageEqualToElevenYears: string = name + ' is ' + yearsOld + ' Years Old'
        expect(patient.getAge()).toBe(ageEqualToElevenYears);

    });


});