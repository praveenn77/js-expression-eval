import Formula from "../Formula";

describe("Simple", () => {
    it("should return 2", () => {
        const formula = new Formula("1 + 1");
        expect(formula.evaluate()).toBe(2);
    });
});