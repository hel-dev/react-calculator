import { withEventEmitter } from 'helpers/events';

const calculator = {

    operators: ['/', 'x', '-', '+'],

    numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],

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
                    calculator.storedValue = parseInt(displayValue);
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

        if (result > 9999999) {
            result = 9999999;
        }

        calculator.emit('calculation-made', result)

        return result;
    },

    showTotal: (value, storedValue, selectedOperator) => {
        return calculator.updateDisplay(calculator.calculate(parseInt(value), storedValue, selectedOperator));
    },

    setOperator: (operator, displayValue, storedValue, selectedOperator) => {

        if (storedValue) {
            displayValue = calculator.showTotal(displayValue, storedValue, selectedOperator);
        } 

        calculator.emit('operator-set', operator, displayValue, storedValue)
    },

    setNumber: (value, displayValue) => {

        if (displayValue === '0' && value !== '.') {
            displayValue = '';
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