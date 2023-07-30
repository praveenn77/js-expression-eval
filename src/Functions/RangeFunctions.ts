import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { EFormulaErrorCode } from '../FormulaError';
import { resolveValue, getArgumentValues, resolveValueArray } from '../Utils';


const Get = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args, callee } = node;
    const onCallee = <Array<any>>context.get(callee);
    if (onCallee && Array.isArray(onCallee)) {
        const index = <number>resolveValue(<IFormulaObject>context.get(args[0]));
        if (Number.isNaN(index) || typeof index !== 'number') {
            context.setError(EFormulaErrorCode.VALUE, 'GET function takes only number argument');
            return NaN;
        }
        return onCallee[index - 1];
    }
    const array: any = resolveValue(<IFormulaObject>context.get(args[0]));
    const index = <number>resolveValue(<IFormulaObject>context.get(args[1]));
    if (array instanceof Map) {
        return array.get(index);
    }
    if (!Array.isArray(array)) {
        context.setError(EFormulaErrorCode.VALUE, 'GET function takes only array as first argument');
        return NaN;
    }

    if (Number.isNaN(index) || typeof index !== 'number') {
        context.setError(EFormulaErrorCode.VALUE, 'GET function second argument(index) must be a number');
        return NaN;
    }
    return array[index - 1];
};

const Range = (node: IFormulaNode, context: ExecutionContext) => {
    
    const { arguments: args, callee } = node;
    if (args.length !== 2) {
        context.setError(EFormulaErrorCode.TOO_MANY_ARGS, 'RANGE function takes two arguments');
        return NaN;
    }
    const from = <number | string>resolveValue(<IFormulaObject>context.get(args[0]));
    const to = <number | string>resolveValue(<IFormulaObject>context.get(args[1]));

    let onCallee = <Array<number>>context.get(callee);


    if (!onCallee || !(Array.isArray(onCallee))) {
        context.setError(EFormulaErrorCode.VALUE, 'RANGE function works only on array');
        return NaN;
    }
    if (typeof from !== 'number' || typeof to !== 'number') {
        context.setError(EFormulaErrorCode.VALUE, 'RANGE function takes only number argument on array');
        return NaN;
    }
    return onCallee.slice(<number>from - 1, <number>to);

};



const Sort = (node: IFormulaNode, context: ExecutionContext) => {
    const values = getArgumentValues(node, context).filter((value) => value != null);
    if (values.some((value) => typeof value !== 'number')) {
        context.setError(EFormulaErrorCode.VALUE, 'SORT function takes only number arguments');
        return NaN;
    }
    return values.sort((a, b) => a - b);
};

const SortDesc = (node: IFormulaNode, context: ExecutionContext) => {
    const values = getArgumentValues(node, context).filter((value) => value != null);
    if (values.some((value) => typeof value !== 'number')) {
        context.setError(EFormulaErrorCode.VALUE, 'SORTDESC function takes only number arguments');
        return NaN;
    }
    return values.sort((a, b) => b - a);
};

const IndexOf = (node: IFormulaNode, context: ExecutionContext) => {
    const { arguments: args } = node;
    const array = resolveValueArray(<IFormulaObject>context.get(args[0]));
    const value = resolveValue(<IFormulaObject>context.get(args[1]));
    if (!Array.isArray(array)) {
        context.setError(EFormulaErrorCode.VALUE, 'INDEXOF function takes only array as first argument');
        return NaN;
    }
    return array.indexOf(value) + 1;
};

export default { Get, Range, Sort, SortDesc, IndexOf };
