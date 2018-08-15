import * as React from 'react';
import { Row, Col, Button, ButtonGroup, Collapse, Alert } from 'reactstrap';
import { colSeparated } from '../utils';

interface NumProps {
  num: number;
  saveProgress: () => void;
  saveAlert: boolean;
}

class Num extends React.Component<NumProps> {
  render() {
    return (
      <div>
        <Collapse isOpen={this.props.saveAlert}>
          <Alert color="success">Success!</Alert>
        </Collapse>
        <Row className="mt-3 mb-4 justify-content-center">
          <Col xs="auto">
            <ButtonGroup>
              <Button
                color="light"
                disabled
                className="p-2 shadow rounded-right">
                <h3 className="m-0 pl-2 pr-2">
                  {colSeparated(this.props.num)}
                </h3>
              </Button>
              <Button
                color="light"
                className="p-2 shadow rounded-right"
                onClick={this.props.saveProgress}>
                Save Progress
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Num;
