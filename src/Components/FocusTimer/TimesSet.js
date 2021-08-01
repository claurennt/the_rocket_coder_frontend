import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
//import { Button, Typography } from '@material-ui/core'
import "./FocusTimer.css";

function TimesSet({ setSessionLength, sessionLength, playOn }) {
  const handleSessionIncrement = () => {
    if (sessionLength >= 60 || playOn) {
      return null;
    } else {
      setSessionLength(sessionLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength === 1 || playOn) {
      return null;
    } else {
      setSessionLength(sessionLength - 1);
    }
  };

  return (
    <div>
      <Container id="timeset">
        <Row className="border rounded m-1 text-light">
          <Col
            xs={1}
            className="ml-3 d-flex align-items-center justify-content-center"
          >
            <Button
              variant="outline-light"
              size="sm"
              className="badge-pill shadow"
              id="session-decrement"
              onClick={handleSessionDecrement}
            >
              <span>-</span>
            </Button>
          </Col>
          <Col className="text-center p-1">
            <div id="session-label">Session Length</div>
            <div id="session-length" className="h4">
              {sessionLength}
            </div>
          </Col>
          <Col
            xs={1}
            className="mr-3 d-flex align-items-center justify-content-center"
          >
            <Button
              variant="outline-light"
              size="sm"
              id="session-increment"
              className="badge-pill shadow"
              onClick={handleSessionIncrement}
            >
              +
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TimesSet;
