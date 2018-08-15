import * as React from 'react';
import { Row, Col } from 'reactstrap';

import './Spinner.css';

const Spinner = () => {
  return (
    <Row className="p-5 justify-content-center align-items-center">
      <Col xs="auto">
        <div className="spinner">
          <div className="bg-primary bounce1" />
          <div className="bg-primary bounce2" />
          <div className="bg-primary bounce3" />
        </div>
      </Col>
    </Row>
  );
};

export default Spinner;
