import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Film from './Film';

Enzyme.configure({ adapter: new Adapter() });


describe('Film component', () => {
  test('should render with props', () => {
    const props = {
      poster_path: 'http://image.com',
      title: 'News title',
      genres: ['fantasy'],
      release_date: '03.02.2019',
      vote_average: 15,
      runtime: 125,
      overview: 'Lorem ipsum',
      id: 1325,
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component = shallow(<Film {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
