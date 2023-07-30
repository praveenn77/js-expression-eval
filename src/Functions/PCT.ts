import ExecutionContext from '../ExecutionContext';
import { getArgumentValues, isValidNumber } from '../Utils';

export class PCTObject {
    private value: number;
    constructor(value: number) {
        this.value = value / 100;
    }
    public getValue() {
        return this;
    }
    public evaluate(value1: number, operator: string) {
        if (operator === '+') {
            return value1 * (1 + this.value);
        }
        if (operator === '-') {
            return value1 * (1 - this.value);
        }
        return NaN;
    }
}

/**
 * Text the argument and returns the value
 *
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @returns {string}
 */

const PCT = (node: acorn.Node, context: ExecutionContext) => {
    const argumentValues: number[] = getArgumentValues(<any>node, context);
    if (argumentValues.length > 1) {
        context.setTooManyArgsError(node, 'one');
        return NaN;
    }
    if (!isValidNumber(argumentValues[0])) {
        context.setInvalidArgTypeError(node);
        return NaN;
    }
    return new PCTObject(argumentValues[0]);
};

export default PCT;
