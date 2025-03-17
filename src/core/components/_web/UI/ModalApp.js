import Modal from 'react-bootstrap/Modal';

export const ModalApp = ({ useIsOpenModal, onCloseModal, children }) => {


    return <Modal show={useIsOpenModal} onHide={onCloseModal}>
        <Modal.Header closeButton className='card_header_modal_content'>
            <Modal.Title>Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>;
}