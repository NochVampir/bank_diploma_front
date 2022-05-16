import React from 'react';
import cn from 'classnames';
import styles from './form-error.module.css';

type TFormError = {
  error?: string
}

export const FormError: React.FC<TFormError> = ({
  error,
                                                }) => (error
  ? <span className={cn('d-flex mt-3', styles.error)}>{error}</span>
  : null);
