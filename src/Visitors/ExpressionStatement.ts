import ExecutionContext from '../ExecutionContext';
import { IFormulaNode } from '../types/Formula.types';

/**
 * Get call whenever there is parenthesis "()" in formula
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {acorn.Node[]} ancestor
 * @example
 * (5+6) // Here 5+6 is already evaluated by binary visitor , this visitor get that value and put it in the context
 * (6) // Put the value 6 in context
 */
const ExpressionStatement = (node: IFormulaNode, context: ExecutionContext) => {
    context.put(node, context.get(node.expression));
};

export default ExpressionStatement;
