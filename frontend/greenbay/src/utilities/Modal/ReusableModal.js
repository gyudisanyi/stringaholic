import React, { useEffect } from 'react';
import './ReusableModal.css';
import Button from '../../components/Button/Button';

function ReusableModal({
  closeModal, headerText, Component,
}) {
  function clicked(event) {
    if (event.target.className === 'modalOverlay') {
      closeModal();
    }
  }

  useEffect(() => {
    function isItEsc(event) {
      if (event.keyCode === 27) {
        closeModal();
      }
    }
    document.addEventListener('keydown', isItEsc, false);

    return () => {
      document.removeEventListener('keydown', isItEsc, false);
    };
  }, [closeModal]);

  return (
    // eslint-disable-next-line
    <div role="button" className="modalOverlay" onClick={clicked}>
      <div className="fixButton">
        <Button buttonText="CLOSE" buttonClass="" handleClick={closeModal} />
      </div>
      <div className="modal">
        <h2>{headerText}</h2>
        {Component}
      </div>
    </div>
  );
}

export default ReusableModal;
