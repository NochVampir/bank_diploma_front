import React, { useEffect } from 'react';
import { Container } from 'typedi';
import { Card, Col, Row } from 'react-bootstrap';
import { DefaultLayout } from '../../../core/components/default-layout';
import { InfoCard } from '../../components/info-card';
import { ProfileStore } from '../../stores/profile-store';
import { LastActivity } from '../../components/last-activity';
import { Balance } from '../../../core/components/balance';

export const ProfilePage: React.FC = () => {
  const profileStore = Container.get(ProfileStore);

  useEffect(() => {
    Promise.all([
      profileStore.getProfileDetails(),
      profileStore.getLastActivity(),
    ]);
  }, []);

  return (
    <DefaultLayout noCard>
      <Row>
        <Col md={3}>
          <InfoCard />
        </Col>
        <Col md={9}>
          <Card body>
            <Balance noCenter />
          </Card>
          <div className="mb-3 mt-4">Последняя активность</div>
          <LastActivity />
        </Col>
      </Row>
    </DefaultLayout>
  );
};
