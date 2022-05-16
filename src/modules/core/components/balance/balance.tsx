import React from 'react';
import { observer } from 'mobx-react';
import { Container } from 'typedi';
import cn from 'classnames';
import styles from './balance.module.css';
import { ProfileStore } from '../../../profile/stores/profile-store';

type TBalance = {
  noCenter?: boolean
}

export const Balance: React.FC<TBalance> = observer(({
  noCenter,
                                                     }) => {
  const profileStore = Container.get(ProfileStore);

  return (
    <div className={cn(styles.balance, {
      [styles.balanceNoCenter]: noCenter,
    })}
    >
      <span className={styles.balanceLabel}>Счет:</span>
      <span className={styles.balanceAmount}>{profileStore.details?.amount}</span>
    </div>
  );
});
