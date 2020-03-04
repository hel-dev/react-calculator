import { withEventEmitter } from 'helpers/events';

const calculator = {

    displayValue: '0',

    selectedOperator: [],

    storedValue: [],

    callOperator: () => {
        console.log('call operation');
    },

    setOperator: (operator) => {
        console.log(`set operation: ${operator}`);
    },

    updateDisplay: (value) => {

        console.log(`updateDisplay: ${value}`);

        if (calculator.displayValue == '0' && value != '.') {
            calculator.displayValue = ''
        }

        if (value == 'c') {
            calculator.displayValue = '';
            value = '0'
        }

        if (value == 'ce') {
            calculator.displayValue = calculator.displayValue.substring(0, calculator.displayValue.length - 1);
            value = ''
        }

        if (value == '.' && /\./.test(calculator.displayValue)) {
            value = ''
        }

        if (calculator.displayValue.replace(/[^0-9]/g,"").length == 7) {
            value = ''
        }

        calculator.displayValue = calculator.displayValue + value;

        if (!calculator.displayValue.length) {
            calculator.displayValue = '0'
        }

        calculator.emit('display-updated', calculator.displayValue)

    }
}

export default withEventEmitter(calculator);