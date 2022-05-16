import React from 'react';
import { LoginForm } from '../../components/login-form';
import { DefaultLayout } from '../../../core/components/default-layout';

export const LoginPage: React.FC = () => (
  <DefaultLayout isAuthLayout>
    <LoginForm />
  </DefaultLayout>
);
