import React from 'react';
import {
  Card, Col, Image, Row,
} from 'react-bootstrap';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { Container } from 'typedi';
import styles from './info-card.module.css';
import { LogoutBtn } from '../logout-btn';
import { ProfileStore } from '../../stores/profile-store';
import { ReplenishBalance } from '../replenish-balance';

const userPicUrl = 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=';

export const InfoCard: React.FC = observer(() => {
  const profileStore = Container.get(ProfileStore);

  return (
    <Card>
      <Row className="mt-3 justify-content-center">
        <Col md={5}>
          <Image fluid src={userPicUrl} rounded />
        </Col>
      </Row>
      <Row className="pb-3 justify-content-center">
        <Col className="text-center" md={12}>
          <div className={cn('pb-2', styles.nickname)}>
            {profileStore.details?.nickname}
          </div>
        </Col>
      </Row>
      <Row className="pb-3 justify-content-center">
        <Col md={10} className="d-flex justify-content-center">
          <ReplenishBalance />
        </Col>
      </Row>
      <hr />
      <Row className="mt-2 mb-4">
        <Col className="d-flex justify-content-center">
          <LogoutBtn />
        </Col>
      </Row>
    </Card>
  );
});
