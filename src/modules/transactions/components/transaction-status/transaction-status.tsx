import { Button } from 'react-bootstrap';
import React from 'react';
import cn from 'classnames';
import styles from './transaction-status.module.css';

type TTransactionSuccess = {
  onRepeat: () => void
  onNavigateToTransactions: () => void
  isError: boolean
}

export const TransactionStatus: React.FC<TTransactionSuccess> = ({
  onRepeat,
  onNavigateToTransactions,
  isError,
}) => {
  const text = isError ? 'Произошла ошибка' : 'Успешный перевод';

  return (
    <div className="d-flex flex-column align-items-center">
      <div className={cn(styles.statusText, {
        [styles.statusError]: isError,
        [styles.statusSuccess]: !isError,
      })}
      >
        {text}
      </div>
      <div className="mt-3 d-flex align-items-center">
        <Button onClick={onRepeat} className="mx-1">
          Повторить
        </Button>
        <Button onClick={onNavigateToTransactions} className="mx-1">
          К переводам
        </Button>
      </div>
    </div>
  );
};
