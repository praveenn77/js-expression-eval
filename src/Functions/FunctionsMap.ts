import { Sum } from './Sum';
import Divide from './Divide';
import Concatenate from './Concatenate';
import If from './If';
import ArrayFunctions from './ArrayFunctions';
import RangeFunctions from './RangeFunctions';
import TypeCheckFunctions from './TypeCheckFunctions';
import Switch from './Switch';
import CountFunctions from './CountFunctions';
import MathFunctions from './MathFunctions';
import PCT from './PCT';
import * as Average from './Average';
import * as LogicalFunctions from './LogicalFunctions';
import { ICallExpressionFunctions } from '../types/Formula.types';

const functions = {
    Sum,
    Divide,
    If,
    Switch,
    Concatenate,
    PCT,
    ...RangeFunctions,
    ...ArrayFunctions,
    ...CountFunctions,
    ...TypeCheckFunctions,
    ...Average,
    ...MathFunctions,
    ...LogicalFunctions
};

// Create a function map with function name in lowercase as key
// It was done for the propose of case insensitive use of function name of formula
const FunctionMap: ICallExpressionFunctions = {};
Object.keys(functions).forEach((functionName) => {
    FunctionMap[functionName.toLocaleLowerCase()] = functions[functionName];
});

export default FunctionMap;
