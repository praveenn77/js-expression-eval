# Average Functions
List of functions that calculate the average of a list of numbers.

### AVERAGE
Returns the average of the given numbers.

```javascript
const parser = new ExpressionParser('AVERAGE(1, 2, 3)');
const result = parser.evaluate();
console.log(result); // 2
```

### AVERAGE ARRAY
Returns the average of the given array of numbers.

```javascript
const parser = new ExpressionParser('AVERAGE(A)' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // 2
```

### AVERAGEEXZERO
Returns the average of the given numbers, excluding zero values.

```javascript
const parser = new ExpressionParser('AVERAGEEXZERO(1, 2, 3, 0)');
const result = parser.evaluate();
console.log(result); // 2
```

### AVERAGEEXNEG
Returns the average of the given numbers, excluding negative values.

```javascript
const parser = new ExpressionParser('AVERAGEEXNEG(1, 2, 3, -1)');
const result = parser.evaluate();
console.log(result); // 2
```

### AVERAGEEXZERONEG
Returns the average of the given numbers, excluding zero and negative values.

```javascript
const parser = new ExpressionParser('AVERAGEEXZERONEG(1, 2, 3, -1, 0)');
const result = parser.evaluate();
console.log(result); // 2
```

### AVERAGE IF
Returns the average of the given numbers that meet the given criteria.

```javascript
const parser = new ExpressionParser('AVERAGE(FILTERIF(A, ">2"))' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // 3
```
