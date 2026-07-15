import React from 'react';
import AccessDenied from '../components/AccessDenied';

/**
 * HOC withAuthorization — ограничивает доступ к компоненту на основе ролей пользователя.
 *
 * @param WrappedComponent - защищаемый компонент
 * @param allowedRoles - массив ролей, которым разрешён доступ
 * @returns Новый компонент, который проверяет роли и либо рендерит WrappedComponent, либо AccessDenied
 */
export function withAuthorization<P extends { currentUser: { roles: string[] } | null }>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  // имя для отладки
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithAuthorization = (props: P) => {
    const { currentUser } = props;

    // Проверяем, авторизован ли пользователь и есть ли у него хотя бы одна разрешённая роль
    const hasAccess = currentUser !== null && currentUser.roles.some(role => allowedRoles.includes(role));

    if (!hasAccess) {
      return <AccessDenied />;
    }

    // Если доступ разрешён, рендерим обёрнутый компонент со всеми пропсами
    return <WrappedComponent {...props} />;
  };

  // Устанавливаем displayName для удобства отладки
  WithAuthorization.displayName = `withAuthorization(${componentName})`;

  return WithAuthorization;
}