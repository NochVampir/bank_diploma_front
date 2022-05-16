import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './profile-spinner.module.css';

export const ProfileSpinner = () => (
  <div className={styles.wrapper}>
    <Spinner animation="grow" />
  </div>
);
