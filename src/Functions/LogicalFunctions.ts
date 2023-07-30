import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { getArgumentValues, resolveValue } from '../Utils';

/**
 * @description Logical AND function
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {boolean} result
 * @example
 * AND(true,false) // returns false
 */
const AND = (node: IFormulaNode, context: ExecutionContext) => {
    const argumentValues = getArgumentValues(node, context);
    return argumentValues.reduce((a: number, b: number) => a && b);
};

/**
 * @description Logical OR function
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {boolean} result
 * @example
 * OR(true,false) // returns true
 */
const OR = (node: IFormulaNode, context: ExecutionContext) => {
    const argumentValues = getArgumentValues(node, context);
    return argumentValues.reduce((a: number, b: number) => a || b);
};

/**
 * @description Logical XOR function
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {boolean} result
 * @example
 * XOR(true,false) // returns false
 * XOR(false,false) // returns true
 * XOR(true,true) // returns true
 */
const XOR = (node: IFormulaNode, context: ExecutionContext) => {
    const argumentValues = getArgumentValues(node, context);
    return argumentValues.reduce((a: number, b: number) => a ^ b);
};

/**
 * @description Logical NOT function
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {boolean} result
 * @example
 * NOT(true) // returns false
 * NOT(false) // returns true
 */
const NOT = (node: IFormulaNode, context: ExecutionContext) => {

    let value = <IFormulaObject>context.get(node.arguments[0]);
    value = <boolean>resolveValue(value);
    return !value;
};

export { AND, OR, NOT, XOR };
