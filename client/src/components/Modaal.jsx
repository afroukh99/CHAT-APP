import React from 'react'
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border:'none',
    boxShadow:'0px 0px 25px -10px rgba(0, 0, 0, 0.38)',
  },
};

const Modaal = ({openModal,children}) => {

  return (
    <Modal
      isOpen={openModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {children}
    </Modal>
  )
}

export default Modaal