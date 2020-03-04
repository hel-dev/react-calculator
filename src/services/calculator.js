const calculator = {

    selectedOperator: [],

    storedValue: [],

    callOperator: () => {
        console.log('call operation');
    },

    setOperator: (operator) => {
        console.log(`set operation: ${operator}`);
    },

    updateDisplay: (value) => {
        console.log(`update display: ${value}`);
        return value;
    }
}

export default calculator;