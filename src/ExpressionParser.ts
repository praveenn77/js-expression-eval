import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import ExecutionContext from './ExecutionContext';
import { replaceInlineScaling, resolveValue } from './Utils';
import Visitors from './Visitors';
import { IFormulaNode, IVariableContext } from './types/Formula.types';
import { getCalleeName } from './Visitors/CallExpression';

/**
 * @class Formula
 * @description Scripts Formula class
 * @author Praveen N
 */
export  class ExpressionParser {
    private formulaAST: acorn.Node;

    private exeContext: ExecutionContext;

    /**
     * @description Creates an instance of Formula.
     * @param {acorn.Node} formulaAST
     * @param {ExecutionContext} context
     * @memberof Formula
     */
    constructor(formula: string, variables: IVariableContext = {}) {
        const processedFormula =  replaceInlineScaling(formula);
        this.formulaAST = acorn.parse(processedFormula, { ecmaVersion: 3 });
        this.exeContext =  new ExecutionContext(variables) ;
    }

    /**
     * @description This function evaluate the formula and returns the result
     * @returns {*} result - result of formula
     * @memberof Formula
     */
    public evaluate(): number | string | boolean {
        // Walk through the formula and evaluate each ast node
        walk.ancestor(this.formulaAST, <any>Visitors, undefined, this.exeContext);
        const resObject = (this.exeContext.get(this.formulaAST) || this.exeContext.lastResolvedValue);
        return resolveValue(<any>resObject);
    }


    public getAllIdentifiers(): string[] {
        const identifiers = new Set<string>();
        const variableNames = new Set<string>();
        walk.simple(this.formulaAST, <any>{
            Identifier: (node: IFormulaNode) => {
                if (!variableNames.has(node.name)) {
                    identifiers.add(node.name);
                }
            },
            AssignmentExpression: (node: IFormulaNode) => {
                variableNames.add(node.left.name);
            },
        });
        return Array.from(identifiers);
    }

    public getAllFunctionNames(): string[] {
        const functionNames: string[] = [];
        walk.simple(this.formulaAST, <any>{
            CallExpression: (node: IFormulaNode) => {
                functionNames.push(getCalleeName(node.callee));
            },
        });
        return functionNames;
    }

    public getError() {
        return this.exeContext.getError();
    }
}
