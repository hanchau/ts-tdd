class Person {
    private quota: Quota;
    private sales: Sale[];

    constructor(param: { quota: Quota; sales: Sale[] }) {
        this.quota = param.quota;
        this.sales = param.sales;
    }

    getBonus(param: { commission: number; tax: number }) {
        let percentCommission:number = param.commission/100;
        let percentTax:number = param.tax/100;
        let valueOfQuota: number = this.quota.getValue()
        let valueOfSale: number = 0;

        for(const sale of this.sales) {
            valueOfSale += sale.getAmount();
        }
        if (valueOfQuota > valueOfSale){
            return 0
        }
        console.log(valueOfSale, percentCommission, percentTax);
        return (valueOfSale - valueOfQuota) * percentCommission*(1-percentTax);
    }
}


class Quota {
    private value: number;
    constructor(param: { value: number }) {
        this.value = param.value;
    }

    getValue():number {
        return this.value;
    }

}

class Commission {
}

class Tax {
}

class Sale {
    private amount: number;
    constructor(param: { amount: number }) {
        this.amount = param.amount;
    }

    getAmount() {
        return this.amount;
    }
}

describe('Bonus Calculation', () => {
    it('when sales are 1200; and quota is 1100; and commission is 10; and tax is 10; the bonus should be 9.', () => {
        let quota = new Quota({value:1100});
        let sales:Sale[] = [new Sale({amount:600}), new Sale({amount:600})];
        let commission: number = 10;
        let tax:number = 10;
        let person = new Person({quota: quota, sales: sales});

        let expectedBonus:number = 9;

        expect(person.getBonus( {commission: commission, tax: tax})).toBe(expectedBonus);

    });

    it('when sales are 1200; and quota is 1500; and commission is 10; and tax is 10; the bonus should be 0.', () => {
        let quota = new Quota({value:1500});
        let sales:Sale[] = [new Sale({amount:200}), new Sale({amount:800}), new Sale({amount:200})];
        let commission: number = 10;
        let tax:number = 10;
        let person = new Person({quota: quota, sales: sales});

        let expectedBonus:number = 0;

        expect(person.getBonus( {commission: commission, tax: tax})).toBe(expectedBonus);

    });

});