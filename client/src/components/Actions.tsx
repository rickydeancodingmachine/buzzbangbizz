import * as React from 'react';
import { Row, Col, ButtonGroup, Button } from 'reactstrap';

interface ActionsProps {
  started: boolean;
  toggleStartOverModal: () => void;
  submitGuess: () => void;
}
const Actions: React.SFC<ActionsProps> = (props: ActionsProps) => {
  const { started, toggleStartOverModal, submitGuess } = props;
  return (
    <Row className="mt-4 justify-content-center">
      <Col xs="auto">
        <ButtonGroup>
          <Button onClick={toggleStartOverModal} color="primary">
            Start{' '}
            <span style={started ? { display: 'inline' } : { display: 'none' }}>
              Over
            </span>
          </Button>
          <Button
            color="success"
            disabled={!started}
            outline
            onClick={submitGuess}>
            Check Answer
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export default Actions;
