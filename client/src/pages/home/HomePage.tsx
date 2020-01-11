import React, { useState } from 'react';
import Modal from '../../components/modal/CustomModal';
import Camera from '../../components/camera/Camera';

const HomePage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
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
    </div>
  );
};

export default HomePage;
