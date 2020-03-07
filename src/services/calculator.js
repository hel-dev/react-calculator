import { withEventEmitter } from 'helpers/events';
import { _s } from 'helpers/string';

const calculator = {

    operators: ['/', 'x', '-', '+'],

    numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],

    maxDigits: 7,

    displayValue_: '0',

    set displayValue (value) {
        calculator.displayValue_ = value;
    },

    get displayValue () {
        return calculator.displayValue_;
    },

    selectedOperator_: '',

    set selectedOperator (value) {
        calculator.selectedOperator_ = value;
    },

    get selectedOperator () {
        return calculator.selectedOperator_;
    },

    storedValue_: 0,

    set storedValue (value) {
        calculator.storedValue_ = value;
    },

    get storedValue () {
        return calculator.storedValue_;
    },

    initialize: () => {

        calculator.on('display-updated', 

            value => {
                calculator.displayValue = value;
            }

        )

        calculator.on('operator-set',
            (operator, displayValue, storedValue) => {

                if (!storedValue)  {
                    calculator.storedValue = parseFloat(displayValue);
                }
        
                calculator.displayValue = '0';
        
                calculator.selectedOperator = operator;
            }
        )

        calculator.on('calculation-made', 

            value => {
                calculator.storedValue = value;
            }

        )

        calculator.on('calculator-clear', 

            () => {
                calculator.clear();
            }

        )

    },

    clear: () => {
        calculator.displayValue = '0';
        calculator.value = '0';
        calculator.storedValue = 0;
    },

    calculate: (value, storedValue, selectedOperator) => {

        const { maxDigits } = calculator; 
        let result = storedValue;

        switch (selectedOperator) {

            case "+":
                result = storedValue+value;

                break;

            case "-":

                result = storedValue-value;

                break;

            case "x":

                result = storedValue*value;

                break;

            case "/":

                result = storedValue/value;

                break;

            default:
                break;

        }

        if (String(result) === 'Infinity' || String(result) === 'NaN') {
            result = 0;
        }

        if (result > Math.pow(10, maxDigits) - 1) {
            result = Math.pow(10, maxDigits) - 1;
        }

        calculator.emit('calculation-made', result)

        return result;
    },

    showTotal: (value, storedValue, selectedOperator) => {
        return calculator.updateDisplay(calculator.calculate(parseFloat(value), storedValue, selectedOperator));
    },

    setOperator: (operator, displayValue, storedValue, selectedOperator) => {

        if (storedValue) {
            displayValue = calculator.showTotal(displayValue, storedValue, selectedOperator);
        } 

        calculator.emit('operator-set', operator, displayValue, storedValue)
    },

    setNumber: (value, displayValue) => {

        switch (value) {

            case "ce":

                displayValue = displayValue.substring(0, displayValue.length - 1);
                value = '';

                break;

            case ".":

                if (/\./.test(displayValue)) {
                    value = '';
                }

                break;

            default:

                if (value !== '.' && displayValue === '0') {
                    displayValue = '';
                }

                break;

        }

        calculator.updateDisplay(displayValue + value);

    },

    updateDisplay: (value) => {

        const { maxDigits } = calculator; 
        value = String(value);

        if (!value || !value.length) {
            value = '0';
        }

        if (_s(value).hasReachedMaxDigits(maxDigits)) {
            value = value.substring(0, maxDigits + (/\./.test(value)?1:0));
        }

        if (_s(value).hasReachedMaxDigits(maxDigits) && _s(value).hasATrailingDot()) {
            value = value.substring(0, maxDigits);
        }

        calculator.emit('display-updated', String(value))

        return value;

    }
}

export default withEventEmitter(calculator);