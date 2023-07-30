import { IFormulaNode } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
/**
 * Evaluate the literal and put the value in the context for that respective node
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {acorn.Node[]} ancestor
 * @example
 * 5 // Put literal value in context
 * 6 // Put literal value in context
 */
const Literal = (node: IFormulaNode, context: ExecutionContext) => {
    context.put(node, node.value);
};

export default Literal;
