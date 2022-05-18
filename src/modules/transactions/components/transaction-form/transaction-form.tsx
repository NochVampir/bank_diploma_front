import React from 'react';
import {
  Button, Card, Form, Tab, Tabs,
} from 'react-bootstrap';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useTransactionForm } from '../../hooks/use-transaction-form';
import { SuggestInput } from '../../../core/components/suggest-input/suggest-input';
import { TransactionStatus } from '../transaction-status';
import styles from './transaction-form.module.css';
import { FormError } from '../../../core/components/form-error';

export const TransactionForm: React.FC = observer(() => {
  const {
    values,
    isLoading,
    handleSubmit,
    handleChange,
    handleRecipientChange,
    suggestions,
    onSuggestionsPick,
    onSuggestionsClose,
    onRecipientTypeChange,
    transactionStatus,
    clearData,
    errors,
  } = useTransactionForm();
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Body>
        {transactionStatus.isCompleted ? (
          <div className={styles.statusWrapper}>
            {transactionStatus.isCompleted && (
              <TransactionStatus
                isError={transactionStatus.isError}
                onRepeat={clearData}
                onNavigateToTransactions={() => navigate('/transactions')}
              />
            )}
          </div>
        ) : (
          <Form>
            <Form.Group className="mb-4">
              <Tabs onSelect={onRecipientTypeChange} activeKey={values.recipientType}>
                <Tab eventKey="nickname" title="по имени пользователя" />
                <Tab eventKey="operationNumber" title="по номеру счету" />
              </Tabs>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Кому перевести</Form.Label>
              <SuggestInput
                disableSuggestions={values.recipientType === 'operationNumber'}
                name="recipient"
                value={typeof values.recipient === 'object'
                  ? values.recipient.value : values.recipient}
                onChange={handleRecipientChange}
                suggestions={suggestions}
                onCloseSuggestions={onSuggestionsClose}
                onSuggestionsPick={onSuggestionsPick}
              />
              <FormError error={errors.recipient as string} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Сумма перевода</Form.Label>
              <Form.Control
                name="amount"
                onChange={(e) => {
                  if (parseFloat(e.target.value) || e.target.value === '') {
                    handleChange(e);
                  }
                }}
                value={values.amount}
                type="text"
                placeholder="Введите сумму"
              />
              <FormError error={errors.amount} />
            </Form.Group>
            <Button className="mt-4" variant="outline-primary" disabled={isLoading} onClick={() => handleSubmit()}>
              Перевод
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
});
