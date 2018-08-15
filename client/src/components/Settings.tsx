import * as React from 'react';
import { ListGroup, ListGroupItem, Button, Row, Col, Input } from 'reactstrap';
import { logout } from '../utils/AuthService';
import { Test } from '../App';

interface OwnProps {
  test: Test;
  changeTest: (key: string, value: number) => void;
}

type SettingsProps = OwnProps;

class SettingsChekboxes extends React.Component<SettingsProps> {
  render() {
    const { test, changeTest } = this.props;
    const TestNumberForm: JSX.Element[] = Object.keys(test).map(
      (key: string) => {
        return (
          <ListGroupItem key={key}>
            <Row className="justify-content-center">
              <Col xs="3" sm="2" md="1">
                {key + ':'}
              </Col>
              <Col xs="9" sm="8" md="5" lg="4">
                <Input
                  type="number"
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    changeTest(key, Number(e.currentTarget.value))
                  }
                  value={test[key].toString()}
                />
              </Col>
            </Row>
          </ListGroupItem>
        );
      },
    );
    return (
      <div>
        <ListGroup>
          <ListGroupItem active>
            <h6 className="m-0">Test Numbers</h6>
          </ListGroupItem>
          {TestNumberForm}
        </ListGroup>
        <Button
          color="danger"
          className="mt-4 w-100"
          onClick={() => {
            logout();
            window.location.reload();
          }}>
          Logout
        </Button>
      </div>
    );
  }
}

export default SettingsChekboxes;
