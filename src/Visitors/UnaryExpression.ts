import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { isValidNumber, resolveValue } from '../Utils';
import { EFormulaErrorCode } from '../FormulaError';

const operatorFunctionsMap: { [key: string]: (value: number) => number | boolean } = {
    '-': (a: number) => -a,
    '+': (a: number) => a,
    '--': (a: number) => a - 1,
    '++': (a: number) => a + 1,
    '!': (a: number) => !a,
    '~': (a: number) => ~a,
};

/**
 * Evaluate the unary expression
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {acorn.Node[]} ancestor
 * @example
 * --5 //  4
 */
const UnaryExpression = (node: IFormulaNode, context: ExecutionContext) => {
    let value = <IFormulaObject>context.get(node.argument);
    value = <number>resolveValue(value);
    if (!isValidNumber(value)) {
        context.setError(EFormulaErrorCode.VALUE, `${node.operator} is used only with number value`);
        context.put(node, NaN);
        return;
    }
    context.put(node, operatorFunctionsMap[node.operator](value));
};

export default UnaryExpression;
