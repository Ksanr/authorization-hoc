import React from 'react';

const AccessDenied: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '8px' }}>
      <h2>🚫 Доступ запрещён</h2>
      <p>У вас нет прав для просмотра этого раздела.</p>
    </div>
  );
};

export default AccessDenied;