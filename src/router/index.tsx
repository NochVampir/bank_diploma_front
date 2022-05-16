import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { createBrowserHistory } from 'history';
import { LoginPage } from '../modules/auth/pages/login-page';
import { RegisterPage } from '../modules/auth/pages/register-page';
import { ProfilePage } from '../modules/profile/pages/profile-page';
import { TransactionsPage } from '../modules/transactions/pages/transactions-page';
import { BasePage } from '../modules/auth/components/base-page';
import { SendTransactionPage } from '../modules/transactions/pages/send-transaction-page';

export const history = createBrowserHistory();

export const AppRouter = () => (
  <HistoryRouter history={history}>
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/profile">
        <Route
          index
          element={(
            <BasePage>
              <ProfilePage />
            </BasePage>
          )}
        />
      </Route>
      <Route path="/transactions">
        <Route
          index
          element={(
            <BasePage>
              <TransactionsPage />
            </BasePage>
          )}
        />
        <Route
          path="send"
          element={(
            <BasePage>
              <SendTransactionPage />
            </BasePage>
          )}
        />
      </Route>
    </Routes>
  </HistoryRouter>
);
