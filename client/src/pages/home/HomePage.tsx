import React, { useState } from 'react';
import Modal from '../../components/modal/CustomModal';
import Camera from '../../components/camera/Camera';
import { useFetchPosts } from '../../hooks/useFetchPosts';
import { IPost } from '../../interfaces/models/post';

const HomePage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { posts, loading, error } = useFetchPosts();
  let postsList;

  if (loading) {
    postsList = <h1>Loading</h1>;
  } else if (error) {
    postsList = <h1>Error</h1>;
  } else {
    postsList = posts.map((post: IPost) => (
      <div key={post.id}>
        <strong>{post.title}</strong>
        <img src={post.imageUrl} alt={post.title} />
      </div>
    ));
  }

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        Show modal
      </button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <Camera
          setImageUrl={(imageUrl: string) => {}}
          closeModal={() => setModalIsOpen(false)}
        />
      </Modal>
      {postsList}
    </div>
  );
};

export default HomePage;
