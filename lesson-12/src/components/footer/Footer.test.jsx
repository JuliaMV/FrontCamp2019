import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Footer from './Footer';

Enzyme.configure({ adapter: new Adapter() });

describe('Footer component', () => {
  test('should render correctly', () => {
    const component = shallow(<Footer />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
