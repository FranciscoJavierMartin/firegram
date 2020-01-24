import React, { useState } from 'react';
import { Modal } from 'antd';
import Camera from '../../components/camera/Camera';
import { useFetchPosts } from '../../hooks/useFetchPosts';
import PostsList from '../../components/posts-list-extended/PostsListExtended';

const HomePage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { posts, loading, error } = useFetchPosts();
  let postsList;

  if (loading) {
    postsList = <h1>Loading</h1>;
  } else if (error) {
    postsList = <h1>Error</h1>;
  } else if (posts.length === 0) {
    postsList = <h1>No posts available</h1>;
  } else {
    postsList = <PostsList posts={posts} />;
  }

  return (
    <div>
      <h1>Home1</h1>
      <button
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        Create a post
      </button>
      <Modal
        visible={modalIsOpen}
        centered
        footer={null}
        closable
        destroyOnClose={true}
        mask
        maskClosable
        onCancel={() => { setModalIsOpen(false); }}
      >
        <Camera
          closeModal={() => setModalIsOpen(false)}
        />
      </Modal>
      {postsList}
    </div>
  );
};

export default HomePage;
