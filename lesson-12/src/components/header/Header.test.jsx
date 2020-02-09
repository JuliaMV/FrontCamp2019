import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';

Enzyme.configure({ adapter: new Adapter() });

describe('Header component', () => {
  test('should render with default props', () => {
    const component = shallow(<Header />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
