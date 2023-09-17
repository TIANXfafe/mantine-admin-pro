import { FC } from 'react';
import { Image } from '@mantine/core';

interface IProps {
  src: string;
  size?: number | string;
}

const Logo: FC<IProps> = ({ src, size = 24 }) => {
  return (
    <Image
      radius="xs"
      src={src}
      alt="Logo"
      width={size}
      height={size}
      withPlaceholder
    />
  );
};

export default Logo;
