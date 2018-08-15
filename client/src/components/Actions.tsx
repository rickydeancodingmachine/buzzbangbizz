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
    <div>
      <Row className="mt-4 justify-content-center">
        <Col xs="auto">
          <ButtonGroup>
            <Button onClick={toggleStartOverModal} color="primary">
              Start{' '}
              <span
                style={started ? { display: 'inline' } : { display: 'none' }}>
                Over
              </span>
            </Button>
            {started && (
              <Button color="success" disabled={!started} onClick={submitGuess}>
                Check Answer
              </Button>
            )}
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
};

export default Actions;
