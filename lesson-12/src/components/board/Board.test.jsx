import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Board from './Board';

Enzyme.configure({ adapter: new Adapter() });


describe('Board component', () => {
  test('should render without films', () => {
    const props = {
      films: [],
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component = shallow(<Board {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  test('should render with 1 film', () => {
    const props = {
      films: [
        {
          img: 'http://image.com',
          title: 'News title',
          genres: ['fantasy'],
          date: '03.02.2019',
          id: 1325,
        },
      ],
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component = shallow(<Board {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  test('should render with 3 films', () => {
    const props = {
      films: [
        {
          img: 'http://image.com',
          title: 'News title',
          genres: ['fantasy'],
          date: '03.02.2019',
          id: 1325,
        },
        {
          img: 'http://image.com',
          title: 'Film title',
          genres: ['action'],
          date: '03.02.2020',
          id: 132500,
        },
        {
          img: 'http://image.com',
          title: 'Lalala',
          genres: ['comedy', 'drama'],
          date: '03.03.2019',
          id: 135,
        },
      ],
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component = shallow(<Board {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
