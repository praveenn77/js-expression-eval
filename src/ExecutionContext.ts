import FunctionMaps from './Functions/FunctionsMap';
import { EFormulaErrorCode } from './FormulaError';
import { IFormulaObject } from './types/Formula.types';
/**
 * @description This class contains the variable,resolutionObject for the execution context
 * @class ExecutionContext
 */
class ExecutionContext {
    protected resolutionObject: { [key: string]: IFormulaObject | IFormulaObject[] } = {};
    protected variables: { [key: string]: IFormulaObject | IFormulaObject[] } = {};

    public FunctionsMap: typeof FunctionMaps;

    private error: {
        error: EFormulaErrorCode;
        message?: string;
    } | null = null;

    public lastResolvedValue: IFormulaObject | IFormulaObject[] | null = null;

    /**
     * @description Creates an instance of ExecutionContext.
     */
    constructor(variable) {
        this.resolutionObject = {};
        this.variables =  variable;
        this.FunctionsMap = FunctionMaps;
    }

    getCopy = () => {
       return new ExecutionContext({ ...this.variables });
    };

    setError = (error: EFormulaErrorCode, message?: string) => {
        if (!this.error) {
            this.error = {
                error,
                message,
            };
        }
    };

    setInvalidArgTypeError = (astNode) => {
        const errorMessage = `Invalid argument type, ${astNode.callee.name} only accepts number arguments`;
        this.setError(EFormulaErrorCode.VALUE, errorMessage);
    };

    setTooManyArgsError = (astNode, noOfArgs: string) => {
        const errorMessage = `Too many arguments, ${astNode.callee.name} function only accepts ${noOfArgs} arguments`;
        this.setError(EFormulaErrorCode.TOO_MANY_ARGS, errorMessage);
    };

    getError = () => {
        return this.error ? this.error : null;
    };

    /**
     * @description put the value for the AST node in the  execution context
     */
    put(node: acorn.Node, value: IFormulaObject | IFormulaObject[]) {
        const key = `${node.start}_${node.end}`;
        this.resolutionObject[key] = value;
        this.lastResolvedValue = value;
    }

    setVariable(name: string, value: IFormulaObject | IFormulaObject[]) {
        this.variables[name] = value;
    }

    isVariableDefined(name: string) {
        return name in this.variables;
    }

    getVariable(name: string) {
        return name in this.variables ? this.variables[name] : null;
    }

    /**
     * @description returns the value of a AST node in the execution context
     * @returns {*} value - value of a AST node
     * @memberof ExecutionContext
     */
    get(node: acorn.Node) {
        const key = `${node.start}_${node.end}`;
        return key in this.resolutionObject ? this.resolutionObject[key] : null;
    }
}

export default ExecutionContext;
