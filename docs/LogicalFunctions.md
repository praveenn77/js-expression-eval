# Logical Functions
List of functions that perform logical operations.

### AND
Returns true if all the given values are true, false otherwise.

```javascript
const parser = new ExpressionParser('AND(1 > 2, 2 > 1)');
const result = parser.evaluate();
console.log(result); // false
```
### OR
Returns true if any of the given values are true, false otherwise.

```javascript
const parser = new ExpressionParser('OR(1 > 2, 2 > 1)');
const result = parser.evaluate();
console.log(result); // true
```
### NOT
Returns true if the given value is false, false otherwise.

```javascript
const parser = new ExpressionParser('NOT(1 > 2)');
const result = parser.evaluate();
console.log(result); // true
```
### XOR
Returns true if one of the given values is true, false otherwise.

```javascript
const parser = new ExpressionParser('XOR(1 > 2, 2 > 1)');
const result = parser.evaluate();
console.log(result); // true
```
