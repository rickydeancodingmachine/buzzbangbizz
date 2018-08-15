import * as React from 'react';
import { Row, Col, Modal, ModalBody, Button } from 'reactstrap';

interface ConfirmStartOverModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  startOver: () => void;
}
const ConfirmStartOverModal: React.SFC<ConfirmStartOverModalProps> = (
  props: ConfirmStartOverModalProps,
) => {
  const { isOpen, toggleModal, startOver } = props;
  return (
    <Modal centered isOpen={isOpen} toggle={toggleModal}>
      <ModalBody className="pt-5 pb-5">
        <Row>
          <Col xs="12" className="mb-2">
            <Button
              size="lg"
              className="w-100 mb-3"
              color="danger"
              outline
              onClick={startOver}>
              I'm sure I want to start over.
            </Button>{' '}
          </Col>
          <Col xs="12">
            <Button
              size="lg"
              className="w-100 mt-3"
              color="secondary"
              onClick={toggleModal}>
              Cancel
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmStartOverModal;
