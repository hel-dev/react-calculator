import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';
import services from 'services';
import calculator from 'services/calculator';

services.initialize();

describe('Calculator', () => {
  
  let wrapper;

  beforeEach(() => wrapper = shallow(<Calculator />));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the Display and Keypad Components', () => {

    const displayComponent = wrapper.find(Display);
    const keypadComponent = wrapper.find(Keypad);

    const { displayValue } = displayComponent.find(Display).props();

    const { numbers, operators } = keypadComponent.find(Keypad).props();

    expect(wrapper.containsAllMatchingElements([
      <Display displayValue={displayValue} />,
      <Keypad
        numbers={numbers}
        operators={operators}
      />
    ])).toEqual(true);
  });
});

describe('mounted Calculator', () => {
  
  let wrapper;

  beforeEach(() => wrapper = mount(<Calculator />));
  
  it('calls setNumber when a number key is clicked', () => {
    
    const spy = jest.spyOn(calculator, 'setNumber');
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('.number-key').at(1).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);

  });

  it('calls setOperator when an operator key is clicked', () => {

    const spy = jest.spyOn(calculator, 'setOperator');
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('.operator-key').at(1).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);

  });

  it('calls setOperator when the submit key is clicked', () => {

    const spy = jest.spyOn(calculator, 'setOperator');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.find('.submit-key').simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);

  });
  
});

describe('setNumber', () => {

  let wrapper;

  beforeEach(() => wrapper = mount(<Calculator />));

  it('updates displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('5', calculator.displayValue);
    })
    
    expect(wrapper.find('.display-container').text()).toEqual('5');
  });

  it('concatenates displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('5', calculator.displayValue);
      calculator.setNumber('0', calculator.displayValue);
    });

    expect(wrapper.find('.display-container').text()).toEqual('50');
  });

  it('removes leading "0" from displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('0', calculator.displayValue);
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');

    await act(async () => {
      calculator.setNumber('5', calculator.displayValue);
    })

    expect(wrapper.find('.display-container').text()).toEqual('5');
  });

  it('prevents multiple leading "0"s from displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('0', calculator.displayValue);
      calculator.setNumber('0', calculator.displayValue);
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');
  });

  it('removes last char of displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('5', calculator.displayValue);
      calculator.setNumber('0', calculator.displayValue);
      calculator.setNumber('ce', calculator.displayValue);
    })

    expect(wrapper.find('.display-container').text()).toEqual('5');
  });

  it('prevents multiple instances of "." in displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('.', calculator.displayValue);
      calculator.setNumber('.', calculator.displayValue);
    })

    expect(wrapper.find('.display-container').text()).toEqual('0.');
  });

  it('will set displayValue to "0" if displayValue is equal to an empty string', async () => {

    await act(async () => {
      calculator.clear();
      calculator.updateDisplay('');
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');
  });

});

describe('showTotal', () => {

  let wrapper;

  beforeEach(() => wrapper = mount(<Calculator />));

  it('updates displayValue to the sum of storedValue and displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('3', calculator.displayValue);
      calculator.setOperator('+', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
      calculator.setNumber('2', calculator.displayValue);
      calculator.setOperator('=', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
    })

    expect(wrapper.find('.display-container').text()).toEqual('5');

  });

  it('updates displayValue to the difference of storedValue and displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('3', calculator.displayValue);
      calculator.setOperator('-', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
      calculator.setNumber('2', calculator.displayValue);
      calculator.setOperator('=', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
    })

    expect(wrapper.find('.display-container').text()).toEqual('1');

  });

  it('updates displayValue to the product of storedValue and displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('3', calculator.displayValue);
      calculator.setOperator('x', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
      calculator.setNumber('2', calculator.displayValue);
      calculator.setOperator('=', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
    })

    expect(wrapper.find('.display-container').text()).toEqual('6');

  });

  it('updates displayValue to the quotient of storedValue and displayValue', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('3', calculator.displayValue);
      calculator.setOperator('/', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
      calculator.setNumber('2', calculator.displayValue);
      calculator.setOperator('=', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
    })

    expect(wrapper.find('.display-container').text()).toEqual('1.5');

  });

  it('updates displayValue to "0" if operation results in "Infinity"', async () => {

    await act(async () => {
      calculator.clear();
      calculator.setNumber('7', calculator.displayValue);
      calculator.setOperator('/', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
      calculator.setNumber('0', calculator.displayValue);
      calculator.setOperator('=', calculator.displayValue, calculator.storedValue, calculator.selectedOperator);
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');

  });

});