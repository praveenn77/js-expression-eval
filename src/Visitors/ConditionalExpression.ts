import { IFormulaNode } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import If from '../Functions/If';

/**
 * Evaluate the conditional expression AST node and put the value in the context for that respective node
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {acorn.Node[]} ancestor
 * @example
 * CPI > 5 ? N1 : N2 // returns N1 node for period index grater then 5 and N2 for other cases
 */
const ConditionalExpression = (node: IFormulaNode, context: ExecutionContext) => {
    const conditionalNode: IFormulaNode = {
        
        arguments: <IFormulaNode[]>[node.test, node.consequent, node.alternate],
        ...node,
    };
    context.put(node, If(conditionalNode, context));
};

export default ConditionalExpression;
