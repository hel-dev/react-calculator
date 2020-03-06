import React from 'react';
import PropTypes from 'prop-types';
import Key from '../Key/Key';
import calculator from 'services/calculator'

import './Keypad.css';

const Keypad = ({ callOperator, numbers, operators }) => {

    const numberKeys = numbers.map(number => (
      <Key
        key={number}
        onClick={()=>calculator.setNumber(number, calculator.displayValue)}
        type="number-key"
        value={number}
      />)
    );

    const operatorKeys = operators.map(operator => (
      <Key
        key={operator}
        onClick={()=>calculator.setOperator(operator, calculator.displayValue)}
        type="operator-key"
        value={operator}
      />)
    );

    return(
        <div 
            className="keypad-container" 
        >
            <div className="numbers-container">
                {numberKeys}
            </div>

            <div className="operators-container">
                {operatorKeys}
            </div>

            <div className="submit-container">
                <Key
                    onClick={()=>calculator.setOperator("=", calculator.displayValue)}
                    value="="
                    type="submit-key"
                />
            </div>
        </div>
    )
}
  

Keypad.propTypes = {
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired
}

export default Keypad;