import React from 'react';
import PostDetail from './PostDetail';
import { ShallowWrapper, shallow } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';
import { IPost } from '../../interfaces/models/post';

const setup = (post: IPost|undefined = undefined):ShallowWrapper => {
  return shallow(<PostDetail post={post}/>)
}

describe('Post detail component', () => {
  let wrapper: ShallowWrapper;
  const post: IPost = {
    id: 1,
    createAt: new Date(),
    imageUrl: '',
    title: 'Fake title'
  };

  beforeEach(() => {
    wrapper = setup();
  });

  test('Post contains an image', () => {
    const imageComponent = findByTestAttr(wrapper, 'post-image');
    expect(imageComponent.length).toBe(1);
  });

  test('Post contains a title', () => {
    const titleComponent = findByTestAttr(wrapper, 'post-title');
    expect(titleComponent.length).toBe(1);
  });

  test('Post title contains a the prorper title', () => {
    wrapper = setup(post);
    const titleComponent = findByTestAttr(wrapper, 'post-title');
    expect(titleComponent.contains('Fake title')).toBe(true);
  });

  test('Post contains comments', () => {
    const commentsComponent = findByTestAttr(wrapper, 'post-comments');
    expect(commentsComponent.length).toBe(1);
  });

  test('Post contains 25 comments', () => {
    const commentsComponent = findByTestAttr(wrapper, 'post-comments');
    expect(commentsComponent.children().length).toBe(25); 
  });

});