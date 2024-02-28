import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import { flattenTree } from '@/utils/methods/tree.ts';
import { addTab } from '@/redux/reducers/menu.ts';

interface IProps {
  children: ReactNode;
}

const RecordRoute: FC<IProps> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { menuList } = useAppSelector((state) => state.menu);
  const list = flattenTree(menuList, 'children');
  const menu = list.find((item) => item.link === pathname);

  useEffect(() => {
    dispatch(addTab({ key: menu!.link, value: menu!.label }));
    navigate(menu!.link!);
  }, []);

  return <>{children}</>;
};

export default RecordRoute;
