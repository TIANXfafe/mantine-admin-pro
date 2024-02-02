import { FC } from 'react';
import { Badge, Flex, Text, Paper } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface IProps {
  title: string;
  desc: string;
  status: number;
}

export const statusText = [
  'global.layout.header.right.notify.not-start',
  'global.layout.header.right.notify.ongoing',
  'global.layout.header.right.notify.completed',
  'global.layout.header.right.notify.rejected'
];
export const statusColor = ['gray', 'blue', 'green', 'red'];

const TodoItem: FC<IProps> = ({ title, desc, status }) => {
  const { t } = useTranslation();

  return (
    <Paper shadow="xs" radius="xs" p="xs" withBorder sx={{ cursor: 'pointer' }}>
      <Flex justify="space-between" gap="xs">
        <Flex direction="column">
          <Text fw={500} fz={14}>
            {title}
          </Text>
          <Text fz={12} sx={{ maxWidth: 220 }} lineClamp={1}>
            {desc}
          </Text>
        </Flex>
        <Badge radius="sm" variant="outline" color={statusColor[status]}>
          <Text fz={12}>{t(statusText[status])}</Text>
        </Badge>
      </Flex>
    </Paper>
  );
};

export default TodoItem;
