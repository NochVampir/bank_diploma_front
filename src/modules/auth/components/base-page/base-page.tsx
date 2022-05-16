import React from 'react';
import { observer } from 'mobx-react';
import { Container } from 'typedi';
import { Spinner } from 'react-bootstrap';
import { AuthStore } from '../../stores/auth-store';

export const BasePage: React.FC = observer(({ children }) => {
  const authStore = Container.get(AuthStore);

  return (
    <>
      {authStore.isConfigured ? children : (
        <div className="py-5 d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
});
