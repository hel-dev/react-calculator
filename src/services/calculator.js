import { withEventEmitter } from 'helpers/events';

const calculator = {

    operators: ['/', 'x', '-', '+'],

    numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],

    displayValue: '0',

    selectedOperator: '',

    storedValue: 0,

    initialize: () => {

        calculator.on('display-updated', 

            value => {
                calculator.displayValue = value;
            }

        )

        calculator.on('operator-set',
            (operator, displayValue, storedValue) => {

                if (!storedValue)  {
                    calculator.storedValue = parseInt(displayValue);
                }
        
                calculator.displayValue = '0';
        
                calculator.selectedOperator = operator;
            }
        )

    },

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

            default:
                break;

        }

        if (result > 9999999) {
            result = 9999999;
        }

        calculator.storedValue = result;

        return result;
    },

    showTotal: (value) => {
        return calculator.updateDisplay(calculator.calculate(parseInt(value)));
    },

    setOperator: (operator, displayValue, storedValue) => {

        if (storedValue) {
            displayValue = calculator.showTotal(displayValue);
        } 

        calculator.emit('operator-set', operator, displayValue, storedValue)
    },

    setNumber: (value, displayValue) => {

        if (displayValue === '0' && value !== '.') {
            displayValue = '';
        }

        if (value === 'c') {
            displayValue = '';
            value = '0';
        }

        if (value === 'ce') {
            displayValue = displayValue.substring(0, displayValue.length - 1);
            value = '';
        }

        if (value === '.' && /\./.test(displayValue)) {
            value = '';
        }

        calculator.updateDisplay(displayValue + value);

    },

    updateDisplay: (value) => {

        value = String(value);

        if (!value || !value.length) {
            value = '0';
        }

        if (value.replace(/[^0-9]/g,"").length >= 7) {
            value = value.substring(0, 7);
        }

        if((value.replace(/[^0-9]/g,"").length === 6 && value.slice(-1) === '.')) {
            value = value.substring(0, 6);
        }

        calculator.emit('display-updated', String(value))

        return value;

    }
}

export default withEventEmitter(calculator);