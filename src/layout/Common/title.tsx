import { FC } from 'react';
import { Title } from '@mantine/core';

interface IProps {
  title?: string;
  size?: number | string;
}

const CustomTitle: FC<IProps> = ({ title, size = 24 }) => {
  return title ? (
    <Title order={1} size={`${size}px`}>
      {title}
    </Title>
  ) : null;
};

export default CustomTitle;
