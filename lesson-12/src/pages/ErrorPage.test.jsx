import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { ErrorPage } from './ErrorPage';

Enzyme.configure({ adapter: new Adapter() });

const title = 'ERROR TITLE';

describe('Error page', () => {
  test(`should matches the snapshot with title "${title}"`, () => {
    const props = {
      title,
    };

    const component = shallow(<ErrorPage title={props.title} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
