import React, { useState } from 'react';
import {
 Button, Form, Modal, Spinner,
} from 'react-bootstrap';
import { useReplenishForm } from '../../hooks/use-replenish-form';
import { FormError } from '../../../core/components/form-error';

export const ReplenishBalance: React.FC = () => {
  const [isShowing, setIsShowing] = useState(false);
  const {
    values,
    handleChange,
    handleSubmit,
    isLoading,
    errors,
  } = useReplenishForm(() => setIsShowing(false));

  return (
    <>
      <Button onClick={() => setIsShowing(true)} variant="primary">
        Пополнить баланс
      </Button>

      <Modal show={isShowing} onHide={() => setIsShowing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Пополнить баланс</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Сумма пополнения</Form.Label>
          <Form.Control type="text" name="cost" onChange={handleChange} value={values.cost} />
          <FormError error={errors.cost} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleSubmit()}>
            {isLoading && <Spinner className="mr-2" animation="border" />}
            Пополнить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
);
};
