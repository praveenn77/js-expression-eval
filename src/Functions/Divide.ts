import ExecutionContext from '../ExecutionContext';
import { getArgumentValues, isAllNumber, isValidNumber } from '../Utils';

/**
 * Divide the argument and returns the value
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {number} value - sum of arguments
 * @example
 * Divide(6,2) // Returns 3
 */
const Divide = (node: any, context: ExecutionContext) => {
    const argumentValues: number[] = getArgumentValues(node, context);
    const [numerator, denominator, alternate] = argumentValues;
    if (isAllNumber(numerator, denominator)) {
        if (numerator === null) {
            return null;
        }
        const res = numerator / denominator;
        if (isValidNumber(res)) {
            return res;
        }
    }
    if (argumentValues.length === 3) {
        return alternate;
    }
    context.setInvalidArgTypeError(node);
    return NaN;
};

export default Divide;
