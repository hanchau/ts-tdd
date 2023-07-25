export class Coin {
    private currency: string;
    private value: number;
    constructor(param: { currency: string; value: number }) {
        this.currency = param.currency;
        this.value = param.value;
    }

    getCurrency(): string {
        return this.currency;
    }

    getValue(): number {
        return this.value;
    }

}

export class Inventory {
    private cups: number;
    private hotWater: number;
    private coffeePowder: number;
    private creamPowder: number;
    private sugar: number;

    constructor(param: { coffeePowder: number; cups: number; hotWater: number; creamPowder: number; sugar: number }) {
        this.coffeePowder = param.coffeePowder;
        this.cups = param.cups;
        this.hotWater = param.hotWater;
        this.creamPowder = param.creamPowder;
        this.sugar = param.sugar;

    }

    updateAfterDispensingCoffee(coffeeOption: CoffeeOption | null) {
        this.coffeePowder -= coffeeOption?.getRecipe().coffeePowder;
        this.cups -= coffeeOption?.getRecipe().cup;
        this.hotWater -= coffeeOption?.getRecipe().hotWater;
        this.creamPowder -= coffeeOption?.getRecipe().creamPowder;
        this.sugar -= coffeeOption?.getRecipe().sugar;
    }

}

export class CoffeeVendingMachine {
    private coffeeOptions: CoffeeOption[];

    private currentSelectedCoffeeName: string | null = null;
    private currentSelectedCoffee: CoffeeOption | null = null;
    private currentProvidedCoins: Coin[] | null = null;
    private currentSumOfValueOfProvidedCoins: number | null = null;
    private inventory:Inventory;

    constructor(inventory: Inventory, coffeeOptions: CoffeeOption[]) {
        this.coffeeOptions = coffeeOptions;
        this.inventory = inventory;

    }

    acceptMoney(coins: Coin[]) {
        this.currentProvidedCoins = coins;
        let sumOfValueOfCoins: number = 0;
        for (const coin of coins) {
            sumOfValueOfCoins += coin.getValue();
            if (coin.getCurrency() !== 'USD') {
                this.currentProvidedCoins = null;
                throw new Error("Only USD Coins allowed.");
            }
        }
        this.currentSumOfValueOfProvidedCoins = sumOfValueOfCoins;
        return this.currentSumOfValueOfProvidedCoins;
    }

    acceptCoffeeSelection(selectedCoffee: string) {
        if (!this.currentProvidedCoins || !this.currentSumOfValueOfProvidedCoins) {
            throw new Error("Money Not Provided.");
        }

        for (const coffeeOption of this.coffeeOptions) {
            if (selectedCoffee === coffeeOption.getName()) {
                if (coffeeOption.getPrice() > this.currentSumOfValueOfProvidedCoins) {
                    throw new Error("Not Enough Money.");
                }
                this.currentSelectedCoffeeName = selectedCoffee;
                this.currentSelectedCoffee = coffeeOption;
                return true
            }
        }

    }


    provideCoffee() {
        if (!this.currentSelectedCoffeeName){
            throw new Error("Coffee Not Selected.");
        }
        this.inventory.updateAfterDispensingCoffee(this.currentSelectedCoffee);

    }

    getInventory(): Inventory {
        return this.inventory;
    }
}

export class CoffeeOption {
    private name: string;
    private price: number;
    private recipe: any;
    constructor(param: {
        name: string;
        price: number;
        recipe: {cup: number, coffeePowder: number; hotWater: number; creamPowder: number; sugar: number }
    }) {
        this.name = param.name;
        this.price = param.price;
        this.recipe = param.recipe;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getRecipe(){
        return this.recipe;
    }
}
