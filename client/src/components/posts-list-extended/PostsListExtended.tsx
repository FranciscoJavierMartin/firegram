import React, { useState } from 'react';
import PostsList from '../posts-list/PostsList';
import { IPost } from '../../interfaces/models/post';
import { Modal } from 'antd';
import PostDetail from '../post-detail/PostDetail';

interface IPostListExtendedProps {
  posts: IPost[];
}

const PostListExtended: React.FC<IPostListExtendedProps> = (
  props: IPostListExtendedProps
) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<IPost>();

  // TODO: Remove this function, pass the setCurrentPost function instead
  const selectCurrentPost = (post: IPost) => {
    setCurrentPost(post);
  };

  return (
    <React.Fragment>
      <PostsList
        posts={props.posts}
        selectCurrentPost={selectCurrentPost}
        setModalVisible={setModalIsOpen}
      />
      <Modal
        visible={modalIsOpen}
        centered
        footer={null}
        closable
        destroyOnClose={true}
        mask
        maskClosable
        onCancel={() => {
          setModalIsOpen(false);
        }}
      >
        <PostDetail post={currentPost} />
      </Modal>
    </React.Fragment>
  );
};

export default PostListExtended;
