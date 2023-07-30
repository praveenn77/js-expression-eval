import ExecutionContext from '../ExecutionContext';
import { getArgumentValues } from '../Utils';

/**
 * Concatenate the argument and returns the value
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {string} value
 */
const Concatenate = (node: any, context: ExecutionContext) => {
    const argumentValues = getArgumentValues(node, context);
    let result: string | number = '';
    argumentValues.some((argumentValue) => {
        const type = typeof argumentValue;
        if (argumentValue && type !== 'string' && type !== 'number') {
            result = NaN;
            return true;
        }
        result += argumentValue.toString();
    });
    return result;
};

export default Concatenate;
