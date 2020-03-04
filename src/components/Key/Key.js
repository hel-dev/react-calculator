import React from 'react';
import PropTypes from 'prop-types';
import calculator from 'services/calculator'
import services from 'services'

import './Key.css';

const Key = ({ action, onClick, type, value }) => 
    <div 
        className="key-container" 
        type={type}
        value={value} 
        onClick={onClick}
        // onClick={() => calculator[action](value)}
    >
        <p className="key-value">
            {value}
        </p>
    </div>;

Key.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Key;