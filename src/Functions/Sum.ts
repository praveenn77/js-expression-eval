import ExecutionContext from '../ExecutionContext';
import { getArgumentValues, isValidNumber } from '../Utils';

/**
 * Sum the argument and returns the value
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {number} value - sum of arguments
 * @example
 * SUM(1,5) // Returns 6
 * SUM(N1.ACTUAL) // returns sum of all the period values of actual series of N1
 */
const Sum = (node: any, context: ExecutionContext) => {
    const argumentValues: number[] = getArgumentValues(node, context);
    let sum = argumentValues[0];
    if (!isValidNumber(sum)) {
        context.setInvalidArgTypeError(node);
        return NaN;
    }
    let isAllNull = sum === null;
    for (let i = 1; i < argumentValues.length; i += 1) {
        if (!isValidNumber(argumentValues[i])) {
            context.setInvalidArgTypeError(node);
            return NaN;
        }
        if (isAllNull && argumentValues[i] !== null) {
            isAllNull = false;
        }
        sum += argumentValues[i];
    }
    return isAllNull ? null : sum;
};

export { Sum };
