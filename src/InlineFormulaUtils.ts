export class InlineFormulaUtils {
    public static evaluate(input: string, thousandSeparator: string = ',', decimalSeparator: string = '.') {
        // Remove any number formatting strings from the cell input
        const removeFormatRegex = new RegExp(`\\s|\\${thousandSeparator}`, 'g');
        let trimmedInput = input.replace(removeFormatRegex, '').replace(decimalSeparator, '.');
        // making sure we preserve the -ve sign in case where thousand separator or decimal separator selected is "-"
        if (input[0] === '-' && trimmedInput[0] !== '-') {
            trimmedInput = `-${trimmedInput}`;
        }
        // If the input consists of scaled value, parse the input and replace the scaled value with original value
        const scaleParser = /(\d+(?:\.\d+)?)(TH|K|M|B|T)/gi;
        const scales = { K: 3, M: 6, B: 9, T: 12, TH: 3 };
        trimmedInput = trimmedInput.replace(scaleParser, (match, p1, p2) => {
            let div = 0;
            const decimalIndex = p1.indexOf('.');
            if (decimalIndex >= 0) {
                div = p1.length - decimalIndex - 1;
                p1 = p1.replace('.', '');
            }
            let scaledNum = Number(p1) * Math.pow(10, scales[p2.toUpperCase()]);
            scaledNum = div ? scaledNum / Math.pow(10, div) : scaledNum;
            return scaledNum.toString();
        });

        // Check if the input confirms to the expected input rules
        const regex = /^(-?\d*(?:\.\d*)?)(?:((?:\+|-)\d+(?:\.\d+)?)(%)?)?$/;
        const matchGroups = regex.exec(trimmedInput);
        if (matchGroups == null) {
            return { newValue: trimmedInput, parsedInput: null, error: true };
        }

        let newValue = Number(matchGroups[1]);
        const change = matchGroups[2] ? Number(matchGroups[2]) : null;
        const isPercentChange = matchGroups[3];
        const parsedInput: [number, number | null, string] = [newValue, change, isPercentChange];
        if (change != null) {
            newValue = isPercentChange
                ? Number(InlineFormulaUtils.percentChange(change, newValue).toFixed(2))
                : Number(InlineFormulaUtils.absoluteChange(change, newValue).toFixed(2));
        }
        return {
            newValue,
            parsedInput,
            error: false,
        };
    }

    static percentChange = (change: number, targetValue: number) =>
        targetValue * (1 + change / (targetValue < 0 ? -100 : 100));

    static absoluteChange = (change: number, targetValue: number) => targetValue + change;
}
