import { FC } from 'react';
import { Notification, Avatar, Text } from '@mantine/core';

interface IProps {
  nickname: string;
  content: string;
  avatar: string;
  isRead?: boolean;
}

const MessageItem: FC<IProps> = ({
  nickname,
  content,
  avatar,
  isRead = false
}) => {
  const onClick = () => {};

  return (
    <Notification
      withCloseButton={false}
      withBorder
      radius="xs"
      title={nickname}
      onClick={onClick}
      icon={<Avatar src={avatar} />}
      sx={{
        opacity: isRead ? 0.3 : 1,
        cursor: 'pointer'
      }}
    >
      <Text fz={12} sx={{ maxWidth: 280 }} lineClamp={1}>
        {content}
      </Text>
    </Notification>
  );
};

export default MessageItem;
