import { observer } from 'mobx-react';
import { Container } from 'typedi';
import { Card } from 'react-bootstrap';
import { ProfileStore } from '../../stores/profile-store';
import styles from './balance-amount.module.css';

export const BalanceAmount = observer(() => {
  const profileStore = Container.get(ProfileStore);

  return (
    <Card body>
      <div className={styles.balance}>
        Счет:
        {' '}
        <span className={styles.amount}>{profileStore.details?.amount}</span>
      </div>
    </Card>
  );
});
