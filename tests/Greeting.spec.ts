import { Greeting } from "../src/Greeting";

describe("Greeting", () => {
    test("should say hello", () => {
        expect(new Greeting("Anuj").hello()).toEqual("hello Anuj");
    });
});