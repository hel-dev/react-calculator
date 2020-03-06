import { withEventEmitter } from 'helpers/events';

const calculator = {

    displayValue: '0',

    selectedOperator: '',

    storedValue: 0,

    calculate: (value) => {

        let result = 0

        switch (calculator.selectedOperator) {

            case "+":
                result = calculator.storedValue+value;

                break;

            case "-":

                result = calculator.storedValue-value;

                break;

            case "x":

                result = calculator.storedValue*value;

                break;

            case "/":

                result = calculator.storedValue/value;

                break;

            default:

                result = calculator.storedValue;

                break;
        }

        calculator.storedValue = result;

        return result;
    },

    callOperator: () => {

        calculator.updateDisplay(calculator.calculate(parseInt(calculator.displayValue)))

    },

    setOperator: (operator) => {

        if (calculator.storedValue) {
            calculator.callOperator();
        } else {
            calculator.storedValue = parseInt(calculator.displayValue);
        }

        calculator.displayValue = '0';

        calculator.selectedOperator = operator;
    },

    setNumber: (value) => {

        if (calculator.displayValue === '0' && value !== '.') {
            calculator.displayValue = '';
        }

        if (value === 'c') {
            calculator.displayValue = '';
            value = '0';
        }

        if (value === 'ce') {
            calculator.displayValue = calculator.displayValue.substring(0, calculator.displayValue.length - 1);
            value = '';
        }

        if (value === '.' && /\./.test(calculator.displayValue)) {
            value = '';
        }

        calculator.displayValue = calculator.displayValue + value;

        calculator.updateDisplay(calculator.displayValue)
    },

    updateDisplay: (value) => {

        if (!value || calculator.displayValue.replace(/[^0-9]/g,"").length === 7 || !calculator.displayValue.length) {
            value = '0';
        }

        calculator.emit('display-updated', String(value))

    }
}

export default withEventEmitter(calculator);