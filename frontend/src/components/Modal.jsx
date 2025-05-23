const Modal = ({ isActive, closeModal, children }) => {
    if (!isActive) return null;
    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                {children}
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
    );
};

export default Modal;