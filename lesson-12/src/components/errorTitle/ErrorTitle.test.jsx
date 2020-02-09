import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import ErrorTitle from './ErrorTitle';

Enzyme.configure({ adapter: new Adapter() });

const title = 'Something went wrong...'

describe('ErrorTitle component', () => {
  test(`should render with title "${title}"`, () => {
    const props = { title };
    const component = shallow(<ErrorTitle title={props.title} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
