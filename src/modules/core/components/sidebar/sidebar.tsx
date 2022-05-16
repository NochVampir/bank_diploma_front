import React, { useState } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FcBusinessman } from 'react-icons/fc';
import { GrTransaction } from 'react-icons/gr';
import cn from 'classnames';
import styles from './sidebar.module.css';

export const Sidebar: React.FC = () => {
  const [activeKey, setActiveKey] = useState('profile');

  const onSelectCallback = (eventKey: string | null) => {
    if (eventKey) setActiveKey(eventKey);
  };

  return (
    <Card body>
      <Nav activeKey={activeKey} onSelect={onSelectCallback} className="flex-column">
        <Nav.Link as={Link} to="/profile" className={cn('d-flex align-items-center', styles.menuItem)} eventKey="profile">
          <FcBusinessman className="mx-2" />
          Профиль
        </Nav.Link>
        <Nav.Link as={Link} to="/transactions" className={cn('d-flex align-items-center', styles.menuItem)} eventKey="transaction">
          <GrTransaction className="mx-2" />
          Список операций
        </Nav.Link>
        <Nav.Link as={Link} to="/transactions/send" className={cn('d-flex align-items-center', styles.menuItem)} eventKey="transaction/send">
          <GrTransaction className="mx-2" />
          Перевод
        </Nav.Link>
      </Nav>
    </Card>
  );
};
