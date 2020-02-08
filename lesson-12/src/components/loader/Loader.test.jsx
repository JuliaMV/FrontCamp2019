import React from 'react';
import { create } from 'react-test-renderer';
import Loader from './Loader';

describe('Loader component', () => {
  test('it matches the snapshot', () => {
    const component = create(<Loader />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
