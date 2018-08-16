import * as React from 'react';
import { ListGroup, ListGroupItem, Button, Row, Col, Input } from 'reactstrap';
import { logout } from '../utils/AuthService';
import { Test } from '../App';
import Leaderboard from './Leaderboard';

interface OwnProps {
  username: string;
  test: Test;
  changeTest: (key: string, value: number) => void;
}

type SettingsProps = OwnProps;

class Settings extends React.Component<SettingsProps> {
  render() {
    const { username, test, changeTest } = this.props;
    const TestNumberForm: JSX.Element[] = Object.keys(test).map(
      (key: string) => {
        return (
          <Row key={key} className="justify-content-center m-2">
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
        );
      },
    );

    return (
      <div>
        <ListGroup>
          <ListGroupItem color="light">
            <h5 className="m-0">Test Numbers</h5>
          </ListGroupItem>
          <ListGroupItem>{TestNumberForm}</ListGroupItem>
          <Leaderboard username={username} />
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

export default Settings;
