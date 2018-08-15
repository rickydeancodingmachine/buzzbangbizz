import * as React from 'react';
import {
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Badge,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Test, BuzzBangBizzForm } from '../App';

interface InputCheckboxesProps {
  test: Test;
  guess: BuzzBangBizzForm;
  guessChange: (key: string) => void;
}
const InputChekboxes: React.SFC<InputCheckboxesProps> = (
  props: InputCheckboxesProps,
) => {
  const { guess, test, guessChange } = props;
  const InputCheckboxList = Object.keys(test).map((key: string) => {
    const selectedStyle = guess[key] ? 'bg-light' : 'bg-white';
    return (
      <ListGroupItem key={key} className={'p-0 ' + selectedStyle}>
        <FormGroup check>
          <Label check className="p-3 lead">
            <Input
              type="checkbox"
              checked={guess[key]}
              onChange={() => guessChange(key)}
            />{' '}
            {key + ' '}
            <Badge color="primary">{test[key]}</Badge>
          </Label>
        </FormGroup>
      </ListGroupItem>
    );
  });
  return (
    <Row className="mt-3 justify-content-center">
      <Col xs="auto">
        <ListGroup>{InputCheckboxList}</ListGroup>
      </Col>
    </Row>
  );
};

export default InputChekboxes;
