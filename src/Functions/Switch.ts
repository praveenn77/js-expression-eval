import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { resolveValue } from '../Utils';

/**
 * Evaluate the expression and returns the value based on the expression value
 *
 * @param {acorn.Comment} node
 * @param {ExecutionContext} context
 * @returns {*} result
 * @example
 * Switch(CPI ,1, N1,2, N2,N3) // returns N1 node for period index 1 and  N2 node for period index 2 and N3 node for all others
 */
const Switch = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args } = node;
    const expressionValue = resolveValue(<IFormulaObject>context.get(args[0]));
    for (let i = 1; i < args.length; i += 2) {
        if (expressionValue === resolveValue(<IFormulaObject>context.get(args[i]))) {
            return context.get(args[i + 1]);
        }
    }
    // Returning default value incase no condition matches;
    return args.length % 2 === 0 ? context.get(args[args.length - 1]) : null;
};

export default Switch;
