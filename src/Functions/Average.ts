import ExecutionContext from '../ExecutionContext';
import { getArgumentValues, isAllNumber } from '../Utils';

/**
 * Average the argument and returns the value
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param options
 * @returns {number} value - sum of arguments
 * @example
 * Average(1,5) // Returns 3
 * Average(N1.ACTUAL) // returns average of all the period values of actual series of N1
 */
export const Average = (
    node: any,
    context: ExecutionContext,
    options = { excludeNegative: false, excludeZero: false },
) => {
    let argumentValues = getArgumentValues(node, context);
    argumentValues =
        options.excludeNegative || options.excludeZero
            ? argumentValues.filter(
                  (value: number) => (!options.excludeNegative || value >= 0) && (!options.excludeZero || value !== 0),
              )
            : argumentValues.filter((value) => value !== null && value !== undefined);
    if (!isAllNumber(...argumentValues)) {
        context.setInvalidArgTypeError(node);
        return NaN;
    }
    return argumentValues.length !== 0
        ? argumentValues.reduce((a: number, b: number) => a + b, 0) / argumentValues.length
        : 0;
};

// Average excluding zero
export const AverageExZero = (node: any, context: ExecutionContext) =>
    Average(node, context, { excludeNegative: false, excludeZero: true });

// Average excluding negative values
export const AverageExNeg = (node: any, context: ExecutionContext) =>
    Average(node, context, { excludeNegative: true, excludeZero: false });

// Average excluding zero and negative values
export const AverageExZeroNeg = (node: any, context: ExecutionContext) =>
    Average(node, context, { excludeNegative: true, excludeZero: true });
