import React from 'react';
import { observer } from 'mobx-react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container } from 'typedi';
import { useLoginHook } from '../../hooks/use-login-hook';
import { useShownPasswordHook } from '../../hooks/use-shown-password-hook';
import { AuthStore } from '../../stores/auth-store';

export const LoginForm: React.FC = observer(() => {
  const authStore = Container.get(AuthStore);
  const {
    values,
    handleChange,
    handleSubmit,
  } = useLoginHook();
  const {
    isShownPassword,
    passwordType,
    onShownChangeCallback,
  } = useShownPasswordHook();

  return (
    <Form>
      <h2 className="mb-3">Войти в аккаунт</h2>
      <Form.Group className="mb-2">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control
          name="login"
          value={values.login}
          onChange={handleChange}
          type="text"
          placeholder="example-1"
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          name="password"
          value={values.password}
          onChange={handleChange}
          type={passwordType}
          placeholder="example-1"
        />
      </Form.Group>
      <Form.Group className="d-flex align-content-center mb-4">
        <Form.Check
          id="show-password"
          type="checkbox"
          checked={isShownPassword}
          onChange={onShownChangeCallback}
          placeholder="example-1"
        />
        <Form.Label htmlFor="show-password" className="mx-2">Показать пароль</Form.Label>
      </Form.Group>
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        variant="primary"
        disabled={authStore.isLoading}
        type="submit"
        className="mb-lg-4"
      >
        {authStore.isLoading && (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
        Войти в аккаунт
      </Button>
      <Form.Group>
        <Link to="/auth/register">
          Хотите создать новый аккаунт
        </Link>
      </Form.Group>
    </Form>
  );
});
