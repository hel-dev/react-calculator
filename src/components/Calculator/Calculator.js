import React, { useState, useEffect } from 'react';

import './Calculator.css';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

import calculator from 'services/calculator';

const Calculator = () => {

  const [displayValue, setDisplayValue] = useState(calculator.displayValue);
  
  useEffect(() => {

    calculator.on('display-updated', 

      value => {
        setDisplayValue(value);
      }

    )

  }, [displayValue]);

    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <Keypad
          numbers={calculator.numbers}
          operators={calculator.operators}
        />
      </div>
    );
}

export default Calculator;