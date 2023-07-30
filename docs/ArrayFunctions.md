# Array Function
List of array functions that can be used in the expression.

### INDEXOF
Returns the index of the given value in the array. Returns -1 if the value is not found.

```javascript
const parser = new ExpressionParser('INDEXOF(A, 2)' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // 1
```

### HAS
Checks if the array has the given value. Returns true if the array has the value, false otherwise.

```javascript
const parser = new ExpressionParser('HAS(A, 2)' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // true
```

### HASALL
Checks if the array has all the given values. Returns true if the array has all the values, false otherwise.

```javascript
const parser = new ExpressionParser('HASALL(A, 2, 3)' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // true
```

### HASSOME
Checks if the array has some of the given values. Returns true if the array has some of the values, false otherwise.

```javascript
const parser = new ExpressionParser('HASSOME(A, 2, 4)' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // true
```

### COUNT
Returns the number of elements in the array.

```javascript
const parser = new ExpressionParser('COUNT(A)' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // 3
```

### SUM
Returns the sum of all the elements in the array.

```javascript
const parser = new ExpressionParser('SUM(A)' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // 6
```

### AVERAGE
Returns the average of all the elements in the array.

```javascript
const parser = new ExpressionParser('AVERAGE(A)' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // 2
```

### FILTERIF
Returns the elements in the array that meet the given criteria.

```javascript
const parser = new ExpressionParser('FILTERIF(A, ">2")' ,
{ 
    A: [1, 2, 3]
});
const result = parser.evaluate();
console.log(result); // [3]
```