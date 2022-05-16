import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const EmptyTransactionsNotify: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <span>Нет операций</span>
      <Button variant="outline-primary" onClick={() => navigate('/transactions/send')} className="mt-3">
        Сделать перевод
      </Button>
    </div>
  );
};
