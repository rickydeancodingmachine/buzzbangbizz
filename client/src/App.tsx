import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from 'reactstrap';
import PrivateRoute from './hoc/PrivateRoute';
import Login, { LoginForm } from './components/Login';
import Signup, { SignupForm } from './components/Signup';
import Settings from './components/Settings';
import { isLoggedIn, logout, login, getIdToken } from './utils/AuthService';
import { isMultiple } from './utils';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BuzzBangBizz from './components/BuzzBangBizz';

export interface BuzzBangBizzForm {
  [key: string]: boolean;
}

export interface Test {
  [key: string]: number;
}

export interface Result extends BuzzBangBizzForm {
  valid: boolean;
}

interface AppState {
  activeTab: string;
  user: {
    id: number;
    username: string;
    num: number;
  };
  buzzbangbizz: {
    started: boolean;
    num: number;
    test: Test;
    guess: BuzzBangBizzForm;
    result: Result;
    resultModal: boolean;
    confirmStartOverModal: boolean;
  };
  loggedIn: boolean;
  loading: boolean;
  error: {
    status: boolean;
    alert: { color: string; msg: string };
  };
  saveAlert: boolean;
}

class App extends React.Component<{}, AppState> {
  state = {
    activeTab: '1',
    user: {
      id: 0,
      username: '',
      num: 0,
    },
    buzzbangbizz: {
      started: false,
      num: 0,
      test: {
        buzz: 3,
        bang: 5,
        bizz: 7,
      },
      guess: {
        buzz: false,
        bang: false,
        bizz: false,
      },
      result: {
        buzz: false,
        bang: false,
        bizz: false,
        valid: false,
      },
      resultModal: false,
      confirmStartOverModal: false,
    },
    loading: true,
    loggedIn: isLoggedIn(),
    error: { status: false, alert: { color: '', msg: '' } },
    saveAlert: false,
  };
  componentDidMount() {
    axios
      .get('/users')
      .then(response => {
        this.setState({
          ...this.state,
          user: {
            id: response.data.id,
            username: response.data.username,
            num: response.data.num,
          },
          buzzbangbizz: {
            ...this.state.buzzbangbizz,
            started: this.state.buzzbangbizz.started,
            num: response.data.num,
          },
          loggedIn: true,
          loading: false,
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          // unauthorized request
          logout();
          this.setState({ ...this.state, loggedIn: false, loading: false });
        } else {
          this.setState({
            ...this.state,
            error: {
              status: true,
              alert: { color: 'danger', msg: 'Something went wrong! Reload.' },
            },
            loggedIn: false,
            loading: false,
          });
        }
      });
  }

  sudoLogout = () => {
    logout();
    this.setState({
      user: { id: 0, username: '', num: 0 },
      loggedIn: false,
    });
  };
  submitLoggin = (data: LoginForm) => {
    this.setState({ ...this.state, loading: true });
    axios
      .post('/users/login', data)
      .then(response => {
        if (response.data.msg === 'Successfully authenticated user') {
          login(response.data.token);
          axios.defaults.headers.common.Authorization = getIdToken();
          this.setState({
            ...this.state,
            user: response.data.user,
            buzzbangbizz: {
              ...this.state.buzzbangbizz,
              num: response.data.num,
            },
            error: { status: false, alert: { color: '', msg: '' } },
            loggedIn: true,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            error: {
              status: true,
              alert: { color: 'danger', msg: response.data.msg },
            },
            loading: false,
            loggedIn: false,
          });
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            loading: false,
            loggedIn: false,
            error: {
              status: true,
              alert: { color: 'warning', msg: 'Invalid password' },
            },
          });
        } else if (error.response.status === 409) {
          this.setState({
            loading: false,
            loggedIn: false,
            error: {
              status: true,
              alert: { color: 'warning', msg: 'Invalid username' },
            },
          });
        } else {
          this.setState({
            loading: false,
            loggedIn: false,
            error: {
              status: true,
              alert: { color: 'warning', msg: 'Something went wrong! Reload.' },
            },
          });
        }
      });
  };
  submitSignup = (data: SignupForm) => {
    this.setState({ ...this.state, loading: true });
    axios
      .post('/users/create', data)
      .then(response => {
        if (response.data.msg === 'Successfully created user') {
          login(response.data.token);
          axios.defaults.headers.common.Authorization = getIdToken();
          this.setState({
            ...this.state,
            user: response.data.user,
            error: { status: false, alert: { color: '', msg: '' } },
            loggedIn: true,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            error: {
              status: true,
              alert: { color: 'danger', msg: response.data.msg },
            },
            loading: false,
            loggedIn: false,
          });
        }
      })
      .catch(error => {
        if (error.response.status === 409) {
          this.setState({
            loading: false,
            loggedIn: false,
            error: {
              status: true,
              alert: { color: 'warning', msg: 'Try another username' },
            },
          });
        } else {
          this.setState({
            loading: false,
            loggedIn: false,
            error: {
              status: true,
              alert: { color: 'warning', msg: 'Something went wrong! Reload.' },
            },
          });
        }
      });
  };
  saveProgress = () => {
    this.setState({ loading: true });
    axios
      .post('/save', { num: this.state.buzzbangbizz.num })
      .then(response => {
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            num: response.data.newStartingNum,
          },
          loading: false,
          saveAlert: true,
        });
        setTimeout(() => {
          this.setState({
            ...this.state,
            saveAlert: false,
          });
        }, 5000);
      })
      .catch(error => {
        if (error.response.status === 401) {
          // unauthorized request
          logout();
          this.setState({ ...this.state, loggedIn: false, loading: false });
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
  toggleStartOverModal = () => {
    this.state.buzzbangbizz.started
      ? this.setState({
          ...this.state,
          buzzbangbizz: {
            ...this.state.buzzbangbizz,
            confirmStartOverModal: !this.state.buzzbangbizz
              .confirmStartOverModal,
          },
        })
      : this.startOver();
  };
  nextNum = () => {
    this.setState({
      ...this.state,
      buzzbangbizz: {
        ...this.state.buzzbangbizz,
        num: this.state.buzzbangbizz.num + 1,
        guess: {
          ...this.state.buzzbangbizz.guess,
          buzz: false,
          bang: false,
          bizz: false,
        },
        result: {
          ...this.state.buzzbangbizz.result,
          buzz: false,
          bang: false,
          bizz: false,
        },
        resultModal: false,
        confirmStartOverModal: false,
      },
    });
  };
  startOver = () => {
    this.setState({
      ...this.state,
      loading: false,
      buzzbangbizz: {
        ...this.state.buzzbangbizz,
        started: true,
        num: this.state.user.num,
        guess: {
          ...this.state.buzzbangbizz.guess,
          buzz: false,
          bang: false,
          bizz: false,
        },
        result: {
          ...this.state.buzzbangbizz.result,
          buzz: false,
          bang: false,
          bizz: false,
        },
        resultModal: false,
        confirmStartOverModal: false,
      },
    });
  };
  guessChange = (guessKey: string): void => {
    this.setState({
      ...this.state,
      buzzbangbizz: {
        ...this.state.buzzbangbizz,
        guess: {
          ...this.state.buzzbangbizz.guess,
          [guessKey]: !this.state.buzzbangbizz.guess[guessKey],
        },
      },
    });
  };
  submitGuess = (): void => {
    const result: Result = { valid: true };
    const {
      buzzbangbizz: { num, test, guess },
    } = this.state;
    Object.keys(test).forEach((key: string) => {
      result[key] = isMultiple(test[key], num) === guess[key];
      if (!result[key]) {
        result.valid = false;
      }
    });
    this.setState({
      ...this.state,
      buzzbangbizz: {
        ...this.state.buzzbangbizz,
        result,
        resultModal: true,
      },
    });
  };
  changeTest = (key: string, value: number): void => {
    this.setState({
      ...this.state,
      buzzbangbizz: {
        ...this.state.buzzbangbizz,
        test: {
          ...this.state.buzzbangbizz.test,
          [key]: value,
        },
      },
    });
  };

  toggleTabs = (tab: string) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App mt-4 mb-4">
          <Container>
            <ListGroup>
              <ListGroupItem color="secondary">
                <h1>BuzzBangBizz!</h1>
                <p>How well do you know your multiples? Play to find out!</p>
              </ListGroupItem>
              <Switch>
                <Route
                  path="/login"
                  exact
                  render={() => (
                    <Login
                      user={this.state.loggedIn}
                      loading={this.state.loading}
                      onSubmit={this.submitLoggin}
                      error={this.state.error}
                    />
                  )}
                />
                <Route
                  path="/signup"
                  exact
                  render={() => (
                    <Signup
                      user={this.state.loggedIn}
                      loading={this.state.loading}
                      onSubmit={this.submitSignup}
                      error={this.state.error}
                    />
                  )}
                />
                <PrivateRoute
                  path="/"
                  exact
                  user={this.state.loggedIn}
                  loginPath="/login"
                  render={() => (
                    <div>
                      <ListGroupItem>
                        {this.state.loggedIn && (
                          <Nav tabs fill className="mb-4">
                            <NavItem>
                              <NavLink
                                className={
                                  this.state.activeTab === '1' ? 'active' : ''
                                }
                                onClick={() => {
                                  this.toggleTabs('1');
                                }}>
                                Play
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={
                                  this.state.activeTab === '2' ? 'active' : ''
                                }
                                onClick={() => {
                                  this.toggleTabs('2');
                                }}>
                                Settings
                              </NavLink>
                            </NavItem>
                          </Nav>
                        )}
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <BuzzBangBizz
                              user={this.state.user}
                              error={this.state.error}
                              saveProgress={this.saveProgress}
                              saveAlert={this.state.saveAlert}
                              buzzbangbizz={{
                                state: this.state.buzzbangbizz,
                                toggleStartOverModal: this.toggleStartOverModal,
                                startOver: this.startOver,
                                nextNum: this.nextNum,
                                guessChange: this.guessChange,
                                submitGuess: this.submitGuess,
                              }}
                            />
                          </TabPane>
                          <TabPane tabId="2">
                            <Settings
                              username={this.state.user.username}
                              test={this.state.buzzbangbizz.test}
                              changeTest={this.changeTest}
                            />
                          </TabPane>
                        </TabContent>
                      </ListGroupItem>
                    </div>
                  )}
                />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </ListGroup>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
