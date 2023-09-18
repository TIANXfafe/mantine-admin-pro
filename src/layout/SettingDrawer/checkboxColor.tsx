import { FC } from 'react';
import { Tooltip, ColorSwatch, CheckIcon, rem } from '@mantine/core';

interface IProps {
  title: string;
  color: string;
  colorList: string[];
  checked?: boolean;
  onClick?: (color: string) => void;
}

const CheckboxColor: FC<IProps> = ({
  title,
  color,
  colorList,
  checked = false,
  onClick = () => {}
}) => {
  return (
    <Tooltip label={title}>
      <ColorSwatch
        key={color}
        color={colorList[6]}
        onClick={() => onClick(color)}
      >
        {checked && <CheckIcon width={rem(10)} />}
      </ColorSwatch>
    </Tooltip>
  );
};

export default CheckboxColor;
