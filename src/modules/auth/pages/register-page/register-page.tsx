import React from 'react';
import { RegisterForm } from '../../components/register-form';
import { DefaultLayout } from '../../../core/components/default-layout';

export const RegisterPage: React.FC = () => (
  <DefaultLayout isAuthLayout>
    <RegisterForm />
  </DefaultLayout>
);
