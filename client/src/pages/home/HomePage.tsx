import React, { useState } from 'react';
import Modal from '../../components/modal/CustomModal';

const HomePage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return(
  <div>
    <h1>Home</h1>
    <button onClick={() => {
      setModalIsOpen(true);
    }}>Show modal</button>
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <h1>Modal</h1>
    </Modal>
  </div>);
};

export default HomePage;
