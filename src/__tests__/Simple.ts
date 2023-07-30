import  { ExpressionParser }  from "../ExpressionParser";

describe("Simple", () => {
    it("1+1 = 2", () => {
        const formula = new ExpressionParser("1 + 1");
        expect(formula.evaluate()).toBe(2);
    });
});


describe("Simple Object", () => {
    it("one level json", () => {
        const formula = new ExpressionParser("A",{ A : 10});
        expect(formula.evaluate()).toBe(10);
    });
    it("two level json", () => {
        const formula = new ExpressionParser("A.B",{ A : { B : 10}});
        expect(formula.evaluate()).toBe(10);
    });
});


describe("Object with function", () => {
    it("one level json", () => {
        const formula = new ExpressionParser("A + 20",{ A : () => 10});
        expect(formula.evaluate()).toBe(30);
    });
    it("two level json", () => {
        const formula = new ExpressionParser("A.B",{ A : { B : () => 10}});
        expect(formula.evaluate()).toBe(10);
    });
});

describe("Member expression function", () => {
    it("one level json", () => {
        const formula = new ExpressionParser("A.B + A.C",{ A : (identifier) => {
            switch(identifier){
                case "B" : return 10;
                case "C" : return 20;
            }
        } });
        expect(formula.evaluate()).toBe(30);
    });
});


