import React from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { Container } from 'typedi';
import { ProfileStore } from '../../stores/profile-store';
import styles from './last-activity.module.css';

function getTypeLabel(type: 'increase' | 'decrease' | 'replenish') {
  switch (type) {
    case 'replenish':
      return 'Пополнение счета';
    case 'decrease':
      return 'Списание со счета';
    default:
    case 'increase':
      return 'Получение на счет';
  }
}

export const LastActivity: React.FC = observer(() => {
  const profileStore = Container.get(ProfileStore);

  return profileStore.isLoadingLastActivity ? (
    <div className={styles.spinnerWrapper}>
      <Spinner animation="grow" />
    </div>
) : (
  <ListGroup>
    {profileStore.lastActivity.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <ListGroupItem key={index}>
        <div className="d-flex justify-content-between align-items-center">
          <span>{getTypeLabel(item.type)}</span>
          {item.value && <span>{item.value}</span>}
        </div>
      </ListGroupItem>
    ))}
  </ListGroup>
);
});
