import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, ListGroup, ListGroupItem, Collapse } from 'reactstrap';
import { isMultiple } from '../utils';
import Num from './Num';
import InputChekboxes from './InputCheckboxes';
import Actions from './Actions';
import ConfirmStartOverModal from './ConfirmStartOverModal';
import ResultModal from './ResultModal';

type BuzzBangBizzProps = RouteComponentProps<{}>;

export interface BuzzBangBizzForm {
  [key: string]: boolean;
}

export interface Test {
  [key: string]: number;
}

export interface Result extends BuzzBangBizzForm {
  valid: boolean;
}

interface BuzzBangBizzState {
  num: number;
  test: Test;
  guess: BuzzBangBizzForm;
  result: Result;
  resultModal: boolean;
  confirmStartOverModal: boolean;
  started: boolean;
}
class BuzzBangBizz extends React.Component<
  BuzzBangBizzProps,
  BuzzBangBizzState
> {
  state = {
    num: 1,
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
    started: false,
  };

  startOverConfirmed = (): void => {
    this.setState({
      ...this.state,
      num: 1,
      test: {
        buzz: 3,
        bang: 5,
        bizz: 7,
      },
      guess: {
        ...this.state.guess,
        buzz: false,
        bang: false,
        bizz: false,
      },
      result: {
        ...this.state.result,
        buzz: false,
        bang: false,
        bizz: false,
      },
      resultModal: false,
      confirmStartOverModal: false,
      started: true,
    });
  };

  toggleStartOverModal = (): void => {
    this.state.started
      ? this.setState({
          ...this.state,
          confirmStartOverModal: !this.state.confirmStartOverModal,
        })
      : this.startOverConfirmed();
  };

  guessChange = (key: string): void => {
    this.setState({
      ...this.state,
      guess: {
        ...this.state.guess,
        [key]: !this.state.guess[key],
      },
    });
  };

  submitGuess = (): void => {
    const result: Result = { valid: true };
    Object.keys(this.state.test).forEach((key: string) => {
      result[key] =
        isMultiple(this.state.test[key], this.state.num) ===
        this.state.guess[key];
      if (!result[key]) {
        result.valid = false;
      }
    });
    this.setState({
      ...this.state,
      result,
      resultModal: true,
    });
  };

  continueToNextNumber = (): void => {
    this.setState({
      ...this.state,
      num: this.state.num + 1,
      guess: {
        ...this.state.guess,
        buzz: false,
        bang: false,
        bizz: false,
      },
      result: {
        ...this.state.result,
        buzz: false,
        bang: false,
        bizz: false,
      },
      resultModal: false,
      confirmStartOverModal: false,
      started: true,
    });
  };

  render() {
    const {
      guess,
      test,
      started,
      num,
      confirmStartOverModal,
      resultModal,
      result,
    } = this.state;
    return (
      <Container>
        <ListGroup>
          <ListGroupItem active>
            <h1>Buzz Bang Bizz!</h1>
            <p>How well do you know your multiples? Play to find out!</p>
          </ListGroupItem>
          <ListGroupItem>
            <Collapse isOpen={started}>
              <Num num={num} />
              <InputChekboxes
                guess={guess}
                test={test}
                guessChange={this.guessChange}
              />
            </Collapse>
            <Actions
              started={started}
              toggleStartOverModal={this.toggleStartOverModal}
              submitGuess={this.submitGuess}
            />
          </ListGroupItem>
        </ListGroup>
        <ConfirmStartOverModal
          isOpen={confirmStartOverModal}
          toggleModal={this.toggleStartOverModal}
          startOver={this.startOverConfirmed}
        />
        <ResultModal
          isOpen={resultModal}
          result={result}
          test={test}
          guess={guess}
          num={num}
          startOver={this.startOverConfirmed}
          continueToNext={this.continueToNextNumber}
        />
      </Container>
    );
  }
}

export default withRouter(BuzzBangBizz);
