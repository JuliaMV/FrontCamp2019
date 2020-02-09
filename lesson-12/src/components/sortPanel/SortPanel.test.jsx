import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import SortPanel from './SortPanel';

Enzyme.configure({ adapter: new Adapter() });


describe('SortPanel component', () => {
  test('should render with default props', () => {
    const component = shallow(<SortPanel />);
    expect(toJson(component)).toMatchSnapshot();
  });

  test('should render with enabled filter', () => {
    const component = shallow(<SortPanel isFilter />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
