import ReactDOM from 'react-dom';
import './Modal.css';

const Backdrop = ({ onBackdropClick }) => {
	return <div className='backdrop' onClick={onBackdropClick}></div>;
};

const ModalOverlay = ({ children }) => {
	return <div className='modal'>{children}</div>;
};

const Modal = ({ children, onModalClick }) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onBackdropClick={onModalClick} />,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>{children}</ModalOverlay>,
				document.getElementById('overlay-root')
			)}
		</>
	);
};

export default Modal;
