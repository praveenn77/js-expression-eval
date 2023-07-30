import { IFormulaNode } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
/**
 * Evaluate the member expression and put the value in the context for that respective node
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {acorn.Node[]} ancestor
 * @example
 * THIS.ACTUAL // Take the Object instance of `THIS` node and get value for ACTUAL from the instance and put it in context
 * THIS.ACTUAL.P1 //  Take the Object instance of `THIS.ACTUAL` and get value for P1 form the instance and put it in context
 */
const MemberExpression = (node: IFormulaNode, context: ExecutionContext) => {
    const object = <any>context.get(node.object);
    const property = node.property.type === 'Identifier' ? node.property.name : <string>context.get(node.property);
    // Check the type of the object and perform the respective operation
    switch (true) {

        case typeof object === 'function':
            context.put(node, object(property));
            break;

        case typeof object[property] === 'function':
            context.put(node, object[property].bind(object));
            break;

        case object instanceof Map:
            context.put(node, object.get(property));
            break;

        case property in object:
            context.put(node, object[property]);
            break;

        default:
            context.put(node, object);
    }
};

export default MemberExpression;
