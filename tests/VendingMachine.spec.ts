import {CoffeeVendingMachine, Coin, CoffeeOption, Inventory} from "../src/CoffeeVendingMachine";

describe('CoffeeVendingMachine', () => {

    let coffeeVendingMachine: CoffeeVendingMachine;
    let baseInventory: Inventory;

    let tenCentsCoin: Coin;
    let twentyCentsCoin: Coin;
    let coins: Coin[];

    let blackCoffee: CoffeeOption;
    let creamCoffee: CoffeeOption;
    let sugarCoffee: CoffeeOption;
    let creamAndSugarCoffee: CoffeeOption;
    let coffeeOptions: CoffeeOption[];


    beforeEach(() => {
        tenCentsCoin = new Coin({currency: 'USD', value:10});
        twentyCentsCoin = new Coin({currency: 'USD', value:20});
        coins = [tenCentsCoin, twentyCentsCoin];

        baseInventory = new Inventory({cups: 10, hotWater:100, coffeePowder:100, creamPowder:100, sugar:100});

        blackCoffee = new CoffeeOption({name: 'Black', price: 10, recipe: {cup: 1, coffeePowder: 10, hotWater: 10, creamPowder: 0, sugar: 0}});
        creamCoffee = new CoffeeOption({name: 'Cream', price: 20, recipe: {cup: 1, coffeePowder: 10, hotWater: 10, creamPowder: 10, sugar: 0}});
        sugarCoffee = new CoffeeOption({name: 'Sugar', price: 15, recipe: {cup: 1, coffeePowder: 10, hotWater: 10, creamPowder: 0, sugar: 10}});
        creamAndSugarCoffee = new CoffeeOption({name: 'Cream & Sugar', price: 30, recipe: {cup: 1, coffeePowder: 10, hotWater: 10, creamPowder: 10, sugar: 10}});
        coffeeOptions = [blackCoffee, creamCoffee, sugarCoffee, creamAndSugarCoffee];

    })


    it('1. should throw an error if any one of the coins entered is not an american coin.', () => {
        let tenRupeeCoin:Coin = new Coin({currency: 'INR', value:10});
        coins = [tenCentsCoin, twentyCentsCoin, tenRupeeCoin];

        coffeeVendingMachine = new CoffeeVendingMachine(baseInventory, coffeeOptions);

        expect(() => {
            coffeeVendingMachine.acceptMoney(coins)
        }).toThrowError("Only USD Coins allowed.");
    });

    it('2. should update the machine state with the Coins entered and return the sum of value of coins.', () => {
        coins = [tenCentsCoin, twentyCentsCoin];
        let expectedSumOfValueOfCoins:number = 30;
        coffeeVendingMachine = new CoffeeVendingMachine(baseInventory, coffeeOptions);

        expect(coffeeVendingMachine.acceptMoney(coins)).toBe(expectedSumOfValueOfCoins);
    });

    it('3. should throw a `Money Not Provided` error if the money is not provided before selecting the Coffee.', () => {
        coffeeVendingMachine = new CoffeeVendingMachine(baseInventory, coffeeOptions);

        let selectedCoffee:string = "Cream";

        expect(() => {
            coffeeVendingMachine.acceptCoffeeSelection(selectedCoffee)
        }).toThrowError("Money Not Provided.")
    });


    it('4. should throw a `Not Enough Money` error if the price of the selected coffee is more than the sum of value of given coins.', () => {
        coins = [tenCentsCoin];
        coffeeVendingMachine = new CoffeeVendingMachine(baseInventory, coffeeOptions);

        coffeeVendingMachine.acceptMoney(coins);

        let selectedCoffee:string = "Cream";

        expect(() => {
            coffeeVendingMachine.acceptCoffeeSelection(selectedCoffee)
        }).toThrowError("Not Enough Money.")

    });

    it('5. should throw a `Coffee Not Selected` error if the coffee is not selected before requesting to provide coffee.', () => {
        coins = [tenCentsCoin, twentyCentsCoin];
        coffeeVendingMachine = new CoffeeVendingMachine(baseInventory, coffeeOptions);

        coffeeVendingMachine.acceptMoney(coins);

        let selectedCoffee:string = "Cream";

        // coffeeVendingMachine.acceptCoffeeSelection(selectedCoffee);

        expect(() => {
            coffeeVendingMachine.provideCoffee()
        }).toThrowError('Coffee Not Selected')

    });


    it('6. should update the inventory after providing the selected coffee.', () => {
        coins = [tenCentsCoin, twentyCentsCoin];
        coffeeVendingMachine = new CoffeeVendingMachine(baseInventory, coffeeOptions);
        let selectedCoffee:string = "Cream";
        // creamCoffee = new CoffeeOption({name: 'Cream', price: 20, recipe: {cup: 1, coffeePowder: 10, hotWater: 10, creamPowder: 10, sugar: 0}});
        // baseInventory = new Inventory({cups: 10, hotWater:100, coffeePowder:100, creamPowder:100, sugar:100});

        let expectedInventory = new Inventory({cups: 9, hotWater:90, coffeePowder:90, creamPowder:90, sugar:100});

        coffeeVendingMachine.acceptMoney(coins);
        coffeeVendingMachine.acceptCoffeeSelection(selectedCoffee);
        coffeeVendingMachine.provideCoffee()

        expect(coffeeVendingMachine.getInventory()).toStrictEqual(expectedInventory)

    });

});
