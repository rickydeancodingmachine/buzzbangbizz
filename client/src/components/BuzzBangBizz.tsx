import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Collapse, Alert } from 'reactstrap';
import Num from './Num';
import InputChekboxes from './InputCheckboxes';
import Actions from './Actions';
import ConfirmStartOverModal from './ConfirmStartOverModal';
import ResultModal from './ResultModal';
import { BuzzBangBizzForm, Result, Test } from '../App';

interface OwnProps {
  user: { id: number; num: number };
  error: { status: boolean; alert: { color: string; msg: string } };
  saveProgress: () => void;
  saveAlert: boolean;
  buzzbangbizz: {
    state: {
      started: boolean;
      num: number;
      test: Test;
      guess: BuzzBangBizzForm;
      result: Result;
      confirmStartOverModal: boolean;
      resultModal: boolean;
    };
    toggleStartOverModal: () => void;
    startOver: () => void;
    nextNum: () => void;
    guessChange: (key: string) => void;
    submitGuess: () => void;
  };
}

type BuzzBangBizzProps = OwnProps & RouteComponentProps<{}>;

class BuzzBangBizz extends React.Component<BuzzBangBizzProps> {
  render() {
    const {
      error: { status, alert },
      saveProgress,
      saveAlert,
      buzzbangbizz: {
        state: {
          started,
          num,
          guess,
          test,
          result,
          confirmStartOverModal,
          resultModal,
        },
        guessChange,
        submitGuess,
        nextNum,
        startOver,
        toggleStartOverModal,
      },
    } = this.props;
    return (
      <div>
        {status ? (
          <Alert color={alert.color}>{alert.msg}</Alert>
        ) : (
          <div>
            <Collapse isOpen={started}>
              <Num
                num={num}
                saveProgress={saveProgress}
                saveAlert={saveAlert}
              />
              <InputChekboxes
                guess={guess}
                test={test}
                guessChange={guessChange}
              />
            </Collapse>
            <Actions
              started={started}
              toggleStartOverModal={toggleStartOverModal}
              submitGuess={submitGuess}
            />
            <ConfirmStartOverModal
              isOpen={confirmStartOverModal}
              toggleModal={toggleStartOverModal}
              startOver={startOver}
            />
            <ResultModal
              isOpen={resultModal}
              result={result}
              test={test}
              guess={guess}
              num={num}
              startOver={startOver}
              continueToNext={nextNum}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(BuzzBangBizz);
