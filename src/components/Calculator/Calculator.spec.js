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

  it('calls showTotal when the submit key is clicked', () => {

    const spy = jest.spyOn(calculator, 'showTotal');
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('.submit-key').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);

  });
  
});

describe('setNumber', () => {

  let wrapper;

  beforeEach(() => wrapper = mount(<Calculator />));

  it('updates displayValue', async () => {

    await act(async () => {
      calculator.setNumber('c');
      calculator.setNumber('5');
    })
    
    expect(wrapper.find('.display-container').text()).toEqual('5');
  });

  it('concatenates displayValue', async () => {

    await act(async () => {
      calculator.setNumber('c');
      calculator.setNumber('5');
      calculator.setNumber('0');
    });

    expect(wrapper.find('.display-container').text()).toEqual('50');
  });

  it('removes leading "0" from displayValue', async () => {

    await act(async () => {
      calculator.setNumber('c');
      calculator.setNumber('0');
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');

    await act(async () => {
      calculator.setNumber('5');
    })

    expect(wrapper.find('.display-container').text()).toEqual('5');
  });

  it('prevents multiple leading "0"s from displayValue', async () => {

    await act(async () => {
      calculator.setNumber('c');
      calculator.setNumber('0');
      calculator.setNumber('0');
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');
  });

  it('removes last char of displayValue', async () => {

    await act(async () => {
      calculator.setNumber('5');
      calculator.setNumber('0');
      calculator.setNumber('ce');
    })

    expect(wrapper.find('.display-container').text()).toEqual('5');
  });

  it('prevents multiple instances of "." in displayValue', async () => {

    await act(async () => {
      calculator.setNumber('c');
      calculator.setNumber('.');
      calculator.setNumber('.');
    })

    expect(wrapper.find('.display-container').text()).toEqual('0.');
  });

  it('will set displayValue to "0" if displayValue is equal to an empty string', async () => {

    await act(async () => {
      calculator.setNumber('c');
    })

    expect(wrapper.find('.display-container').text()).toEqual('0');
  });

});

describe('showTotal', () => {

  let wrapper;

  beforeEach(() => wrapper = mount(<Calculator />));

  it('updates displayValue to the sum of storedValue and displayValue', async () => {

    await act(async () => {
      calculator.setNumber('c');
      calculator.setNumber('3');
      calculator.setOperator('+');
      calculator.setNumber('2');
      calculator.showTotal();
    })

    expect(wrapper.find('.display-container').text()).toEqual('5');

  });

  // it('updates displayValue to the difference of storedValue and displayValue', () => {
  //   wrapper.setState({ storedValue: '3' });
  //   wrapper.setState({ displayValue: '2' });
  //   wrapper.setState({ selectedOperator: '-' });
  //   wrapper.instance().callOperator();
  //   expect(wrapper.state('displayValue')).toEqual('1');
  // });

  // it('updates displayValue to the product of storedValue and displayValue', () => {
  //   wrapper.setState({ storedValue: '3' });
  //   wrapper.setState({ displayValue: '2' });
  //   wrapper.setState({ selectedOperator: 'x' });
  //   wrapper.instance().callOperator();
  //   expect(wrapper.state('displayValue')).toEqual('6');
  // });

  // it('updates displayValue to the quotient of storedValue and displayValue', () => {
  //   wrapper.setState({ storedValue: '3' });
  //   wrapper.setState({ displayValue: '2' });
  //   wrapper.setState({ selectedOperator: '/' });
  //   wrapper.instance().callOperator();
  //   expect(wrapper.state('displayValue')).toEqual('1.5');
  // });

  // it('updates displayValue to "0" if operation results in "NaN"', () => {
  //   wrapper.setState({ storedValue: '3' });
  //   wrapper.setState({ displayValue: 'string' });
  //   wrapper.setState({ selectedOperator: '/' });
  //   wrapper.instance().callOperator();
  //   expect(wrapper.state('displayValue')).toEqual('0');
  // });

  // it('updates displayValue to "0" if operation results in "Infinity"', () => {
  //   wrapper.setState({ storedValue: '7' });
  //   wrapper.setState({ displayValue: '0' });
  //   wrapper.setState({ selectedOperator: '/' });
  //   wrapper.instance().callOperator();
  //   expect(wrapper.state('displayValue')).toEqual('0');
  // });

  // it('updates displayValue to "0" if selectedOperator does not match cases', () => {
  //   wrapper.setState({ storedValue: '7' });
  //   wrapper.setState({ displayValue: '10' });
  //   wrapper.setState({ selectedOperator: 'string' });
  //   wrapper.instance().callOperator();
  //   expect(wrapper.state('displayValue')).toEqual('0');
  // });

  // it('updates displayValue to "0" if called with no value for storedValue or selectedOperator', () => {
  //   wrapper.setState({ storedValue: '' });
  //   wrapper.setState({ displayValue: '10' });
  //   wrapper.setState({ selectedOperator: '' });
  //   wrapper.instance().callOperator();
  //   expect(wrapper.state('displayValue')).toEqual('0');
  // });
});