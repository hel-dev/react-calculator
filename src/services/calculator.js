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
        }

        calculator.storedValue = result;

        return result;
    },

    callOperator: () => {

        if (calculator.storedValue) {
            calculator.updateDisplay(calculator.calculate(parseInt(calculator.displayValue)))
            calculator.displayValue = '0';
        }

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

        if (calculator.displayValue.replace(/[^0-9]/g,"").length === 7) {
            value = '';
        }

        calculator.displayValue = calculator.displayValue + value;

        if (!calculator.displayValue.length) {
            calculator.displayValue = '0';
        }

        calculator.updateDisplay(calculator.displayValue)
    },

    updateDisplay: (value) => {

        calculator.emit('display-updated', String(value))

    }
}

export default withEventEmitter(calculator);