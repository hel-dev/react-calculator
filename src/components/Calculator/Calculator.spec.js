import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';
import calculator from 'services/calculator';

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

    const { numbers, operators, callOperator, setOperator, updateDisplay } = keypadComponent.find(Keypad).props();

    expect(wrapper.containsAllMatchingElements([
      <Display displayValue={displayValue} />,
      <Keypad
        callOperator={callOperator}
        numbers={numbers}
        operators={operators}
        setOperator={setOperator}
        updateDisplay={updateDisplay}
      />
    ])).toEqual(true);
  });
});

describe('mounted Calculator', () => {
  
  let wrapper;

  beforeEach(() => wrapper = mount(<Calculator />));
  
  it('calls updateDisplay when a number key is clicked', () => {
    
    const spy = jest.spyOn(calculator, 'updateDisplay');
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

  it('calls callOperator when the submit key is clicked', () => {

    const spy = jest.spyOn(calculator, 'callOperator');
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('.submit-key').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);

  });
  
});

describe('updateDisplay', () => {

  let wrapper;

  beforeEach(() => wrapper = mount(<Calculator />));

  it('updates displayValue', async () => {

    await act(async () => {
      calculator.updateDisplay('c');
      calculator.updateDisplay('5');
    })
    
    expect(wrapper.find('.display-container').text()).toEqual('5');
  });

  it('concatenates displayValue', async () => {

    await act(async () => {
      calculator.updateDisplay('c');
      calculator.updateDisplay('5');
      calculator.updateDisplay('0');
    });

    expect(wrapper.find('.display-container').text()).toEqual('50');
  });

  it('removes leading "0" from displayValue', async () => {

    await act(async () => {
      calculator.updateDisplay('c');
      calculator.updateDisplay('0');
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');

    await act(async () => {
      calculator.updateDisplay('5');
    })

    expect(wrapper.find('.display-container').text()).toEqual('5');
  });

  it('prevents multiple leading "0"s from displayValue', async () => {

    await act(async () => {
      calculator.updateDisplay('c');
      calculator.updateDisplay('0');
      calculator.updateDisplay('0');
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');
  });

  it('removes last char of displayValue', async () => {

    await act(async () => {
      calculator.updateDisplay('5');
      calculator.updateDisplay('0');
      calculator.updateDisplay('ce');
    })

    expect(wrapper.find('.display-container').text()).toEqual('5');
  });

  it('prevents multiple instances of "." in displayValue', async () => {

    await act(async () => {
      calculator.updateDisplay('c');
      calculator.updateDisplay('.');
      calculator.updateDisplay('.');
    })

    expect(wrapper.find('.display-container').text()).toEqual('0.');
  });

  it('will set displayValue to "0" if displayValue is equal to an empty string', async () => {

    await act(async () => {
      calculator.updateDisplay('c');
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');
  });

});