import React from 'react';
import PropTypes from 'prop-types';
import Key from '../Key/Key';
import calculator from 'services/calculator'

import './Keypad.css';

const Keypad = ({ callOperator, numbers, operators }) => {

    const numberKeys = numbers.map(number => (
      <Key
        key={number}
        action={'updateDisplay'}
        onClick={()=>calculator.updateDisplay(number)}
        type="number-key"
        value={number}
      />)
    );

    const operatorKeys = operators.map(operator => (
      <Key
        key={operator}
        action={'setOperator'}
        type="operator-key"
        value={operator}
      />)
    );

    return(
        <div 
            className="keypad-container" 
            numbers={numbers} 
            operators={operators} 
        >
            <div className="numbers-container">
                {numberKeys}
            </div>

            <div className="operators-container">
                {operatorKeys}
            </div>

            <div className="submit-container">
                <Key
                    action={callOperator}
                    type="submit-key"
                    value="="
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