import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
//import { findByTestAttr } from '../test/testUtils';
import App from './App';

/**
 * Mock the useState hook
 * @param newState 
 */
export const setHookState = (newState: any = {}) => jest.fn().mockImplementation((state: any = {}) => [
  newState,
  (newState: any = {}) => {}
]);

/**
 * Setup function for app component. 
 * @returns { ShallowWrapper }
 */
const setup = (): ShallowWrapper => {
  return shallow(<App/>);
}

test('Dummy test', () => {
  expect(true).toBe(true);
});

/*test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});*/