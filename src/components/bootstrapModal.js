import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

const BootstrapModal = ({ show,text, modalTitle }) => {
  const modalRef = useRef();

  const openModal = () => {
    const modal = new Modal(modalRef.current);
    modal.show();
  };
  useEffect(()=>{
    if(show){
      openModal();
    }
  }, [show])
  return (
    <>
      <div
        className="modal fade"
        tabIndex="-1"
        ref={modalRef}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Zamknij"
              ></button>
            </div>
            <div className="modal-body">
              <p>{text}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BootstrapModal;
