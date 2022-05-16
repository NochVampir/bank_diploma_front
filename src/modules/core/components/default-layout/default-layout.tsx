import React, { memo } from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import { Sidebar } from '../sidebar';

type Props = {
  isAuthLayout?: boolean
  noCard?: boolean
}

export const DefaultLayout: React.FC<Props> = memo(({
  isAuthLayout = false,
  noCard = false,
  children,
}) => (
  <Container>
    <Row className="justify-content-center">
      {!isAuthLayout && (
        <Col className="pt-lg-5 pt-md-3" md={2}>
          <Sidebar />
        </Col>
      )}
      <Col md={isAuthLayout ? 7 : 10} className="pt-lg-5 pt-md-3">
        {noCard ? (
          <div>
            {children}
          </div>
        ) : (
          <Card body>
            {children}
          </Card>
        )}
      </Col>
    </Row>
  </Container>
));
