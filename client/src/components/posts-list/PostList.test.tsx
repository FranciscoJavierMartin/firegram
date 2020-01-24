import React from 'react';
import PostList from './PostsList';
import { ShallowWrapper, shallow } from 'enzyme';
import { IPost } from '../../interfaces/models/post';
import { findByTestAttr } from '../../../test/testUtils';

const postsList: IPost[] = [
  {
    id: 1,
    createAt: new Date(),
    imageUrl: '',
    title: 'Title 1'
  },
  {
    id: 2,
    createAt: new Date(),
    imageUrl: '',
    title: 'Title 2'
  },
  {
    id: 3,
    createAt: new Date(),
    imageUrl: '',
    title: 'Title 3'
  },
  {
    id: 4,
    createAt: new Date(),
    imageUrl: '',
    title: 'Title 4'
  },
  {
    id: 5,
    createAt: new Date(),
    imageUrl: '',
    title: 'Title 5'
  },
];

const setup = (posts: IPost[]): ShallowWrapper => {
  return shallow(<PostList posts={posts}/>);
};

describe('PostList component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup(postsList);
  });

  test('Posts list rendered without errors', () => {
    const postsListComponent = findByTestAttr(wrapper, 'posts-list');
    expect(postsListComponent.length).toBe(1);
  });

  test('Posts list contains 5 posts', () => {
    const postsListComponent = findByTestAttr(wrapper, 'posts-list');
    expect(postsListComponent.children().length).toBe(5);
  });

});