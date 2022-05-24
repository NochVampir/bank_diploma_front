import { observer } from 'mobx-react';
import { Container } from 'typedi';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { DefaultLayout } from '../../../core/components/default-layout';
import { TransactionsList } from '../../components/transactions-list';
import { TransactionsStore } from '../../stores/transactions-store';

export const TransactionsPage = observer(() => {
  const location = useLocation();
  const transactionsStore = Container.get(TransactionsStore);

  useEffect(() => {
    transactionsStore.getTransactionsList();
  }, [location.pathname]);

  return (
    <DefaultLayout noCard>
      <Row>
        <Col md={12}>
          <TransactionsList />
        </Col>
      </Row>
    </DefaultLayout>
  );
});
