import * as React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import DonavanPoorImg from '../assets/donavan_poor.jpg';
import DonavanWiseImg from '../assets/donavan_wise.png';
import { Result, Test, BuzzBangBizzForm } from './BuzzBangBizz';

interface ResultModalProps {
  isOpen: boolean;
  result: Result;
  test: Test;
  guess: BuzzBangBizzForm;
  num: number;
  startOver: () => void;
  continueToNext: () => void;
}
const ResultModal: React.SFC<ResultModalProps> = (props: ResultModalProps) => {
  const { isOpen, result, test, guess, num, continueToNext, startOver } = props;
  const wrongGuessesList: JSX.Element[] = [];
  Object.keys(test).forEach((key: string) => {
    if (!result[key]) {
      wrongGuessesList.push(
        <ListGroupItem key={key}>
          {test[key] +
            (guess[key] === true ? ' is not ' : ' is ') +
            'a multiple of ' +
            num +
            '.'}
        </ListGroupItem>,
      );
    }
  });
  return (
    <Modal centered isOpen={isOpen}>
      <ModalHeader>
        {result.valid ? 'Congratulations!' : "Ooo we're sorry..."}
      </ModalHeader>
      <ModalBody>
        <ListGroup>
          <ListGroupItem className="p-0">
            <img
              className={result.valid ? 'rounded' : 'rounded-top'}
              width="100%"
              src={result.valid ? DonavanWiseImg : DonavanPoorImg}
              alt="Donavan Poor"
            />
          </ListGroupItem>
          {result.valid ? null : wrongGuessesList}
        </ListGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-100"
          color={result.valid ? 'success' : 'primary'}
          onClick={() => (result.valid ? continueToNext() : startOver())}>
          {result.valid ? 'Next number' : 'Start over'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ResultModal;
