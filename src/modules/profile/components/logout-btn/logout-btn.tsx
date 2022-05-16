import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Container } from 'typedi';
import styles from './logout-btn.module.css';
import { AuthStore } from '../../../auth/stores/auth-store';

export const LogoutBtn: React.FC = () => {
  const authStore = Container.get(AuthStore);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.btn} onClick={() => authStore.logoutUser()}>
      <FiLogOut />
      Выйти
    </div>
  );
};
