import React, { useState } from 'react';
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { Container } from 'typedi';
import { TransactionsStore } from '../../stores/transactions-store';
import styles from './transactions-list.module.css';
import { ProfileStore } from '../../../profile/stores/profile-store';
import { EmptyTransactionsNotify } from '../empty-transactions-notify';
import { Balance } from '../../../core/components/balance';
import { formatTransactionTime } from '../../utils/format-transaction-time';

const sortOpts = [
  {
    value: 'cost-asc',
    label: 'По стоимости(возр)',
  },
  {
    value: 'cost-desc',
    label: 'По стоимости(убыв)',
  },
  {
    value: 'createdAt-asc',
    label: 'По дате(возр)',
  },
  {
    value: 'createdAt-desc',
    label: 'По дате(убыв)',
  },
];

export const TransactionsList: React.FC = observer(() => {
  const transactionsStore = Container.get(TransactionsStore);
  const profileStore = Container.get(ProfileStore);
  const [sort, setSort] = useState({
    value: 'createdAt-asc',
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <Col md={5}>
          <Dropdown
            placeholder="Сортировать по"
            value={sort.value}
            options={sortOpts}
            onChange={(opt) => {
              setSort(opt);
              const [name, dir] = opt.value.split('-');
              transactionsStore.getTransactionsList({
                name,
                dir,
              });
            }}
          />
        </Col>
        <Col className="justify-content-md-end d-flex align-items-center" md={4}>
          <Balance />
        </Col>
      </div>
      <ListGroup className="mt-3">
        {transactionsStore.list?.length === 0 ? (
          <div className="mt-5">
            <EmptyTransactionsNotify />
          </div>
        ) : transactionsStore.list?.map((t) => (
          <ListGroupItem>
            <div key={t.id} className={styles.transactionItem}>
              <div className="d-flex flex-column">
                <span>{t.id}</span>
                <span className={styles.personUsername}>
                  {
                    t.senderId === profileStore.details?.id ? 'кому: ' : 'от кого: '
                  }
                  {t.senderId === profileStore.details?.id ? t.sender.nickname
                    : t.recipient.nickname}
                </span>
                <span className={styles.createdTime}>{formatTransactionTime(t.createdAt)}</span>
              </div>
              <span className={cn(styles.transactionAmount, {
                [styles.transactionDecreaseAmount]: t.senderId === profileStore.details?.id,
              })}
              >
                {t.senderId === profileStore.details?.id ? '-' : '+'}
                {t.cost}
              </span>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
});
