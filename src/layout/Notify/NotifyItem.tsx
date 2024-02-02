import { Notification } from '@mantine/core';
import { FC } from 'react';

interface IProps {
  title: string;
  time: string;
  isRead?: boolean;
}

const NotifyItem: FC<IProps> = ({ title, time, isRead = false }) => {
  const onClick = () => {};

  return (
    <Notification
      withCloseButton={false}
      withBorder
      radius="xs"
      title={title}
      onClick={onClick}
      sx={{
        opacity: isRead ? 0.3 : 1,
        cursor: 'pointer'
      }}
    >
      {time}
    </Notification>
  );
};

export default NotifyItem;
