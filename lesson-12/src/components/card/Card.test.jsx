import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { Card } from './Card';

Enzyme.configure({ adapter: new Adapter() });


describe('Card component', () => {
  test('should render with props', () => {
    const props = {
      img: 'http://image.com',
      title: 'News title',
      genres: ['fantasy'],
      date: '03.02.2019',
      id: 1325,
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component = shallow(<Card {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
