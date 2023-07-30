import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';

/**
 * Evaluate the array expression and put those value in context
 *
 * @param {*} node
 * @param {ExecutionContext} context
 * @param {*} ancestor
 * @example
 * [1,2,3]
 * This will convert this expression to array and put it in a context
 */
const ArrayExpression = (node: IFormulaNode, context: ExecutionContext) => {
    const value: IFormulaObject[] = node.elements.map((e: IFormulaNode) => <IFormulaObject>context.get(e));
    context.put(node, value);
};

export default ArrayExpression;
