import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Filter from './Filter';

Enzyme.configure({ adapter: new Adapter() });

describe('Filter component', () => {
  test('should render with default props', () => {
    const component = shallow(<Filter />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
