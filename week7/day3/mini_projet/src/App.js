import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ColumnLeft from "./columns/ColumnLeft";
import ColumnRight from "./columns/ColumnRight";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <Container>
      <h2 className="my-3">Error boundaries in React</h2>
      <Row>
        <Col>
          <ColumnLeft />
        </Col>
        <Col>
          
          <ErrorBoundary>
            <ColumnRight />
          </ErrorBoundary>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
