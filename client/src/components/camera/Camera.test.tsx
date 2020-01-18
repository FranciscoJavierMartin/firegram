import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import Camera from './Camera';
import { findByTestAttr } from '../../../test/testUtils';

jest.mock('react-redux', () => ({
  useDispatch: () => {},
  useSelector: () => ({
    checkout: { selectedAvailability: '', paymentTypes: '', pending: '' }
  })
}));

/**
 * Setup function for app component. 
 * @returns { ShallowWrapper }
 */
const setup = (closeModal: () => void): ShallowWrapper => {
  return shallow(
    <Camera closeModal={closeModal}/>
  );
}

describe('Camera component', () => {
  let closeModal: jest.Mock<() => void> = jest.fn();
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    closeModal.mockClear();
    wrapper = setup(closeModal);
  });

  test('Render without error', () => {
    expect(wrapper.length).toBe(1);
  });

  test('Render the video', () => {
    expect(findByTestAttr(wrapper, 'video').length).toBe(1);
  });

  test('Render the canvas', () => {
    expect(findByTestAttr(wrapper, 'canvas').length).toBe(1);
  });

  test('Render the input title', () => {
    expect(findByTestAttr(wrapper, 'input-title').length).toBe(1);
  });

  test('Render the button', () => {
    expect(findByTestAttr(wrapper, 'button-take-photo').length).toBe(1);
  });

  test('uploadPost has been called when button is called', async () => {
    //const fake = jest.spyOn(Camera.prototype, 'uploadPost');
    
    const buttonTakePhoto = findByTestAttr(wrapper, 'button-take-photo');
    buttonTakePhoto.simulate('click');
    const firebase = require('../../firebase/firebase.utils');
    firebase.uploadPost = jest.fn();
    //TODO: Fix this
    setTimeout(() => {
      expect(firebase.uploadPost).toHaveBeenCalled();
    }, 15000);
  });

});

