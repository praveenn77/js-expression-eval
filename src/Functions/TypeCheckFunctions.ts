import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { getArgumentValues, isValidNumber, isValidNumber2, resolveValue } from '../Utils';

const emptyItems = ['', null, undefined];
/**
 * Evaluate the test condition and returns consequent or alternate based on the result
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {*} result
 * @example
 * IsEmpty(Region) // returns true if the value of Region is empty
 */
const IsEmpty = (node: IFormulaNode, context: ExecutionContext) => {
    
    const item = resolveValue(<IFormulaObject>context.get(node.arguments[0]));
    return emptyItems.includes(<string>item);
};

/**
 * Returns the length of array
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {number} result
 * @example
 * IsNumber(45/0) // FALSE
 * IsNumber(78) // TRUE
 * IsNumber("TT") // FALSE
 */
const IsNumber = (node: IFormulaNode, context: ExecutionContext) => {
    
    const value: any = resolveValue(<IFormulaObject>context.get(node.arguments[0]));
    return isValidNumber2(value);
};

/**
 * Returns the length of array
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {number} result
 * @example
 * Assign_If_NaN(45/0,20) 20
 * Assign_If_NaN(78,20) 78
 * Assign_If_NaN("TT",20) 20
 */
const IfNA = (node: IFormulaNode, context: ExecutionContext) => {
    const args: number[] = getArgumentValues(node, context);
    if (isValidNumber(args[0])) {
        return args[0];
    }
    return args[1] || 0;
};

export default {
    IsEmpty,
    IsBlank: IsEmpty,
    IsNumber,
    IfNA,
};
