import ExecutionContext from '../ExecutionContext';
import { operatorFunctionsMap } from '../Visitors/BinaryExpression';
import { resolveValue } from '../Utils';
import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import { EFormulaErrorCode } from '../FormulaError';

/**
 * Returns the length of array
 *
 * @param {*} node
 * @param {ExecutionContext} context
 * @returns {*} result
 * @example
 * Count([1,2,3]) // returns 3
 */
const Count = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args } = node;
    const arg0 = context.get(args[0]);
    if (Array.isArray(arg0)) {
        return arg0.length;
    }
    return args.length;
};
/**
 * Returns the count of items matches the condition
 *
 * @param {*} node
 * @param {ExecutionContext} context
 * @returns {*} result
 * @example
 * Count([1,2,-3], ">0") // returns 2
 */
const CountIf = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args } = node;
    const list = <number[]>context.get(args[0]);
    const condition = <string>resolveValue(<IFormulaObject>context.get(args[1]));
    let operator = '==';
    let compareWithValue;
    if (!Array.isArray(list)) {
        return NaN;
    }
    if (Number.isInteger(Number(condition)) || condition === null) {
        compareWithValue = condition;
    } else if (typeof condition === 'string') {
        const items = condition.split(/([0-9]+)/);
        [operator] = items;
        compareWithValue = parseInt(items[1], 10);
        if (!/<|<=|>|>=|==|===/.test(operator) || Number.isNaN(compareWithValue)) {
            return NaN;
        }
    }
    let count = 0;
    const comparatorFunction = operatorFunctionsMap.LOGICAL_OPERATION[operator];
    list.forEach((value) => {
        const resolvedValue = <number>resolveValue(value);
        if (comparatorFunction(resolvedValue, compareWithValue)) count += 1;
    });
    return count;
};

const FilterIf = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args } = node;
    const list = <number[]>context.get(args[0]);
    const condition = <string>resolveValue(<IFormulaObject>context.get(args[1]));
    let operator = '==';
    let compareWithValue;
    if (!Array.isArray(list)) {
        return NaN;
    }
    if (Number.isInteger(Number(condition)) || condition === null) {
        compareWithValue = condition;
    } else if (typeof condition === 'string') {
        const items = condition.split(/([0-9]+)/);
        [operator] = items;
        compareWithValue = parseInt(items[1], 10);
        if (!/<|<=|>|>=|==|===/.test(operator) || Number.isNaN(compareWithValue)) {
            return NaN;
        }
    }
    const result = [];
    const comparatorFunction = operatorFunctionsMap.LOGICAL_OPERATION[operator];
    list.forEach((value) => {
        const resolvedValue = <number>resolveValue(value);
        if (comparatorFunction(resolvedValue, compareWithValue)) result.push(value);
    });
    return result;
};

export default { Count, CountIf, FilterIf };
