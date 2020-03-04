import React, { useState, useEffect } from 'react';

import './Calculator.css';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

import calculator from 'services/calculator';

const Calculator = () => {
//   state = {
//     // value to be displayed in <Display />
//     displayValue: '0',
//     // values to be displayed in number <Keys />
//     numbers: [],
//     // values to be displayed in operator <Keys />
//     operators: [],
//     // operator selected for math operation
//     selectedOperator: '',
//     // stored value to use for math operation
//     storedValue: '',
//   }

  const [displayValue, setDisplayValue] = useState(calculator.displayValue);
  const operators = ['/', 'x', '-', '+'];
  const numbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'];
  // const selectedOperator = [];
  // const storedValue = [];
  
  useEffect(() => {
    // setDisplayValue('9')

    calculator.on('display-updated', 

      value => setDisplayValue(value)

    )

  }, [displayValue]);

    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <Keypad
          numbers={numbers}
          operators={operators}
        />
      </div>
    );
}

export default Calculator;