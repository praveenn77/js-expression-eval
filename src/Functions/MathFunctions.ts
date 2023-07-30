import { ICallExpressionFunctions } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { getArgumentValues, isAllNumber } from '../Utils';

type IFunctionDetail = {
    name: string;
    multipleArgument?: boolean;
};

/**
 * @description window.Math function adapter
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {*} fun
 * @returns value
 */
const jsMathFunctionAdapter = (fun: IFunctionDetail) => (node: acorn.Node, context: ExecutionContext) => {
    const args = getArgumentValues(<any>node, context);
    if (!fun.multipleArgument && args.length > 1) {
        context.setTooManyArgsError(node, 'one');
        return NaN;
    }
    if (!isAllNumber(...args)) {
        context.setInvalidArgTypeError(node);
        return NaN;
    }
    const result = !fun.multipleArgument
        ? <number | Error>Math[fun.name](args[0])
        : <number | Error>Math[fun.name](...args);
    if (result instanceof Error) {
        context.setInvalidArgTypeError(node);
        return NaN;
    }
    return result;
};

// List of math function
const jsMathFunDetail: IFunctionDetail[] = [
    { name: 'min', multipleArgument: true },
    { name: 'max', multipleArgument: true },
    { name: 'pow', multipleArgument: true },
    { name: 'abs' },
    { name: 'exp' },
    { name: 'sqrt' },
];

const MathFunctions: ICallExpressionFunctions = {};

jsMathFunDetail.forEach((fun: IFunctionDetail) => {
    MathFunctions[fun.name] = jsMathFunctionAdapter(fun);
});

export default MathFunctions;
