import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { getArgumentValues } from '../Utils';
import { EFormulaErrorCode } from '../FormulaError';

/**
 * returns the name of callee function from AST node
 *
 * @param {acorn.Node} callee
 * @param which
 * @returns {string} calleeName
 */
export const getCalleeName = (which: IFormulaNode): string =>
    which.name ? which.name.toLowerCase() : which.property?.name.toLowerCase();

/**
 * Evaluate the call expression and put the value in the context for that respective node
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {acorn.Node[]} ancestor
 * @example
 * SUM(N1,N2)
 * N1.ACTUAL.Range(1,3)
 */
const CallExpression = (node: IFormulaNode, context: ExecutionContext) => {
    
    const which = getCalleeName(node.callee);
    
    const object = node.callee.object;

    if (!which) {
        context.setError(
            EFormulaErrorCode.SEMI_COLON,
            'Missing semicolon, please add semicolon after each assignment statement',
        );
        return;
    }

    if (isResolvedFunction(node, context)) {
        return;
    }

    if (which in context.FunctionsMap) {
        context.put(node, context.FunctionsMap[which](node, context));
        return;
    }

    if (object && typeof object[which] === 'function') {
        const argumentValues = getArgumentValues(node, context);

        context.put(node, <IFormulaObject>object[which](...argumentValues));
        return;
    }

    context.setError(EFormulaErrorCode.NAME, `Invalid function name ${which}`);
    context.put(node, NaN);
};

/**
 * This function check whether the callee is already resolved by different visitor
 * if it is already resolved then evaluate the expression and put the value in context and return true
 * if not the return false
 * This case occurs usually when there is any predefined javascript lib function like Math.min is used in the formula
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @example
 * Math.min(5,6,1) // In this case the function Math.min will be already evaluated and added to context by other visitors
 */
const isResolvedFunction = (node: IFormulaNode, context: ExecutionContext) => {
    
    const which = context.get(node.callee);
    if (typeof which === 'function') {
        const argumentValues = getArgumentValues(node, context);
        context.put(node, (<(...args) => IFormulaObject>which)(...argumentValues));
        return true;
    }
    return false;
};

export default CallExpression;
