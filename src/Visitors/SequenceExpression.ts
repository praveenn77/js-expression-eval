import { IFormulaNode, IFormulaObject } from '../types/Formula.types';
import ExecutionContext from '../ExecutionContext';
import { resolveValue } from '../Utils';

const SequenceExpression = (node: IFormulaNode, context: ExecutionContext) => {
    let value: string | number = '';
    node.expressions.forEach((exp) => {
        const val = resolveValue(context.get(exp) as IFormulaObject);
        value += val.toString();
    });
    if (!Number.isNaN(Number(value))) {
        value = parseFloat(value);
    }
    context.put(node, value);
};

export default SequenceExpression;
