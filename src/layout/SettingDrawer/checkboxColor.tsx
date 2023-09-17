import { FC } from 'react';
import { ColorSwatch, CheckIcon, rem } from '@mantine/core';

interface IProps {
  color: string;
  colorList: string[];
  checked?: boolean;
  onClick?: (color: string) => void;
}

const CheckboxColor: FC<IProps> = ({
  color,
  colorList,
  checked = false,
  onClick = () => {}
}) => {
  return (
    <ColorSwatch
      key={color}
      color={colorList[6]}
      onClick={() => onClick(color)}
    >
      {checked && <CheckIcon width={rem(10)} />}
    </ColorSwatch>
  );
};

export default CheckboxColor;
