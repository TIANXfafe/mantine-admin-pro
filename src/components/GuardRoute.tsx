import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/utils/hooks/useAppStore.ts';

interface IProps {
  children: ReactNode;
}

const GuardRoute: FC<IProps> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.user);
  if (!accessToken) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default GuardRoute;
