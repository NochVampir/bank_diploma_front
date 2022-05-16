import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Container } from 'typedi';
import { useShownPasswordHook } from '../../hooks/use-shown-password-hook';
import { useRegisterHook } from '../../hooks/use-register-hook';
import { AuthStore } from '../../stores/auth-store';

export const RegisterForm: React.FC = observer(() => {
  const authStore = Container.get(AuthStore);
  const {
    values,
    handleChange,
    handleSubmit,
  } = useRegisterHook();
  const {
    isShownPassword,
    passwordType,
    onShownChangeCallback,
  } = useShownPasswordHook();

  return (
    <Form>
      <h2 className="mb-3">Создать аккаунт</h2>
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
        Создать аккаунт
      </Button>
      <Form.Group>
        <Link to="/auth/login">
          Уже имеете аккаунт
        </Link>
      </Form.Group>
    </Form>
  );
});
