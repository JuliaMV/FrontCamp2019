import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { create } from 'react-test-renderer';
import Logo from './Logo';

describe('Logo component', () => {
  test('it matches the snapshot', () => {
    const component = create(<Router><Logo /></Router>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
