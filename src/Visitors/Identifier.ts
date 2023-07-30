import ExecutionContext from '../ExecutionContext';
import { IFormulaNode } from '../types/Formula.types';

/**
 * Evaluate the identifier and put the value in the context for that respective node
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {acorn.Node[]} ancestor
 * @example
 * Sum // Ignore function statements
 */
const Identifier = (node: IFormulaNode, context: ExecutionContext) => {
    const identifier = node.name;
    switch (true) {
        case context.isVariableDefined(identifier):
            context.put(node, context.getVariable(identifier));
            break;

        case identifier.toLowerCase() in context.FunctionsMap:
            break;
        default:
            context.put(node, identifier);
    }
};

// Exporting IdentifierVisitor function as Identifier
export default Identifier;
