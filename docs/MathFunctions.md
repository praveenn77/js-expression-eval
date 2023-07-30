# Math Functions
List of functions that perform mathematical operations.

### SUM
Returns the sum of the given numbers.

```javascript
const parser = new ExpressionParser('SUM(1, 2, 3)');
const result = parser.evaluate();
console.log(result); // 6
```

### DIVIDE
Returns the result of dividing the first number by the second number.

```javascript
const parser = new ExpressionParser('DIVIDE(6, 2)');
const result = parser.evaluate();
console.log(result); // 3
```

### MIN
Returns the smallest number in the given numbers.

```javascript
const parser = new ExpressionParser('MIN(1, 2, 3)');
const result = parser.evaluate();
console.log(result); // 1
```

### MAX
Returns the largest number in the given numbers.

```javascript
const parser = new ExpressionParser('MAX(1, 2, 3)');
const result = parser.evaluate();
console.log(result); // 3
```

### POW
Returns the result of raising the first number to the power of the second number.

```javascript
const parser = new ExpressionParser('POW(2, 3)');
const result = parser.evaluate();
console.log(result); // 8
```

### SQRT
Returns the square root of the given number.

```javascript
const parser = new ExpressionParser('SQRT(4)');
const result = parser.evaluate();
console.log(result); // 2
```

### ABS
Returns the absolute value of the given number.

```javascript
const parser = new ExpressionParser('ABS(-4)');
const result = parser.evaluate();
console.log(result); // 4
```

### EXP
Returns e raised to the power of the given number.

```javascript
const parser = new ExpressionParser('EXP(1)');
const result = parser.evaluate();
console.log(result); // 2.718281828459045
```

