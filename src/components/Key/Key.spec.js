import React from 'react';
import { shallow } from 'enzyme';
import Key from './Key';

describe('Key', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Key
        onClick={jest.fn()}
        type={''}
        value={''}
      />
    );
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the value of Key value', () => {
    wrapper.setProps({ value: 'test' });
    expect(wrapper.text()).toEqual('test');
  });
});