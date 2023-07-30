# js-expression-eval
Javascript based string expression evaluation library.

This library can evaluate a string expression and return the result. It supports basic arithmetic operations like addition, subtraction, multiplication, division and modulus. It also supports variables and functions.

## Installation

### yarn

```bash
yarn add js-expression-eval
```
### npm

```bash
npm install js-expression-eval
```

## Usage

## Syntax

```javascript
import ExpressionParser from 'js-expression-eval';
const parser = new ExpressionParser(expression, variables?);
const result = parser.evaluate();
```

### Basic arithmetic operations

```javascript
import ExpressionParser from 'js-expression-eval';
const parser = new ExpressionParser('2 + 3');
const result = parser.evaluate();
console.log(result); // 5
```

### Variables

```javascript
import ExpressionParser from 'js-expression-eval';
const parser = new ExpressionParser('x + y.z', { x: 2, y: { z: 3 } });
const result = parser.evaluate();
console.log(result); // 5
```

### Functions

```javascript
import ExpressionParser from 'js-expression-eval';
const parser = new ExpressionParser('A + B', { A: 2, B: () => 3 });
const result = parser.evaluate();
console.log(result); // 5
```

### Function with method chaining

```javascript
import ExpressionParser from 'js-expression-eval';
const parser = new ExpressionParser('A.B + A.C' ,
{ 
    A: (identifier) => {
    switch (identifier) {
        case 'B':
            return 2;
        case 'C':
            return 3;
        }
    }
});
const result = parser.evaluate();
console.log(result); // 5
```


## Predefined functions
By default the parser has list predefined functions.

1. [Array Functions](docs/ArrayFunctions.md)
2. [Math Functions](docs/MathFunctions.md)
3. [Average Functions](docs/AverageFuntions.md)
4. [Conditional Functions](docs/CondtionalFunctions.md)
5. [Logical Functions](docs/LogicalFunctions.md)


## New function request
If you want to add a new function to the parser, please create a new issue with the function name and the function description. We will add the function to the parser as soon as possible.

## License
[MIT](LICENSE)

## Libraries used
1. [acorn](https://github.com/acornjs/acorn)