import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { isAllNumber, isValidNumber, resolveValue, toString } from '../Utils';
import { EFormulaErrorCode } from '../FormulaError';
import { PCTObject } from '../Functions/PCT';

type ValueType = number | string | boolean;
export type ArithMeticFunction = (a: number, b: number) => number;
type StringFunction = (a: string, b: string) => string;
type LogicalFunction = (a: ValueType, b: ValueType) => ValueType;
type OperatorFunctionsMap = {
    ARITH_METIC_OPERATION: {
        [key: string]: ArithMeticFunction;
    };
    STRING_OPERATION: {
        [key: string]: StringFunction;
    };
    LOGICAL_OPERATION: {
        [key: string]: LogicalFunction;
    };
};

export const operatorFunctionsMap: OperatorFunctionsMap = {
    ARITH_METIC_OPERATION: {
        '+': (a: number, b: number) => a + b,
        '-': (a: number, b: number) => a - b,
        '*': (a: number, b: number) => {
            if (a === null || b === null) {
                return null;
            }
            return a * b;
        },
        '/': (a: number, b: number) => {
            if (a === null) {
                return null;
            }
            return a / b;
        },
        '^': (a: number, b: number) => a ** b,
    },
    STRING_OPERATION: {
        '&': (a: string, b: string) => a + b,
    },
    LOGICAL_OPERATION: {
        '==': (a: ValueType, b: ValueType) => a == b,
        '===': (a: ValueType, b: ValueType) => a === b,
        '!==': (a: ValueType, b: ValueType) => a !== b,
        '!=': (a: ValueType, b: ValueType) => a != b,
        '&&': (a: ValueType, b: ValueType) => a && b,
        '||': (a: ValueType, b: ValueType) => a || b,
        '>': (a: ValueType, b: ValueType) => a > b,
        '>=': (a: ValueType, b: ValueType) => a >= b,
        '<': (a: ValueType, b: ValueType) => a < b,
        '<=': (a: ValueType, b: ValueType) => a <= b,
    },
};

/**
 * Evaluate the binary expression and put the value in the context for that respective node
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {acorn.Node[]} ancestor
 * @example
 * CPI > 3 // If current period index is grater than 3 then put true in context else put false in context
 */
const BinaryExpression = (node: IFormulaNode, context: ExecutionContext) => {
    let value1 = <IFormulaObject>context.get(node.left);
    let value2 = <IFormulaObject>context.get(node.right);
    value1 = <number>resolveValue(value1);
    value2 = <number>resolveValue(value2);
    let result: ValueType = NaN;
    if (<any>value2 instanceof PCTObject) {
        if (!isValidNumber(value1)) {
            context.setError(
                EFormulaErrorCode.VALUE,
                `Value type error, ${node.operator} can be used only with number value`,
            );
            result = NaN;
        } else {
            result = <number>(<any>value2).evaluate(value1, node.operator);
            if (isNaN(result)) {
                context.setError(EFormulaErrorCode.VALUE, '% can be used only with + or - operator');
            }
        }
    } else if (node.operator in operatorFunctionsMap.ARITH_METIC_OPERATION) {
        if (isAllNumber(value1, value2)) {
            if (value1 === null && value2 === null) {
                result = null;
            } else if (node.operator === '/' && (value2 === 0 || value2 === null)) {
                context.setError(EFormulaErrorCode.DIV_BY_ZERO, 'Dived by zero error');
                result = NaN;
            } else {
                result = operatorFunctionsMap.ARITH_METIC_OPERATION[node.operator](value1, value2);
            }
        } else {
            context.setError(
                EFormulaErrorCode.VALUE,
                `Value type error, ${node.operator} can be used only with number value`,
            );
            result = NaN;
        }
    } else if (node.operator in operatorFunctionsMap.STRING_OPERATION) {
        result = operatorFunctionsMap.STRING_OPERATION[node.operator](toString(value1), toString(value2));
    } else if (node.operator in operatorFunctionsMap.LOGICAL_OPERATION) {
        result = operatorFunctionsMap.LOGICAL_OPERATION[node.operator](value1, value2);
    }
    context.put(node, result);
};

export default BinaryExpression;
