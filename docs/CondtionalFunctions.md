# Conditional Functions
List of functions that perform conditional operations.

### IF
Returns the second value if the first value is true, otherwise returns the third value.

```javascript
const parser = new ExpressionParser('IF(1 > 2, "yes", "no")');
const result = parser.evaluate();
console.log(result); // no
```

### SWITCH
Returns the value of the first expression that is true.

#### Example 1

```javascript
const parser = new ExpressionParser('SWITCH(A+B, 10, "A+B is 10", 20, "A+B is 20", "A+B is something else")' ,
{ 
    A: 5,
    B: 5
});
const result = parser.evaluate();
console.log(result); // A+B is 10
```

#### Example 2

```javascript
const parser = new ExpressionParser('SWITCH(true, A> B, "A is greater than B", A < B, "A is less than B", "A is equal to B")' ,
{ 
    A: 5,
    B: 6
});
const result = parser.evaluate();
console.log(result); // A is less than B
```