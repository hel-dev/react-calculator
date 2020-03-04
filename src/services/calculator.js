const calculator = {

    selectedOperator: [],

    storedValue: [],

    callOperator: () => {
        console.log('call operation');
    },

    setOperator: () => {
        console.log('set operation');
    },

    updateDisplay: (value) => {
        console.log(`update display: ${value}`);
        return value;
    }
}

export default calculator;