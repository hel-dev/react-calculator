import { withEventEmitter } from 'helpers/events';

const calculator = {

    operators: ['/', 'x', '-', '+'],

    numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],

    displayValue: '0',

    selectedOperator: '',

    storedValue: 0,

    calculate: (value) => {

        let result = calculator.storedValue;

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

    showTotal: () => {

        calculator.updateDisplay(calculator.calculate(parseInt(calculator.displayValue)))

    },

    setOperator: (operator) => {

        if (calculator.storedValue) {
            calculator.showTotal();
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