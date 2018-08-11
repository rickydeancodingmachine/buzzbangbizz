import * as React from 'react';
import { Row, Col } from 'reactstrap';
import { colSeparated } from '../utils';

interface NumProps {
  num: number;
}
const Num: React.SFC<NumProps> = (props: NumProps) => {
  return (
    <Row className="mt-3 justify-content-center">
      <Col xs="auto">
        <h3 className="p-3 bg-dark shadow rounded text-white">
          {colSeparated(props.num)}
        </h3>
      </Col>
    </Row>
  );
};

export default Num;
