import React from 'react';
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
    wrapper.find('[type="number-key"]').at(1).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);

  });

  it('calls setOperator when an operator key is clicked', () => {

    const spy = jest.spyOn(calculator, 'setOperator');
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('[type="operator-key"]').at(1).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);

  });

  it('calls callOperator when the submit key is clicked', () => {

    const spy = jest.spyOn(calculator, 'callOperator');
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('.submit-key').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);

  });
});