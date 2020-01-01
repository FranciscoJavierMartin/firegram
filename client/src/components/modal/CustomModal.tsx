import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

interface ICustomModalProps {
  isOpen: boolean;
  setIsOpen: any;
  children?: any;
}

const CustomModal: React.FC<ICustomModalProps> = (props: ICustomModalProps) => {
  return (
    <Modal
      style={customStyles}
      isOpen={props.isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => props.setIsOpen(false)}
    >
      {props.children}
    </Modal>
  );
};

export default CustomModal;
