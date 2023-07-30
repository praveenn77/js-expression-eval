import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { resolveValue } from '../Utils';

/**
 * Evaluate the test condition and returns consequent or alternate based on the result
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {*} result
 * @example
 * IF(CPI > 5, N1, N2) // returns N1 node for period index grater then 5 and N2 for other cases
 */
const If = (node: IFormulaNode, context: ExecutionContext) => {
    const { arguments: args } = node;
    const test = context.get(args[0]);
    const consequent = context.get(args[1]);
    const alternate = context.get(args[2]);
    return resolveValue(<IFormulaObject>test) ? consequent : alternate;
};

export default If;
