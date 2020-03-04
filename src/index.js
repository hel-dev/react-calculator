import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import services from 'services';

services.initialize();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);