import React from 'react';
import PropTypes from 'prop-types';

import './Key.css';

const Key = ({ onClick, type, value }) => 
    <div 
        className={`key-container ${type}`}
        onClick={onClick}
    >
        <p className="key-value">
            {value}
        </p>
    </div>;

Key.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Key;