import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modules/core/styles/vars.module.css';
import { observer } from 'mobx-react';
import { Container } from 'typedi';
import { AppRouter } from './router';
import { AuthStore } from './modules/auth/stores/auth-store';

function App() {
  const authStore = Container.get(AuthStore);
  const isAuthLocation = window.location.pathname.includes('auth');

  useEffect(() => {
    if (!isAuthLocation) {
      authStore.initAuthSettings();
    }
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default observer(App);
