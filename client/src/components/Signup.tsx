import * as React from 'react';
import {
  withRouter,
  Redirect,
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import { Container, Input, Alert, Row, Col, Button, Badge } from 'reactstrap';
import Spinner from '../utils/Spinner/Spinner';

interface OwnProps {
  user: boolean;
  loading: boolean;
  onSubmit: (data: SignupForm) => any;
  error: { status: boolean; alert: { color: string; msg: string } };
}

export interface SignupForm {
  [key: string]: string;
}

type SignupProps = OwnProps & RouteComponentProps<{}>;

interface SignupState {
  form: SignupForm;
  username_status: string;
  password_status: string;
  password_again_status: string;
}

class Signup extends React.Component<SignupProps, SignupState> {
  state = {
    form: {
      username: '',
      password: '',
      password_again: '',
    },
    username_status: '',
    password_status: '',
    password_again_status: '',
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'username':
        this.setState({
          ...this.state,
          form: {
            ...this.state.form,
            [event.target.name]: event.target.value,
          },
        });
        break;
      case 'password':
        if (event.target.value.length > 6) {
          if (event.target.value === this.state.form.password_again) {
            this.setState({
              ...this.state,
              form: {
                ...this.state.form,
                [event.target.name]: event.target.value,
              },
              password_status: 'match',
              password_again_status: 'match',
            });
          } else {
            this.setState({
              ...this.state,
              form: {
                ...this.state.form,
                [event.target.name]: event.target.value,
              },
              password_status: 'valid',
            });
          }
        } else {
          this.setState({
            ...this.state,
            form: {
              ...this.state.form,
              [event.target.name]: event.target.value,
            },
          });
        }
        break;
      case 'password_again':
        if (this.state.form.password.length > 6) {
          if (event.target.value === this.state.form.password) {
            this.setState({
              ...this.state,
              form: {
                ...this.state.form,
                [event.target.name]: event.target.value,
              },
              password_status: 'match',
              password_again_status: 'match',
            });
          } else {
            this.setState({
              ...this.state,
              form: {
                ...this.state.form,
                [event.target.name]: event.target.value,
              },
              password_again_status: 'no match',
            });
          }
        } else {
          this.setState({
            ...this.state,
            form: {
              ...this.state.form,
              [event.target.name]: event.target.value,
            },
            password_status: 'no match',
            password_again_status: 'no match',
          });
        }
        break;
      default:
    }
  };

  blurHandler = (event: React.FormEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case 'username':
        if (event.currentTarget.value.length > 3) {
          this.setState({
            username_status: 'valid',
          });
        } else {
          this.setState({
            username_status: 'invalid length',
          });
        }
        break;
      case 'password':
        if (event.currentTarget.value.length < 6) {
          this.setState({
            password_status: 'invalid length',
          });
        } else {
          if (event.currentTarget.value === this.state.form.password_again) {
            this.setState({
              password_status: 'match',
            });
          } else {
            this.setState({
              password_status: 'no match',
            });
          }
        }
        break;
      case 'password_again':
        if (this.state.form.password.length > 5) {
          if (event.currentTarget.value === this.state.form.password) {
            this.setState({
              password_status: 'match',
            });
          } else {
            this.setState({
              password_status: 'no match',
            });
          }
        }
        break;
      default:
    }
  };

  render() {
    const {
      user,
      loading,
      onSubmit,
      error: { status, alert },
    } = this.props;
    const {
      form: { username, password, password_again },
      username_status,
      password_status,
      password_again_status,
    } = this.state;
    return (
      <Container fluid>
        {user && <Redirect to={'/'} />}
        {!user && loading && <Spinner />}
        {!user && status && <Alert color={alert.color}>{alert.msg}</Alert>}
        {!user &&
          !loading && (
            <div>
              <Row className="justify-content-center">
                <Col xs="12" sm="10" md="5" lg="4">
                  <Row>
                    <Col>Username</Col>
                    <Col xs="auto">
                      <Badge color="secondary">{username_status}</Badge>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs="12" sm="10" md="5" lg="4">
                  <Input
                    onChange={this.changeHandler}
                    onBlur={this.blurHandler}
                    name="username"
                    type="text"
                    value={username}
                  />
                </Col>
              </Row>
              <Row className="justify-content-center mt-3">
                <Col xs="12" sm="10" md="5" lg="4">
                  <Row>
                    <Col>Password</Col>
                    <Col xs="auto">
                      <Badge color="secondary">{password_status}</Badge>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs="12" sm="10" md="5" lg="4">
                  <Input
                    onChange={this.changeHandler}
                    onBlur={this.blurHandler}
                    name="password"
                    type="password"
                    value={password}
                  />
                </Col>
              </Row>
              <Row className="justify-content-center mt-3">
                <Col xs="12" sm="10" md="5" lg="4">
                  <Row>
                    <Col>Password again</Col>
                    <Col xs="auto">
                      <Badge color="secondary">{password_again_status}</Badge>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs="12" sm="10" md="5" lg="4">
                  <Input
                    onChange={this.changeHandler}
                    onBlur={this.blurHandler}
                    name="password_again"
                    type="password"
                    value={password_again}
                  />
                </Col>
              </Row>
              <Row className="justify-content-center mt-3">
                <Col xs="12" sm="10" md="5" lg="4">
                  <Button
                    className="w-100"
                    color="primary"
                    onClick={() =>
                      onSubmit({ username, password, password_again })
                    }>
                    Signup
                  </Button>
                </Col>
              </Row>
              <Row className="justify-content-center mt-3">
                <Col xs="12" sm="10" md="5" lg="4">
                  <Container className="border p-3 mb-5 bg-white rounded">
                    <Link to="/login">Or log into an existing account</Link>
                  </Container>
                </Col>
              </Row>
            </div>
          )}
      </Container>
    );
  }
}

export default withRouter(Signup);
