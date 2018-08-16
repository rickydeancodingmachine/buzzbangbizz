import * as React from 'react';
import { ListGroupItem, Row, Col, Table, Badge, Button } from 'reactstrap';
import Spinner from '../utils/Spinner/Spinner';
import { logout } from '../utils/AuthService';
import axios from 'axios';

interface OwnProps {
  username: string;
}

interface LeaderboardState {
  leaderboard: { username: string; num: number }[];
  loading: boolean;
  error: {
    status: boolean;
    alert: { color: string; msg: string };
  };
}

type LeaderboardProps = OwnProps;

class LeaderboardChekboxes extends React.Component<
  LeaderboardProps,
  LeaderboardState
> {
  state = {
    leaderboard: [],
    loading: true,
    error: {
      status: false,
      alert: { color: '', msg: '' },
    },
  };
  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    // tslint:disable-next-line
    console.log('refresh');
    axios
      .get('/leaderboard')
      .then(response => {
        this.setState({
          ...this.state,
          leaderboard: response.data,
          loading: false,
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          // unauthorized request
          logout();
          this.setState({
            ...this.state,
            error: {
              status: true,
              alert: {
                color: 'danger',
                msg: "You're no longer logged in, please refresh the page.",
              },
            },
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            error: {
              status: true,
              alert: { color: 'danger', msg: 'Something went wrong! Reload.' },
            },
            loading: false,
          });
        }
      });
  };

  render() {
    const { username } = this.props;
    const { loading, leaderboard } = this.state;
    const LeaderboardList = leaderboard.map(
      (user: { username: string; num: number }) => {
        const Item =
          user.username === username ? (
            <tr key={user.username}>
              <td>
                <Badge className="mr-1" color="primary">
                  you
                </Badge>
              </td>
              <td>{user.num}</td>
            </tr>
          ) : (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.num}</td>
            </tr>
          );
        return Item;
      },
    );
    return (
      <div>
        <ListGroupItem color="light">
          <Row>
            <Col>
              <h5 className="m-0">Leaderboard</h5>
            </Col>
            <Col xs="auto">
              <Button size="sm" color="primary" onClick={this.refresh}>
                refresh
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row className="justify-content-center">
            <Col xs="12" sm="10" md="7" lg="5">
              {loading ? (
                <Spinner />
              ) : (
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Number</th>
                    </tr>
                  </thead>
                  <tbody>{LeaderboardList}</tbody>
                </Table>
              )}
            </Col>
          </Row>
        </ListGroupItem>
      </div>
    );
  }
}

export default LeaderboardChekboxes;
