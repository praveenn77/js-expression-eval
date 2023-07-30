import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { EFormulaErrorCode } from '../FormulaError';
import { resolveValue, resolveValueArray } from '../Utils';

/**
 * Evaluate the test condition and returns consequent or alternate based on the result
 *
 * @param {IFormulaNode} node
 * @param {ExecutionContext} context
 * @returns {*} result
 * @example
 * IN(Region, ["West","East"]) // returns true if Region is part the given array
 */
const In = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args } = node;
    const item = <number>resolveValue(<IFormulaObject>context.get(args[0]));
    const list = <number[]>context.get(args[1]);
    return list.includes(item);
};

/**
 * Evaluate the test condition and returns consequent or alternate based on the result
 *
 * @param {IFormulaNode} node
 * @param {ExecutionContext} context
 * @returns {*} result
 * @example
 * HAS( ["West","East"],Region) // returns true if Region is part the given array
 */
const HAS = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args } = node;
    if (args.length !== 2) {
        context.setError(EFormulaErrorCode.TOO_MANY_ARGS, `HAS function takes 2 arguments`);
        return NaN;
    }
    let arg1 = context.get(args[0]);
    if (!Array.isArray(arg1)) {
        arg1 = resolveValue(arg1);
    }
    if (arg1 === null) {
        return false;
    }
    if (!Array.isArray(arg1)) {
        context.setError(EFormulaErrorCode.VALUE, `HAS function takes arrays as first arguments`);
        return NaN;
    }
    const compareValue = resolveValue(<IFormulaObject>context.get(args[1]));
    if (typeof compareValue !== 'number' && typeof compareValue !== 'string') {
        context.setError(EFormulaErrorCode.VALUE, `HAS function takes number or string as second arguments`);
        return NaN;
    }
    const valueList = resolveValueArray(arg1);
    return valueList.includes(compareValue);
};

const HAS_ALL = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args } = node;
    if (args.length !== 2) {
        context.setError(EFormulaErrorCode.TOO_MANY_ARGS, `HAS_ALL function takes 2 arguments`);
        return NaN;
    }
    let arg1 = context.get(args[0]);
    if (!Array.isArray(arg1)) {
        arg1 = resolveValue(arg1);
    }
    let arg2 = context.get(args[1]);
    if (!Array.isArray(arg2)) {
        arg2 = resolveValue(arg2);
    }
    if (arg1 === null || arg2 === null) {
        return false;
    }
    if (!Array.isArray(arg1) || !Array.isArray(arg2)) {
        context.setError(EFormulaErrorCode.VALUE, `HAS_ALL function takes 2 arrays as arguments`);
        return NaN;
    }
    const valueList = resolveValueArray(arg1);
    const comparisonList = resolveValueArray(arg2);
    return comparisonList.every((comparisonValue) => valueList.includes(comparisonValue));
};

const HAS_SOME = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args } = node;
    if (args.length !== 2) {
        context.setError(EFormulaErrorCode.TOO_MANY_ARGS, `HAS_SOME function takes 2 arguments`);
        return NaN;
    }
    let arg1 = context.get(args[0]);
    if (!Array.isArray(arg1)) {
        arg1 = resolveValue(arg1);
    }
    let arg2 = context.get(args[1]);
    if (!Array.isArray(arg2)) {
        arg2 = resolveValue(arg2);
    }
    if (arg1 === null || arg2 === null) {
        return false;
    }
    if (!Array.isArray(arg1) || !Array.isArray(arg2)) {
        context.setError(EFormulaErrorCode.VALUE, `HAS_SOME function takes 2 arrays as arguments`);
        return NaN;
    }
    const valueList = resolveValueArray(arg1);
    const comparisonList = resolveValueArray(arg2);
    return comparisonList.some((comparisonValue) => valueList.includes(comparisonValue));
};

export default {
    In,
    HAS,
    HAS_ALL,
    HAS_SOME,
};
