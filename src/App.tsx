import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import { withAuthorization } from './hoc/withAuthorization';
import './App.css';

// Определяем тип локально
type User = {
  id: string;
  name: string;
  roles: string[];
};

// Создаём защищённую версию AdminPanel — доступ разрешён только для роли 'admin'
const AdminPanelWithAuth = withAuthorization(AdminPanel, ['admin']);

const App: React.FC = () => {
  // Состояние пользователя — для демонстрации переключения ролей
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    name: 'Алексей',
    roles: ['admin'],
  });

  const toggleUser = () => {
    if (currentUser?.roles.includes('admin')) {
      // Меняем на обычного пользователя
      setCurrentUser({ id: '2', name: 'Обычный пользователь', roles: ['user'] });
    } else {
      // Меняем на администратора
      setCurrentUser({ id: '1', name: 'Администратор', roles: ['admin'] });
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="app">
      <h1>Демонстрация HOC withAuthorization</h1>

      <div className="controls">
        <button onClick={toggleUser}>Переключить роль</button>
        <button onClick={logout}>Выйти</button>
        <span style={{ marginLeft: '20px' }}>
          Текущий пользователь: {currentUser ? currentUser.name : 'Не авторизован'}
          (роль: {currentUser ? currentUser.roles.join(', ') : '—'})
        </span>
      </div>

      <div className="content">
        <AdminPanelWithAuth currentUser={currentUser} title="Администрирование" />
      </div>
    </div>
  );
};

export default App;