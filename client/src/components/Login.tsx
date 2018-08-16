import * as React from 'react';
import {
  Redirect,
  RouteComponentProps,
  withRouter,
  Link,
} from 'react-router-dom';
import {
  Col,
  Row,
  Alert,
  Container,
  Input,
  Button,
  ListGroupItem,
} from 'reactstrap';
import Spinner from '../utils/Spinner/Spinner';

interface OwnProps {
  user?: boolean;
  loading: boolean;
  onSubmit: (data: LoginForm) => any;
  error: { status: boolean; alert: { color: string; msg: string } };
}

export interface LoginForm {
  [key: string]: string;
}

type LoginProps = OwnProps & RouteComponentProps<{}>;

interface LoginState {
  form: LoginForm;
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    form: {
      username: '',
      password: '',
    },
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  render() {
    const {
      user,
      loading,
      onSubmit,
      error: { status, alert },
    } = this.props;
    const {
      form: { username, password },
    } = this.state;
    return (
      <ListGroupItem>
        <Container>
          {user && <Redirect to="/" />}
          {!user && loading && <Spinner />}
          {!user && status && <Alert color={alert.color}>{alert.msg}</Alert>}
          {!user &&
            !loading && (
              <div>
                <Row className="justify-content-center">
                  <Col xs="12" sm="10" md="5" lg="4">
                    Username
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs="12" sm="10" md="5" lg="4">
                    <Input
                      onChange={this.changeHandler}
                      name="username"
                      type="text"
                      value={username}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                  <Col xs="12" sm="10" md="5" lg="4">
                    Password
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs="12" sm="10" md="5" lg="4">
                    <Input
                      onChange={this.changeHandler}
                      name="password"
                      type="password"
                      value={password}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                  <Col xs="12" sm="10" md="5" lg="4">
                    <Button
                      className="w-100"
                      color="primary"
                      onClick={() => onSubmit(this.state.form)}>
                      Login
                    </Button>
                  </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                  <Col xs="12" sm="10" md="5" lg="4">
                    <Container className="border p-3 mb-5 bg-white rounded">
                      <Link to="/signup">Or create an account</Link>
                    </Container>
                  </Col>
                </Row>
              </div>
            )}
        </Container>
      </ListGroupItem>
    );
  }
}

export default withRouter(Login);
