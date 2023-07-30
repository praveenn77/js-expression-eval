import ExecutionContext from "../ExecutionContext";
import BaseObject from "../Objects/BaseObject";

export interface IFormulaNode extends acorn.Node {
    name: string;
    body: IFormulaNode[];
    callee: IFormulaNode;
    arguments: IFormulaNode[];
    elements: IFormulaNode[];
    expressions: IFormulaNode[];
    left: IFormulaNode;
    right: IFormulaNode;
    operator: string;
    property: IFormulaNode;
    test: IFormulaNode;
    consequent: IFormulaNode;
    alternate: IFormulaNode;
    expression: IFormulaNode;
    value: number;
    object: IFormulaNode;
    argument: IFormulaNode;
}

export type IFormulaObject =
    | string
    | number
    | boolean
    | ((...args: any) => IFormulaObject)
    | string[]
    | Date
    | BaseObject;

export interface ICallExpressionFunctions {
    [key: string]: (node: any, context: ExecutionContext) => string | boolean | number;
}