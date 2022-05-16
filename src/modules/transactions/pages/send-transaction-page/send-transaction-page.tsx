import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { DefaultLayout } from '../../../core/components/default-layout';
import { TransactionForm } from '../../components/transaction-form';

export const SendTransactionPage: React.FC = () => (
  <DefaultLayout noCard>
    <Row>
      <Col md={12}>
        <TransactionForm />
      </Col>
    </Row>
  </DefaultLayout>
);
