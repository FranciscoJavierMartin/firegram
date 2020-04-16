import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from "history";
import Navbar from './Navbar';
import { ShallowWrapper, shallow, mount, ReactWrapper } from 'enzyme';
import { findByTestAttr,findByTestAttrReactWrapper,  getAppWithRouter } from '../../../test/testUtils';
import { act } from 'react-dom/test-utils';

/** 
 * Setup function for Navbar component.
*/
const setup = (): ReactWrapper => {
  return mount(<Navbar/>);
}

describe('Navbar component', () => {
  let mockIsDrawerMenuVisible: jest.Mock<boolean, any> = jest.fn();
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockIsDrawerMenuVisible.mockClear();
    wrapper = setup();
  });

  xtest('Render without errors', () => {
    const navbar = findByTestAttrReactWrapper(wrapper, 'navbar');
    expect(navbar.length).toBe(1);
  });

  xtest('Go to Home when logo is clicked', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'link-to-home');
    component.simulate('click');
    expect(getAppWithRouter()).toBe(true);
  });

});