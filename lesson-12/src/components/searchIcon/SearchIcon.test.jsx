import React from 'react';
import { create } from 'react-test-renderer';
import SearchIcon from './SearchIcon';

describe('SearchIcon component', () => {
  test('it matches the snapshot', () => {
    const component = create(<SearchIcon />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
