

export class Patient {
    private dob: Date | undefined;
    private name: string;
    constructor(name: string, dob?: Date) {
        this.dob = dob;
        this.name = name;
    }


    getAge() {
        if (!this.dob) {
            throw new Error("DOB Not Present.")
        }
        const currentDate: Date = new Date();
        const daysInAMonth: number = 30;
        const ageInMilliSeconds: number = currentDate.getTime() - this.dob.getTime();
        const hours: number = Math.floor(ageInMilliSeconds / (1000 * 60 * 60));
        const days: number = Math.floor(ageInMilliSeconds / (1000 * 60 * 60 * 24));

        const currentYear: number = currentDate.getFullYear();
        const dobYear: number = this.dob.getFullYear();
        const dobMonth: number = this.dob.getMonth();
        let months: number = (currentYear - dobYear) * 12 + Math.floor(days / daysInAMonth);
        const years: number = currentYear - dobYear;
        console.log(years, months, days, hours)

        if (years >= 1) {
            return this.name + ' is ' + years + ' Years Old';
        }
        if (years < 1 && months >= 1) {
            return this.name + ' is ' + months + ' Months Old';
        }
        else if (months < 1 && days >= 1) {
            return this.name + ' is ' + days + ' Days Old';
        }
        else if (days < 1 && hours >= 1) {
            return this.name + ' is ' + hours + ' Hours Old';
        }
        else {
            return this.name + ' is <1 Hours Old';
        }

    }
}
