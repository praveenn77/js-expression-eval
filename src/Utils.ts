import ExecutionContext from './ExecutionContext';
import { InlineFormulaUtils } from './InlineFormulaUtils';
import { IFormulaNode, IFormulaObject } from './types/Formula.types';



/**
 * Recursively loop through all the arguments and evaluate the arguments
 *
 * @param {*} argument
 * @param {any[]} [values=[]]
 * @returns {*} result
 */
export const resolveValueArray = (argument: any, values: any[] = []) => {
    if (Array.isArray(argument)) {
        argument.forEach((arg) => {
            resolveValueArray(arg, values);
        });
    } else {
        values.push(resolveValue(argument));
    }
    return values;
};


/**
 * @description resolve the arguments of the node
 * @param {acorn.Node} node
 * @param {ExecutionContext} context
 * @param {boolean} [acceptsArray=true]
 * @returns {*} result
 * @example
 * if node has argument [N1,N2] the it will be resolved to current period value of N1 amd N2
 */
export const getArgumentValues = (node: IFormulaNode, context: ExecutionContext) => {
    const argumentValues: number[] = [];
    if(!node.arguments) return argumentValues;
    node.arguments.forEach((arg: IFormulaNode) => {
        const argument = <number>context.get(arg);
        resolveValueArray(argument, argumentValues);
    });
    return argumentValues;
};

export const resolveValue = (arg: IFormulaObject): number | string | boolean => {
    if (typeof arg === 'function') {
        return  <number>arg();
    }
    return <number>arg;
};

export const isValidNumber = (value) => {
    if (Number.isNaN(value) || (!Number.isFinite(value) && value !== null)) {
        return false;
    }
    return true;
};

export const isValidNumber2 = (value) => {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
        return false;
    }
    return true;
};

export const isAllNumber = (...args) => args.every((arg) => isValidNumber(arg));

export const toString = (value: number | boolean): string => {
    if (typeof value === 'boolean') {
        return value ? 'TRUE' : 'FALSE';
    }
    return value.toString();
};



export const replaceInlineScaling = (formula: string) => {
    const matches = formula.match(/\b((\d+(?:\.\d+)?)(K|M|B|T))\b/gi);
    if (matches && matches.length) {
        matches.forEach((match) => {
            const result = InlineFormulaUtils.evaluate(match);
            if (!result.error) {
                formula = formula.replace(match, result.newValue.toString());
            }
        });
    }
    return replacePercentageSymbols(formula);
};

export const replacePercentageSymbols = (formula: string) => {
    const matches = formula.match(/(\d+(\.\d+)?)%/gi);
    if (matches && matches.length) {
        matches.forEach((match) => {
            const pctValue = match.replace('%', '');
            formula = formula.replace(match, `PCT(${pctValue})`);
        });
    }
    return formula;
};
