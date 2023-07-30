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
const AssignmentExpression = (node: IFormulaNode, context: ExecutionContext) => {
    const variable = node.left.name;
    const value = <IFormulaObject>context.get(node.right);
    context.setVariable(variable, value);
    context.put(node, value);
};

export default AssignmentExpression;
