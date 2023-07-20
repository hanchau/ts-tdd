export class AgeInterval {
    public readonly start: number;
    public readonly end: number;
    private readonly formatter: (age: number) => string;

    constructor(start: number, end: number, formatter: (age: number) => string) {
        this.start = start;
        this.end = end;
        this.formatter = formatter;
    }

    isWithinInterval(age: number): boolean {
        return age >= this.start && age < this.end;
    }

    formatAge(age: number): string {
        return this.formatter(age);
    }
}

export class Patient {
    private dob: Date | undefined;
    private name: string;
    private ageIntervals: AgeInterval[];

    constructor(name: string, ageIntervals:AgeInterval[],  dob?: Date) {
        this.dob = dob;
        this.name = name;
        this.ageIntervals = ageIntervals;
    }

    getAge(): string {
        if (!this.dob) {
            throw new Error("DOB Not Present.");
        }

        const currentDate: Date = new Date();
        const ageInMilliSeconds: number = currentDate.getTime() - this.dob.getTime();

        for (const interval of this.ageIntervals) {
            if (interval.isWithinInterval(ageInMilliSeconds)) {
                const ageValue: number = Math.floor(ageInMilliSeconds / interval.start);
                return interval.formatAge(ageValue);
            }
        }

        return `${this.name} is <1 Hours Old`;
    }
}
