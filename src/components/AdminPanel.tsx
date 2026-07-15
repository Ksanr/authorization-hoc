import React from 'react';

interface AdminPanelProps extends CurrentUserProps {
  currentUser: { id: string; name: string; roles: string[] } | null;
  title?: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ title = 'Админская панель', currentUser }) => {
  return (
    <div style={{ padding: '20px', border: '2px solid #007bff', borderRadius: '8px' }}>
      <h2>{title}</h2>
      <p>Добро пожаловать, {currentUser?.name || 'администратор'}!</p>
      <p>Здесь отображаются конфиденциальные данные.</p>
    </div>
  );
};

export default AdminPanel;